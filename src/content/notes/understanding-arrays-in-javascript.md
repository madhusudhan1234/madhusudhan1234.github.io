---
title: 'Understanding Arrays in JavaScript'
description: 'Core concepts, common methods, patterns, performance, and pitfalls when working with arrays.'
pubDate: 'Jan 2 2026'
---

## Overview

Arrays are ordered, zero‑indexed lists that can hold values of any type. They are dynamic: length grows/shrinks as you add or remove elements.

```js
const a = [1, 'two', { three: 3 }];
console.log(a.length); // 3
console.log(a[0]);     // 1
```

## Creating Arrays

```js
const empty = [];
const fromValues = [1, 2, 3];
const withLength = Array(3);           // [ <3 empty items> ]
const fromArrayLike = Array.from('abc'); // ['a','b','c']
const filled = Array(5).fill(0);       // [0,0,0,0,0]
```

Prefer literals (`[]`) and `Array.from` over `new Array(n)` unless you need sparse arrays.

## Reading and Iteration

```js
const nums = [1, 2, 3];

for (const n of nums) console.log(n);     // values
nums.forEach((n, i) => console.log(i, n));

// map/filter/reduce are declarative and chainable:
const doubled = nums.map(n => n * 2);     // [2,4,6]
const evens = nums.filter(n => n % 2 === 0); // [2]
const sum = nums.reduce((acc, n) => acc + n, 0); // 6
```

## Mutating vs Non‑Mutating Methods

Mutating (changes the original array):

```js
const arr = [1, 2, 3];
arr.push(4);          // [1,2,3,4]
arr.pop();            // [1,2,3]
arr.shift();          // [2,3]
arr.unshift(0);       // [0,2,3]
arr.splice(1, 1, 9);  // [0,9,3]
arr.sort((a,b) => a-b);
arr.reverse();
```

Non‑Mutating (returns a new array):

```js
const arr = [1, 2, 3];
const plus4 = arr.concat(4);        // [1,2,3,4]
const slice = arr.slice(0, 2);      // [1,2]
const mapped = arr.map(x => x * 2); // [2,4,6]
const filtered = arr.filter(x => x > 1); // [2,3]
```

Prefer non‑mutating methods in functional code or React state.

## Copying Arrays

```js
const original = [1, 2, 3];
const copy1 = original.slice();          // shallow copy
const copy2 = [...original];             // spread
const copy3 = Array.from(original);
```

Note: all are shallow copies—nested objects are shared references.

## Searching

```js
const arr = [10, 20, 30, 20];
arr.includes(20);             // true
arr.indexOf(20);              // 1
arr.lastIndexOf(20);          // 3
arr.find(x => x > 15);        // 20
arr.findIndex(x => x > 15);   // 1
```

## Sorting

```js
const words = ['b', 'a', 'c'];
words.sort();                  // ['a','b','c'] (mutates)

const nums = [10, 2, 5];
nums.sort((a, b) => a - b);    // [2,5,10]
```

`sort` mutates and compares as strings by default; provide a comparator for numbers.

## Flattening and Combining

```js
const nested = [1, [2, [3]]];
nested.flat();           // [1,2,[3]]
nested.flat(2);          // [1,2,3]

const groups = [[1,2],[3,4]];
groups.flatMap(g => g.map(x => x * 2)); // [2,4,6,8]
```

## Performance Tips

- `push`/`pop` on the end are O(1); `shift`/`unshift` are O(n)
- Use `map`/`filter`/`reduce` for clarity; avoid creating many intermediate arrays in tight loops if performance is critical
- For very large lists, consider typed arrays (`Float32Array`, `Uint8Array`) for numeric data

## Common Pitfalls

- Sparse arrays: `Array(5)` creates holes; iteration may skip empty slots
- Comparing arrays: `[] === []` is false; compare contents or use `JSON.stringify` for quick checks (not for objects with functions/cycles)
- Mutating while iterating can cause bugs; prefer pure transforms

## Cheatsheet

```js
// clone
const clone = arr => [...arr];
// unique
const unique = arr => [...new Set(arr)];
// chunk
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
```

