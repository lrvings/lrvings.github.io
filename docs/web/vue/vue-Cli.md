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