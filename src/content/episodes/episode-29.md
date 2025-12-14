---
id: 29
title: "Rethinking How We Build, Secure, and Simplify Software"
description: "This week, Japan’s Asahi cyberattack showed how vulnerable factories are when OT and IT security fail to align. AI is reshaping startups, yet we’re still early in the AI-native era. Platform engineering is simplifying DevOps with self-service tools, while true AI breakthroughs advance quietly behind the scenes. And in JavaScript, bloated edge-case libraries remind us that simplicity is still the smartest optimization."
published: false
tags: techtrends, cybersecurity, airevolution, devopssimplified
publishDate: "2025-10-06"
duration: 7:11
audioLink: https://weekly.madhusudhansubedi.com.np/embed/29
---

---

### **Asahi Cyber Attack: A Warning for Manufacturing OT Security | Manufacturing Digital**

Because of the cyberattack on Asahi Group, production stopped and shipments were disrupted across Japan, making it clear that attacks on operational technology can shut down factories even when there is no confirmed data leak. Asahi has halted domestic orders, shipping, and call centers while investigations continue, but no restoration timeline has been made public, showing how quickly supply chains are affected when OT and IT go down. Attacks are now focusing more on infrastructure and business continuity than on stealing data, so manufacturers need to adopt zero‑trust, segment OT and IT, monitor continuously, and tightly secure legacy systems and third‑party connections.

[Link](https://manufacturingdigital.com/news/how-asahis-breach-signals-rising-ot-security-risks)

---

### **AI is changing the way startups are built, but how?**

@andrewchen shared a fascinating idea called The Home Screen Test — take a look at your phone’s home screen.
How many apps there are truly AI-native? Probably close to zero, right?
That’s the signal — we’re still at the very beginning of the AI era.
Most of today’s apps are built the old way, not reimagined with AI from the ground up.
But this gap means opportunity — the next wave of billion-dollar startups will be AI-native products we don’t even use yet.
Andrew also raises big questions:
Will AI make startups smaller but more powerful?
If AI can copy products instantly, how will companies stay defensible?
And as talent spreads worldwide, will the next Silicon Valley be everywhere?
The message: AI won’t just change the products we build — it’ll change how we build companies themselves.
The next few years in startupland are going to be wild. 🚀

[Link](https://andrewchen.substack.com/p/ai-will-change-how-we-build-startups)

---

### **What is Platform Engineering?**

Is platform engineering finally solving the complexity that DevOps could not? As organizations move from virtual machines to containers and cloud-native architectures, developers face an overwhelming number of tools and responsibilities. Platform engineering steps in by creating internal platforms—often built on Kubernetes—that give developers self-service access to infrastructure, deployment, and compliance tools, letting them focus on building software instead of wrestling with pipelines.
Analysts predict a surge in platform engineering teams, with most large software organizations expected to adopt this model by 2026. The approach promises reusable services, resilience, and compliance as built-in features. However, it requires a cultural shift and new skills, especially as legacy systems coexist with cloud-native stacks. The next evolution may come from integrating AI copilots, turning platforms into intelligent partners that help developers troubleshoot, design, and deploy with less friction. For tech teams, the key takeaway is that platform engineering is less about new tools and more about rethinking how software is delivered and supported at scale.

[Link](https://www.computerweekly.com/feature/An-introduction-to-platform-engineering)

---

### **AI Progress: Why the Fast Lane Slows Down**

Why does AI feel both revolutionary and slow at the same time? Tyler Cowen’s article explains that AI’s rapid progress is mostly in the “easy” projects—like answering routine questions or handling well-specified tasks. These improvements are now so good that further gains are marginal, even if productivity rises as AI gets integrated into new services. But for deeper, more complex challenges—think biosciences or advanced math—progress is steady but will take years to reach everyday life.
The catch is that visible AI leaps quickly become ordinary, leaving users impatient for the next big thing. Meanwhile, the real breakthroughs are happening behind the scenes, in areas that require long-term investment and patience. Complaints about AI “failing” often miss this split: progress is happening, but it’s either so good it’s taken for granted, or so slow it’s easy to overlook.
For developers and tech leaders, this means the future of AI is a two-speed world. Expect fast, widespread improvements in simple tasks, but prepare for a long haul when it comes to transforming complex industries or solving hard scientific problems.

[Link](https://marginalrevolution.com/marginalrevolution/2025/09/how-to-think-about-ai-progress.html)

---

### **Are Edge-Case Libraries Making JavaScript Projects Needlessly Heavy?**

Have you ever wondered why modern JavaScript projects feel bloated — even for simple tasks?
It’s because our ecosystem is filled with edge-case-first libraries — tiny packages made to handle scenarios that almost never happen.
Example: instead of just checking typeof n === 'number', we import is-number with millions of downloads every week!
Or is-arrayish, when Array.isArray() would do just fine.
This “what-if” mindset led to overly-granular dependencies — sometimes just a few lines of code that could’ve been written inline.
The fix?
✅ Build libraries for the common use case, not the rare ones.
✅ Validate data where it belongs — at the app level.
✅ Review your dependency tree and remove unnecessary packages.
Less code. Fewer dependencies. Faster apps.
Let’s stop over-engineering edge cases — and start simplifying. ⚡

[Link](https://43081j.com/2025/09/bloat-of-edge-case-libraries)

---
