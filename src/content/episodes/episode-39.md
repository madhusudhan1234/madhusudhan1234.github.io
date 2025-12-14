---
id: 39
title: "Anthropic's Bun Bet, the PM Drought & Seattle's AI Backlash"
description: "Anthropic acquires Bun JavaScript runtime while keeping it open source. AI companies hire 34% fewer Product Managers than other tech sectors. Seattle engineers push back against forced AI adoption. Plus: why some developers are choosing craft over career growth, and why test code deserves production-grade standards."
published: false
tags: bunruntime, productmanagement, aiadoption, softwareengineering
publishDate: "2025-12-14"
duration: 7:38
audioLink: https://weekly.madhusudhansubedi.com.np/embed/39
---

---

### **Bun JavaScript runtime acquired by Anthropic**

Anthropic has snapped up the Bun JavaScript runtime in a move that could reshape how AI writes and ships code, elevating Bun from fast new kid on the block to “essential infrastructure” behind tools like Claude Code’s native installer, all while staying open source and MIT-licensed with its turbocharged bundle of runtime, package manager, bundler, test runner, and single-file executable builds. Under the hood, Bun’s unconventional stack—JavaScriptCore instead of V8, and cutting-edge Zig for native code—gives it a distinctive technical edge and a bit of a rebel identity in the JS world. Creator Jarred Sumner, who helped raise about 26 million dollars for Bun while it brought in essentially zero revenue, now sees Anthropic as the long-term home that can fund aggressive development just as AI agents begin to write, test, and deploy more of our software. But the plot twist is the tension ahead: Zig’s inventor enforces a strict “no AI/LLM” contributor policy even as an AI company leans heavily on the language, and developers are split between excitement that Anthropic might supercharge Bun into the default JS/TS runtime for AI-era apps and anxiety that today’s free, community-driven project could slowly tilt toward paid features or a strategic pivot decided in boardrooms, not GitHub issues.

[Link](https://devclass.com/2025/12/03/bun-javascript-runtime-acquired-by-anthropic-tying-its-future-to-ai-coding/?ref=dailydev)

---

### **Where Do You Go If You Don’t Care About Growth?**

What if climbing the ladder isn’t the goal? A junior developer questions the default path of “grow, get promoted, repeat,” arguing that many roles offer little real upside for ICs (Individual Contributors) while reliably enriching management. The tension is clear: performance is judged by opaque criteria, “training” often means conformity, and even unglamorous roles demand 5+ years’ experience to fix legacy messes.
Is there room for software careers centered on stability and purpose over status? Small, non‑growth companies, personal projects, and open source as more meaningful tracks—work that’s maintainable, helps users, and doesn’t exist to maximize someone else’s return. The takeaway for teams and hiring managers: not everyone optimizes for speed and scale. There’s a rising cohort that values fair pay, sane scope, and autonomy over bonuses and titles. The question isn’t how to accelerate growth; it’s whether the industry can make space for engineers who choose craft and contribution over corporate ambition.

[Link](https://ramones.dev/posts/where-are-you-supposed-to-go/)

---

### **AI Companies Are Hiring Fewer PMs: 34% Lower Share of Open Roles**

Are product roles shrinking as LLMs reshape how teams build? Riso Group finds that AI companies list 34% fewer Product Manager titles as a share of openings compared to other sectors. PM roles account for 2.3% of AI postings vs 3.2–3.8% across DevTools, Consumer, Data, B2B, and Fintech, based on 8,803 deduplicated job titles scraped from 100 tech firms. The analysis is directional and excludes big tech, but the gap is clear.
The implication is that AI-first orgs may be shifting headcount toward model building, infra, and data roles while expecting existing teams to absorb more product responsibilities. PM scope could trend more technical and system-oriented, with fewer pure orchestration roles. Let’s see  how these percentages evolve as agentic workflows mature and “builder PM” expectations rise.

[Link](https://risogroup.co/insights/ai-companies-hiring-one-third-fewer-pms)

---

### **Everyone in Seattle Hates AI**

Why are many Seattle engineers hates AI right now? This essay points to a cultural shift inside big tech—especially Microsoft—where layoffs, forced adoption of underperforming Copilot tools, and “AI or nothing” org politics have bred resentment. Engineers were told projects failed because teams didn’t “embrace AI,” even while being required to use tools that often made work slower and worse. The result: top talent rebranded as “not AI,” stuck watching compensation stall and autonomy vanish.
The surprising twist is how this environment shapes beliefs. Engineers start to think AI is useless and they aren’t qualified to work on it anyway. That self-limiting loop hurts companies (innovation gets centralized and stifled), employees (careers stagnate), and local builders (anything labeled “AI” triggers scorn). Compare with San Francisco, where curiosity and permission to build still exist; the essay argues that belief in one’s agency is now a competitive advantage. The takeaway for leaders: stop using AI as a political shield, empower teams to ship and evaluate tools honestly, and rebuild trust before cynicism hardens into permanent resistance.

[Link](https://jonready.com/blog/posts/everyone-in-seattle-hates-ai.html)

---

### **Treat Test Code Like Production Code**

Is test code getting a pass it shouldn’t? Mark Seemann in his article argues that the same standards applied to production code—readability, DRY, refactoring, reviews—should apply to tests. Sloppy patterns like copy‑paste suites, commented‑out “zombie” code, arbitrary waits, and blocking async calls make maintenance harder and slow teams down. The point of good code isn’t the computer; it’s future humans who have to read and change it.
What’s the practical guidance? Use test‑specific best practices (think xUnit Test Patterns), write descriptive tests without sacrificing DRY, and avoid duplication that leads to “shotgun surgery” when behavior changes. There are narrow dispensations: test code can relax some security and platform rules when it never ships (e.g., hardcoded test credentials, skipping certain async context rules in .NET, allowing orphan instances in Haskell). The takeaway for teams: treat test code as a first‑class citizen—it’s part of the system’s maintainability, not a temporary scaffold.

[Link](https://blog.ploeh.dk/2025/12/01/treat-test-code-like-production-code/)

---
