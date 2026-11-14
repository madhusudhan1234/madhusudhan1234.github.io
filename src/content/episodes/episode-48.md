---
id: 48
title: "Microsoft's Outlook Outage, a $6.3B Fake-Interview Hack, Claude Fable 5.2, Agent Identity"
description: "A latent network fault took Outlook down across 74 countries for more than a day, a reminder of how much of our work rests on one provider. Binance lost $6.3 billion after an engineer ran a fake interview assignment on his work laptop, Anthropic says Claude now writes over 90% of its own merged code, and the Linux Foundation wants DNS to prove which AI agent is which. Plus a practical Laravel fix for stale reads from lagging replicas."
published: true
tags: technews, cybersecurity, aiagents, laravel
publishDate: "2026-11-16"
duration: 8:42
audioLink: https://weekly.madhusudhansubedi.com.np/embed/48
---



---

### **Microsoft hit by global outages: What happened and why?**

If your inbox went silent on Thursday, you weren't alone. Microsoft Outlook went down globally on November 12, and it took more than a day to recover.
Problems started around 4pm GMT, and within an hour Downdetector had reports from 74 countries and territories. Outlook was hit hardest, with mailboxes failing to open on web, desktop and mobile, while Teams and Copilot were disrupted too. The impact reached governments and courts, including systems in Japan and Singapore, and even third-party services that depend on Microsoft. More than 12 hours in, Microsoft admitted only "marginal success" in restoring service.
Microsoft says it was not a cyberattack. It later traced the incident to a fault introduced during an earlier network capacity upgrade that surfaced after a newer network change, and promised a full post-incident report.
For us as engineers, it's a reminder of how much daily work now sits on a single provider. It's worth asking: if your email or chat vanished for a day, which of your processes, alerts or on-call workflows would stop with it?

[Link](https://www.aljazeera.com/news/2026/11/13/microsoft-hit-by-global-outages-what-happened-and-why)

---

### **Binance's $6.3B hack started with a fake coding interview**

The biggest crypto hack on record started with something many of us have done: a take-home coding test.
Binance lost $6.3 billion in October, and its preliminary investigation says a software engineer downloaded a malicious coding assignment onto his work laptop during a fake job interview in September. The malware slipped past endpoint security and became the first step in a multistage attack that harvested credentials and moved deeper into the network. What makes it sting: Binance's own security chief had described exactly this tactic in an interview back in July.
This matters because developers are now a prime target. We run unfamiliar code all day, from repos to scripts to packages, and a convincing recruiter plus a legit-looking assignment is the perfect lure.
The takeaways are simple: verify recruiters through official channels, never run an interview task on a work machine, and do take-home tests inside a throwaway VM or container. Job hunting and your employer's laptop should never meet.

[Link](https://cointelegraph.com/news/binance-cso-foreshadowed-6b-hack-tactic-months-before-attack)

---

### **Introducing Claude Fable 5.2 and Claude Mythos 5.2**

Anthropic released Claude Fable 5.2 and Claude Mythos 5.2 this week, and the most interesting part isn't a benchmark. It's how the company now builds software.
Both names are the same underlying model. Fable is available to everyone with extra cybersecurity and biology safeguards, while Mythos is limited to vetted security and life-sciences organisations. Pricing is $8 per million input tokens and $40 per million output tokens, and Anthropic says outputs are up to 30% faster than the 5.1 versions.
The headline for engineers: Anthropic says Claude now writes over 90% of the changes merged into its core codebase, with human guidance. That matches what we heard from OpenAI's Codex team earlier this year. The demos go further, with a swarm of 1,000 agents formalising Fermat's Last Theorem in 30 hours.
Whether or not you use Claude, the direction is clear: frontier teams are moving from writing code to directing and reviewing it. The skill to sharpen is judgement, not typing speed.

[Link](https://www.anthropic.com/claude-fable-and-mythos-5-2)

---

### **Linux Foundation Welcomes Agent Name Service to Bring Verifiable Identity and Discovery to AI Agents**

Every website can prove who it is with DNS and TLS certificates. AI agents can't, yet. The Linux Foundation wants to fix that with the Agent Name Service, which officially became a foundation project at KubeCon this week.
ANS is an open standard that reuses existing DNS infrastructure to name, register and verify AI agents. Its specification also covers versioning, public audit logs, monitoring for unauthorised changes to identity records, and agent-to-agent authentication. Eleven organisations have already contributed or adopted it, including Cisco, Cloudflare, DigiCert, GoDaddy, Salesforce and OWASP.
Why should we care? As agents start calling APIs, booking things and talking to other agents, "which agent is this, and who is responsible for it?" becomes a real security question. Building on DNS, which we already understand and operate, is a pragmatic choice compared with yet another proprietary registry.
It is early days, but if you are designing agent-to-agent integrations, identity is worth thinking about now rather than bolting on later.

[Link](https://www.linuxfoundation.org/press/linux-foundation-welcomes-agent-name-service-to-bring-verifiable-identity-and-discovery-to-ai-agents)

---

### **Laravel Read Replicas: Check if a Replica Has Caught Up**

If you run Laravel with read replicas, you have probably seen this bug: a user saves a form, gets redirected, and the page shows the old data.
That happens because the read went to a replica that had not caught up yet. Until now, the fix was a time window, like Laravel 13.38's PreventStaleDatabaseReads with a two-second default. But that is a guess: too short and users still see stale data, too long and you send reads to the primary for nothing.
Laravel 13.40 takes a smarter approach with commit IDs. After a write, DB::getLastCommitId() records the primary's replication position, and DB::hasCommitId() asks a replica whether it has reached it, optionally waiting a couple of seconds. Under the hood that is a GTID set on MySQL and MariaDB, or a WAL position on PostgreSQL.
It is a nice reminder for all of us: replication lag is a correctness problem, not just a performance one, and measuring beats guessing.

[Link](https://laravel-news.com/laravel-read-replica-commit-ids)

---
