---
id: 31
title: "Weekly #42-2025: Code That Proves, Agents That Think, Systems That Last"
description: "In this week’s edition, we are presenting a collection of insights on how developers are pushing the boundaries of reliability and intelligence in software. From writing provable code in Lean to evaluating AI agents and building durable distributed systems, each topic highlights practical ways to make technology smarter, safer, and more efficient."
published: false
tags: aiagents, softwarereliability, techlearning, codingbestpractices
publishDate: "2025-10-18"
duration: 6:22
audioLink: https://audio.lifeandmessage.com/embed/31
---

---

### **Coding with Lean: A Fresh Take for JavaScript Developers**

What if you could write code and prove its correctness in the same language? Lean makes that possible — a functional programming language that blends practical coding with formal proofs.
Lean’s syntax uses assignment with :=, supports both explicit and inferred types, and takes a unique approach to function calls — no parentheses or commas needed. Developers can run code, declare functions, and even write theorems to prove properties about their programs, all in one environment.
The most surprising feature is Lean’s ability to embed proofs alongside regular code, verifying logic for all possible inputs during typechecking. This opens new possibilities for building reliable software, especially in fields where correctness truly matters.
For JavaScript developers curious about functional programming and formal methods, Lean offers a hands-on way to explore advanced concepts — without leaving behind practical coding.

[Link](https://overreacted.io/lean-for-javascript-developers/)

---

### **Agent Evaluation: Manual Testing Isn’t Enough**

How do you know if your AI agent is actually solving user problems? The key is to move beyond manual testing and adopt systematic evaluations. Starting with simple end-to-end tests that define clear success criteria, teams can quickly identify edge cases, refine prompts, and compare model performance.
One useful approach is “N – 1” evals, which simulate prior interactions to reproduce and fix specific errors more efficiently and at lower cost.
A surprising but powerful tip: embedding checkpoints — specific phrases the model must output — can make it much easier to validate complex conversation flows. While external tools can simplify setup, it’s crucial to build custom, data-driven evaluations.
For developers building agents, the takeaway is clear: don’t rely solely on generic metrics or third-party tools. Tailored evals and regular trace reviews are the real key to improving reliability and user experience.

[Link](https://aunhumano.com/index.php/2025/09/03/on-evaluating-agents)

---

### **Durable Queues: The Missing Piece in Distributed Systems Solved after 15 years**

Ever wonder why some votes or comments just disappear on big platforms? Early distributed systems — like the ones powering Reddit — often relied on in-memory task queues that were fast but fragile. When a queue crashed or a worker failed mid-task, data could vanish without a trace.
The modern solution is durable queues — systems that record every task and workflow step in a persistent store like Postgres. This ensures that even if a worker goes down, the system can recover without losing progress.
But durability isn’t just about reliability — it also brings built-in observability. Developers can track the status of any workflow or queue with a simple SQL query, gaining a clear view of what’s happening under the hood.
The tradeoff? Using a database as a message broker offers greater safety but lower throughput, making durable queues ideal for business-critical processes rather than high-volume, lightweight jobs.
As the tech industry shifts toward more robust and transparent infrastructure, durable queues are becoming a key building block — helping teams prevent data loss, debug complex workflows, and strike the right balance between performance and reliability.

[Link](https://www.dbos.dev/blog/durable-queues)

---

### **AI Agents for Beginners: Your On-Ramp to Building Intelligent Agents**

Microsoft’s “AI Agents for Beginners” GitHub course offers a practical, lesson-based path to build your own AI-powered agents from scratch.
You’ll learn core concepts like tool use, planning, memory, and deployment, all through Python with Microsoft’s Azure AI Agent Service and Semantic Kernel.
The course supports multiple languages, includes code samples and videos, and even welcomes community contributions.
Whether you’re a student or developer, it’s a great way to explore agent design, trustworthy AI, and context engineering — and start building real intelligent systems today.

[Link](https://github.com/microsoft/ai-agents-for-beginners)

---

### **Unlocking AI Coding: The Real Techniques Behind Productivity Gains**

Are developers truly getting the most out of AI coding tools like Claude Code, Cursor, and Codex? Many aren’t — and the difference between flashy demos and real productivity often lies in overlooked techniques.
By using strategies like persistent memory files, test-driven regeneration, and parallel AI sessions, developers can push far beyond basic prompting. Those who define clear specs, use multiple agents, and treat AI as a digital intern report far more reliable and transformative results.
The key insight: simple, well-structured code and clear instructions make AI work better. Offload tedious tasks, integrate automated testing, and share best practices. Teams that master advanced workflows, context management, and feedback loops unlock the true potential of AI coding tools — far beyond what the marketing promises.

[Link](https://github.com/inmve/coding-with-ai)

---
