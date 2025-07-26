---
id: 19
title: "From Legacy Code to AI Myths & Edge Innovation"
description: "This episode explores the real forces behind tech progress: why infrastructure changes shape killer apps, how tiny tools like s3mini power edge computing, and why the “AI will take all jobs” narrative isn’t what it seems. Plus, lessons learned from taming ancient mainframe code and how platform engineering is helping teams build better software, faster. Discover what’s hype, what’s history, and what’s shaping the next chapter of technology!"
published: false
tags: Tech, NewsAIEdge, ComputingSoftware, Development
publishDate: "2025-07-27"
duration: 6:59
audioLink: https://soundcloud.com/madhu-sudhan-subedi/madhu-sudhan-subedi-tech-weekly-nineteen-episode
---


---

### **Tiny but Mighty: The Lightweight S3 Client Taking on the Edge**

Let’s talk about s3mini—a super lightweight tool that helps developers store files in the cloud, fast. At just 14KB, s3mini is written in TypeScript and works on Node.js, Bun, and Cloudflare Workers, but not in your browser. Why use it? It’s designed for edge computing, where speed and small size matter most.
s3mini supports all the essential storage actions: list, upload, download, delete, and even handle big files with multipart uploads. It skips the extra features most people don’t need, making it simpler and faster—about 15% quicker on basic tasks than bigger libraries. There are no extra dependencies; you just install and go.
It’s also flexible—tested with popular cloud storage like Cloudflare R2, Backblaze B2, DigitalOcean Spaces, and MinIO. Just bring your own S3-compatible bucket, set up your storage keys, and you’re ready.
As we push more apps to the edge for better speed and privacy, tools like s3mini let developers build nimble, responsive products without getting bogged down by bulky code. Sometimes, less really is more in tech!

[Link](https://github.com/good-lly/s3mini)

---

### **“AI will replace all the jobs!” Tech Execs' Marketing Ploy Exposed**

You’ve probably heard the hype: “AI will replace 50% of jobs!” But if you look closer, there’s no real evidence for it. In fact, when Rand Fishkin at SparkToro searched for proof that AI has wiped out huge numbers of jobs, he found the opposite—throughout history, new technologies like tractors or computers changed the job market, but they also created more work overall, just in new areas.
Instead, a lot of the noise around “AI taking jobs” comes from tech executives trying to drive excitement (and investment). The biggest disruptions to jobs lately? Not AI, but things like COVID, changes in hiring, and the economy—not robots replacing workers overnight.
Yes, AI can make some tasks faster and help people be more productive. But so far, there’s no sign it will result in mass unemployment anytime soon. If anything, it creates different jobs—just like every major invention before it.
So next time you hear that “AI will take all the jobs,” remember: it’s more marketing slogan than reality.

[Link](https://sparktoro.com/blog/ai-will-replace-all-the-jobs-is-just-tech-execs-doing-marketing)

---

### **Mainframe Modernization: A Glimpse Into Legacy Code Surprises**

Ever tried updating ancient mainframe COBOL code? It’s a wild ride! Programmers from years ago had to get creative: they shared the same memory for variables in English and Spanish, and would even crash jobs on purpose—just by dividing zero by zero—to handle errors.
Parsing data back then meant picking apart strings by memory spots, not fancy code. Some even listed hundreds of constants by hand! And many commands we still use in UNIX, like dd for file copying, actually trace back to “data definition” in those mainframe days.
Digging into legacy code feels like opening a time capsule, showing how cleverly people solved big problems with what they had—lessons that still inspire modern coding today.

[Link](https://oppi.li/posts/tales_from_mainframe_modernization/)

---

### **Platform Engineering Consultants Help Execs Embrace the Future**

Modern software teams often get stuck between building products and wrangling complex infrastructure. ThoughtWorks is helping companies bridge this gap with a new approach called platform engineering. Instead of every team reinventing the wheel, ThoughtWorks creates “golden paths”—pre-built tools, templates, and clear processes that anyone can use to build, test, and release software quickly and securely.
Their platform includes things like automated code deployment, shared APIs, and easy access to documentation—all designed to cut down delays and confusion. These platforms even use dashboards and metrics so teams can spot issues fast, improve over time, and keep everyone moving in the same direction.
By making it easy to “do the right thing,” ThoughtWorks helps companies deliver better software, faster—and frees developers to focus on what matters: building products that customers love

[Link](https://thenewstack.io/how-thoughtworks-bridges-the-platform-engineering-gap/)

---
