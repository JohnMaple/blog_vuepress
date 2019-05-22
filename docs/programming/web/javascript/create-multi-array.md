---
title: 对一维数组构建指定个数的二位数组
description: 一维数组构建二维数组，分组轮播
featured_media: /icons/javascript.png
date: 2018-09-15 19:50:31
post: true
comments: true
humanize: false
tags:
- JavaScript
---

# 对一维数组构建指定个数的二位数组
 
``` js
/** 
 * 一维数组生成以subArrayNum的二维数组 
 * @param {Array} arr  
 * @param {Number} subArrayNum  
 */  
function getMatrix(arr, subArrayNum) {  
    // 定义一个数组，长度为原数组的总长度除以subArrayNum向上取整  
    var res = new Array(Math.ceil(arr.length / subArrayNum));  
    // 遍历该数组  
    for (let i = 0; i < res.length; i++) {  
        // 令数组每一个值都为空数组，即生成二维数组  
        res[i] = new Array();  
        // 为二维数组数据设置为空字符串  
        for (let j = 0; j < i % subArrayNum; j++) {  
            res[i][j] = '';  
        }  
    }  
    // 给二维数组添加数据  
    for (let i = 0; i < arr.length; i++) {  
        res[parseInt(i / subArrayNum)][i % subArrayNum] = arr[i];  
    }  
    return res;  
}  


/**
 * 返回一个根据subArrayNum的二维数组
 * @param {Array} arr => 一维数组
 * @param {Number} subArrayNum => 每组元素的个数
 */
function chunk(arr, subArrayNum) {
    var result = [];
    for (var i = 0; i < arr.length; i += subArrayNum) {
        result.push(arr.slice(i, i + subArrayNum));
    }
    return result;
}
```

测试结果：
``` js
var arr = [1, 2, 3, 4, 5, 6];  
getMatrix(arr, 2);// [[1,2],[3,4],[5,6]]  
chunk(arr, 2);// [[1,2],[3,4],[5,6]] 
```

