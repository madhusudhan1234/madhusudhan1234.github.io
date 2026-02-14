---
title: 'Data Structure: Map in JavaScript'
description: 'Key-value store with arbitrary keys, operations, iteration, conversions, performance, and pitfalls.'
pubDate: 'Jan 3 2026'
tags: 'js-data-structure'
---

## Overview

A Map is a collection of key-value pairs that preserves insertion order. Both keys and values can of any data type.

To retrieve a value, you can use the corssponding key.

Maps are iterables, They can be use of for...of loop.

Object Vs Map
- Objects are unordered whereas maps are ordered.
- Keys in object are strings or symbols, while keys in map can be of any data type.
- An object has a prototype and may contain a few default keys which may collide with your keys if you're not careful. A map on the other hand does not contain any keys by default.
- Objects are not iterables where map are iterables.
- The number of items in an object must be determined manually where it is readily available whith the size property in map.
- Apart from storing data, you can attach functionality to an object whereas maps are restricted to storing data.


code example:

```
const map = new Map([
  ['a', 1],
  ['b', 2]
])
```

Here a and b are keys and 1 and 2 are values respectively. We can iterate using for of loop like this:

```
for (const [key, value] of map) {
  console.log(`${key}: ${value}`)
}
```

If we run the code we can see the values in console like this:

```
a: 1
b: 2
```

To add a key value in a map we use set method.

```
map.set('c', 3)
```

This is the method not a set datastructure. Please do not get confused.

If we run the code we see the three value. 

To check if a key exists in a map we use has method.

```
console.log(map.has('a')) // true
```
If you want to delete a key value pair from a map we use delete method.

```
map.delete('a')
```

If we run the code we see the two value like this.

```
a: 1
b: 2
```

If you want to get the size of the map just use the size property.

```
console.log(map.size) // 2
```

To clear the map we use clear method.

```
console.log(map.clear())
```

And ther there is no any key value pair in the console.


## Big‑O Complexity

| Operation             | Complexity |
| --------------------- | ---------- |
| set / get / has       | O(1)       |
| delete / clear        | O(1)       |
| iterate (entries)     | O(n)       |


