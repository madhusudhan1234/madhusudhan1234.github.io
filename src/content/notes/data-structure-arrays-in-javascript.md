---
title: 'Data Structure: Arrays in JavaScript'
description: 'Core concepts, common methods, patterns, performance, and pitfalls when working with arrays.'
pubDate: 'Jan 2 2026'
tags: 'js-data-structure'
---

## Overview
- An array ia a data structure that can hold a collection of values. 
- Arrays can contain a mix of different data types, such as numbers, strings, objects, and even other arrays.
- Arrays are resizable You do not have to declare the size of an array before creating it.
- Javascript arrays are zero-indexed meaning the first element is at index 0, the second element is at index 1, and so on. and the insertion order is maintained.
- Arrays are iterables, They can be used in loops, such as `for` loops, `for...of` loops, and `forEach` method.


For e.g.:

```
const arr = [1,2,3,4,5,6,'Biswas'];
arr.push(7);

for (const item of arr) {
  console.log(item);
}
```

Which Results the following:
```
1
2
3
4
5
6
Biswas
7
```

If you want to add an element at the beginning of the array, you can use the `unshift` method.
```
const arr = [1,2,3,4,5,6,'Biswas'];
arr.push(7);
arr.unshift(0);

for (const item of arr) {
  console.log(item);
}
```

Now you see 0 is the first element of the array.
```
0
1
2
3
4
5
6
Biswas
7
```

You can remove an item from end of the array. using arr.pop() Likewsie you can remove an item from beginning of the array. using arr.shift()

For e.g.:
```
const arr = [1,2,3,4,5,6,'Biswas'];
arr.push(7);
arr.unshift(0);

arr.pop();
arr.shift();

for (const item of arr) {
  console.log(item);
}
```

Which Results the following:
```
1
2
3
4
5
6
Biswas
```

Other methods like map, filter, reduce, concat, slice, spliceare also available.

Array Big-0 Complexity:
- Insert/Remove from the end - O(1)
- Insert/Remove from the beginning - O(n)
- Accessing an element - O(1)
- Searching an element - O(n)
- Push/ Pop - O(1)
- Shift/ Unshift / concat / slice /splice - O(n)
- Foreach / map / filter / reduce - O(n)
