---
title: 'Data Structure: Circular Queue in JavaScript'
description: 'A queue data structure that follows the FIFO (First-In-First-Out) principle. It is similar to a regular queue, but the last element is connected to the first element to form a circle.'
pubDate: 'Jan 3 2026'
tags: 'js-data-structure'
---

## Overview

The size of the queue is fixed and a single block of memory is used as if the first element is connected to the last element to form a circle.

Also referes to the circular buffer or ring buffer and follows the FIFO (First-In-First-Out) principle.

A circular queue reuses the empty block created during the dequeue implementation.

When working with queue of fixed maximum size, a circular queue is a great implementation choice.

The circular Queue data structure supports two main operations.

- Enqueue: Adds an element to the end of the queue.
- Dequeue: Removes the element from the front of the queue.

Circular Queue usage:
- Clock 
- Streaming data
- Traffic Lights


### Circular Queue Implementaiton
- enqueue(element) - add an element to the queue
- dequeue() - remove an element from the queue
- isFull() - check if the queue is full
- isEmpty() - check if the queue is empty
- peek() - get the value of the element at the front of the queue without removing it
- size() - get the number of elements in the queue
- print() - print the elements in the queue


```js
class CircularQueue {
  constructor(capacity) {
    this.items = new Array(capacity)
    this.capacity = capacity
    this.currentLength = 0
    this.rear = -1
    this.front = -1
  }

  isFull() {
    return this.currentLength === this.capacity
  }

  isEmpty() {
    return this.currentLength === 0
  }

  enqueue(element) {
    if (!this.isFull()) {
      this.rear = (this.rear+1) % this.capacity
      this.items[this.rear] = element
      this.currentLength += 1

      if (this.front === -1) {
        this.front = this.rear
      }
    }
  }

  dequeue() {
    if (this.isEmpty()) {
        return null
    }

    const item = this.items[this.front]
    this.items[this.front] = null
    this.front = (this.front+1) % this.capacity
    this.currentLength -= 1
    if (this.isEmpty()) {
      this.front = -1
      this.rear = -1
    }
    return item
  }


  peek() {
    if (!this.isEmpty()) {
      return this.items[this.front]
    }

    return null
  }

  print() {
    if (this.isEmpty()) {
      console.log('Queue is empty')
    } else {
      let i
      let str = ''
      for (i = this.front; i !== this.rear; i = (i+1) % this.capacity) {
        str += this.items[i] + ' '
      }
      str += this.items[i]
      console.log(str)
    }
  }
}
```

This is the implementation for the circular queue data structure in JavaScript. Let's check if it workks correctly.

```js
const circularQueue = new CircularQueue(5)
console.log(circularQueue.isEmpty()) // true

circularQueue.enqueue(10)
circularQueue.enqueue(20)
circularQueue.enqueue(30)
console.log(circularQueue.size()) // 3
circularQueue.print() // 10,20,30

circularQueue.enqueue(40)
circularQueue.enqueue(50)
console.log(circularQueue.size()) // 5
circularQueue.print() // 10,20,30,40,50

console.log(circularQueue.isFull()) // true
```


