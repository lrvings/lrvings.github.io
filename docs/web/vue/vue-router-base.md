## 四、Vue -router

### 1、认识路由的概念

- 1. 认识路由

	- 概念：路由通过互联网网络吧信息从原地址传输到目的地地址的活动
	- 路由器：提供两种机制  -路由和-转发

		- 路由：决定数据包从来源到目的地的路径
		- 转发将输入端的数据转移到合适的输出端

	- 路由中还有一个概念：路由表

		- 路由表本质就是一个映射表，决定数据包的指向

- 2.后端路由时代

	- 后端处理URL和页面的映射关系。
	- 当页面需要请求不同的路径内容时，交给服务器来处理，服务器渲染好整个页面，并将页面返回给客户端
	- 好处：不需要单独加载任何JS和css，直接交给浏览器 展示 有利于SEO优化
	- 缺点：

		- 整个页面由后端人员来编写和维护
		- HTML代码和数据以及对应的逻辑会混在一起，编写和维护比较麻烦

- 3.前后端分离时代

	- AJAX的出现，有了前后端分离的开发模式
	- 后端只提供API来返回数据，前端通过ajax来获取数据，并且通过JavaScript将数据渲染到页面上
	- 优点：前后端责任清晰，后端专注于数据上，前端专注于交互和可视化上

- 4.前端路由时代

	- 前端路由核心？
	- 改变URL，但是页面整体不进行刷新
	- 单页面富应用（SPA页面） 前后端分离加上前端路由，前端路由的url映射表不会向服务器请求，是单独url的的页面自己的ajax请求后端，后端只提供api负责响应数据请求。改变url，页面不进行整体的刷新。 整个网站只有一个html页面。

### 2、前端路由规则

