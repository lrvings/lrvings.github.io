## 三、Vue CLI

### 1、Webpack

- （1） 什么是webpack

	- webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)

- （2） webpack和gulp 对比

	- grunt/gulp的核心

		- 可以配置一系列的task，并定义task要处理的事务（转css /压缩/ts转换）
		- 之后让grunt/gulp 来一次执行这些task，而且让整个流程自动化    所以被称为前端自动化任务管理工具

- （3） 手动webpack配置

	- module.exports = {
  // 配置入口
  entry: './src/main.js',
  // 配置出口
  output: {
    // 绝对路径
    path: path.resolve(__dirname,'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
    ​    test: /\.css$/,
    ​    use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
}

- （4）webpack 核心 loader的使用

	- 一、通过npm安装需要使用的loader
	- 二、在webpack.config.js 中的module关键字下配置
	- 大部分的loader都有可以在webpack官网找到，并学习对应的语法
	- CSS文件处理 

		- css-loader

			- 只负责将css文件加载

		- style-loader

			- 只负责将样式添加DOM中

	- 图片处理

		- url-loader

			- 当加载的图片，小于limit时 ，会将图片编译base64字符串形式
			- 当加载的图片，大于limit， 会使用file-loader模块进行加载

		- file-loader

			- 默认情况下，生成的文件的文件名就是文件内容的 MD5 哈希值并会保留所引用资源的原始扩展名

		- 修改文件名称

			- webpack会自动生成一个非常长的名字
			- 这是个32位Hash值，目的防止名字重复 --->>
真实开发中将所有图片放入一个文件夹中，跟上图片原本的名字，同时要防止重复
			- options中添加选项

				- img：文件要打包到的文件夹
				- name：获取图片原来的名字，放在该位置
				- hash：为了防止名称冲突，依然使用hash，但是只需要保留8位
				- 示列：

					-  options: {
              // limit: 13000,
              name: 'img/[name].[hash:8].[ext]'
              }

			- 路径问题？

				- 需要在出口位置 添加 publicPath ：dist/

		- 注：使用file-loader时，需要把url-loader注释

	- webpack在读取使用loader的过程中，是按照从右向左的顺序读取的

- （5）webpack配置Vue

	- 打包姓项目错误信息 --->>> 不同版本构建
	- 安装 vue-loader （加载vue）和vue-template -compiler（解析vue）
	- 修改webpack.config.js 配置文件

		- 简单配置示例

		  //1.导入node的path包获取绝对路径，需要使用npm init初始化node包
		  var path = require("path");
		  //2.配置webpack的入口和出口
		  module.exports = {
		    // 配置入口
		    entry: "./src/main.js",
		    // 配置出口
		    output: {
		      // 绝对路径
		      path: path.resolve(__dirname, "dist"), //动态获取打包后的文件路径,path.resolve拼接路径
		      filename: "bundle.js",
		      publicPath: "dist/", //打包后的文件名
		    },
		    module: {
		      rules: [
		        // 配置CSS
		        {
		          test: /\.css$/, //正则表达式匹配css文件
		          use: ["style-loader", "css-loader"],
		        },
		        // 配置图片
		        {
		          test: /\.(png|jpg|gif)$/,
		          use: [
		            {
		              loader: "file-loader",
		              options: {
		                // 当加载的图片，小于limit时 ，会将图片编译base64字符串形式
		                // 当加载的图片，大于limit， 会使用file-loader模块进行加载
		                // limit: 1300
		                name: "img/[name].[hash:8].[ext]",
		              },
		            },
		          ],
		        },
		        {
		          test: /\.vue$/,
		          use: ["vue-loader"],
		        },
		      ],
		    },
		    resolve: {
		      //导入模块简写省略指定后缀
		      // extensions: [".js", ".css", ".vue"],
		      alias: {
		        vue$: "vue/dist/vue.esm.js", // 用 webpack 1 时需用 'vue/dist/vue.common.js'
		      },
		    },
		  };

- （6）plugin（插件）

	- 认识插件

		- 通常是对某个现有的架构进行扩展
		- webpack中插件，就是对webpack现有功能的各种扩展，比如打包优化，文件压缩等等
		- 插件目的在于解决 loader 无法实现的其他事。

	- loader和plugin的区别

		- loader主要用于转换某个类型的模块，他是一个转换器
		- plugin是一个插件，是对webpack的扩展。它是一个扩展器

	- plugin的使用

		- 一、通npm安装需要使用的plugin
		- 二、在webpack.config.js 中配置

	- 内置插件

		- 版权插件

		  plugins:[    new webpack.BannerPlugin('最终解释权归zz所有'),    ]

	- 下载插件

		- 打包HTML
		- JS压缩

		  const uglify = require("uglifyjs-webpack-plugin")

- （7）webpack搭建本地服务器

	- webpack提供了一个可选的本地开发服务器，这个本地服务器基于node.js搭建，内部使用了express框架，可以实现热启动。
	- 安装： npm install --save-dev webpack-dev-server@2.9.1
	- devServe也是webpack中一个选项，选项本省可以设置一些属性：

		- contentBase：为哪个文件夹提供本地服务，默认是根文件夹，这里我们需要改成./dist
		- port：端口号
		- inline：页面实时刷新
		- historyApiFallback：在SPA（单页面富应用）页面中，依赖HTML5的history模式

	- 修改webpack.config.js的文件配置

		- //2.配置webpack的入口和出口
module.exports = {
 ...
  devServer: {
    contentBase: './dist',//服务的文件夹
    port: 4000,
    inline: true//是否实时刷新
  }

}

	- 配置package.json的script：
	
		- "dev": "webpack-dev-server --open"

- （8）webpack配置分离

### 2、Vue CLI

- VUe CLI 是什么？

	- CLI是Command-Line Interface，即命令行界面，也叫脚手架。
	- Vue CLI 致力于将 Vue 生态中的工具基础标准化。它确保了各种构建工具能够基于智能的默认配置即可平稳衔接，这样你可以专注在撰写应用上，而不必花好几天去纠结配置的问题。与此同时，它也为每个工具提供了调整配置的灵活性，无需 eject。

- VUe CLI 依赖环境

	- node
	- webpack

- VUe CLI 安装

	- npm install -g @vue/cli

### 3、Vue CLI 2

- VUe CLI 2配置过程

	- 初始化项目 ：vue init webpack my-project

- VUe CLI 2目录结构解析

	- build 和config  都是webpack的配置信息
	- node_modules 依赖node相关模块
	- static 静态资源

- 入口文件

	- Vue渲染过程

		- Vue运行过程
		- template -->  abstrast syntax tree-  ->  render  -->  virual dom   -->  UI

	- render函数的使用

		-   //1.createElement('标签',{标签属性},[''])
		-   render (createElement ) {
    return createElement ('标签名',{class: 'app属性'},['内容数组'])
  },
		-   1.createElement('标签',{标签属性},[''])
  render(createElement){
     return createElement('h2',
    {class:'box'},
     ['hello vue', createElement('button',['按钮'])])
   2.传入组件
    return createElement(App)


- webpack配置解析

### 4、Vue CLI 3

- VUe CLI 3配置过程

	- 初始化项目：  Vue create 项目名称
	- //1.命令 回车
 vue create 项目名
//2.选择自定义配置  Manually select features 
//3.选择你需要的配置
  Babel (必选)
  TypeScript（项目中使用ts开发的话，就勾选）
  Progressive Web App (PWA) Support  (接口缓存，优化项目)
  Router
  Vuex 
  CSS Pre-processors (css预处理器，需要)
  Linter / Formatter (代码格式，一般默认选中)
  Unit Testing (代码测试)
  E2E Testing（需求界面测试）
//4.根据你选的配置进行Y/N选择
//5.选择完之后，就可以运行项目  
npm run serve

- VUe CLI 3目录结构
- Vue CLI3 的配置修改

	- Vue UI
	- 配置存放路径
	- 添加新的别名 自定义配置

		- vue.config.js

### 5、Vue CLI4

### runtime-Compiler和runtime-Only的区别？

- 如果之后的开发中，依然使用template就需要选runtime-compiler
- 如果之后的开发中 ，使用的是.vue 文件开发那么可以选择runtime-Only

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

		- history.pushState({},'','home')
		- history模式也是不会刷新页面的,history对象栈结构，先进后出，pushState类似压入栈中，back是回退

	- replaceState

		- history.replaceState({},'','home')
		- replaceState模式与pushState模式区别在于replaceState模式浏览器没有返回只是替换，不是压入栈中。

	- go 

		- history.go()
		- go只能在pushState模式中使用，go是前进后退到哪个历史页面。

	- history.back() 等价于history.go(-1)
	- history.forwrad () 等价于history.go(1)

- vue-router其实用的就是这样的机制，改变url地址，这个url地址存在一份路由映射表里面，比如/user代表要请求用户页面，只要配置了这个路由表（路由关系），就可以前端跳转而不刷新页面，所有的数据请求都走ajax。

### 3、router-view基础

- 1.认识安装vue-router 

	- 使用npm install vue-router --save来安装vue-router插件模块
	- vue-router是基于路由和组件的
	- 路由用于设置访问路径，将路由和组件映射起来
	- 在vue-router的单页面应用中，页面的路径的改变就是组件的切换

- 2、路由基本配置

	- 1、安装路由 vue-router 
	- 2、Vue.use --> 创建vueRouter对象  -->  挂载到实例
	- 3、配置映射关系

		- （1）创建路由组件

			- Home.vue

		- （2）配置组件和路径的映射关系

			- //配置路由和组件之间的对应关系
  {
    path: '/home',//home  前端路由地址
    name: 'Home',
    component: Home //组件名
  },

		- （3）使用路由

			- 通过<router-link>和<router-view>

			  <router-link>是全局组件，最终被渲染成a标签，但是<router-link>只是标记路由指向类似一个a标签或者按钮一样，但是我们点击a标签要跳转页面或者要显示页面，所以就要用上<router-view>。
			  
			  <router-view> 是用来占位的，就是路由对应的组件展示的地方，该标签会根据当前的路径，动态渲染出不同的组件。
			  
			  路由切换的时候切换的是<router-view>挂载的组件，其他不会发生改变。
			  
			  <router-view>默认使用hash模式，可以在index.js中配置修改为history模式。

- 3、vue-router细节补充

	- 路由的默认路径

		- 重定向
		- {
      path: '/',
      redirect: '/home'
    },

	- 设置HTML5的history模式

		- const router = new Router({
    routes,
  mode: 'history'//修改模式为history
})

	- router-link

		- to属性：用于跳转到指定路径。
		- tag属性：

			- 可以指定<router-link>之后渲染成什么组件使用<router-link to='/home' tag='button'>会被渲染成一个按钮，而不是a标签。

		- relapce属性：

			- 在history模式下指定<router-link to='/home' tag='button' replace>使用replaceState而不是pushState，此时浏览器的返回按钮是不能使用的。

		- active-class属性：

			- 当<router-link>对应的路由匹配成功的时候，会自动给当前元素设置一个router-link-active的class，设置active-class可以修改默认的名称。

		- 在进行高亮显示的导航菜单或者底部tabbar时，会用到该属性
		- 但是通常不会修改类的属性，会直接使用默认的router-link-active
		- 如和修改linkActiveClass

	- 实现路由代码跳转

		- 不使用router-link方式进行路由跳转
		-  homeClick() {//通过代码的路径修改路由
        this.$router.push('/home')//push 等价于pushState
        // this.$router.replace('/home')//replace 等价于replaceState
        console.log("homeClick")
    },
		- 修改app.vue，将<router-link>换成button等任何组件，添加上点击事件，并写好点击事件响应方法，此时使用this.$router.push('/home')，push方法 等价于pushState方法，replace 方法等价于replaceState方法。

- 4、动态路由

	- 页面的path路径可能是不确定的 ，例如可能有/user/aaaa，除了/user之外，后面还跟上了用户ID/user/123等
	- 这种path和component的匹配关系，叫做动态路由
	- $route是代表处于激活状态的路由，通过$route.params获取 $route 所有的参数

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

		- const Home = resolve => { require.ensure(['../components/Home.vue'], () => {resolve( require('../components/Home.vue')) } )}

	- （了解）方式二：ADM写法

		- const About= resolve =>  require(['../components/Home.vue'], resolve )

	- （使用）方式三：在ES6中可以组织Vue异步组件和webpack的代码分割

		- component: () => import('../components/Home.vue')

### 5、路由嵌套使用

- 1.认识嵌套路由

	- 一个路径映射一个组件，访问两个路径也会分别选人两个组件

- 2.嵌套路由实现

	- 1. 创建对应的子组件，并且在路由映射(router/index.js)中配置对应的子路由。
	- 2. 在组件内部使用<router-view>标签来占位。

- 3.嵌套默认路径

	- 嵌套路由的默认路径（重定向）
	-  children: [
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

### 6、路由传递参数

- 1.准备工作

	- 第一步：创建新的组件Profile.vue
	- 第二步:配置路由映射
	- 第三步:添加跳转的<router-link> 

- 传递参数主要有两种类型：params和query
- 2.parms方式（简单的数据时使用）

	- params的类型也就是动态路由形式
	- 配置路由格式：/router/:id
	- 传递的方式：在path后面跟上对应的值
	- 传递后形成的路径：/router/123,router/abc
	- 通过$route.params.userId获取指定userId

- 3.query方式（数据多时使用）

	- 配置路由格式：/router，也就是普通的配置
	- 传递方式：对象中使用query的key作为传递方式
	- 传递后形成的路径：/router?id=123,./router?id=abc

- 使用代码编写传递数据，使用button代替<router-link>，并添加点击事件

  <button @click="userClick">用户</button>
  ​    <button @click="profileClick">档案</button>
  
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

- 获取参数

	- 获取参数通过$route对象获取
	- 路由对象会被注入每个组件中，赋值为this.$route,并且当路由切换时，路由对象会被更新

- $router和$route的区别

	- $router 为VueRouter的实例，需要导航到不同的URL，则使用$outer,push方法
	- 
	- $route为当前跳转对象里面可以获取name、path、query、params

		- this.$route对象是当前处于活跃的路由

	- 
	- $router和$route是继承自vuel类的原型

### 7、路由导航守卫

- 导航守卫主要用来监听路由的进入和离开的
- 1.钩子函数

	- beforeEach（改变前）
	- afterEach（改变后）

- 2.守卫主要应用

	- 动态改变页面标题

		- //*守卫导航应用- > 动态的完成标题的修改 
router.beforeEach((to,from,next) => {
  document.title = to.matched[0].meta.title
  next()
})

	- 控制访问权限----> admin

		- // 访问权限控制
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenId = window.sessionStorage.getItem('tokenid')
  if (!tokenId) return next('/login')
  next()
})

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

	- <keep-alive> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们
	- 当组件在 <keep-alive> 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行

- 2. 遇见vue-router

	- router-view`也是一个组件，如果用`<keep-alive><router-view/></keep-alive>`，将其包起来，所有路径匹配到的视图组件都会被缓存。

## 五、Vuex

### 1、为什么使用Vuex

- 1. Vuex 是做什么的

	- 状态管理到底是什么

		- vuex状态管理 === 管理组件数据流动 === 全局数据管理
		- Vue的全局数据池，在这里它存放着大量的复用或者公有的数据，然后可以分发给组件
		- Vue双向数据绑定的MV框架，数据驱动(区别节点驱动)，模块化和组件化，所以管理各组件和模块之间数据的流向至关重要
		- Vuex是一个前端非持久化的数据库中心，Vuex其实是Vue的重要选配，一般小型不怎么用，大型项目运用比较多，所以页面刷新，Vuex数据池会重置

	- 有什么状态是需要我们在多个组件间共享的呢？

		- 登录状态、商品收藏、购物车的商品、地理信息

	- > 路由---->管理的是组件流动
	- > Vuex---->管理的是数据流动

- 2.单页面状态管理

	- state：状态
	- view：视图层 针对state的变化，显示不同信息
	- Action：用户操作 --->状态改变

- 3.多页面状态管理

	- 多个视图依赖同一个状态（一个状态改变，多个界面需要进行更新）
	- 全局单列模式（大管家）
	- 思想：将共享的状态抽取出来，交给大管家，进行统一管理
	- 每个视图按照约定 进行访问修改等操作

- 4.Vuex状态管理图例

	- 1. 数据流都是单向的 
	- 2. 组件能够调用action 
	- 3. action用来派发mutation 
	- 4. 只有mutation可以改变状态 
	- 5. store是响应式的，无论state什么时候更新，组件都将同步更新

### 2、基本使用

- 1.Vuex的安装
- 2.Vuex的代码组织

### 3、 核心概念

- 1.state

	- State单一状态树-（single source of Truth ）->管理应用层级的全部状态
	- 单一状态树能够以最直接的方式找到某个状态的片段，而且在之后的维护和调式过程中，也非常方便管理和维护。
	- state就是保存一些变量，所有vue的组件都能共享

- 2.getter

	- Getters的基本使用

		- 可以认为是store里的计算属性
		- 
就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算

		- 注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果

	- Getters本身作为参数
	- Getters传递参数

		- Getter 接受 state 作为其第一个参数：

		  const store = new Vuex.Store({
		    state: {
		  ​    todos: [
		  ​      { id: 1, text: '...', done: true },
		  ​      { id: 2, text: '...', done: false }
		  ​    ]
		    },
		    getters: {
		  ​    doneTodos: state => {
		  ​      return state.todos.filter(todo => todo.done)
		  ​    }
		    }
		  })

		- 通过属性访问

			- store.getters.doneTodos

		- Getter 也可以接受其他 getter 作为第二个参数：

		  getters: {
		    // ...
		    doneTodosCount: (state, getters) => {
		  ​    return getters.doneTodos.length
		    }
		  }

		- 通过方法访问

			- getters: {
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
			- store.getters.getTodoById(2) 

- 3.Mutation

  - 更改 Vuex 的 store 中的状态的唯一方法是：提交 mutation

  	- 所有的状态修改一定是在mutation完成的

  - mutation基本使用

  	- Mutation主要包含两部分：

  		- 字符串的事件类型（type）
  		- 一个回调函数（handler），该回调函数的第一个参数就是state

  	- 定义：

  		- mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }

  	- 调用：

  		- store.commit('increment')

  - mutation传递参数

  	- 向 store.commit 传入额外的参数，即 mutation 的 载荷（payload）
  	- 如果参数多个 payload为一个对象

  - mutation提交风格

    -   1、普通的提交方式

    	- this.$store.commit("incrementCount", count);

    -    2、对象的提交方式

    	-       this.$store.commit({

        type: 'incrementCount',
        count
      })

  - mutation响应规则

  	- 
  属性都会被加入到响应系统中，而响应式系统会监听属性的变化，
  当属性发生变化时，会通知所有界面中用到该属性的地方，让界面发生刷新

  	- state对象添加新的属性时 ，使用下面的方式
  	- 方式一： Vue.set(对象，key  ,value)

  		- 也可以传入数组

  	- 方式二：用新对象给就旧对象重新赋值
  	- 响应式 删除属性
  	- Vue.delete( target, propertyName/index )

  - mutation常量管理

  	- 用常量代替事件类型，并把常量放入单独的文件中
  	- 在需要多人协作的大型项目中，这会很有帮助

  - mutation同步函数

  	- 通常情况下 mutation的方法必须是同步方法
  	- 主要原因：使用devtools时 ，可以捕捉mutation快照
  	- 但是如果是异步操作，devtools将不能很好地跟踪操作时候时候会被完成
  	- So, if  there are ansy oprerations.please see following.

- 4.Action

	- Action的基本使用

		- 如果有异步操作，比如网络请求
		- Action类似与mutation，但是可以用来代替mutation完成异步操作

	- action的分发

		- Action 通过 store.dispatch 方法触发：
		- store.dispatch('increment')
		- // 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})
		- // 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})

	- Action返回的promise

		-   actions: {
    aupdateInfo(context,payload) {
        return new Promise((reslove,reject) => {
        setTimeout(() => {
          context.commit('updateInfo')
          console.log(payload);
          reslove('success')
        },1000)
        })
    }
  },


updateInfo(){
​      this.$store
​      .dispatch('aupdateInfo','我是参数')
​      .then(res => console.log('回调已完成'+res))
​    }

- 5.Module

	- 认识Vuex的Module

		- Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割

	- Module的局部状态

		- 对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。
		- 模块内部访问  根节点  rootState

	- Module的Action写法

		- 接收context参数对象
		- 局部状态通过context.state暴露出来
		- 根节点状态则为 context.rootState

- 总结：

	- state

		- 就是一个仓库，数据源的存放处。
		- 它是响应式的，如果从组件里获取数据，数据源发生改变，组件也随之发生改变。

	- getter

		- 可以对state进行操作，相当于state数据的计算属性。
		- 也可以在组件中复用。

	- mutation

		- 同步执行。修改state数据的唯一途径。直接变更state状态。

	- action

		- 可以包含异步操作。不能直接操作state，需要通过提交mutation来修改state数据。
		- 用于异步请求，业务代码。

	- 如果业务复杂不用vuex的话，可维护性下降，
要修改数据要改三个地方，可读性也下降。
会让耦合性增加。
耦合性指模块间相互联系紧密程度的一种度量。
耦合性越强，独立性越差。


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
