---
title: 'Fundamentals Over Frameworks in the Age of AI'
description: 'When AI generates the code, fundamentals are how you judge it. Real examples of the mistakes data-structure knowledge helps you catch in AI-written code.'
pubDate: 'Nov 14 2026'
category: 'ai-engineering'
tags: 'fundamentals, data-structures, ai-agents, career, ai-assisted'
---

> Note: This article was drafted with AI assistance and reviewed and edited by the author.

**TL;DR:** Frameworks come and go, and AI can already write most framework boilerplate. What it cannot do for you is tell you whether the code is *right*. That judgment comes from fundamentals: data structures, complexity, databases and how the machine actually works.

## The reminder from the podcast

One of the recurring themes on the [Tech Weekly podcast](/weekly/) lately is simple: learn fundamentals, not frameworks, because when AI-generated code breaks, fundamentals are what saves you. <!-- TODO(confirm): this sentence claims personal experience with agents; edit to match your own. -->
I agree, and for a specific reason.

AI shifted the bottleneck from *producing* code to *evaluating* code. Evaluating code is a fundamentals skill.

## Example 1: the quadratic "dedupe"

Ask an agent to remove duplicates from a list of user IDs and you may get something like this:

```javascript
function uniqueIds(ids) {
  const result = [];
  for (const id of ids) {
    if (!result.includes(id)) {
      result.push(id);
    }
  }
  return result;
}
```

It is correct, readable and passes a small test. It is also O(n²): `includes` scans the array every time. With a few thousand IDs nobody notices. With a few hundred thousand, it is your slowest endpoint.

If you know how a Set works, you see the fix immediately:

```javascript
function uniqueIds(ids) {
  return [...new Set(ids)];
}
```

Set membership checks are O(1) on average, so the whole operation is O(n). The agent could write either version. Knowing which one to ask for, or to accept, is the fundamentals part. The details are in my [Set in JavaScript](/blog/fundamentals/data-structure-set-in-javascript/) article.

## Example 2: the array used as a queue

Agents often reach for an array as a queue:

```javascript
const queue = [];
queue.push(job);          // enqueue
const next = queue.shift(); // dequeue
```

`shift()` removes the first element, which means re-indexing the rest. For a small queue that is irrelevant. For a hot path with a large backlog it becomes a real cost. Knowing the difference between an array-backed queue, a linked list and a circular buffer tells you when it matters. See [Queue in JavaScript](/blog/fundamentals/data-structure-queue-in-javascript/) and [Circular Queue in JavaScript](/blog/fundamentals/data-structure-circular-queue-in-javascript/).

## Example 3: the lookup that should be a Map

```javascript
const user = users.find((u) => u.id === targetId); // inside a loop over orders
```

A `find` inside a loop is a hidden nested loop. Building a `Map` keyed by `id` once turns repeated O(n) lookups into O(1). Whether the fix is worth it depends on the sizes involved, and sizes are exactly what an agent does not know about your production data. More in [Map in JavaScript](/blog/fundamentals/data-structure-map-in-javascript/).

## It is not only data structures

The same pattern holds across the stack:

- **Databases:** an agent will happily generate an N+1 query, miss an index, or skip a transaction. Understanding [normalization](/blog/database-normalization-blog/), indexes and isolation levels is how you spot it.
- **Concurrency and queues:** whether a job runs twice, or two workers race, is a design question. See [why Redis beats databases for job queues](/blog/why-redis-is-better-than-database-to-store-jobs-in-multi-server-application/).
- **Networking and security:** timeouts, retries, authentication and input validation are not framework features you can assume are handled.

## Why frameworks are the wrong thing to optimise for

Framework knowledge is valuable but perishable, and it is precisely the kind of knowledge agents have in abundance. They have read every tutorial. What they lack is context about your system and the accountability to make the call. Fundamentals are the opposite: durable, transferable, and the basis of good judgment.

A practical rule of thumb:

1. Use frameworks and agents to move quickly on the parts that are well understood.
2. Spend your learning time on the layer underneath them.
3. When an agent produces something you cannot explain, stop and learn it before merging.

## How to keep your fundamentals sharp

- Re-implement a basic structure now and then (a stack, a queue, a linked list) without help.
- Read the complexity of the code you accept, especially anything inside a loop.
- Learn to read a query plan.
- Keep a short list of the "smells" you have learned to look for, and use it in [code review](/blog/reviewing-ai-generated-code-checklist/).

I am building a [Fundamentals series](/blog/topic/fundamentals/) for exactly this reason: JavaScript implementations of the core structures, with notes on complexity and pitfalls.

## Frequently asked questions

**Do I still need to learn data structures if AI writes the code?**
Yes. You need them to evaluate what the AI produces: to notice an O(n²) loop, a wrong structure for the access pattern, or a subtle bug. Fundamentals are the verification layer.

**What fundamentals matter most?**
Data structures and complexity, how databases and indexes work, concurrency basics, networking and HTTP, and security basics. Start with whichever your daily work touches most.

**Should I avoid frameworks?**
No. Use them. Just do not mistake framework fluency for engineering skill: the skill is knowing what is happening underneath.

## Takeaways

- AI moved the bottleneck from writing code to judging it.
- Judging code is a fundamentals skill: complexity, data structures, databases, concurrency.
- Learn the layer under the framework; it outlasts every tool.

*Next: [What AI Coding Agents Change About Software Engineering](/blog/what-ai-coding-agents-change-about-software-engineering/).*
