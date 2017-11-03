---
category: rc-common
subtitle: 系统通知
type: rc-common
cols: 1
title: system-notice
---

系统通知组件。

## 何时使用

引入应用即可

## demo 使用方法

 1. 超级管理员登录，即 admin账号
 
 2. 本地绑定 test.goago.cn的域名，服务端会做域名校验
 
 3. 确认 应用ID:05 是有msg内容
 
## marquee API

| 参数      | 说明                                     | 类型       | 默认值 |
|-----------|------------------------------------------|------------|--------|
| behavior | scroll, slide, alternate跑马方式：循环绕行，只跑一次就停住，来回往复运动 | string | scroll |
| direction | left,right 跑马方向：从左向右，从右向左| string  |    left |
| loop | 跑马次数：循环100次，如不写默认为一直循环 | string  | '' |
| width | 跑马范围：宽为100%，高为200像素 | string | 0 |
| height | 跑马范围：宽为100%，高为200像素 | string | 0 |
| scrollamount | 跑马速度：数越大越快 | string | |
| scrolldelay | 跑马延时：毫秒数，利用它可实现跃进式滚动 | string | 0 |
| hspace | 跑马区域与其它区域间的空白大小 | string |  0 |
| vspace | 跑马区域与其它区域间的空白大小 | string |  0 |
| bgcolor | 跑马区域的背景颜色 | string | #fff |


## 业务配置ID

```
{"data":{"info":[{"id":"01","name":"web平台登录"},
{"id":"02","name":"手机上报移动端登录"},
{"id":"03","name":"数据图谱移动端登录"},
{"id":"04","name":"88合作社移动端登录"},
{"id":"05","name":"基础平台"},
{"id":"06","name":"运营平台"},
{"id":"07","name":"数据图谱"},
{"id":"08","name":"数据稽核"},
{"id":"09","name":"监测报警"},
{"id":"10","name":"手机上报后台"},
{"id":"11","name":"生产平台"},
{"id":"12","name":"passport"},
{"id":"13","name":"监测平台"}]},"status":"success","msg":"操作成功","success":true}
```

## example

```
//system-notice
import SystemNotice from '@gag/system-notice';
 "@gag/system-notice": "^1.0.2"
 <SystemNotice entryId="11"></SystemNotice>
```
