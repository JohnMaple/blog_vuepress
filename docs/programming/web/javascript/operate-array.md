---
title: 操作数组的方法
description: 针对数组进行排序，去重，分组等方法
featured_media: /icons/javascript.png
date: 2018-10-10 20:12:23
post: true
comments: true
humanize: false
tags:
- JavaScript
---

# 操作数组的方法

## 根据字段分组
``` js
/**
 * 根据字段分组
 * @param {Array} arr => 数组
 * @param {String} key => 需要分组的字段 
 */
function keyGroupBy(arr, key) {
    return arr.reduce(function (newObj, obj) {
        if (!newObj[obj[key]]) {
            newObj[obj[key]] = [];
            newObj[obj[key]].push(obj);
        } else {
            newObj[obj[key]].push(obj);
        }
        return newObj;
    }, {});
}
```

测试结果：
``` js
var arr = [{id:1},{id:2}]
var res = keyGroupBy(arr, "id")   // {1:[{id:1}],2:[{id:2}]}
```

## 根据字段排序
``` js
/**
 * 排序数组里的对象(集合)的某个字段排序
 * @param {Array} arr => 数组
 * @param {String} key => 字段名
 */
function sortByKey(arr, key) {
    return arr.sort(function (m, n) {
        var key1 = m[key]
        var key2 = n[key]
        return key2 - key1
    })
}
```

测试结果：
``` js
var arr = [{id:1},{id:2}]
var res = sortByKey(arr, "id")   // [{id:2},{id:1}]
```

## 根据字段去重
``` js
/**
 * 去除指定字段的重复集合
 * @param {Array} arr => 数组
 * @param {String} key => 需要去重的字段
 */
function duplicateByKey(arr, key) {
    var keys = []
    for (let i = 0; i < arr.length; i++) {
        keys.push(arr[i][key])
    }
    return arr.filter((ele, i, arr) => keys.indexOf(ele[key]) == i)
}
```

测试结果：
``` js
var arr = [{id:1},{id:2},{id:1}]
var res = duplicateByKey(arr, "id") // [{id:1},{id:2}]
```