- 如何实现改变URL，但是页面整体不进行刷新
- 1.URL的hash

  - URL的hash是通过锚点(#)，其本质上改变的是window.location的href属性。
  - 可以通过直接赋值location.hash来改变href，但是页面并不会发生刷新。

- 2. HTML5的history

  - history接口是HTML5新增的接口，有五种模式改变URL而不刷新页面
  - pushState

    - `history.pushState({},'','home')`
    - history模式也是不会刷新页面的,history对象栈结构，先进后出，pushState类似压入栈中，back是回退

  - replaceState

    - `history.replaceState({},'','home')`
    - replaceState模式与pushState模式区别在于replaceState模式浏览器没有返回只是替换，不是压入栈中。

  - go 

    - `history.go()`
    - go只能在pushState模式中使用，go是前进后退到哪个历史页面。

  - `history.back() 等价于history.go(-1)`
  - `history.forwrad () 等价于history.go(1)`

- `vue-router`其实用的就是这样的机制，改变url地址，这个url地址存在一份路由映射表里面，比如/user代表要请求用户页面，只要配置了这个路由表（路由关系），就可以前端跳转而不刷新页面，所有的数据请求都走ajax。

### 3、router-view基础

- 1.认识安装vue-router 

  - 使用`npm install vue-router --save`来安装vue-router插件模块
  - vue-router是基于路由和组件的
  - 路由用于设置访问路径，将路由和组件映射起来
  - 在vue-router的单页面应用中，页面的路径的改变就是组件的切换

- 2、路由基本配置

  - 1、安装路由 `vue-router `
  - 2、`Vue.use` --> 创建`vueRouter`对象  -->  挂载到实例
  - 3、配置映射关系

    - （1）创建路由组件

      - `Home.vue`

    - （2）配置组件和路径的映射关系

      - 配置路由和组件之间的对应关系

        ```vue
        {
        path: '/home',//home  前端路由地址
        name: 'Home',
        component: Home //组件名
        },
        ```

    - （3）使用路由

      通过`<router-link>`和`<router-view>`

      `<router-link>`是全局组件，最终被渲染成a标签，但是`<router-link>`只是标记路由指向类似一个a标签或者按钮一样，但是我们点击a标签要跳转页面或者要显示页面，所以就要用上`<router-view>`。

      `<router-view> `是用来占位的，就是路由对应的组件展示的地方，该标签会根据当前的路径，动态渲染出不同的组件。

      路由切换的时候切换的是`<router-view>`挂载的组件，其他不会发生改变。

      `<router-view>`默认使用hash模式，可以在`index.js`中配置修改为`history`模式。

- 3、vue-router细节补充

  - 路由的默认路径

    - 重定向

      `{path: '/',redirect: '/home'}`

  - 设置HTML5的`history`模式

    `const router = new Router({routes,mode: 'history'//修改模式为history})`

  - router-link

    - to属性：用于跳转到指定路径。
    - tag属性：

      - 可以指定`<router-link>`之后渲染成什么组件使用`<router-link to='/home' tag='button'>`会被渲染成一个按钮，而不是a标签。

    - relapce属性：

      - 在history模式下指定`<router-link to='/home' tag='button' replace>`使用replaceState而不是`pushState`，此时浏览器的返回按钮是不能使用的。

    - active-class属性：

      - 当`<router-link>`对应的路由匹配成功的时候，会自动给当前元素设置一个`router-link-active`的class，设置active-class可以修改默认的名称。

    - 在进行高亮显示的导航菜单或者底部tabbar时，会用到该属性
    - 但是通常不会修改类的属性，会直接使用默认的router-link-active
    - 如和修改linkActiveClass

  - 实现路由代码跳转

    - 不使用router-link方式进行路由跳转

        ```
        homeClick() {//通过代码的路径修改路由
        this.$router.push('/home')//push 等价于pushState
        // this.$router.replace('/home')//replace 等价于replaceState
        console.log("homeClick")
        }
        ```

    - 修改app.vue，将`<router-link>`换成button等任何组件，添加上点击事件，并写好点击事件响应方法，此时使用`this.$router.push('/home')`，push方法 等价于pushState方法，replace 方法等价于replaceState方法。

- 4、动态路由

  - 页面的path路径可能是不确定的 ，例如可能有/user/aaaa，除了/user之外，后面还跟上了用户ID/user/123等
  - 这种path和component的匹配关系，叫做动态路由
  - `$route`是代表处于激活状态的路由，通过`$route.params`获取 $route 所有的参数

### 4、路由的懒加载

- 1.什么是路由懒加载

	- 打包构建应用时 页面这么多js放在一个文件夹里 造成页面非常大 ，影响页面的加载
	- 这时候就用到路由加载
	- 路由加载做了什么？
	- 路由加载的主要作用就是将路由对应的组件打包成一个个js代码块
	- 只有在这个路由被访问时，才加载这个组件

- 2.懒加载和非懒加载打包区别

	- 总结：用到时 再加载

- 3.懒加载方式

	- （了解）方式一：结合Vue的异步组件和Webpack的代码分析

	` const Home = resolve => { require.ensure(['../components/Home.vue'], () => {resolve( require('../components/Home.vue')) } )}`

	- （了解）方式二：ADM写法

		``` const About= resolve =>  require(['../components/Home.vue'], resolve ) ```

	- （使用）方式三：在ES6中可以组织Vue异步组件和webpack的代码分割

		``` component: () => import('../components/Home.vue') ```

### 5、路由嵌套使用

- 1.认识嵌套路由

	- 一个路径映射一个组件，访问两个路径也会分别选人两个组件

- 2.嵌套路由实现

	- 1. 创建对应的子组件，并且在路由映射(router/index.js)中配置对应的子路由。
	- 2. 在组件内部使用<router-view>标签来占位。

- 3.嵌套默认路径

	- 嵌套路由的默认路径（重定向）
	```js
	  children: [
      {
        path: "",
        redirect: '/message'
      },
      {
        path: "message",
        name: "Message",
        component: HomeMessage,
      },
      ],
	```
### 6、路由传递参数

- 1.准备工作

  - 第一步：创建新的组件Profile.vue
  - 第二步:配置路由映射
  - 第三步:添加跳转的`<router-link> `

- 传递参数主要有两种类型：`params和query`

- 2.parms方式（简单的数据时使用）

  - params的类型也就是动态路由形式
  - 配置路由格式：`/router/:id`
  - 传递的方式：在path后面跟上对应的值
  - 传递后形成的路径：`/router/123,router/abc`
  - 通过`$route.params.userId`获取指定userId

- 3.query方式（数据多时使用）

  - 配置路由格式：`/router`，也就是普通的配置
  - 传递方式：对象中使用`query`的`key`作为传递方式
  - 传递后形成的路径：`/router?id=123,./router?id=abc`

- 使用代码编写传递数据，使用button代替`<router-link>`，并添加点击事件

  ```js
  <button @click="userClick">用户</button>
      <button @click="profileClick">档案</button>
  
      userClick() {
        this.$router.push('/user/' + this.userId)
        console.log("userClick")
      },
      profileClick() {
        let profileInfo = this.profileInfo
        this.$router.push({
          path: '/profile',
          query: {
            profileInfo
          }
        })
        console.log("profileClick")
      }
  ```

- 获取参数

  - 获取参数通过`$route`对象获取
  - 路由对象会被注入每个组件中，赋值为`this.$route`,并且当路由切换时，路由对象会被更新

- $router和$route的区别

  ```bash
  $router 为VueRouter的实例，需要导航到不同的URL，则使用$outer,push方法
  
  $route为当前跳转对象里面可以获取name、path、query、params
  
  this.$route对象是当前处于活跃的路由
  
  $router和$route是继承自vuel类的原型
  ```


### 7、路由导航守卫

- 导航守卫主要用来监听路由的进入和离开的
- 1.钩子函数

  - `beforeEach`（改变前）
  - `afterEach`（改变后）

- 2.守卫主要应用

  - 动态改变页面标题

    ```js
    守卫导航应用- > 动态的完成标题的修改 
    router.beforeEach((to,from,next) => {
    	document.title = to.matched[0].meta.title
    	next()
    })
    ```

     

  - 控制访问权限

    ```js
    // 访问权限控制
    router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next()
    const tokenId = window.sessionStorage.getItem('tokenid')
    if (!tokenId) return next('/login')
    next()
    })
    ```

- 3.导航钩子参数解析

  - to：即将要进入的目标的路由对象
  - from：当导航即将要离开的路由对象
  - next：调用改变方法后，才能进入下一个钩子

- 补充

  - 如果是后置钩子，也就是afterEach，不需要主动调用next函数
  - 上面所属是全局守卫
  - --- 路由独享守卫
  - --- 组件内守卫

### 8、keep-alive

- 1.认识keep-alive

  - keep-alive 使组件不被销毁 ，守卫 保留子组件状态 避免重新渲染
  - 主要属性

  	- include - 字符串或正则表达式。只有名称匹配的组件会被缓存。
  	- exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
  	- max - 数字。最多可以缓存多少组件实例。

  - `<keep-alive>`包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们
  - 当组件在 `<keep-alive>` 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行

- 2. 遇见`vue-router`

  - `router-view`也是一个组件，如果用 
  - `<keep-alive><router-view/></keep-alive>`
  - 将其包起来，所有路径匹配到的视图组件都会被缓存。