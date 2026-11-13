---
title: 'Data Structure: Stack in JavaScript'
description: 'LIFO structure, operations, implementations, performance, and pitfalls using arrays and classes.'
pubDate: 'Jan 4 2026'
updatedDate: 'Nov 14 2026'
category: 'fundamentals'
series: 'Data Structures in JavaScript'
seriesOrder: 5
tags: 'javascript, data-structures, fundamentals'
---

## Overview

The stack data structure is a sequential collection of elements that follows the principle of last in first out (LIFO).

The last element inserted into the stack is the first element to be removed.

A stack of plates, The last plate placed on top of the stack is also the first plate removed from the stack.

Stack is an abstract data type. It is defined by it's behavior rather than being a mathematical model.

The stack data structure supports two main operations:

- Push: Add an element to the top of the stack.
- Pop: Remove the element from the top of the stack.


Stack Usage:

- Browser history tracking
- undo operations while typing
- Expression conversation
- Call Stack in Javascript runtime

```
class Stack {
  constructor() {
    this.items = [];
  }

  // Add element to top of stack
  push(element) {
    this.items.push(element);
  }

  // Remove and return top element
  pop() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.pop();
  }

  // View top element without removing
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.items.length - 1];
  }

  // Check if stack is empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Get stack size
  size() {
    return this.items.length;
  }

  // Clear all elements
  clear() {
    this.items = [];
  }

  // Print stack contents
  print() {
    console.log(this.items.toString());
  }
}

// Example usage
const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);
console.log(stack.peek()); // 30
console.log(stack.pop());  // 30
console.log(stack.size()); // 2
```


## Big‑O Complexity

| Operation | Complexity |
| --------- | ---------- |
| push      | O(1)       |
| pop       | O(1)       |
| peek      | O(1)       |
| size      | O(1)       |
| iterate   | O(n)       |

## Why this still matters when AI writes your code

Stacks hide in plain sight: the call stack itself is one. That has a practical consequence for generated code: **deep recursion can overflow the stack** on large input, and agents often write recursive solutions because they read cleanly.

If the input depth is not bounded (nested structures, linked data, long chains), convert the recursion to an explicit stack:

```javascript
function walk(root) {
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    // ...process node
    for (const child of node.children ?? []) stack.push(child);
  }
}
```

Stacks are also the answer to undo history, bracket matching and depth-first traversal.

*This is part of the [Data Structures in JavaScript](/blog/topic/fundamentals/) series. For the bigger picture, read [Fundamentals Over Frameworks](/blog/fundamentals-over-frameworks-in-the-age-of-ai/).*
