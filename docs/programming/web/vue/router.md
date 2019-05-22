---
title: Vue路由踩坑记
description: Vue路由使用过程遇到的问题，以及需要注意的事项
featured_media: /icons/vue.png
date: 2018-11-20 20:18:42
post: true
comments: true
humanize: false
tags:
- Vue
---

# Vue路由踩坑记

## 路由概述
Vue Router 是 Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。包含的功能有：

- 嵌套的路由/视图表
- 模块化的、基于组件的路由配置
- 路由参数、查询、通配符
- 基于 Vue.js 过渡系统的视图过渡效果
- 细粒度的导航控制
- 带有自动激活的 CSS class 的链接
- HTML5 历史模式或 hash 模式，在 IE9 中自动降级
- 自定义的滚动条行为

## 注意事项
### 容易忽略点
#### 注册要注册到根实例上
> router为关键字属性，非自定义
``` js
import from router from '../router'
new Vue({
    router
})
```
#### 一个组件的顶层只能有一个元素
``` js
<template>
    <div></div>
</template>
```

### 如何显示默认路由？
- 将默认路由的`<router-link>`的`to`和路由注册时的`path`都设置为`''`

### 如何在有子路由的时候切换路由后显示默认子路由？
- 将默认路由的`path`设置为`''`,`''`表示当前，即路由切换时不带子路径时候的path
- 将默认路由的`<router-link>`的`to`属性设置为父组件的`path`
> children 中的子路由正常来说应为相对路径，但也可设置为绝对路径，这并不影响子路由组件组件的显示，但url路径上会有所区别。

### 默认路由的激活样式一直处于激活态，和解？
在默认路由的router-link上设置exact精确样式匹配属性。

### 如何进行路由跳转?路由跳转有几种方式?
``` js
{
      //对未匹配的路径进行跳转
      /**
       * 跳转方式一：不会改变url
       */
      path:'*'
      // ,component:notfound

      /**
       * 跳转方式二:会改变url
       */
      // ,redirect:'/home' //手动对path进行修改后跳转
      // ,redirect:{path:'/home'}  //对象形式修改，支持变量
      // ,redirect:{name:'about'} //name为注册路由时对应路由所取的名字，为上面的快捷用法
      
      ,redirect:(to)=>{ //动态设置重定向的目标
        if(to.path === '/fwf'){
          return '/home'
        }else if(to.path === '/xvw'){
          return {path:'/document'}
        }else{
          return {name:'about'}
        }
        // console.log(to); //to为目标路由的对象
        // return '/home';
      }
}
```

### name是什么？有什么用？
name为路由注册时所取的名字

#### 重定向
在重定向的时候直接用`name`代表`path`进行跳转，是一种快捷语法。
``` js
redirect:{name:'about'} //name为注册路由时对应路由所取的名字，为上面的快捷用法
```
#### linkTo
在`router-link`上也可使用注册路由时路由所取的`name`对`href`进行设置，点击`link`时会自动跳转到该`name`路由的`path`
``` js
<router-link :to="{name:'about'}" tag="li">work</router-link>
```

#### 一路多图
一个路由对应多个视图时对除了路由默认视图的视图进行标注，以便引入对应的路由。在路由切换时，一个路由可以对应多个视图`router-view`，这时候我们就需要区分不同的 `router-view`，所以就需要取个名字。
``` js
<router-view name="addV"></router-view>
<router-view></router-view>
//-----------------------------------------------------
 ,{
  path: '/document',
  name: 'Document',
  // component:
  components:{ //一个路由对应多个视图
    default:main, //default为关键字 ,没有取名的路由视图，必须的。main为引入的组件名
    addV:other //addV为附加的router-view上取的名字,other为引入的组件所取的名字
  }
}
```

### 如何更改默认link的标签类型?
直接在ink标签上利用tag属性进行修改
``` js
<router-link :to="index" exact tag="li" class="class1" event="mouseover">
```

### 如何更改默认激活样式的类名?
直接在link标签上利用active-class进行修改
``` js
<router-link to="/about" active-class="diy">about</router-link>
```