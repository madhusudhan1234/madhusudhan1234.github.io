---
title: 'Data Structure: Stack in JavaScript'
description: 'LIFO structure, operations, implementations, performance, and pitfalls using arrays and classes.'
pubDate: 'Jan 4 2026'
tags: 'js-data-structure'
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


