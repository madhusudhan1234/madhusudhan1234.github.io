---
title: 'Data Structure: Arrays in JavaScript'
description: 'Core concepts, common methods, patterns, performance, and pitfalls when working with arrays.'
pubDate: 'Jan 2 2026'
updatedDate: 'Nov 14 2026'
category: 'fundamentals'
series: 'Data Structures in JavaScript'
seriesOrder: 1
tags: 'javascript, data-structures, fundamentals'
---

## Overview

Arrays are ordered, zero‑indexed lists that can hold values of any type. They are dynamic and preserve insertion order. Arrays are also iterable, making them easy to use with loops and iteration helpers.

```js
const arr = [1, 2, 3, 'four', { five: 5 }];
```

## Creating Arrays

```js
const empty = [];
const numbers = [1, 2, 3];
const mixed = [1, 'two', { three: 3 }];
const fromString = Array.from('abc');
const filled = Array(4).fill(0);
```

## Reading & Iteration

```js
const arr = [1, 2, 3];
for (const item of arr) console.log(item);
arr.forEach((item, i) => console.log(i, item));
```

## Add & Remove at Ends

```js
const arr = [1, 2, 3];
arr.push(4);
arr.unshift(0);
```

Result:

```
0
1
2
3
4
```

Remove from ends:

```js
arr.pop();
arr.shift();
for (const item of arr) console.log(item);
```

Result:

```
1
2
3
```

## Common Methods

- map: transform each item into a new array
- filter: keep items that match a condition
- reduce: accumulate values into a single result
- concat: combine arrays
- slice: copy a range (non‑mutating)
- splice: insert/remove inside the array (mutating)

Examples:

```js
const nums = [1, 2, 3, 4];
const doubled = nums.map(n => n * 2);
const evens = nums.filter(n => n % 2 === 0);
const sum = nums.reduce((a, n) => a + n, 0);
```

## Copying Arrays

```js
const original = [1, 2, 3];
const copy1 = original.slice();
const copy2 = [...original];
const copy3 = Array.from(original);
```

These are shallow copies. Nested objects remain shared.

## Sorting

```js
const words = ['b', 'a', 'c'];
words.sort();

const nums = [10, 2, 5];
nums.sort((a, b) => a - b);
```

`sort` mutates the array. Provide a comparator for numeric sorts.

## Big‑O Complexity

| Operation                            | Complexity |
| ------------------------------------ | ---------- |
| Insert/remove at end (push/pop)      | O(1)       |
| Insert/remove at start (shift/unshift)| O(n)       |
| Access by index                      | O(1)       |
| Search (includes/indexOf/find)       | O(n)       |
| concat / slice / splice              | O(n)       |
| forEach / map / filter / reduce      | O(n)       |

## Notes & Pitfalls

- Arrays are zero‑indexed
- `shift`/`unshift` reindex elements and are O(n)
- Prefer non‑mutating methods when working with immutable patterns or UI state

## Why this still matters when AI writes your code

Arrays are the default container in almost all generated JavaScript, so reviewing array code is a daily skill. Things worth catching:

- `includes` or `indexOf` inside a loop: each call scans the array, so the loop is O(n²). A [Set](/blog/fundamentals/data-structure-set-in-javascript/) or [Map](/blog/fundamentals/data-structure-map-in-javascript/) lookup is O(1) on average.
- `shift` and `unshift` on large arrays in hot paths: they re-index every element.
- Spreading or `concat`-ing the accumulator inside `reduce`: it copies the array on every iteration.
- Mutating methods such as `sort`, `splice` and `reverse` on arrays that are shared or came from props or state.

If a generated snippet does any of these, ask whether the input size makes it matter.

*This is part of the [Data Structures in JavaScript](/blog/topic/fundamentals/) series. For the bigger picture, read [Fundamentals Over Frameworks](/blog/fundamentals-over-frameworks-in-the-age-of-ai/).*
