---
title: 'Specs and Tests as the Interface for AI Agents'
description: 'How to write requirements and executable tests that let an AI coding agent finish real work, and let you verify the result without trusting it.'
pubDate: 'Nov 14 2026'
category: 'ai-engineering'
tags: 'specs, testing, ai-agents, tdd, ai-assisted'
draft: true
---

> Note: This article was drafted with AI assistance and has not yet been reviewed by the author. (Update this note once reviewed.)

**TL;DR:** An agent can only be as good as the outcome you describe, and you can only trust it as far as something verifies the result. Write a short spec and the acceptance tests first, hand both to the agent, and let "the tests pass" be the definition of done.

## Prompting is not the same as specifying

A prompt like "add rate limiting to the API" invites a confident guess. How many requests? Per user or per IP? What status code? What happens to bursts? Which routes? The agent will pick answers for you, and they may be reasonable or wrong.

A spec removes the guesses. It states the outcome, the constraints and the acceptance criteria. That is the same document a good human engineer would want, and it is also the best input for an agent.

## What a useful spec contains

Keep it short. One page is plenty for most tasks.

1. **Goal:** the user-visible outcome in a sentence or two.
2. **Context:** where this lives in the codebase, relevant files, conventions to follow.
3. **Behaviour:** concrete rules, with examples of inputs and expected outputs.
4. **Edge cases and failure modes:** what should happen when things go wrong.
5. **Non-goals:** what *not* to touch. This is the best defence against scope creep.
6. **Acceptance criteria:** the checks that mean "done".

### Example

> **Goal:** Limit each authenticated user to 100 requests per minute on `POST /api/reports`.
>
> **Behaviour:** The 101st request within a rolling minute returns `429 Too Many Requests` with a `Retry-After` header (seconds). Other users are unaffected.
>
> **Non-goals:** Do not change other routes, the auth middleware or the database schema.
>
> **Acceptance:** the tests in `rateLimit.test.js` pass; the existing suite still passes.

## Tests are the contract

Prose can be misread. Tests cannot. When you give an agent failing tests and ask it to make them pass, you have turned an ambiguous request into a checkable one.

Here is a compact example using Node's built-in test runner. The behaviour is a rate limiter factory:

```javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import { createRateLimiter } from './rateLimit.js';

test('allows up to the limit, then blocks', () => {
  const now = () => 0;
  const limiter = createRateLimiter({ limit: 3, windowMs: 60_000, now });

  assert.equal(limiter.check('user-1').allowed, true);
  assert.equal(limiter.check('user-1').allowed, true);
  assert.equal(limiter.check('user-1').allowed, true);

  const blocked = limiter.check('user-1');
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.retryAfterSeconds, 60);
});

test('limits are tracked per user', () => {
  const limiter = createRateLimiter({ limit: 1, windowMs: 60_000, now: () => 0 });
  assert.equal(limiter.check('a').allowed, true);
  assert.equal(limiter.check('b').allowed, true);
  assert.equal(limiter.check('a').allowed, false);
});

test('the window resets after it elapses', () => {
  let t = 0;
  const limiter = createRateLimiter({ limit: 1, windowMs: 60_000, now: () => t });
  assert.equal(limiter.check('a').allowed, true);
  assert.equal(limiter.check('a').allowed, false);
  t = 60_001;
  assert.equal(limiter.check('a').allowed, true);
});
```

Notice the design choices that make this good agent input:

- The clock is injected (`now`), so tests are deterministic and need no sleeping.
- Each test checks one behaviour with an obvious name.
- The interface (`createRateLimiter`, `check`, `retryAfterSeconds`) is defined by the tests, so the agent does not invent one.

## A workflow that works

1. **Write the spec.** Even five lines.
2. **Write or generate the tests, then read them yourself.** This is the step that matters most. If the tests are wrong, everything downstream is wrong. An agent can draft tests, but you decide whether they capture the requirement.
3. **Run them and confirm they fail** for the right reason.
4. **Hand the agent the spec and the failing tests.** Ask for the smallest change that makes them pass.
5. **Review the diff** with the [review checklist](/blog/reviewing-ai-generated-code-checklist/), not just the green tick.
6. **Run the full suite**, then add tests for any edge case you discovered.

## Pitfalls

- **Tests that mirror the implementation.** If a test re-implements the logic, it proves nothing. Test behaviour.
- **Agents editing the tests to make them pass.** Watch for changed assertions or deleted cases in the diff. Treat any modification to the tests as a flag.
- **Over-mocking.** A test that mocks everything can pass while the real integration is broken. Mix in a few real-integration tests.
- **Only the happy path.** Specify failures, bad input and boundaries explicitly.
- **A green suite does not mean correct.** It means the checks you wrote passed. Coverage of the *right* things matters more than the number.

## Why this fits the AI era

The scarce skill is no longer producing code; it is deciding what correct means and proving it. Writing specs and tests is exactly that skill. It is also a good reason to keep your [fundamentals](/blog/fundamentals-over-frameworks-in-the-age-of-ai/) sharp: you need them to write tests that catch the subtle failures, not just the obvious ones.

## Frequently asked questions

**Should the AI write the tests or the code?**
Both can be drafted by an AI, but write or at least carefully review the tests yourself. They are the contract, so a human should decide they are right before the implementation is generated.

**How detailed should a spec be?**
Detailed enough that a competent engineer new to the codebase could implement it without asking you questions. Usually that is a page or less.

**What if the agent keeps getting it wrong?**
That is feedback about your spec or tests. Tighten the acceptance criteria and add the failing case as a test, rather than rewording the prompt repeatedly.

## Takeaways

- A spec turns a guess into a requirement; tests turn a requirement into a check.
- Review the tests before the implementation, and treat edits to tests as a red flag.
- "Done" is defined by checks you trust, not by the agent's summary.

*Related: [What AI Coding Agents Change About Software Engineering](/blog/what-ai-coding-agents-change-about-software-engineering/).*
