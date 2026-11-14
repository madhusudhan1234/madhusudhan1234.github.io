---
title: 'A Backend Engineer''s Guide to Adding LLM Features Safely'
description: 'Timeouts, retries, queues, caching, cost limits, output validation and privacy: how to add LLM features to a backend like any other unreliable dependency.'
pubDate: 'Nov 14 2026'
category: 'ai-engineering'
tags: 'llm, backend, queues, reliability, laravel, nodejs, ai-assisted'
draft: true
---

> Note: This article was drafted with AI assistance and has not yet been reviewed by the author. (Update this note once reviewed.)

**TL;DR:** An LLM call is a slow, expensive, non-deterministic network dependency that returns untrusted text. Treat it that way: put it behind timeouts, retries and a queue; cap cost; validate and sanitise the output; protect user data; and instrument it so you can see what it does in production.

## Why this is a backend problem

Adding "AI" to a product usually starts as one API call in a request handler. It works in the demo. Then it meets production: the call takes 20 seconds, the provider rate-limits you, a response comes back malformed, a user pastes something sensitive, and the bill arrives. None of those are model problems; they are the standard problems of integrating an unreliable external service, with a few extras.

If you build backends in Laravel, Node.js or similar stacks, you already have most of the tools.

## 1. Never call the model in the request path (when you can avoid it)

LLM calls are slow compared with a database query. A synchronous call in a web request ties up a worker, makes your p99 latency awful, and turns a provider hiccup into your outage.

Prefer this shape:

1. The request validates input, creates a record with status `pending`, and dispatches a job.
2. A worker calls the model and stores the result.
3. The client polls, or you push the result (webhooks, server-sent events, websockets).

That is the classic background-job pattern. For multi-server setups I explained why Redis is a better backing store than your relational database in [Why Redis Beats Databases for Job Queues in Multi-Server Apps](/blog/why-redis-is-better-than-database-to-store-jobs-in-multi-server-application/).

When the user is actively waiting (a chat interface), stream the response and still enforce a hard timeout.

## 2. Timeouts, retries and backoff

Every call needs a timeout shorter than your patience, and retries only for errors worth retrying.

```javascript
class RetryableError extends Error {}

async function callModel(prompt, { timeoutMs = 20_000, retries = 2 } = {}) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(MODEL_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json', authorization: `Bearer ${process.env.MODEL_API_KEY}` },
        body: JSON.stringify({ prompt }),
        signal: controller.signal,
      });
      if (res.status === 429 || res.status >= 500) throw new RetryableError(res.status);
      if (!res.ok) throw new Error(`Model call failed: ${res.status}`);
      return await res.json();
    } catch (err) {
      const retryable = err.name === 'AbortError' || err instanceof RetryableError;
      if (!retryable || attempt === retries) throw err;
      // exponential backoff with jitter
      const delay = 2 ** attempt * 500 + Math.random() * 250;
      await new Promise((r) => setTimeout(r, delay));
    } finally {
      clearTimeout(timer);
    }
  }
}
```

Points worth noting: retry on timeouts, `429` and `5xx`, not on `4xx` validation errors; add jitter so retries do not stampede; and make the job idempotent so a retry cannot create duplicate side effects.

## 3. Control cost and rate

Cost scales with tokens, and tokens scale with how much text users send you.

- **Cap input size** and truncate or reject oversized input.
- **Set a maximum output length** on every call.
- **Rate-limit per user and per tenant** so one account cannot drain your budget.
- **Track usage** (tokens in and out, per feature and per user) and alert on anomalies.
- **Use the smallest model that does the job,** and keep the model name in configuration so you can change it without a deploy.

## 4. Cache what you can

Identical or near-identical requests happen more than you expect: the same document summarised twice, the same classification of a repeated string. Hash the normalised input plus the prompt version and the model name, and cache the result with a sensible TTL. This cuts both latency and cost. Remember to include the *prompt version* in the key so changing the prompt invalidates old entries.

