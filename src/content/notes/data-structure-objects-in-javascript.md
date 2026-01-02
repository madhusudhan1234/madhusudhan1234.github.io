---
title: 'Data Structure: Objects in JavaScript'
description: 'Core concepts, property access, methods, prototypes, cloning, merging, and common pitfalls when working with objects.'
pubDate: 'Jan 2 2026'
---

## Overview

Objects are key‑value stores used to model structured data. Keys are strings or symbols; values can be any type (including functions).

```js
const person = { name: 'Ada', age: 36 };
console.log(person.name); // 'Ada'
console.log(person['age']); // 36
```

## Creating Objects

```js
const empty = {};
const fromLiteral = { a: 1, b: 2 };
const dynamic = { ['key_' + 1]: 42 };
const withSymbol = { [Symbol('id')]: 10 };
const viaConstructor = new Object({ x: 1 });
```

Prefer object literals; use computed properties for dynamic keys.

## Reading and Writing Properties

```js
const o = { a: 1 };
o.a = 2;            // write
o['b'] = 3;         // write dynamic
const hasA = 'a' in o;       // true
const hasOwnA = Object.hasOwn(o, 'a'); // true (ES2022)
```

Avoid accessing missing properties without checks; default with nullish coalescing.

```js
const port = (config && config.port) ?? 3000;
```

## Methods and `this`

```js
const counter = {
  value: 0,
  inc() { this.value += 1; },
};
counter.inc();
console.log(counter.value); // 1
```

Arrow functions do not bind `this`; use method shorthand for instance behavior.

## Enumerating Properties

```js
const user = { id: 1, name: 'Ada', role: 'admin' };
Object.keys(user);   // ['id','name','role']
Object.values(user); // [1,'Ada','admin']
Object.entries(user);// [['id',1],['name','Ada'],['role','admin']]

for (const [k, v] of Object.entries(user)) {
  console.log(k, v);
}
```

`for...in` iterates enumerable keys, including inherited ones; prefer `Object.keys` with `hasOwn`.

## Prototypes and Inheritance

```js
const base = { greet() { return 'hi'; } };
const obj = Object.create(base);
obj.name = 'Ada';
obj.greet(); // 'hi'
```

Use `Object.create` for prototype chains or classes for structured OOP.

## Property Descriptors

```js
const o = {};
Object.defineProperty(o, 'id', {
  value: 1,
  writable: false,
  enumerable: true,
  configurable: false,
});
```

Useful for read‑only fields or hiding implementation details.

## Freezing and Sealing

```js
const cfg = { host: 'localhost', port: 3000 };
Object.freeze(cfg); // fully immutable (shallow)
Object.isFrozen(cfg); // true
```

`Object.freeze` is shallow; nested objects remain mutable.

## Cloning Objects

Shallow clone:

```js
const original = { a: 1, nested: { b: 2 } };
const clone1 = { ...original };
const clone2 = Object.assign({}, original);
```

Deep clone (safe for structured data):

```js
const deep = structuredClone(original);
```

`JSON.parse(JSON.stringify(obj))` drops functions, `undefined`, `Date`, and loses prototypes—use with care.

## Merging Objects

```js
const defaults = { retries: 3, verbose: false };
const env = { verbose: true };
const cfg = { ...defaults, ...env }; // { retries: 3, verbose: true }
```

Order matters; later spreads overwrite earlier keys.

## Pattern: Safe Optional Access

```js
const city = user?.address?.city ?? 'Unknown';
```

Optional chaining avoids errors when intermediate properties are undefined.

## Performance Tips

- Avoid creating new objects in tight loops unless necessary
- Prefer plain objects for key‑value maps; use `Map` when keys are not strings or when frequently adding/removing
- Cache computed results to reduce repeated work

## Common Pitfalls

- Mutating shared objects causes hidden side effects; prefer immutable updates
- Using `for...in` without `hasOwn` can include prototype keys
- Shallow copies do not protect nested structures

## Cheatsheet

```js
// pick selected keys
const pick = (obj, keys) =>
  keys.reduce((acc, k) => (Object.hasOwn(obj, k) ? (acc[k] = obj[k], acc) : acc), {});

// omit selected keys
const omit = (obj, keys) =>
  Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)));

// deep freeze (naive)
const deepFreeze = (obj) => {
  Object.getOwnPropertyNames(obj).forEach((name) => {
    const value = obj[name];
    if (value && typeof value === 'object') deepFreeze(value);
  });
  return Object.freeze(obj);
};
```

