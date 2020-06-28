## 六、网络封装

### 1、网络模板选择
- 选择一:传统的AJAX是基于xmlhttpRequter()
- 选择一:jQuery-Ajax
- 选择三: axios 

### 2、JSON的封装
- 解决跨域问题
- 原理：
	- JSOPN的核心在于通过script标签的src来帮助请求数据
- 封装核心： 
	- 监听Window上的jsonp进行回调时的名称
### 3、axios 使用
- 1,认识axios
	- Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。
	- axios 的请求方式

- 2.发送请求
	- 发送get请求
	- axios全局配置
		- axios.defaults.baseURL = 'http://123.207.32.32:8000'
		- axios.defaults.timeout = 5000
	- 常见配置选项
		- axios的配置选项↓↓↓↓↓↓
		- 请求地址
		- 请求类型
		- 请求根路径
		- 请求前的数据处理
		- 请求后的数据处理
		- 自定义请求头 
		- URL查询对象

	- 并发请求
		- 需求 同时发送两个请求：
		- 使用axios.all 可以放入多个请求的数组
		- 返回一个数组  ，，使用axios.spread可以将数组展开

- 3.axios实例
	- 如何创建axios实例
		- axios.create()
	- axios的封装
- 4.axios的拦截器
	- 请求拦截器
		- 作用：
		- 1. 配置config中一些不符合服务器的信息
		- 2. 发送网络请求，界面显示一个请求图标
		- 3. 网络请求 （登录(token)）携带特殊信息

	- 响应拦截器
	- 移除拦截器
	- 自定义 axios 实例添加拦截器

- 错误处理

## 七、Vue源码解读
### 响应式原理
- 1. Vue内部是如何监听数据的改变的
	- Object。defineproperty  ---> 监听对象属性的改变

- 2.  当数据改变时，Vue是如何知道要通知 那些 属性，使界面刷新改变的
	- 发布订阅模式
