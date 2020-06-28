# 原型之深入浅谈

##  什么是原型对象 ？

（1）我们创建的每一个函数，解析器都会向函数中添加一个属性 prototype 这个属性对应着一个对象，就是所谓的原型对象。

function Fn() {}  内部语句: this.prototype = {}                ====>  this是这个函数对象Fn 在函数中添加一个属性prototype原型对应一个空的object对象 这就是原型对象  

（2）构造函数的prototype属性与它创建的实例对象的[[prototype]]属性指向的是同一个对象，即 对象.__proto__ === 函数.prototype 

var obj= new Fn()   内部语句: this.__proto__ = Fn.prototype    ====>  Fn.prototype 里面存的地址值赋值给__proto__那样它们就指向同一个对象   

也就是说每个函数都有一个 prototype（原型）属性，这个属性是一个对原型对象，它的用途是包含可以由特定类型的所有实例共享的属性和方法。

逻辑上可以这样理解prototype通过凋用构造函数而创建的那个对象的原型对象。使用原型的好处可以让所有对象实例共享它所包含的属性和方法。也就是说，不必在构造函数中定义对象信息。





### 原型对象

 当函数以构造函数调用时，它所创建的对象中都会有一个隐含属性this 指向 ===>该构造函数的原型对象，可以用过__proto__来访问该属性。

1. 每个函数function都有一个prototype，即显式原型(属性)

2. 每个实例对象都有一个__proto__，可称为隐式原型(属性)

3. 对象的隐式原型的值为其对应构造函数的显式原型的值

区分：

   1、显式原型  function.prototype  创建函数时自动产生 。顺序： 先产生函数 后产生实例

   2、隐式原型   object.__proto__   通过函数创建实例对象产生。	

   3、显式原型  function.prototype  ===  object.__proto__ 隐式原型 相等关系。   

   4、  显式原型prototype 针对的是构造函数 (类) 而  隐式原型_proto__  针对的是实例对象。

代码理解示例：

```JS
  //定义构造函数
  function Fn() {   
          // 内部语句: this.prototype = {}  ===>  this是这个函数对象 在函数中添加一个属性prototype原型对应一个空的object对象 这就是原型对象
  }
  
  // 1. 每个函数function都有一个prototype，即显式原型属性, 默认指向一个空的Object对象
  console.log(Fn.prototype)
  
  // 2. 每个实例对象都有一个__proto__，可称为隐式原型
  
  var fn = new Fn  ( 内部语句: this.__proto__ = Fn.prototype )  ==> Fn.prototype里面存的地址值赋值给__proto__那样他们就指向同一个对象
  
  console.log(fn.__proto__)
  
  // 3. 对象的隐式原型的值为其对应构造函数的显式原型的值
  console.log(Fn.prototype===fn.__proto__) // true
  
  //给原型添加方法
  Fn.prototype.test = function () {
    console.log('test()')
  }
  //通过实例调用原型的方法
  fn.test()
```

重点：理解原型 🔴

代码示例一：✔原型对象的访问属性

```JS
function Person(){}//定义构造器
//设置原型属性
Person.prototype.gender = "man";
//创建实例对象
var xiaoming = new Person();
//设置对象属性
xiaoming.sex = "20";

console.log("xiaoming.sex:      " + xiaoming.sex);
console.log("xiaoming.gender:       " + xiaoming.gender);
console.log("Person.sex:           " + Person.sex);
console.log("Person.gender:            " + Person.gender);
console.log("Person.prototype.sex: " + Person.prototype.sex);
console.log("Person.prototype.gender:  " + Person.prototype.gender);

 xiaoming.sex:          20         ==>    //实例对象的sex属性可以访问
 xiaoming.gender:       man        ==>    //实例的对象可以访问到构造函数中的原型属性
 Person.sex:           undefined   ==>    //构造函数中访问不到 实例化对象的sex 属性
 Person.gender:        undefined   ==>    //构造函数中访问不到 重写的属性
 Person.prototype.sex: undefined  ==>    //构造函数中访问不到 实例化对象的原型sex属性
 Person.prototype.gender:  man     ==>    //构造函数中可以访问到自身重写的原型链属性
 
 *******************原型查找访问是动态的*******************
var person ={}
var xiaoming ={}
// xiaoming. __proto__=person;    ==> //  __proto__  设置对象原型
                                             ↓↑
xiaoming=Object.create(person);   ==> //Object.create 设置对象原型

console.log(xiaoming.age);//=> undefined
//在person上增加age属性
person.age =10;
//现在有反应了，因为它从 person上找到了age属性
console.log (xiaoming.age);//=>person
```

 

 代码示例二：✔  在原有的原型对象上增加属性或者方法

