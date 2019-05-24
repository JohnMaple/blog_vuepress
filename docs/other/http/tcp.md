---
title: TCP传输控制协议
description: TCP（Transmission Control Protocol 传输控制协议）是一种面向连接的、可靠的、基于字节流的传输层通信协议，由IETF的RFC 793定义。
featured_media: /icons/http.png
date: 2018-04-15 10:20:15
post: true
comments: true
humanize: false
tags:
- TCP
- HTTP
---

# TCP（传输控制协议）
TCP（Transmission Control Protocol 传输控制协议）是一种面向连接的、可靠的、基于字节流的传输层通信协议，由`IETF`的`RFC 793`定义。在简化的计算机网络OSI模型中，它完成第四层传输层所指定的功能，用户数据报协议（`UDP`）是同一层内，另一个重要的传输协议。在因特网协议族（Internet protocol suite）中，TCP层是位于IP层之上，应用层之下的中间层。不同主机的应用层之间经常需要可靠的、像管道一样的连接，但是IP层不提供这样的流机制，而是提供不可靠的包交换。

[详解](https://juejin.im/post/5b29d2c4e51d4558b80b1d8c)

## 连接建立（三次握手）
### 三次握手
- client发送一个SYN(J)包给server，然后等待server的ACK回复，进入SYN-SENT状态。ps: SYN为synchronize的缩写，ACK为acknowledgment的缩写。
- server接收到SYN(seq=J)包后就返回一个ACK(J+1)包以及一个自己的SYN(K)包，然后等待client的ACK回复，server进入SYN-RECIVED状态。
- client接收到server发回的ACK(J+1)包后，进入ESTABLISHED状态。然后根据server发来的SYN(K)包，返回给等待中的server一个ACK(K+1)包。等待中的server收到ACK回复，也把自己的状态设置为ESTABLISHED。到此TCP三次握手完成，client与server可以正常进行通信了。

### 说明
三次握手中的客户端和服务器之间的握手过程比喻成A和B通信的过程:

在第一次通信过程中，A向B发送信息之后，B收到信息后可以确认自己的收信能力和A的发信能力没有问题。

在第二次通信中，B向A发送信息之后，A可以确认自己的发信能力和B的收信能力没有问题，但是B不知道自己的发信能力到底如何，所以就需要第三次通信。

在第三次通信中，A向B发送信息之后，B就可以确认自己的发信能力没有问题。

## 连接终止（四次握手）
建立一个连接需要三次握手，而终止一个连接要经过四次握手，这是由TCP的半关闭（half-close）造成的。
### 四次握手
- 某个应用进程首先调用close，称该端执行“主动关闭”（active close）。client发送一个FIN(M)包，此时client进入FIN-WAIT-1状态，这表明client已经没有数据要发送了。
- server收到了client发来的FIN(M)包后，向client发回一个ACK(M+1)包，此时server进入CLOSE-WAIT状态，client进入FIN-WAIT-2状态。
- server向client发送FIN(N)包，请求关闭连接，同时server进入LAST-ACK状态。
- client收到server发送的FIN(N)包，进入TIME-WAIT状态。向server发送ACK(N+1)包，server收到client的ACK(N+1)包以后，进入CLOSE状态；client等待一段时间还没有得到回复后判断server已正式关闭，进入CLOSE状态。

> 第二次挥手、第三次挥手没有合并是因为tcp存在半关闭状态，即第二次挥手后，客户端没有东西发给服务端，but服务端还可以向客户端下发数据（tcp是全双工）

### 特殊time_wait状态
::: tip
- 它是主动关闭的一方在回复完对方的挥手后进入的一个长期状态，这个状态标准的持续时间是4分钟，4分钟后才会进入到closed状态，释放套接字资源。不过在具体实现上这个时间是可以调整的。
- 它的作用是重传最后一个ack报文，确保对方可以收到。因为如果对方没有收到ack的话，会重传fin报文，处于time_wait状态的套接字会立即向对方重发ack报文。
- 同时在这段时间内，该链接在对话期间于网际路由上产生的残留报文(因为路径过于崎岖，数据报文走的时间太长，重传的报文都收到了，原始报文还在路上)传过来时，都会被立即丢弃掉。4分钟的时间足以使得这些残留报文彻底消逝。不然当新的端口被重复利用时，这些残留报文可能会干扰新的链接。
- 4分钟就是2个MSL，每个MSL是2分钟。MSL就是maximium segment lifetime——最长报文寿命。这个时间是由官方RFC协议规定的。
:::