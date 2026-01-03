---
title: 'Data Structure: Set in JavaScript'
description: 'Unique values collection, operations, iteration, conversions, set algebra, performance, and pitfalls.'
pubDate: 'Jan 3 2026'
tags: 'js-data-structure'
---

## Overview

Set stores unique values of any type (primitives or object references) and preserves insertion order. It is ideal for deduplication and set operations like union, intersection, and difference.

```js
const s = new Set([1, 2, 2, 3]);
console.log(s.size); // 3
```

## Creating Sets

```js
const empty = new Set();
const fromArray = new Set([1, 2, 3]);
const fromMixed = new Set([1, '1', { a: 1 }]); // all distinct
```

## Core Operations

```js
const s = new Set();
s.add(1);           // add value
s.add(2);
s.has(1);           // true
s.delete(2);        // remove value
// s.clear();       // remove all
```

Note: object equality is by reference; two identical objects are different entries.

```js
const a = { x: 1 }, b = { x: 1 };
const s = new Set([a, b]);
console.log(s.size); // 2
```

## Iteration

```js
const s = new Set(['a', 'b']);
for (const v of s) console.log(v);

// or
s.forEach((v) => console.log(v));
```

## Conversions

Array ↔ Set:

```js
const arr = [1, 2, 2, 3];
const s = new Set(arr);
const backToArray = [...s]; // [1, 2, 3]
```

Dedupe with Set:

```js
const unique = (xs) => [...new Set(xs)];
unique([1, 1, 2, 3, 2]); // [1,2,3]
```

## Set Algebra Helpers

```js
const union = (A, B) => new Set([...A, ...B]);

const intersection = (A, B) => {
  const out = new Set();
  for (const v of A) if (B.has(v)) out.add(v);
  return out;
};

const difference = (A, B) => {
  const out = new Set();
  for (const v of A) if (!B.has(v)) out.add(v);
  return out;
};

const isSubset = (A, B) => {
  for (const v of A) if (!B.has(v)) return false;
  return true;
};
```

Examples:

```js
const A = new Set([1, 2, 3]);
const B = new Set([2, 3, 4]);

[...union(A, B)];        // [1,2,3,4]
[...intersection(A, B)]; // [2,3]
[...difference(A, B)];   // [1]
isSubset(new Set([2,3]), A); // true
```

## Performance (Typical)

| Operation   | Complexity |
| ----------- | ---------- |
| add/delete  | O(1)       |
| has         | O(1)       |
| size        | O(1)       |
| iterate     | O(n)       |

## Pitfalls

- Equality is by reference for objects; identical shape ≠ same entry
- No index access like arrays; use iteration
- Converting large sets repeatedly can be costly; cache results if needed

