---
title: 'Reviewing AI-Generated Code: A Practical Checklist'
description: 'A practical, repeatable checklist for reviewing code written by AI agents: correctness, security, dependencies, performance, tests and scope.'
pubDate: 'Nov 14 2026'
category: 'ai-engineering'
tags: 'code-review, ai-agents, security, testing, ai-assisted'
draft: true
---

> Note: This article was drafted with AI assistance and has not yet been reviewed by the author. (Update this note once reviewed.)

**TL;DR:** AI-generated code looks finished far more often than it is. Review it like a pull request from a fast, confident junior engineer: verify the behaviour against the spec, hunt for the failure modes agents are prone to, and make the tests prove the result.

## Why AI code needs a different review habit

Human-written code carries signals: hesitation, TODOs, awkward naming where the author was unsure. AI-written code is uniformly fluent. It is well-formatted, plausibly named and confidently commented, even when it is wrong. That removes the cues reviewers rely on, so you need an explicit process instead of a gut feeling.

## The checklist

Work through it in order. Most diffs only need a few minutes.

### 1. Scope: is this the change I asked for?

- Does the diff touch only the files and behaviour the task needs?
- Did it rename, reformat or "improve" unrelated code?
- Is the change small enough to review properly? If not, ask for it to be split.

Scope creep is the most common agent failure and the easiest to spot first.

### 2. Correctness against the spec

- Re-read the original requirement, then read the code, not the agent's summary.
- Trace the happy path by hand.
- Check the edge cases: empty input, nulls, very large input, duplicates, time zones, encoding, concurrency.
- Does it handle failure, or only the success case?

### 3. Does everything it references actually exist?

- Every function, method, config key and CLI flag: is it real, in the version we use?
- Every new dependency: is the package name right, maintained and necessary?
- Did it invent an API that "should" exist?

Hallucinated APIs often fail loudly at runtime, but a plausible-looking wrong flag can fail silently.

### 4. Security

- User input: validated, escaped, parameterised? Look for string-built SQL, shell commands and HTML.
- Authentication and authorization: is every new route or action checked, not only the UI?
- Secrets: any keys, tokens or credentials in code, logs or error messages?
- Data exposure: does a response or log include more than it should?
- New dependencies: supply-chain risk, licence, install scripts.

### 5. Performance and data access

- Loops containing queries or I/O (the classic N+1).
- Nested loops over collections that could be a Map or Set; see [Fundamentals Over Frameworks in the Age of AI](/blog/fundamentals-over-frameworks-in-the-age-of-ai/).
- Missing indexes, unbounded queries, loading everything into memory.
- Work that belongs in a [background queue](/blog/why-redis-is-better-than-database-to-store-jobs-in-multi-server-application/) rather than a request.

### 6. Tests

- Do tests exist for the new behaviour, and do they test behaviour rather than implementation?
- Would the tests fail if the code were wrong? A quick way to check: break the code on purpose and watch the test fail.
- Were existing tests modified to make them pass? That deserves extra scrutiny.
- Run the whole suite, not only the new tests.

### 7. Fit with the codebase

- Does it follow existing conventions, or introduce a second way of doing the same thing?
- Does it reuse existing helpers, or reinvent one?
- Naming, error handling and logging consistent with the rest of the code?

### 8. Operability

- What happens when this fails in production? Is there a log line, a metric, a clear error?
- Timeouts and retries on anything that calls out over the network?
- Configuration, migrations and rollback considered?

## A small example

Suppose an agent adds an endpoint to export a user's orders:

```javascript
app.get('/orders/export', async (req, res) => {
  const orders = await db.query(
    `SELECT * FROM orders WHERE user_id = ${req.query.userId}`
  );
  res.json(orders);
});
```

Run the checklist and the problems appear quickly:

- **Security:** string-built SQL (injection), and `userId` is taken from the query string, so any user can export anyone's orders (broken authorization).
- **Data exposure:** `SELECT *` may return fields that should never leave the server.
- **Performance:** no pagination or limit.
- **Tests:** none for the authorization rule.

The code "works" in a demo. The checklist is what turns a demo into something you would ship.

## Make review easier for yourself

- **Ask for small diffs.** One concern per change.
- **Ask the agent to explain its assumptions**, then check them yourself.
- **Write the acceptance tests first**, so the review becomes "do these pass, and are they the right tests?" See [Specs and Tests as the Interface for AI Agents](/blog/specs-and-tests-as-the-interface-for-ai-agents/).
- **Use automation for the mechanical parts:** linters, type checks, dependency audits and secret scanners catch a lot before you read a line.
- **Keep a personal "smell list"** of mistakes you have caught before.

## When to reject and start over

If you cannot explain what the change does after a careful read, or it is sprawling and tangled, do not try to patch it into shape. Reject it, tighten the spec, and run it again. Reading a clean second attempt is cheaper than untangling a bad first one.

## Frequently asked questions

**How is reviewing AI code different from reviewing a colleague's code?**
The code tends to be fluent and consistent, which hides problems, and the "author" cannot be relied on to know your production context. So you check scope, existence of APIs and security explicitly instead of trusting the surface.

**Can an AI review AI-generated code?**
It can help catch issues, and a second pass often finds things the first missed. It does not replace a human who is accountable for the change.

**What is the single most important check?**
Verify behaviour against the requirement with tests you trust. Everything else is in service of that.

## Takeaways

- Fluent code is not correct code; review explicitly.
- Check scope, correctness, existence of APIs, security, performance, tests, fit and operability.
- Keep diffs small and make tests the proof.
- You own what you merge.

*Related: [What AI Coding Agents Change About Software Engineering](/blog/what-ai-coding-agents-change-about-software-engineering/).*
