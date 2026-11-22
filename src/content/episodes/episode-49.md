---
id: 49
title: "Microsoft's Outage Post-Mortem, Backdoored Coding Agents, AI Code Review, PHP 8.6"
description: "Microsoft's final outage report shows how a bug its tests missed was spread around the world by its own failover and recovery systems. Microsoft researchers also show how a handful of poisoned training examples can turn a coding agent against you, and Rootly asks whether human code review still works now that agents write most of the code. Plus GitHub's new evals for AI setups and the release of PHP 8.6."
published: true
tags: technews, aiagents, devops, php
publishDate: "2026-11-23"
duration: 8:28
audioLink: https://weekly.madhusudhansubedi.com.np/embed/49
---

---

### **Microsoft's final Outlook outage report details testing gaps and safeguards that backfired**

Last week we talked about the Outlook outage. This week Microsoft published its final report, and it reads like a lesson in how safety systems can turn against you.

The bug came from a July update to the gateway servers that handle Microsoft 365 connections. Load tests ran on older machines with fewer cores, so they never saw it; only the newer, high-core servers were affected. Then the safeguards made it worse. Automatic failover pushed Teams traffic onto the gateway that Exchange shares, traffic management moved load from failing servers onto healthy ones, and recovering servers were overwhelmed the moment they came back. Within about two hours every region was affected.

The report lists 20 repair items, seven done and 13 still to come, including smaller failure zones, separate capacity pools and load tests on the newest hardware.

For us, two questions are worth asking: does our test environment look like production hardware, and could our retries and failover spread a failure instead of containing it?

[Link](https://www.geekwire.com/2026/microsofts-final-outlook-outage-report-details-testing-gaps-and-safeguards-that-backfired/)

---

### **Trained to betray: How post-training supply chain attacks hijack coding agents**

Microsoft's security researchers just showed how a coding agent can be turned against you before you ever install it.

The attack lives in the post-training supply chain: the fine-tuning datasets and third-party model checkpoints teams pull in to customise their agents. In one experiment, the team slipped 90 crafted examples into roughly 9,000 terminal-agent conversations, about 1% of the data. After fine-tuning, the model ran unsafe commands in around 78% of trials on the harnesses it was trained on. With full control over training, backdoored Qwen models reached 84 to 95% success even on repositories they had never seen.

For us as engineers, the lesson is that a model is now a dependency, just like an npm package. Microsoft's advice reads like classic supply-chain hygiene: pin datasets by hash, treat outside checkpoints as untrusted, give agents the smallest tool permissions they need, and log every tool call.

If your team fine-tunes or downloads models for its agents, this is the week to ask who checks what goes into them.

[Link](https://www.microsoft.com/en-us/security/blog/2026/11/12/trained-to-betray-how-post-training-supply-chain-attacks-hijack-coding-agents/)

---

### **When should AI be allowed to approve a pull request?**

Agents now write most of the code at Rootly, so their CTO asked a hard question: is human code review still doing its job?

He looked at 3,661 pull requests merged between August and early November. The main repo merged 356 PRs in October last year and 2,053 this October, while the number of approvers grew by just two. Over 90% of PRs were approved without a single review comment, and in 43% the last approval was on an older commit than the one that was merged.

His proposal is careful. An AI reviewer could approve only low-risk changes with a top score on the latest commit, and never anything touching migrations, auth, permissions, billing, deploy config or dependencies. The agent that wrote a PR can't approve it, and a new push cancels the approval. Even then, he says the data justifies testing the rule in shadow mode, not switching it on.

It's an honest look at a question many teams avoid: is our review a real check, or just a rubber stamp?

[Link](https://rootly.com/blog/when-should-ai-be-allowed-to-approve-a-pull-request)

---

### **GitHub Copilot Evals is now in public preview**

How do you know a change to your AI setup made it better? Until now, most of us tried a few prompts and went with our gut. GitHub's answer, released on November 17, is Copilot Evals, now in public preview.

An eval is a repeatable test for AI behaviour. You can create one for a skill, a custom agent or an MCP tool, either by asking Copilot or with the `/eval` command. It checks the final result and the path the agent took to get there. Because AI output changes from run to run, you rerun the same eval after each change and compare before and after. It works in VS Code, the Copilot CLI and the Copilot app.

This is the discipline we already apply to code: no change without a test. If your team keeps a library of prompts, instructions or agent skills, they deserve regression tests too.

It's early, but expect evals to become as normal in agent projects as unit tests are today.

[Link](https://github.blog/changelog/2026-11-17-github-copilot-evals-is-now-in-public-preview/)

---

### **PHP 8.6 Released: Partial Function Application, Duration and a New Polling API**

PHP 8.6 shipped on November 19, and it's a release with something for almost every PHP developer.

The headline feature is partial function application: put a question-mark placeholder in a call and you get back a closure with the other arguments already filled in. There's a new `Time\Duration` class with nanosecond precision, a `clamp()` function, a `SortDirection` enum that libraries can share, and readonly properties can finally have default values. For async work, a new `Io\Poll` API watches many streams using epoll or kqueue and removes the old 1,024-connection limit of `stream_select()`.

Before upgrading, read the deprecations. Sessions get safer defaults, with strict mode, HttpOnly cookies and SameSite=Lax switched on, and many functions now throw a `ValueError` instead of quietly coercing bad input.

For Laravel teams the practical step is simple: run your test suite on 8.6 in CI now, and let the deprecation warnings tell you what to fix.

[Link](https://www.php.net/releases/8.6/en.php)

---
