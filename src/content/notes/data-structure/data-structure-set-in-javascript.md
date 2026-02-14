---
title: 'Data Structure: Set in JavaScript'
description: 'Unique values collection, operations, iteration, conversions, set algebra, performance, and pitfalls.'
pubDate: 'Jan 3 2026'
tags: 'js-data-structure'
---

## Overview

Sets store unique values of any type and are ideal for deduplication and membership checks.

Sets can contain mixed types (numbers, strings, objects).

Sets are dynamic—no fixed size needed.

Sets preserve insertion order when iterating.

Sets are iterable and work with `for...of` and `forEach`.

Set vs Array
- Arrays allow duplicates; Sets do not.
- Arrays use index access; Sets use membership checks and iteration.
- Typical membership tests and deletes in Sets are O(1).


## Creating Sets

```js
const set = new Set([1, 2, 3]);
const mixed = new Set([1, '1', { a: 1 }]);
for (const item of set) console.log(item);
```

Result:
```
1
2
3
```

## Add & Remove

```js
set.add(4);
set.add(4);
```

Result:
```
1
2
3
4
```

Check membership:

```
console.log(set.has(4));
```

Result:
```
true
```

Remove values:

```
set.delete(4);
```

Result:

```
1
2
3
```

Size:

```
console.log(set.size);
```

Result:
```
3
```

Clear:

```
set.clear();
```

Result:
```
console.log(set.size);
0
```

## Conversions

Array ↔ Set:

```js
const arr = [1, 2, 2, 3];
const s = new Set(arr);
const back = [...s];
```

Result:
```
[1, 2, 3]
```

Deduplicate arrays:

```js
const unique = xs => [...new Set(xs)];
unique([1, 1, 2, 3, 2]);
```

Result:
```
[1, 2, 3]
```

## Set Algebra

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
[...union(A, B)];
[...intersection(A, B)];
[...difference(A, B)];
isSubset(new Set([2, 3]), A);
```

Result:
```
[1, 2, 3, 4]
[2, 3]
[1]
true
```

## Big‑O Complexity

| Operation           | Complexity |
| ------------------- | ---------- |
| has / add / delete  | O(1)       |
| clear / size        | O(1)       |
| iterate             | O(n)       |

## Notes & Pitfalls

- Object equality is by reference
- No index access—iterate or convert to array
- Cache conversions for large sets to avoid repeated cost