```js
function Ball() {  
      //设置对象属性 会因为对象创建的实例化对象不一样可以更改
        // this.a = 1;
      }
      //原型方法
      Ball.prototype.name1 = function() {
        console.log("我是 构造器中的原型方法，你是可以访问的");
      };
      //通过 Box new的对象 是不具备静态方法的(自身方法)
      /*作用 ： 解决所有相关类的自身方法，不是解决对象的方法  唯一性*/
      Ball.name2 = function() {
        console.log("我是 构造器中的自身方法, 你是不可以访问的")
      };
      //设置(动态)原型属性  不会因为对象的创建的实例化对象而更改
      Ball.prototype.age1= "我是构造器中的(动态)原型属性"
      //静态属性
      Ball.age2 = "我是构造器中的(静态)自身属性";
     
      var ball = new Ball();
      ball.name1();
      Ball.name2(); 
      ball.age1=10; //设置对象属性
      console.log(ball);
      Ball.age2=20; //修改构造器属性
      console.log(Ball);
      
      
注意  如果函数作为普通函数调用prototype没有任何作用
function Foo(){}

Foo.prototype; //prototype并非函数真正的原型(proto)。
console.log( Foo.__proto__=== Foo.prototype);   //false


总结：
           静态属性和静态方法不会随之产生新对象而改变
           因为这个属性和方法就属于当前类自身的属性,与实例的对象无关
```



### 原型的作用

原型对象默认拥有一个constructor属性，指向指向它的那个构造函数(也就是说构造函数和原型对象是互相指向的关系)  ===>>>>>>>  Fun.prototype.constructor===Fun //true

1.原型对象就相当于一个公共区域	所有同一个类的实例都可以访问这个原型对象 ===> 可以将对象共有的内容，统一设置道原型对象中

2.创建构造函数时，可以将对象共有的属性和方法，统一添加到构造函数的原型对象中，这样就分别为每一个对象添加也不会影响到全局作用域，就可以使每个对象具有属性和方法

作用： 是指向构造函数的原型属性constructor.通过这两个属性，就可以访问到原型里的属性和方法了。

1. 给原型对象添加属性(一般是方法) ===>实例对象可以访问

2. 访问原型里的属性和方法。

```js
//在类的原型中增加方法,实例的对象就可以调用它 
function Box() {
    this.a=10;  //这里的this 会被不同的实例化对象而替代
} 

//(1)原型方法==>动态方法,根据模型创建的对象的方法  prototype就是new的对象实例的方法
Box.prototype.sum=function () {
    this.a=10; 
};

//(2)静态方法,模型的方法   静态方法中不能操作this
Box.sum=function () {
    //通过 Box new的对象 是不具备静态方法的(自身方法) 
};
//静态属性
Box.num= 10;
//        Box.prototype.constructor=Box  ===>构造器重新指向Box
//        构造函数作用就是根据类创建对象时执行的初始函数,也就是执行对象入口函数
var b=new Box();
b.sum();
Box.sum();
```

 示例  ：利用原型可以实现数组定义方法

```js
 Array.prototype.max=function () {
        if(this.some(function (t) { return isNaN(Number(t)) })) return NaN;
        return this.reduce(function (p1, p2) {
            return p1>p2 ? p1 : p2;
        })
    };
    var arr=[1,5,2,0,19,28,75,20];
    console.log(arr.max());
    缺点：
     如果设置了原型下的方法 有可能会把所有的原型链都会改变 造成不可预料的bug
```

 ###  原型方法

可以使用 Object.getPrototypeOf(obj)方法来获得对象的原型

```js
hasOwnProperty()
		//判断对象下的某个属性是否是该对象的对象属性
		//主要用来判断原型是否被修改
isPrototypeOf() //判断一个对象是否指向了该构造函数的原型对象，可以使用 isPrototypeOf()方法来测
		//方法用于测试一个对象是否存在于另一个对象的原型链上
		consloe.log(Box. prototype is PrototypeOf(obj))
             //判断一个对象是否是该构造函数的原型
            consloe.log(Box. prototype is PrototypeOf(obj))//只要实例化对象，即都会指向
propertylsEnumerable()
		//方法返回一个布尔值，表明指定的属性名是否是当前对象可枚举的自身属性
		//枚举就是用 for in可以罗列出来的属性
		//判断该对象下的属性是否可枚举(遍历)属性
constructor
     对象中constructor就是这个对象抽象的类名,映射,根据对象映射类名
		字面量方式为什么 constructor会指向 Object？因为 Box prototype=这种写法其实就是创建了一个新对象。
       而每创建一个函数，就会同时创建它 prototype这个对象也会自动获取 constructor属性。所以，新对象的 constructor重写了Box原来的 constructor，
       因此会指向新对象，那个新对象没有指定构造函数，那么就默认为 Object.原型的声明是有先后顺序的，所以，重写的原型会覆盖之前的原型。	
```

