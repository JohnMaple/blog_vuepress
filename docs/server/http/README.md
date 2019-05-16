---
title: HTTP协议
description: HTTP协议是Hyper Text Transfer Protocol（超文本传输协议）的缩写,是用于从万维网（WWW:World Wide Web ）服务器传输超文本到本地浏览器的传送协议。
featured_media: /hero.png
date: 2018-12-25 14:30:20
post: true
comments: true
humanize: false
---

# HTTP协议 #

## HTTP简介
HTTP协议是Hyper Text Transfer Protocol（超文本传输协议）的缩写,是用于从万维网（WWW:World Wide Web ）服务器传输超文本到本地浏览器的传送协议。

HTTP是一个基于TCP/IP通信协议来传递数据（HTML 文件, 图片文件, 查询结果等）。

HTTP是一个属于应用层的面向对象的协议，由于其简捷、快速的方式，适用于分布式超媒体信息系统。它于1990年提出，经过几年的使用与发展，得到不断地完善和扩展。目前在WWW中使用的是HTTP/1.0的第六版，HTTP/1.1的规范化工作正在进行之中，而且HTTP-NG(Next Generation of HTTP)的建议已经提出。

HTTP协议工作于客户端-服务端架构为上。浏览器作为HTTP客户端通过URL向HTTP服务端即WEB服务器发送所有请求。Web服务器根据接收到的请求后，向客户端发送响应信息

## 常见的 HTTP 状态码有哪些
状态码|类别|原因
:---:|:---:|:---:
1xx|信息性状态码（Informational）|服务器正在处理请求
2xx|成功状态码（Success）|请求已正常处理完毕
3xx|重定向状态码（Redirection）|需要进行额外操作以完成请求
4xx|客户端错误状态码（Client Error）|客户端原因导致服务器无法处理请求
5xx|服务器错误状态码（Server Error）|服务器原因导致处理请求出错
<!-- <BaseTable :tableHeader="[
  {
    prop: 'code',
    label: '状态码',
  },{
    prop: 'explain',
    label: '类别',
  },{
    prop: 'desc',
    label: '原因',
  }
]" :tableData="[
  {
    code: '1xx',
    explain: '信息性状态码（Informational）',
    desc: '服务器正在处理请求'
  },{
    code: '2xx',
    explain: '成功状态码（Success）',
    desc: '请求已正常处理完毕'
  },{
    code: '3xx',
    explain: '重定向状态码（Redirection）',
    desc: '需要进行额外操作以完成请求'
  },{
    code: '4xx',
    explain: '客户端错误状态码（Client Error）',
    desc: '客户端原因导致服务器无法处理请求'
  },{
    code: '5xx',
    explain: '服务器错误状态码（Server Error）',
    desc: '服务器原因导致处理请求出错'
  }
]"></BaseTable> -->

## 常用状态码
- `200 OK`                        客户端请求成功
- `400 Bad Request`               客户端请求有语法错误，不能被服务器所理解
- `401 Unauthorized`              请求未经授权，这个状态代码必须和WWW-Authenticate报头域一起使用
- `403 Forbidden`                 服务器收到请求，但是拒绝提供服务
- `404 Not Found`                 请求资源不存在，eg：输入了错误的URL
- `500 Internal Server Error`     服务器发生不可预知的错误
- `503 Server Unavailable`        服务器当前不能处理客户端的请求，一段时间后可能恢复正常
- `504 Gateway Timeout`           服务器作为网关或代理，但是没有及时从上游服务器收到请求
- `505 HTTP Version Not Supported`        服务器不支持请求中所用的 HTTP 协议版本

## 301和302有什么区别
301: 永久重定向，表示请求的资源已经永久的搬到了其他位置

302: 临时重定向，表示请求的资源临时搬到了其他位置

## 504和500有什么区别
500： 表示服务器执行请求的时候出错了，可能是bug

504: (网关超时) 服务器作为网关或代理，但是没有及时从上游服务器收到请求

## HTTPS 和 HTTP 有什么区别
区别|https|http
:---:|:---:|:---:
证书|需要ca证书|不需要
传输协议|ssl加密传输协议|超文本协议，明文传输
端口|443|80