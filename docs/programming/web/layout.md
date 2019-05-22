---
title: 页面布局
description: 箭头函数可能是ES6最有特点的新特性了，它不仅可以让代码变得优美，而且更直观利于理解。
featured_media: /icons/css.png
date: 2017-12-19 22:38:42
post: true
comments: true
humanize: false
tags:
- HTML
- CSS
---

# 页面布局

> [学习CSS布局](http://zh.learnlayout.com/)

## 三栏布局
首先解释一下什么是“三栏布局”：顾名思义，三栏布局就是在网页上以平铺方式展现的左中右三列布局，其特点在于，左右两列可固定在网页两侧，中间一列永远居中，且当网页宽度大于左右两列宽度之和时，中间一列可随网页整体宽度的变化而变化（简单来说就是两端固定，中间自适应）。

下面围绕的这样的目的，罗列出大约7种解决方法(高度固定)：

## 浮动布局
``` html
<style>
    .container>div{min-height:200px}
    .container .left{float:left;width:300px;background:red}
    .container .center{background:#ff0}
    .container .right{float:right;width:300px;background:#00f}
</style>
<section class="container">
    <div class="left"></div>
    <div class="right"></div>
    <div class="center"></div>
</section>
```

### 优点
比较简单,兼容性好

### 缺点
- 当宽度小于左右两边宽度之和时，右侧栏会被挤下去
- html的结构不正确
- 脱离文档流，要处理浮动

## 绝对布局
``` html
<style>
    .container>div{min-height:200px;position:absolute}
    .container .left{left:0;width:300px;background:red}
    .container .center{left:300px;right:300px;background:#ff0}
    .container .right{right:0;width:300px;background:#00f}
</style>
<section class="container">
    <div class="left"></div>
    <div class="right"></div>
    <div class="center"></div>
</section>
```

### 优点
快捷

### 缺点
因为布局已经脱离文档流了，意味着下面元素也需要脱离文档流，导致了可用性比较差

## 圣杯布局
``` html
<style>
    .container{padding:0 300px}
    .container>div{min-height:200px;float:left;position:relative}
    .container .left{width:300px;background:red;margin-left:-100%;left:-300px}
    .container .center{width:100%;background:#ff0}
    .container .right{right:-300px;width:300px;margin-left:-300px;background:#00f}
</style>
<section class="container">
    <div class="center"></div>
    <div class="left"></div>
    <div class="right"></div>
</section>
```

### 优点
兼容目前所有的主流浏览器，包括IE6在内；

### 缺点
当父元素有内外边距时，会导致中间栏的位置出现偏差

## 双飞翼布局
``` html
<style>
    .container div{min-height:200px;float:left}
    .container .left{width:300px;margin-left:-100%;background:red}
    .container .center{width:100%;background:#ff0}
    .container .center .center-wrap{margin:0 300px}
    .container .right{width:300px;margin-left:-300px;background:#00f}
</style>
<section class="container">
    <div class="center">
        <div class="center-wrap"></div>
    </div>
    <div class="left"></div>
    <div class="right"></div>
</section>
```

### 优点
兼容目前所有的主流浏览器，包括IE6在内

### 缺点
- 结构不正确
- 多了一层标签

## flex布局
``` html
<style>
    .container{display:flex}
    .container>div{min-height:200px}
    .container .left{width:300px;background:red}
    .container .center{flex:1;background:#ff0}
    .container .right{width:300px;background:#00f}
</style>
<section class="container">
    <div class="left"></div>
    <div class="center"></div>
    <div class="right"></div>
</section>
```

### 优点
简单实用，未来的趋势

### 缺点
需要考虑浏览器的兼容性

## 表格布局
``` html
<style>
    .container{width:100%;display:table;min-height:200px}
    .container>div{display:table-cell}
    .container .left{width:300px;background:red}
    .container .center{background:#ff0}
    .container .right{width:300px;background:#00f}
</style>
<section class="container">
    <div class="left"></div>
    <div class="center"></div>
    <div class="right"></div>
</section>
```

### 优点
兼容性非常好

### 缺点
无法设置栏间距

## 网格布局
``` html
<style>
    .container{width:100%;display:grid;grid-template-rows:100px;grid-template-columns:300px auto 300px}
    .container .left{background:red}
    .container .center{background:#ff0}
    .container .right{background:#00f}
</style>
<section class="container">
    <div class="left"></div>
    <div class="center"></div>
    <div class="right"></div>
</section>
```

### 优点
兼容性比较差

### 缺点
代码简洁，容易理解