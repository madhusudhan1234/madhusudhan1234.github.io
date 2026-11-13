---
title: 'Data Structure: Objects in JavaScript'
description: 'Core concepts, property access, methods, prototypes, cloning, merging, and common pitfalls when working with objects.'
pubDate: 'Jan 2 2026'
updatedDate: 'Nov 14 2026'
category: 'fundamentals'
series: 'Data Structures in JavaScript'
seriesOrder: 2
tags: 'javascript, data-structures, fundamentals'
---

## Overview

Objects are unordered key‑value stores. Keys are strings or symbols; values can be any type.

Objects are not iterable by default; use helpers to enumerate properties.

```
const obj = {
  name: 'Biswas',
  age: 30,
}

console.log(obj);
```

Result:
```
{ name: 'Biswas', age: 30 }
```

## Property Access

```
console.log(obj.name);
console.log(obj['age']);
```

Result:
```
Biswas
30
```

Add or update properties:
```
obj.gender = 'Male';
```

Result:
```
{ name: 'Biswas', age: 30, gender: 'Male' }
```

Remove properties:

```
delete obj.gender;
```

Result:
```
{ name: 'Biswas', age: 30 }
```

## Methods and `this`

```
const obj = {
  name: 'Biswas',
  age: 30,
  sayName: function() {
    console.log(this.name);
  }
}
```

Call the method:

```
obj.sayName();
```

Result:
```
Biswas
```

## Enumerating Properties

- `Object.keys(obj)` → own enumerable keys
- `Object.values(obj)` → own enumerable values
- `Object.entries(obj)` → pairs `[key, value]`


Examples:

```
console.log(Object.keys(obj));
```

Result:
```
[ 'name', 'age' ]
```

```
console.log(Object.values(obj));
```

Result:
```
[ 'Biswas', 30 ]
```

```
console.log(Object.entries(obj));
```

Result:
```
[ [ 'name', 'Biswas' ], [ 'age', 30 ] ]
```

## Optional Chaining & Defaults

```js
const city = obj?.address?.city ?? 'Unknown';
```

## Immutability Helpers

```js
const frozen = Object.freeze({ a: 1 });       // shallow freeze
const sealed = Object.seal({ a: 1 });         // can modify, not add/remove
```

## Cloning & Merging

Shallow clone:

```js
const original = { a: 1, nested: { b: 2 } };
const clone1 = { ...original };
const clone2 = Object.assign({}, original);
```

Deep clone:

```js
const deep = structuredClone(original);
```

Merge:

```js
const defaults = { retries: 3, verbose: false };
const env = { verbose: true };
const cfg = { ...defaults, ...env };
```

## Big‑O Reference (Typical)

| Operation             | Complexity |
| --------------------- | ---------- |
| Insert/Remove key     | O(1)       |
| Access by key         | O(1)       |
| Search by value       | O(n)       |
| keys/values/entries   | O(n)       |

## Pitfalls

- Shallow clones share nested references
- `for...in` includes inherited keys; prefer `Object.keys` + `Object.hasOwn`
- `Object.freeze` is shallow; deep freeze requires recursion

## Why this still matters when AI writes your code

Generated code loves plain objects as dictionaries, which is where subtle bugs hide:

- Keys like `__proto__` or `constructor` can collide with built-in properties when user input becomes a key. Use a [Map](/blog/fundamentals/data-structure-map-in-javascript/) or `Object.create(null)` for arbitrary keys.
- Spread (`{ ...obj }`) and `Object.assign` copy only one level. Nested objects are still shared, so edits leak between copies. Use `structuredClone` when you need a deep copy.
- A JSON round trip silently drops `undefined`, functions and converts `Date` to a string.

When reviewing, ask: where did these keys come from, and who else holds a reference to this object?

*This is part of the [Data Structures in JavaScript](/blog/topic/fundamentals/) series. For the bigger picture, read [Fundamentals Over Frameworks](/blog/fundamentals-over-frameworks-in-the-age-of-ai/).*
