---
title: 'Data Structure: Queue in JavaScript'
description: 'FIFO structure, operations, array/class implementations, performance, and pitfalls.'
pubDate: 'Jan 4 2026'
tags: 'js-data-structure'
---

## Overview

The Queue data structure is a sequential collection of elements that follows the principle of First In First Out (FIFO).

The first element inserted into the queue is the first element to be removed.

A queue of people. People enter the queue at one end (rear/tail) and leave the queue from the other end (front/head).

Queue is an abstract data structure. It is defined by behavior rather than being a mathematical model.

The queue data structure supports two main operations.

- Enqueue: Add an element to the end of the queue.
- Dequeue: Remove the element from the front of the queue.

Queue is useful when we have to do some operations in a particular order.

For e.g: 
- Printer to print multiple document
- CPU task scheduling
- Callback Queue in JavaScript


### Queue Implementation
- enqueue(element): add an element to the queue
- dequeue - remove the oldest element from queue
- peek - get the value of the element at the front of the queue without removing it.
- isEmpty - check is the queue is empty
- size - get the number of the element in a queue
- print - visualize the elements in the queue

```
class Queue {
  constructor() {
    this.items = []
  }

  enqueue(element) {
    this.items.push(element)
  }

  dequeue() {
    return this.items.shift()
  }

  peek() {
    if (this.isEmpty()) {
      return null
    }

    return this.items[0]
  }

  isEmpty() {
    return this.items.length === 0
  }

  size() {
    return this.items.length
  }

  print() {
    console.log(this.items.toString())
  }
}
```

Let's instantiate the Queue class.

```
const queue = new Queue()

console.log(queue.isEmpty()) // true
queue.enqueue(10)
queue.enqueue(20)
queue.enqueue(30)
console.log(queue.size()) // 3
queue.print() // 10,20,30


console.log(queue.dequeue()) // 10
console.log(queue.peek()) // 20
```

