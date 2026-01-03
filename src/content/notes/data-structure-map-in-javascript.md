---
title: 'Data Structure: Map in JavaScript'
description: 'Key-value store with arbitrary keys, operations, iteration, conversions, performance, and pitfalls.'
pubDate: 'Jan 3 2026'
tags: 'js-data-structure'
---

## Overview

Map is an ordered key‑value store where keys can be of any type (objects, functions, primitives). Unlike plain objects, Map preserves insertion order, has predictable iteration, and no prototype keys.

```js
const m = new Map([['a', 1], ['b', 2]]);
console.log(m.size);
```

Result:
```
2
```

## Creating Maps

```js
const empty = new Map();
const fromEntries = new Map([['x', 10], ['y', 20]]);
const objectKey = {};
const m = new Map([[objectKey, 'value']]); // object as key
```

## Reading & Iteration

```js
const m = new Map([['a', 1], ['b', 2]]);
console.log(m.get('a'));        // 1
console.log(m.has('b'));        // true
for (const [k, v] of m) console.log(k, v);  // entries
for (const k of m.keys()) console.log(k);   // keys
for (const v of m.values()) console.log(v); // values
```

## Add, Update & Remove

```js
const m = new Map();
m.set('a', 1);
m.set('a', 2);      // update
m.set('b', 3);
m.delete('b');      // remove
m.clear();          // remove all
```

## Common Methods

- `set(key, value)` add/update
- `get(key)` read value
- `has(key)` check presence
- `delete(key)` remove
- `clear()` remove all
- `size` number of entries
- `keys()` / `values()` / `entries()` iterators

## Conversions

Array ↔ Map:

```js
const entries = [['a', 1], ['b', 2]];
const m = new Map(entries);
const back = Array.from(m);             // [['a',1],['b',2]]
```

Object ↔ Map:

```js
const obj = { a: 1, b: 2 };
const m = new Map(Object.entries(obj)); // to Map
const backObj = Object.fromEntries(m);  // to Object
```

## Map vs Object

- Keys: Map supports any type; Object keys are strings/symbols
- Size: `map.size` is constant time; Object size requires `Object.keys(obj).length`
- Iteration: Map is ordered and easily iterated; Object needs `Object.entries`
- No prototype collisions: Map has no inherited keys

## WeakMap (Overview)

WeakMap holds object keys weakly—if the object is garbage collected, the entry disappears. It cannot be iterated and is useful for private metadata.

```js
const wm = new WeakMap();
const obj = {};
wm.set(obj, 'meta');
wm.get(obj); // 'meta'
```

## Big‑O Complexity

| Operation             | Complexity |
| --------------------- | ---------- |
| set / get / has       | O(1)       |
| delete / clear        | O(1)       |
| iterate (entries)     | O(n)       |

## Notes & Pitfalls

- Using objects as keys binds identity by reference, not shape
- Map retains insertion order; frequent re‑insertion may be needed to reprioritize
- WeakMap keys must be objects; primitives are not allowed

