---
id: 4
title: "An early look at PHP 9.0's, Javascript debug ids, A2A & more"
description: "From PHP 9.0's cleanup to Laravel's automatic relationship loading, major dev tools are evolving fast and A2A."
published: true
audioLink: https://soundcloud.com/madhu-sudhan-subedi/madhu-sudhan-subedi-tech-weekly-fourth-episode
publishDate: "2025-04-14"
duration: "09:06"
tags: php, laravel, a2a, javascript
---

---

### **An early look at PHP 9.0's new features and changes**

"Alright, let’s talk about PHP 9.0! It’s not out yet, but it’s shaping up to be a big cleanup release that focuses on making PHP more predictable, logical, and developer-friendly. Let me break it down for you. 

First up, **increment and decrement behavior** is getting a major overhaul. You know how weird things happen if you try something like **`'a9'++`**? In PHP 9.0, that kind of code will throw a **`TypeError`**, forcing you to write cleaner, more intentional code. Plus, values like **`true`**, **`false`**, **`null`**, or empty strings won’t silently get converted or incremented anymore. It’s all about removing those confusing edge cases.

Next, **error handling** is getting smarter. Right now, if **`unserialize()`** fails, you just get a warning—which is easy to miss. But PHP 9.0 will introduce a proper **`UnserializationFailedException`**, making it much easier to catch and debug issues.

Now let’s talk about **function signatures**. Some functions, like **`array_keys()`**, might be split into more specific versions to make their purpose clearer. It’s all about improving readability and maintainability for developers.

Another big change is with **array behavior**. PHP used to let you create arrays from things like **`false`**—for example, **`foreach(false as $x)`** wouldn’t crash. But in PHP 9.0, that won’t be allowed anymore. Less magic, more logic!

Now onto **string interpolation**, which is also getting simplified. Currently, PHP lets you insert variables into strings in several ways:

- Direct: **`"$foo"`**
- Braces outside: **`"{$foo}"`**
- Braces after dollar: **`"${foo}"`**
- Variable variables: **`"${expr}"`**

In PHP 9.0, options 1 and 2 will stick around because they’re straightforward and useful. But options 3 and 4 are being removed because they’re confusing and not very practical.

Finally, **variable handling** is getting stricter too. Right now, using an undefined variable just throws a warning—but PHP 9.0 will make it a fatal error. No more "it worked but not really" situations!

So what’s the takeaway here? PHP 9.0 is all about cleaning up the language—getting rid of quirks and legacy behavior while encouraging developers to write modern, clean code. It’s not adding flashy new features; instead, it’s tightening things up for a smoother experience.

What do you think? Are you excited for these changes or do you think they’re overdue? Let me know!" PHP is still alive!! 

[Link](https://benjamincrozat.com/php-90?ref=dailydev)

---

### Why JavaScript needs Debug IDs?
**“Let’s talk about JavaScript**—a language we all *love*... but let’s be honest, sometimes it drives us *nuts.*

Imagine this: you’re tracking down a *pesky* bug, digging through your code—only to realize... the code running on your site?

Yeah—it’s *not* what you wrote.

It’s been **minified**, **transformed**, **polyfilled**—basically, it’s a mangled mess.

Frustrating, right?

Well... that’s where **Debug IDs** come in to save the day!

Introduced by the folks at Sentry, Debug IDs are like secret keys—connecting your transformed code back to the original source maps.

It’s like giving superpowers to your error tracking tools. *Magical,* even.

But here’s the twist—Sentry isn’t just stopping there.

They’re actually pushing to make Debug IDs a standard in JavaScript.

Yup—official updates to source map specs, new browser APIs, the whole deal.

And the best part? You can start using them *right now.*

They’ve already released tools, plugins, and polyfills to get you rolling.

So yeah—this is a **game-changer** for debugging in JavaScript.

And honestly… who *wouldn’t* want an easier way to squash those elusive bugs?”**

[Link](https://blog.sentry.io/javascript-needs-debug-ids/)

---

### Cyberattacks by AI agents are coming 
Who’s the new player in cybersecurity? It’s AI agents. These advanced tools are taking cyberattacks to the next level, executing complex operations like ransomware at a scale traditional bots can’t match.

To fight back, projects like the **LLM Agent Honeypot** are simulating vulnerable servers to study these agents. The results? AI attackers are smarter, faster, and better at evading detection than ever before. Experts warn that as AI evolves, autonomous cyberattacks could become the norm.

The message is clear: we need stronger defenses now, or AI agents could dominate the cyber battlefield.

[Link] (https://www.technologyreview.com/2025/04/04/1114228/cyberattacks-by-ai-agents-are-coming?utm_source=tldrai)

---
### **The Big Feature: Automatic Relationship**

**Goodbye to writing extra code just to load relationships in Laravel!**

Laravel 12.8 introduces a game-changing feature: **Automatic Eager Loading**—currently in **beta** to collect community feedback. As Taylor Otwell mentioned, the behavior and functionality of this feature **may still change**, even in patch releases.

#### 🚀 What’s New?

With the new `automaticallyEagerLoadRelationships()` method, Laravel will **automatically eager load** relationships “just in time” as you access them—no need for manual `with()` or `load()` calls.

This could eliminate the vast majority of accidental **N+1 query issues** in the Laravel ecosystem.

#### 🧠 How It Works

Just **opt in**, retrieve your models, and start working through relationships. Laravel takes care of the rest.

Think of it like a chain:

- You have an `order`,
- That order has a `client`,
- The client has an `owner`,
- And the owner works at a `company`.

You can access `$order->client->owner->company`—and Laravel loads it all automatically without extra setup.

**Pretty cool, right?**

#### 🛠️ Other Handy Updates in This Release:

- **`fromJson()` for Collections**
    
    Quickly turn a JSON string into a Laravel collection—perfect for API responses.
    
- **Soft Delete Improvements**
    
    Enhanced support for mass pruning and cleanup operations.
    
- **Performance Tweaks**
    
    Updates to schema grammars and query handling for improved reliability.
    
This release helps reduce boilerplate and boost performance. Just keep an eye on memory usage if you're working with large datasets.

**Happy coding with Laravel 12.8! 🎉**

[Link](https://x.com/taylorotwell/status/1909979254898458928)

---

### Announcing the Agent2Agent Protocol (A2A)

This week, Google’s dropped a bombshell called A2A i.e. Agent-to-Agent communication. Imagine AI agents from different platforms chatting like teammates. One writes code, another reviews it, and a third deploys it. As a software engineer what would you do? You’re just sipping coffee, wondering if your job is naming these bots lets say, you name some agents Agent Puncoz and Agent Bijaya!

Agent to Agent is an open-source protocol, so devs from everywhere can jump in. Big players like Salesforce, PayPal, and MongoDB—over 50 of them—are already on board. What is the dream? AI agents working across apps and systems, no friction, just smooth automation. Code repository is on GitHub if you wanna peek!

Do you think is this the future of collaborative AI? Let’s hope AI agents don’t start arguing over commits!

[Link](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/)

--