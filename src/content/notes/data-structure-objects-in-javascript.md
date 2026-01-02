---
title: 'Data Structure: Objects in JavaScript'
description: 'Core concepts, property access, methods, prototypes, cloning, merging, and common pitfalls when working with objects.'
pubDate: 'Jan 2 2026'
tags: 'js-data-structure'
---

An object is an unordered collection of key-value pairs. The key either be a string or a symbol. The value can be any data type, including other objects. 

To retrieve a value, you can use the crossponding key. This can be achieved using the dot notiation or bracket notation.

An object is not a iterable. You cannot use a for loop to iterate over its properties.

```
const obj = {
  name: 'Biswas',
  age: 30,
}

console.log(obj);
```

Which Results the following:
```
{ name: 'Biswas', age: 30 }
```

To access the element we use dot notation or bracket notation.

```
console.log(obj.name);
console.log(obj['age']);
```

Which Results the following:
```
Biswas
30
```

We can add new key value pair to the object.
```
0bj.gender = 'Male';
```

Now it results the following:
```
{ name: 'Biswas', age: 30, gender: 'Male' }
```

Now let's talk about delete operator. We can delete key value pair with the help of the delete operator.

```
delete obj.gender;
```

Now it results the following:
```
{ name: 'Biswas', age: 30 }
```

Inside the object we can also make a function.

```
const obj = {
  name: 'Biswas',
  age: 30,
  sayName: function() {
    console.log(this.name);
  }
}
```

Now we can call the function.

```
obj.sayName();
```

Which Results the following:
```
Biswas
```

Some of the methods that we can use with object are:
- Object.keys()
- Object.values()
- Object.entries()


Each of the examples are followings:

```
console.log(Object.keys(obj));
```

Which Results the following:
```
[ 'name', 'age' ]
```

```
console.log(Object.values(obj));
```

Which Results the following:
```
[ 'Biswas', 30 ]
```

```
console.log(Object.entries(obj));
```

Which Results the following:
```
[ [ 'name', 'Biswas' ], [ 'age', 30 ] ]
```

Let's discuss worst case time complexities of the some of the operations.

Object - Big-O time complexity

Insert - O(1)
Remove - O(1)
Access - O(1)
Search - O(n)
Object.keys() - O(n)
Object.values() - O(n)
Object.entries() - O(n)

