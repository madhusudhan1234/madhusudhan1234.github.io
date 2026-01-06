---
title: 'Data Structure: Linked List in JavaScript'
description: 'Linked List is a linear data structure that consists of a sequence of nodes, where each node contains a value and a reference (or pointer) to the next node in the sequence.'
pubDate: 'Jan 6 2026'
tags: 'js-data-structure'
---

## Overview

A Linked list is a linear data structure that includes a series of connected nodes. Each node contains a value and a reference (or pointer) to the next node in the sequence.

The list elements can be easily inserted or removed without reallocation or reorganization of the entire structure.

Random access of elements is not feasible and accessing an element has linear time complexity.

The linked list data structure supports three main operations 
- Insertion - to add an element at the beginning, end or at a given index in the list
- Deletion - to remove an item given its index or value
- Search - to find an element given its value


Linked List Usage

- All applications of both stacks and queues are applications of linked list.
- Image Viewer
- Music Player
- Video Player


```
class Node {
    constructor(value) {
        this.value = value
        this.next = null
    }
}

class LinkedList {
    constructor() {
        this.head = null
        this.size = 0
    }

    isEmpty() {
        return this.size === 0
    }

    getSize() {
        return this.size
    }

    prepend(value) {
        const node = new Node(value);
        if (this.isEmpty()) {
            this.head = node
        }
    }
}
```

```
const list = new LinkedList()
console.log(list.isEmpty()) // true
console.log(list.getSize()) // 0
```





