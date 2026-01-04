---
id: 42
title: "LLM Workflows, Code Bottlenecks & AI Adoption in 2026"
description: "In this episode, learn AI coding best practices from Google's Addy Osmani, discover how to become a more effective engineer beyond technical skills, explore Cloudflare's 2025 internet trends with AI bots and post-quantum encryption, understand why AI-driven coding creates new bottlenecks in testing and deployment, and get practical lessons from Imprint's 18-month internal AI adoption journey. Essential insights for engineering leaders navigating AI transformation in 2026."
published: false
tags: aiengineering, llmcoding, engineeringleadership, devops
publishDate: "2026-01-03"
duration: 7:43
audioLink: https://audio.lifeandmessage.com/embed/42
---

---

### **My LLM coding workflow going into 2026 **

AI coding assistants transformed development in 2025, but using them effectively requires structure and discipline. Google engineer Addy Osmani shares his proven workflow going into 2026.
The key insight? Treat AI as a powerful pair programmer, not autonomous magic. Start with detailed specs before writing any code. Break work into small, testable chunks. Provide extensive context about your codebase and constraints. And critically—always review and test everything the AI generates.
At Anthropic, 90% of Claude Code is now written by Claude Code itself, but engineers maintain strict oversight. 
The pattern is clear: AI amplifies your engineering skills when you stay in control.
Bottom line is to plan carefully, iterate in small steps, test thoroughly, and commit often. AI coding tools are incredible force multipliers, but the human engineer remains the director of the show.

[Link](https://addyo.substack.com/p/my-llm-coding-workflow-going-into)

---

### **How to become a more effective engineer**

Software engineers often complain about dysfunction but don't understand how their organizations actually work. Guest author Cindy Sridharan argues that career advancement requires mastering "soft skills" - which are actually hard skills.
Key tactics are learn your org's implicit hierarchies and who holds real influence. Understand if your culture is top-down, bottom-up, or both. Get comfortable with messy codebases and organizations instead of demanding perfection. Chase small wins to build credibility early.
The biggest mistake? Engineers staying frustrated without learning how decisions get made, what gets rewarded, and who to influence. Most tech companies are far messier inside than they appear - there's no "right way," only understanding tradeoffs and navigating reality.
Bottom line would be technical excellence alone won't make you effective. Understanding organizational dynamics is non-negotiable for impact.

[Link](https://newsletter.pragmaticengineer.com/p/how-to-become-a-more-effective-engineer)

---

### **The 2025 Cloudflare Radar Year in Review**

The internet in 2025 didn’t just grow — it got faster, stranger, and deeply AI-driven.
Global traffic increased 19%, but bots now consume a meaningful share of the web. AI crawlers made up 4.2% of all HTML requests, while googlebot alone accounted for 4.5%, briefly spiking to 11% in late April. “User-action” crawling — bots loading pages because an AI was asked a question — surged more than 15×, led by chatgpt-user acting as a super-user on behalf of millions.
Crypto infrastructure quietly crossed a milestone. For the first time, most human web traffic became post-quantum ready, with 52% protected by quantum-resilient TLS, up from 29% earlier this year — driven largely by Apple enabling hybrid quantum-secure key exchange by default in iOS 26.
Security remained rough. About 6% of traffic across Cloudflare’s network was mitigated as potentially malicious, hyper-volumetric DDoS attacks hit new records, and over 5% of scanned email was malicious, dominated by phishing and identity impersonation.
In the AI platform race, Meta’s llama-3-8b-instruct became the most-used model on Cloudflare Workers AI, while plain text generation remained the dominant use case at the edge.

[Link](https://blog.cloudflare.com/radar-2025-year-in-review/)

---

### **AI-driven coding is making code cheap; winners will fix bottlenecks in review, testing, and release to ship value faster.**

Paul Dix argues 2026 will mark a split between teams that modernize their delivery pipelines for AI-generated code and those that stall. Coding speed has surged thanks to agentic tools, but throughput is now constrained by requirements clarity, reviews, validation, deployment safety, and operations.
Using Amdahl’s Law, he notes speeding coding alone yields modest end-to-end gains if it’s a small slice of the workflow. To capture 10x improvements, organizations must raise ceilings across review bandwidth and ownership, testing and validation, release/rollback confidence, security and compliance gates, and product decision latency.
He expects most new code to be AI-generated, with humans directing intent and verifying outcomes. Startups without heavy process gates already show tighter loops when they optimize the entire pipeline. He recommends making pipelines agent-accessible: fast, deterministic tests; one-command dev environments; crisp module boundaries; colocated docs; golden datasets and performance harnesses; and agent-accessible observability across CI, performance, deployment, and production.
The takeaway: optimize non-code chokepoints and tooling so agents can work end-to-end; that’s where the productivity divergence will come from.

[Link](https://x.com/pauldix/status/2006423514446749965)

---

### **Facilitating AI Adoption at Imprint: Practical Playbook, Not Hype**

Will Larson, engineering leader at Imprint, shares hard-won lessons from 18 months of internal AI adoption. His key insight? Real adoption isn't about picking tools—it's about deep partnership and removing obstacles.
Imprint's approach centers on three pillars: pave the path by removing barriers to access, recognize that opportunity exists everywhere across all teams, and have senior leadership lead from the front with hands-on work.
The biggest surprise? Successful agent deployment requires old-fashioned product engineering, not just platform building. Work closely with domain experts on high-impact workflows, make solutions extensible, and monitor adoption as your signal for problem-solution fit.
Critical detail: centralizing prompts in a shared database made them discoverable, improvable, and reusable across teams. And yes, mundane IT issues like account provisioning and access controls still make or break adoption.
Bottom line: We're early in AI adoption—focus on rate of learning over everything else.

[Link](https://lethain.com/company-ai-adoption/)

---