## 5. Treat output as untrusted input

Model output is text produced by a statistical system. Never assume it is well-formed, correct or safe.

- **Ask for structured output and validate it** against a schema before using it. If it fails validation, retry once or fall back.
- **Never execute or `eval` model output.** Do not interpolate it into SQL or shell commands.
- **Escape it** when rendering to HTML to avoid XSS; a model can be steered into emitting markup or scripts.
- **Defend against prompt injection.** If the model reads content from users, documents or the web, that content can contain instructions. Do not give a model that reads untrusted text broad tools or credentials, and require confirmation for consequential actions.
- **Check facts that matter.** If a wrong answer is costly, ground the model in your own data and verify before acting.

```javascript
import { z } from 'zod';

const Summary = z.object({
  title: z.string().max(120),
  bullets: z.array(z.string().max(200)).max(5),
});

const parsed = Summary.safeParse(JSON.parse(rawModelText));
if (!parsed.success) {
  // retry once with a stricter instruction, then fall back to a non-AI path
}
```

## 6. Protect user data

- **Minimise what you send.** Strip or redact personal data, secrets and anything the feature does not need.
- **Know your provider's data-handling terms:** retention, training use, region.
- **Do not log raw prompts and responses by default;** they often contain personal data. If you log them for debugging, restrict access and set a short retention.
- **Never put API keys in client-side code.** Proxy calls through your backend.

## 7. Plan for failure and degrade gracefully

The provider will be down or slow at some point. Decide in advance what the user sees:

- A clear message and a retry button, not a spinner that never ends.
- A non-AI fallback (a template, the original text, a manual flow) where it makes sense.
- A circuit breaker that stops calling a failing provider for a short while.
- A feature flag so you can switch the feature off without a deploy.

## 8. Observe it like any other dependency

You cannot improve what you cannot see. For each call, record:

- Latency, status, retries and timeouts.
- Tokens in and out, and estimated cost.
- Feature, model and prompt version.
- Validation failures and fallbacks.
- A correlation ID that ties the call to the user action.

Then build a small evaluation set: a handful of representative inputs with expected properties, run whenever you change the prompt or the model. Production behaviour is the real test, but a regression set catches the obvious breaks before users do.

## A short pre-launch checklist

- [ ] Model call happens in a background job, or streams with a hard timeout
- [ ] Timeouts, retries with backoff and idempotent jobs
- [ ] Input and output size caps; per-user rate limits; usage alerts
- [ ] Caching keyed on input, prompt version and model
- [ ] Output validated against a schema; never executed; escaped when rendered
- [ ] Prompt-injection exposure reviewed; tools and credentials minimised
- [ ] Personal data minimised; logging and retention decided
- [ ] Graceful fallback and a feature flag
- [ ] Metrics, logs and a small regression set

## Frequently asked questions

**Should I call an LLM synchronously in a web request?**
Avoid it for anything that can take more than a second or two. Use a background job and notify the client when it is done, or stream the response with a strict timeout.

**How do I stop LLM costs from spiralling?**
Cap input and output tokens, rate-limit per user, cache repeated requests, use the smallest suitable model, and alert on usage anomalies.

**Is model output safe to use directly?**
No. Validate it against a schema, escape it for its destination, and never run it as code or concatenate it into queries.

**What about prompt injection?**
Assume any text the model reads can contain instructions. Limit what the model is allowed to do, keep credentials out of its reach, and require confirmation for consequential actions.

## Takeaways

- Treat an LLM like any slow, costly, unreliable dependency, because it is one.
- Background jobs, timeouts, retries and caching solve most production problems.
- Validate and sanitise output; protect user data; observe everything.
- Your existing backend skills apply directly.

*Related: [What AI Coding Agents Change About Software Engineering](/blog/what-ai-coding-agents-change-about-software-engineering/) and the [AI era page](/ai/).*
