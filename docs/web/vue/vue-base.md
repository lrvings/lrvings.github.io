## 一、Vue 基础语法

### 概念

- 双向数据绑定

	- 数据发送改变时，DOM会自动更新
	- 当表单控件值发生改变时，数据也会自动更新

- 响应式数据

	- 数据驱动视图，当数据发生改变，那么所有绑定该数据的 DOM 都会跟着改变（MVVM）

- MVVM架构

	- data和vue对象分离
	- MVVM是由经典的软件架构MVC衍生出来的， 当View变化，自动更新到ViewModel视图模型， 反之亦然。 View与ViewModel之间通过双向绑定建立联系

### Vue实例常见配置选项

- el:

	vue实例的挂载目标（实例中所有的属性/法可直接在e中直接使用），挂载元素会被We生成的DOM替换

- data

	 Vue实例化时，它将data中所有的属性添加到响应式系统中，当这些数据改变时，视图会进行重渲染

- methods

	- 可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。
	- 方法中的 `this` 自动绑定为 Vue 实例
	- 一般用于编写公共方法、事件处理函数等，方法中的ths指向实例，所以不应该使用箭头函数来定义 method函数

- render

	 template的代替方案，允许你发挥 JavaScript最大的编程能力。该渲染函数接收一个 create((tagName. props，children）方法作为第一个参数用来创建 VNode

- watch

	 监听属性（ Function），监听的值被修改时会自动调用函数，当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的

### 1、插值语法

-  v-once

	- 只会渲染一次 ，不会随着数据的改变而改变

-  v-html

	- 在DOM内插入HTML内容

-  v-text 

	- 渲染指定DOM的内容文本

- v-pre

	- 跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。

- v-cloak和css规则如 [v-cloak] { display: none } 一起用，可以隐藏未编译的 Mustache 标签直到实例准备完毕

	- 解决初始化页面慢导致闪动的问题。 网速慢， Vue.js文件还没有加载完， 在页面上会显示{{msg}}字样， 直到Vue创建实例、编译模版时，DOM才会被替代。需要搭配样式： [v-cloak]{display:none}

### 2、绑定属性

-  v-bind 

	- 用来动态绑定属性值

- 绑定Class

	- v-bind:class

		-  对象语法：

			-  对象的 key 就是类名

				-  v-bind:class="{done: item.done}"

			-   对象的 value 是布尔值

				-   当布尔值为 true 的时候，作用这个 key 样式
				-   当布尔值为 false 的时候，去除这个 key 样式

		- 数组语法：
		```js
			 <div v-bind:class="[activeClass, errorClass]"></div>
		```
- 绑定Style

	- v-bind:style

		- v-bind:style （即:style ）可以给元素绑定内联样式

- v-bind语法糖

	 <!-- 缩写 -->
	` <a :href="url">...</a> `

### 计算属性和监视属性

- 计算属性

	- 什么时候使用计算属性

		- 当我们的数据需要经过一系列的变化 再 展示到页面时 就需要用计算属性

	- computer属性对象中定义计算属性的方法
	- 缓存特性

		- methods和computed  区别？
		- 计算属性会进行缓存，如果多次使用是，计算属性只会调用一次 相比methods 效率高

	- getter和setter（理解）

		- getter 用来读取,计算属性默认只有 getter
		- 计算属性一般是没有setter方法的 ，只读属性
		- 通过getter和setter实现对数据的显示和监视
		- 计算属性存在缓存，多次读取只执行一次getter计算

- 监视属性

	- 通过vm对象的$watch()或watch配置来监视指定属性
	- 当属性变化时 ，回调函数自动调用，在函数内部进行计算
	- 监视数据的改变，当数据发生改变时 ，自定义一些业务处理

- 过滤器

	- 经常用于格式化文本，比如字母全部答谢，货币千位十一哦那个逗号分隔等。 过滤的规则是自定义的，通过给Vue实例添加选项filters来设置

### 3、事件监听

- v-on

	- 绑定事件监听

- 缩写：@
- v-on参数

	- event
	- 参数问题：

		- 情况一：该方法不需要额外参数，方法后的（）可以不添加
		- 情况二：如需要同时传入某个参数，同时需要event时，可以通过$event 传入事件

- 事件修饰符

	- 1. .stop 阻止事件冒泡
	- 2. .prevent 阻止事件默认行为
	- 3. .self 事件绑定的元素本身触发时才触发回调
	- 4. .once 事件只能触发一次，第二次就不会触发了
	- 5. .native 将一个vue组件变成一个普通的html，使其可以监听click等原生事件

		- 可以使自义定组件添加点击事件

### 4、条件和循环

- v-if  v-else

	- 根据表达式的值的真假来决定是否插入/移除元素
	- v-if原理： v-if 后面的条件为false时，对应的元素和其子元素不会渲染

- v-show 

	- 用于决定是否展示该元素，底层通过display：none实现
	- 元素是否显示或隐藏

- v-if和v-show对比

	-  v-if      当条件为false时，压根就不会有对应的元素在DOM中
	- v-show当条件为false时，只是将元素的dispaly属性设置为none  无论如何都渲染
	- 开发中如何选择？

		- 当需要显示和隐藏之间切换频繁时，使用v-show
		- 当只有一次切换时，使用v-if

- v-for

	- 循环遍历

		` v-for=item of items `

	- 遍历数组

		 `v-for=(item,index) in items`

			- index代表取出原数组的索引值

	- 遍历对象

		 `v-for=(value.key,index) in obj`

- 组件的Key属性

	- 推荐使用v-for时给对应的元素或者组件添加上一个 ：Key 属性
	- 主要为了高效的更新虚拟DOM

- 数组更新检测

	- Vue 将被侦听的数组的变更方法进行了包裹，所以它们也将会触发视图更新（响应式）
	- push()
	- pop()
	- shift()
	- unshift()
	- splice()
	- sort()
	- reverse()

### 5、表单绑定

- v-model

  - 双向数据绑定

  	- v-bind是单向数据绑定(内存js改变影响页面)

- 原理：

  - 1、v-bind绑定一个value属性

  - 2、 v-on给当前元素绑定input事件

  - 代码演示

    ```js
    <div id="app">
    <input v-model="message" type="text" placeholder="输入"/> {{message}} 
    ```
     v-model 双向数据绑定原理:

    ```js
    <input type="text" :value="message" placeholder="入" @input="valueChanage" /> {{message}}
    <input type="text" :value="message" placeholder="输入" @input="message = $event.target.value" />
     {{message}}
    </div>
    
       <script src="../js/vue.js"></script>
       <script>
			new Vue({
				el: "#app",
				data: {
				message: ""
			},
			methods: {
			valueChanage(event) {
			    this.message = event.target.value
			   }
				}
			})
    </script>
    ```

- v-model: CheckBox

  - 单选框

    - 单个勾选框 v-mdel 为布尔值

  - 多选框

    - 当多选框式，对应的data中属性是一个数组 ，选中某个时 ，就会将input的value添到数组中

  - 动态绑定CheckBox：
     ```vue
       动态的绑定CheckBox
      <label v-for="item in hobbies" :for="item">
       <input v-model="arr" type="checkbox" :value="item" :id="item"/>  {{item}} 
      </label>
      ```

- 表单修饰符

  - 1. .lazy 在输入框输入完内容，光标离开时才更新视图
  - 2. .trim 过滤首尾空格
  - 3. .number 如果先输入数字，那它就会限制你输入的只能是数字;如果先输入字符串，那就相当于没有加.number

### 自定义指令

- 需要操作DOM时 自定义指令
- Vue.directive('指令名称'，{选项参数})
- 钩子函数

