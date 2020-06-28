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


