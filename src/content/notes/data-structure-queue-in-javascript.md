---
title: 'Data Structure: Queue in JavaScript'
description: 'FIFO structure, operations, array/class implementations, performance, and pitfalls.'
pubDate: 'Jan 4 2026'
tags: 'js-data-structure'
---

## Overview

Queue is a First‑In‑First‑Out (FIFO) structure. The earliest item enqueued is the first to be dequeued.

Typical uses: job scheduling, breadth‑first search, message buffers.

## Minimal Queue with Arrays

```js
const queue = [];
queue.push('A');  // enqueue
queue.push('B');
console.log(queue[0]); // peek/front → 'A'
console.log(queue.shift()); // dequeue → 'A'
console.log(queue.shift()); // dequeue → 'B'
console.log(queue.length === 0); // isEmpty → true
```

Result:
```
'A'
'A'
'B'
true
```

Note: `shift()` is O(n) because it reindexes elements. For efficient queues, use index‑based storage.

## Class Implementation (Index‑based)

```js
class Queue {
  constructor() {
    this._items = [];
    this._head = 0;
    this._tail = 0;
  }
  enqueue(v) {
    this._items[this._tail++] = v;
  }
  dequeue() {
    if (this.isEmpty()) return undefined;
    const v = this._items[this._head];
    this._items[this._head] = undefined;
    this._head++;
    // compact occasionally to prevent growth
    if (this._head > 1000 && this._head * 2 > this._tail) {
      this._items = this._items.slice(this._head, this._tail);
      this._tail = this._tail - this._head;
      this._head = 0;
    }
    return v;
  }
  front() {
    return this.isEmpty() ? undefined : this._items[this._head];
  }
  size() {
    return this._tail - this._head;
  }
  isEmpty() {
    return this.size() === 0;
  }
  clear() {
    this._items = [];
    this._head = 0;
    this._tail = 0;
  }
}

const q = new Queue();
q.enqueue(1);
q.enqueue(2);
console.log(q.front());
console.log(q.dequeue());
console.log(q.size());
```

Result:
```
1
1
1
```

## Two‑Stack Queue (Alternative)

```js
class TwoStackQueue {
  constructor() {
    this._in = [];
    this._out = [];
  }
  enqueue(v) { this._in.push(v); }
  _rebalance() {
    if (this._out.length === 0) {
      while (this._in.length) this._out.push(this._in.pop());
    }
  }
  dequeue() {
    this._rebalance();
    return this._out.pop();
  }
  front() {
    this._rebalance();
    return this._out[this._out.length - 1];
  }
  size() { return this._in.length + this._out.length; }
  isEmpty() { return this.size() === 0; }
  clear() { this._in = []; this._out = []; }
}
```

Amortized O(1) enqueue/dequeue by rebalancing when needed.

## Common Operations

- enqueue(value) → add to back
- dequeue() → remove from front
- front() → view front without removing
- size() → number of items
- isEmpty() → boolean
- clear() → empty the queue

## Big‑O Complexity

| Implementation     | enqueue | dequeue | front | iterate |
| ------------------ | ------- | ------- | ----- | ------- |
| Array + shift      | O(1)    | O(n)    | O(1)  | O(n)    |
| Index‑based array  | O(1)    | O(1)    | O(1)  | O(n)    |
| Two‑stack queue    | O(1)*   | O(1)*   | O(1)* | O(n)    |

*Amortized average.

## Notes & Pitfalls

- Avoid `shift()` in hot paths; prefer index‑based or two‑stack queue
- Compact or rotate storage periodically to bound memory usage
- For high‑throughput queues, consider typed arrays or linked lists depending on constraints

