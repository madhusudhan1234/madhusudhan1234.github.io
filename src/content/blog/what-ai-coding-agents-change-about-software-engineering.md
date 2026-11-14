---
title: 'What AI Coding Agents Change About Software Engineering'
description: 'AI coding agents make writing code cheap. Here is what that changes about the job, what stays the same, and where engineers should invest.'
pubDate: 'Nov 14 2026'
category: 'ai-engineering'
tags: 'ai-agents, software-engineering, career, ai-assisted'
draft: true
---

> Note: This article was drafted with AI assistance and has not yet been reviewed by the author. (Update this note once reviewed.)

**TL;DR:** AI coding agents have made the first draft of code cheap. They have not made correct, secure, maintainable software cheap. The job is moving from typing code toward specifying, reviewing, verifying and operating it, and the skills that matter most are the ones that were always the hard part.

## What an AI coding agent actually is

An AI coding agent is more than autocomplete. It reads your repository, plans a change, edits several files, runs commands such as tests and linters, looks at the output and iterates. You describe an outcome; it produces a diff.

That is a real shift. Autocomplete saved keystrokes inside a line you were already writing. An agent can attempt a whole task. The consequences for how we work come from that difference.

## What changes

### 1. The cost of a first draft collapses

Boilerplate, CRUD endpoints, test scaffolding, migrations, config files and glue code used to take hours. An agent can produce a plausible version in minutes. When something becomes cheap, you do more of it, and the bottleneck moves elsewhere.

### 2. Reviewing becomes a bigger share of the job

If drafts are cheap and plentiful, the scarce resource is the attention needed to decide whether a draft is good. You will read more code than you write. That makes **code review a core skill**, not a gate at the end of a pull request. I cover a practical approach in [Reviewing AI-Generated Code: A Practical Checklist](/blog/reviewing-ai-generated-code-checklist/).

### 3. Specs and tests become the real interface

An agent is only as good as what you tell it, and you only know it finished if something checks the result. Clear requirements and executable tests are how you hand off work and verify it. See [Specs and Tests as the Interface for AI Agents](/blog/specs-and-tests-as-the-interface-for-ai-agents/).

### 4. Breadth gets cheaper

An engineer who is strong in backend can now make a reasonable attempt at a frontend change, a Terraform file or a shell script. That does not make specialists obsolete, but it does make it easier to be useful outside your home turf, as long as you can judge the output.

## What does not change

### Someone owns the outcome

Whoever merges the change is accountable for it: for the bug that reaches production, the security hole, the surprise bill. "The AI wrote it" is not an incident report. Ownership stays human.

### Fundamentals decide whether you can judge the output

To notice that a generated loop is quadratic, that a cache key is wrong, or that a query will lock a table, you need the underlying knowledge. This is why I think fundamentals matter *more* in this era. I make that case in [Fundamentals Over Frameworks in the Age of AI](/blog/fundamentals-over-frameworks-in-the-age-of-ai/).

### The hard parts were never typing

Understanding the real problem, choosing trade-offs, designing for failure, keeping a system operable over years, and communicating with people: none of that got automated. If anything, producing more code faster makes it easier to build the wrong thing at speed.

## How to think about delegating to an agent

A useful mental model is a fast, tireless, confident junior engineer who has read a lot but has never seen your production system. That framing suggests a sensible split:

| Good to delegate | Keep for yourself |
| --- | --- |
| Well-bounded features behind a clear interface | Architecture and data-model decisions |
| Refactors that existing tests can verify | Security-sensitive logic and auth |
| Writing tests for existing behaviour | Deciding what "done" means |
| Migrations and mechanical changes with a checklist | Anything you can't review competently |
| Explaining unfamiliar code | Production incident response |

## Failure modes to watch for

- **Plausible but wrong.** The code compiles, the tests it wrote pass, and the behaviour is subtly off. Agents are good at making things look finished.
- **Hallucinated APIs and packages.** A function that does not exist, a flag that was removed two versions ago, or a dependency name that does not match a real package.
- **Scope creep.** A small request becomes a sweeping rewrite. Keep diffs small and focused.
- **Silent security problems.** Missing authorization checks, string-built SQL, secrets in logs.
- **Skill atrophy.** If you never write code by hand, your ability to judge it quietly degrades.

## Where to invest as an engineer

1. **Fundamentals:** data structures, complexity, databases, networking, concurrency.
2. **Review discipline:** a repeatable way of reading a diff you did not write.
3. **Specification and testing:** turning a fuzzy request into acceptance criteria and checks.
4. **Systems thinking and operations:** observability, failure modes, cost.
5. **Communication:** the clearer your intent, the better both humans and agents perform.

## A note on the backend

If you build backends (I mostly work with Laravel, PHP and Node.js), two things stand out. First, agents are very effective at the repetitive parts of web applications, which frees time for design and reliability. Second, you will increasingly be asked to *add* AI features to your systems, which brings its own engineering concerns. I wrote down the ones I think matter in [A Backend Engineer's Guide to Adding LLM Features Safely](/blog/adding-llm-features-to-a-backend-safely/).

## Frequently asked questions

**Will AI coding agents replace software engineers?**
They are automating a growing share of code production, but engineering is more than code: requirements, design, trade-offs, review, security and operations. The role is shifting toward specifying and verifying work rather than disappearing.

**Do I need to learn a specific tool?**
Tools change quickly, so learn the underlying skills first: fundamentals, review, testing and specification. Pick up tools as needed.

**Is it safe to merge code an agent wrote?**
It is as safe as your review and your tests make it. Treat it like a pull request from a fast junior, and keep a human accountable for every change.

## Takeaways

- Code is cheap now; correctness, security and maintainability are not.
- Your leverage moves to specifying, reviewing, verifying and operating.
- Fundamentals are how you judge what the agent gives you.
- Own what you ship, whoever or whatever wrote it.

*Related: the [Tech Weekly podcast](/weekly/) covers this shift week by week, and the [AI era page](/ai/) summarises my working model.*
