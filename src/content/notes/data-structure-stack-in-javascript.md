---
title: 'Data Structure: Stack in JavaScript'
description: 'LIFO structure, operations, implementations, performance, and pitfalls using arrays and classes.'
pubDate: 'Jan 4 2026'
tags: 'js-data-structure'
---

## Overview

Stack is a Last‑In‑First‑Out (LIFO) structure. The most recent item pushed is the first to be popped.

Typical uses: undo/redo, navigation history, parsing, recursion management.

## Minimal Stack with Arrays

```js
const stack = [];
stack.push(10);
stack.push(20);
console.log(stack[stack.length - 1]); // peek → 20
console.log(stack.pop());             // 20
console.log(stack.pop());             // 10
console.log(stack.length === 0);      // isEmpty → true
```

Result:
```
20
20
10
true
```

## Class Implementation

```js
class Stack {
  constructor() {
    this._items = [];
  }
  push(v) { this._items.push(v); }
  pop() { return this._items.pop(); }
  peek() { return this._items[this._items.length - 1]; }
  size() { return this._items.length; }
  isEmpty() { return this._items.length === 0; }
  clear() { this._items = []; }
}

const s = new Stack();
s.push('A');
s.push('B');
console.log(s.peek());
console.log(s.pop());
console.log(s.size());
```

Result:
```
B
B
1
```

## Common Operations

- push(value) → add to top
- pop() → remove from top
- peek() → view top without removing
- size() → number of items
- isEmpty() → boolean
- clear() → empty the stack

## Iteration

```js
const s = new Stack();
['a', 'b', 'c'].forEach(x => s.push(x));
for (let i = s.size() - 1; i >= 0; i--) {
  console.log(s._items[i]);
}
```

Result:
```
c
b
a
```

## Big‑O Complexity

| Operation | Complexity |
| --------- | ---------- |
| push      | O(1)       |
| pop       | O(1)       |
| peek      | O(1)       |
| size      | O(1)       |
| iterate   | O(n)       |

## Notes & Pitfalls

- Use `push`/`pop` (end of array) for O(1). Avoid `shift`/`unshift` (front), which are O(n) and model queue behavior.
- Don’t expose internal array for mutation in production; encapsulate with methods.
- For extremely large stacks of numbers, typed arrays can reduce memory overhead but lack dynamic resizing conveniences.