## 原型链的理解             

> 原型链(又叫做原型继承)     作用: 查找实例对象的属性(方法)

 原型链：

​         访问对象的属性和方法时，会在对象自身中寻找，如果有则直接使用，如果没有则会去原型对象中寻找，如果找到则直接使用。

- 别名: 隐式原型链          

- 作用: 查找实例对象的属性(方法)

- 访问一个对象的属性时，

  ​    1. 先在自身属性中查找，找到返回

  ​    2. 如果没有, 再沿着__proto__这条链向上查找, 找到返回

  ​    3. 如果最终没找到, 返回undefined 

> 提示：Object的原型对象是原型链尽头 因为  Object的隐式原型属性为 null



原型链：所有的实例对象的隐式原型__proto__ 等于 构造函数的显式原型prototype，

所有的实例对象隐式原型都指向构造函数的显式原型，

所有我们创建的构造函数的原型对象都是object的实例 重点理解！！！

```js
函数既有显式原型又有隐式原型 自身的显式原型和隐式原型不相等  但是构造函数相等
1. 函数的显式原型指向的对象默认是空Object实例对象(但Object不满足
console.log(Fn.prototype instanceof Object) // true
console.log(Object.prototype instanceof Object) // false
console.log(Function.prototype instanceof Object) // true

2. 所有函数都是Function的实例(包含Function
  函数既有显式原型又有隐式原型 自身的显式原型和隐式原型不相等  但是构造函数相等
  Function.__proto__===Function.prototype

3. Object的原型对象是原型链尽头
Object.prototype.__proto__  =====> null 
```

###  instanceof是如何判断的?

**表达式:   A实例对象  instanceof B  构造函数对象** 

 ----- 如果B函数的显式原型对象在A对象的原型链上, 返回true, 否则返回false

```js
  案例1
  function Foo() {  }
  var f1 = new Foo()
  console.log(f1 instanceof Foo) // true  ==>所有的实例对象隐式原型都指向构造函数的显式原型
  console.log(f1 instanceof Object) // true

  案例2    探索：：实例对象的隐式原型__proto__ 等于 构造函数的显式原型prototype
  console.log(Object instanceof Function) // true   ==> 满足：Objec对象的隐式原型等于Function构造函数的显式原型
  console.log(Object instanceof Object) // true     ==> 满足：Objec对象的隐式原型等于Function构造函数的显式原型
  console.log(Function instanceof Function) // true  ==> 满足：Function的隐式原型等于Function构造函数的显式原型
  console.log(Function instanceof Object) // true 

  function Foo() {}
  console.log(Object instanceof  Foo) // false 
```

### 原型链的属性问题？

1. 读取对象的属性值时: 会自动到原型链中查找

2. 设置对象的属性值时: 不会查找原型链, 如果当前对象中没有此属性, 直接添加此属性并设置其值

3. 方法一般定义在原型中, 属性一般通过构造函数定义在对象本身上

```js
function Fn() {}
  Fn.prototype.a = 'xxx'
  var fn1 = new Fn()
  console.log(fn1.a, fn1)

  var fn2 = new Fn()
  fn2.a = 'yyy'
  console.log(fn1.a, fn2.a, fn2)
***************************************************************
  function Person(name, age) {
    this.name = name
    this.age = age
  }
  Person.prototype.setName = function (name) {
    this.name = name
  }
  var p1 = new Person('Tom', 12)
  p1.setName('Bob')
  console.log(p1)

  var p2 = new Person('Jack', 12)
  p2.setName('Cat')
  console.log(p2)
  console.log(p1.__proto__===p2.__proto__) // true
```

### 构造函数与原型的关系？

构造函数用于定义实例属性，而原型模式用于定义方法和共享的属性，这样每个实例都会有自己的一份实例属性的副本，但同时还共享方法的引用，同时还支持向构造函数传参数，但是对于引用类型的变量，还是只能共用

```JS
function Person (name,age,job) {
    this.name = name
    this.age = age
    this.job = job
    this.friends = ['jack','rose','wille']
}
Person.prototype = {
    constructor: Person,
    sayName: function () {
        console.log(this.name)
    }
}
var willie = new Person('willie','18','clerk')
var bob = new Person('bob','20','athlete')
```


  总结：

​     (1) 原型是指类的动态方法集   

​     (2)原型链是对象的方法集,源资源与类的原型,原型链等于原型 

   （3）原型链：所有的实例对象的隐式原型__proto__ 等于 构造函数的显式原型prototype，

也就是所有的实例对象隐式原型都指向构造函数的显式原型，所有我们创建的构造函数的原型对象都是object的实例 重点理解！！！
