---
id: 35
title: "Laravel Live Japan, Billion-Scale Architecture, AI-Ready Repos & Rethinking Software Progress"
description: "In this week’s edition of Madhu Sudhan Subedi Tech Weekly, we cover Laravel Live Japan 2026, highlighting talks from industry leaders like Taylor Otwell and tips for aspiring speakers. We dive into scaling databases from millions to billions of API requests using ClickHouse, Kafka, and Vector, and share strategies for optimizing codebases for both humans and AI agents. We also explore the new realities of AI-powered software teams, emphasizing robust testing, fast feedback, and rethinking workflows, and reflect on true software progress, showing why clarity, collaboration, and maintainable code matter more than chasing trends. Stay informed with insights on practical development, database optimization, AI collaboration, and building resilient software teams."
published: false
tags: laravellivejapan, databasescaling, aipowereddevelopment, softwaredevelopment
publishDate: "2025-11-17"
duration: 6:13
audioLink: https://audio.lifeandmessage.com/embed/35
---

---

### **Laravel Live Japan**

Laravel Live Japan 2026 is officially happening on May 26–27 at Tokyo’s Tachikawa Stage Garden, bringing together developers, designers, and tech enthusiasts from around the world for two days of inspiring talks, hands-on sessions, and amazing networking. This year, we’re excited to welcome some of the biggest names in the Laravel ecosystem, including Taylor Otwell, Nuno Maduro, and Jess Archer — the builders and innovators behind the tools we use every day. Whether you’re a beginner or an experienced developer, this event is your chance to learn, connect, and grow with the global community. And if you’ve ever dreamed of speaking at a major tech conference, now’s your moment — submissions are open, so send in your talk and you might be the next speaker on stage at Laravel Live Japan 2026.

[Link](https://laravellive.jp/en)

---

### **Scaling From Millions to Billions: using ClickHouse, Kafka and Vector**

How do you handle billions of API requests each month without crushing your database? Geocodio faced this challenge head-on when their MariaDB + TokuDB setup could no longer keep up—especially after TokuDB was deprecated and high-volume customers began hitting query timeouts. Their move to a modern stack powered by ClickHouse, Kafka, and Vector revealed a key insight: column-oriented databases like ClickHouse absolutely depend on batch inserts, not continuous tiny writes.
The migration wasn’t straightforward. Early attempts to adopt ClickHouse failed due to overload from too many small inserts, and buffer tables didn’t help. The real progress came after learning from other teams and redesigning ingestion around Kafka and Vector, batching data before sending it into ClickHouse in large, efficient chunks. The result? Massive performance improvements, simpler scaling, and smoother operations—especially after transitioning to ClickHouse Cloud.
For teams experiencing rapid data growth, the takeaway is simple: transactional databases aren’t meant for large-scale analytics, and real-time logging needs a new ingestion mindset. Embrace batching, use feature flags for safe rollouts, and learn from the community to turn scaling challenges into long-term stability.

[Link](https://www.geocod.io/code-and-coordinates/2025-10-02-from-millions-to-billions)

---

### **Optimizing Repos for AI Agents: Making Codebases Smarter for Humans and Machines**

How do you make a codebase easy for both humans and AI coding agents to work with? Start by structuring your repository to help agents iterate quickly, follow long-term instructions, and access documentation as efficiently as developers do. Strong static analysis and opinionated linters—even in dynamically typed languages—play a big role, since agents can self-correct and stay consistent. Use a justfile to standardize common commands, and keep key files like CODE_REVIEW.md and ROADMAP.md in a clean docs/ directory to avoid clutter and maintain shared understanding. As this space evolves, there’s no universal formula, but clear structure and clear documentation make collaboration between humans and AI faster, smoother, and more reliable.

[Link](https://tombedor.dev/optimizing-repos-for-ai)

---

### **Why AI-Powered Software Teams Need a Whole New Playbook**

A 10x jump in code output isn’t a win if it also multiplies bugs and coordination problems. With AI agents generating most of the code, teams see huge productivity gains—but also faster, more frequent failures and tougher collaboration. The answer is stronger fundamentals: robust testing, fast feedback loops, high-fidelity dependency fakes, and much quicker build and deploy pipelines. Real-time communication becomes critical, especially as speed increases. The core message: adding AI isn’t enough—your entire development process must evolve to handle the new pace.

[Link](https://blog.joemag.dev/)

---

### **Progress or Just Motion? Rethinking What Matters in Software**

Are all the new frameworks and tools really helping us, or just distracting us? The point is simple: the industry often mistakes activity for progress, piling on complexity when a clear and simple solution would work better. What truly improves software isn’t fancy abstractions—it’s collaboration, apprenticeship, and learning from each other. The best engineers aren’t the ones who write the cleverest code, but the ones who make things understandable, maintainable, and easy for the team. For developers and tech leaders, the message is to prioritize stability, clarity, and human connection instead of chasing every new trend. The practices that stand the test of time—type safety, good documentation, and shared conventions—are usually the boring ones, but they’re what make teams faster, stronger, and more effective in the long run.

[Link](https://yusufaytas.com/most-of-what-we-call-progress/)

---
