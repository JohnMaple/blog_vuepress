---
title: ES6 语法特性
description: ES6 引入新的语法特性，使用上与ES5的区别。
featured_media: /icons/es6.png
date: 2018-08-30 20:21:34
post: true
comments: true
humanize: false
tags:
- ES6
---

# ES6 语法特性

## 变量声明
### let替代var
ES6之前我们用var声明一个变量，但是它有很多弊病：

- 因为没有块级作用域，很容易声明全局变量
- 变量提升，声明的值是undefined
- 可以重复声明

``` js
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10
a[7](); // 10
a[8](); // 10
a[9](); // 10
```

### 有时候const比let更好
const和let的唯一区别就是，const不可以被更改，所以当声明变量的时候，尤其是在声明容易被更改的全局变量的时候，尽量使用const。

- 更好的代码语义化，一眼看到就是常量。
- 另一个原因是因为JavaScript 编译器对const的优化要比let好，多使用const，有利于提高程序的运行效率。
- 所有的函数都应该设置为常量。

## 动态字符串

``` js
// low
const a = "foobar";
const b = 'foo' + a + 'bar';

// good
const a = 'foobar';
const b = `foo${a}bar`;
const c = 'foobar';
```

## 解构赋值

### 变量赋值
在用到数组成员对变量赋值时，尽量使用解构赋值。

``` js
const arr = [1, 2, 3, 4];

// low
const first = arr[0];
const second = arr[1];

// good
const [first, second] = arr;
```

### 函数传对象
函数的参数如果是对象的成员，优先使用解构赋值。

``` js
// low
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;
}

// good
function getFullName({ firstName, lastName }) {
}
```

如果函数返回多个值，优先使用对象的解构赋值，而不是数组的解构赋值。这样便于以后添加返回值，以及更改返回值的顺序。

``` js
// low
function processInput(input) {
  return [left, right, top, bottom];
}

// good
function processInput(input) {
  return { left, right, top, bottom };
}

const { left, right } = processInput(input);
```

## 关于对象的细节
在定义对象时，能简洁表达尽量简洁表达
``` js
var ref = 'some value';

// low
const atom = {
  ref: ref,

  value: 1,

  addValue: function (value) {
    return atom.value + value;
  },
};

// good
const atom = {
  ref,

  value: 1,

  addValue(value) {
    return atom.value + value;
  },
};
```

## 数组
### 扩展运算符（...）
扩展运算符（spread）是三个点（...），将一个数组，变为参数序列
``` js
// 还在用for i 你就太low了
const len = items.length;
const itemsCopy = [];
let i;

for (i = 0; i < len; i++) {
  itemsCopy[i] = items[i];
}

// cool !
const itemsCopy = [...items];

console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5

[...document.querySelectorAll('div')]
// [<div>, <div>, <div>]
```
### Array.from()
`Array.from`方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。
``` js
const foo = document.querySelectorAll('.foo');
const nodes = Array.from(foo);
```
## 函数
### 箭头函数 `=>`

立即执行函数可以写成箭头函数的形式
``` js
(() => {
  console.log('Welcome to the Internet.');
})();
```

尽量写箭头函数使你的代码看起来简洁优雅
``` js
// low
[1, 2, 3].map(function (x) {
  return x * x;
});

// cool !
[1, 2, 3].map(x => x * x);
```

### 别再用arguments（类数组）了
使用 rest 运算符（...）代替，rest 运算符可以提供一个真正的数组
``` js
// low
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}

// good
function concatenateAll(...args) {
  return args.join('');
}
```

### 传参时试试设置默认值

``` js
// low
function handleThings(opts) {
  opts = opts || {};
}

// good
function handleThings(opts = {}) {
  // ...
}
```

## Object？Map！

### 简单的键值对优先Map
如果只是简单的key: value结构，建议优先使用Map，因为Map提供方便的遍历机制
``` js
let map = new Map(arr);
// 遍历key值
for (let key of map.keys()) {
  console.log(key);
}
// 遍历value值
for (let value of map.values()) {
  console.log(value);
}
// 遍历key和value值
for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
```

## 更加简洁直观class语法
``` js
// low
function Queue(contents = []) {
  this._queue = [...contents];
}
Queue.prototype.pop = function() {
  const value = this._queue[0];
  this._queue.splice(0, 1);
  return value;
}

// good
class Queue {
  constructor(contents = []) {
    this._queue = [...contents];
  }
  pop() {
    const value = this._queue[0];
    this._queue.splice(0, 1);
    return value;
  }
}
```

## 模块化
### 引入模块
使用import取代require，因为Module是Javascript模块的标准写法。
``` js
// bad
const moduleA = require('moduleA');
const func1 = moduleA.func1;
const func2 = moduleA.func2;

// good
import { func1, func2 } from 'moduleA';
```

### 输出模块
使用`export`输出变量，拒绝`module.exports`:
``` js
import React from 'react';

class Breadcrumbs extends React.Component {
  render() {
    return <nav />;
  }
};

export default Breadcrumbs;
```
- 输出单个值，使用export default
- 输出多个值，使用export
- export default与普通的export不要同时使用

## 编码规范
模块输出一个函数，首字母应该小写：
``` js
function getData() {
}

export default getData;
```

模块输出一个对象，首字母应该大写:
``` js
const Person = {
  someCode: {
  }
};

export default Person ;
```

## ECMAScript 6 文档
[ECMAScript 6 入门 - 阮一峰](http://es6.ruanyifeng.com/)