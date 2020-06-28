# JS BOM And DOM

## DOM浏览器文档模型

### 什么是DOM

Document Object Model文档对象模型
HTML DOM定义了访问和操作HTML文档的标准方法
要改变页面的某个东西，JavaScript就需要或者HTML文档所有元素进行访问的入口。
这个入口连同HTML元素进行添加、移动、改变或移除的方法和属性都是通过文档 对象模型来获得的
我们可以通过javascript操作DOM，可以对节点实现增删改查操作，可以动态的添加标签和属性等。

### 节点Node

- 什么是节点

  HTML文档中每个成分都是一个节点。
  （1）节点类型
  DOM是这样规定的：
  整个文档是一个文档节点
  每个HTML标签是一元素节点
  包含在HTML元素中的的文本是文本节点
  注释属于注释节点
  
  （2）节点的层次关系-节点彼此都有等级关系
  HTML文档中的所有节点组成一个文档树(节点树)。HTML中的每个元素、属性、文本都代表着树中的一个节点，树起始于文档节点，并由此继续伸出枝条，直到处于这个数最低级别所有文本节点为止。
  

<head>和<body>的父节点是<html>节点，文本节点“helloworld”的父节点是<p>节点。
  <head>节点有一个子节点:<title>节点，<title>节点也有一个子节点:文本节点"DOM tutorial",
  当节点同分享一个父节点时,他们就是同辈(同级节点)，比方说，<h1>和<p>时同辈，因为他们的父节点均是<body>

节点。
  
  节点也可以拥有后代。后代指某个节点的所有子节点，或者这些子节点的子节点、
  节点也可以拥有先辈。先辈是某个节点的父节点，或者是某个父节点的父节点
  （3）节点属性

- 节点属性

- nodeName（节点名称）

	- 文档 节点的nodeName是#document
	- 元素节点的nodeName是标签名称
	- 文本节点的nodeName永远是#text
	- 属性节点的nodeName是属性名
	- 注释节点的nodeName是#comment

- nodeValue（节点值）

	- 元素节点的nodeValue不可用null
	- 文本节点，nodeValue属性包含文本内容
	- 属性节点的nodeValue是属性值
	- 注释节点 nodeValue包含注释内容

- nodeType（节点类型）

  可以用来判断当前是不是文档节点

	- 元素---1
	- 属性---2
	- 文本---3
	- 注释---8
	- 文档---9

- 获取元素节点

- document.getElementById()

	- 获取id元素

- document.getElementsByTagName()

	- 获取标签名

- document.getElementsByName()

	- 获取Name元素

- document.getElementsByClassName()

	- 获取class类元素

-  document.querySelector

	- 获取标签名获得第一个元素

- document.querySelectorAll

	- 获取所有标签名的元素

- 节点分类

	- 文档节点：整个HTML文档
	- 元素节点：HTML文档中的HTML标签
	- 属性节点：元素的属性
	- 文本节点：HTML标签中的文本内容

- 节点遍历

	- 方法

		- getElementsByName()

			- 返回当前节点的指定标签名的后代节点

	- childNodes：所有的子节点  获取当前节点 的所有子节点 包括注释文本
	- children：所有标签类型的子节点   获取所有子元素
	- firstChild：第一个子节点 
	- firstElementChild：第一个子节点 (元素)
	- lastChild：最后一个子节点 
	- lastElementChild：最后一个子节点 (元素)
	- parentNode：获取当前节点的父节点
	- previousSibling：当前节点的前一个兄弟节点
	- previousElementSibling：前一个兄弟节点 (元素)
	- nextSibling：当前节点的后一个兄弟节点 
	- nextElementSibling：后一个兄弟节点 (元素)

### 事件Event

JavaScript与HTML之间的交互就是通过事件来完成的

用户和浏览器的交互行为

- 文档或者浏览器窗口发生的一些特定的交互瞬间

	-  当事件的响应函数被触发时，浏览器每次都会传入一个事件对象作为实参传递进响应函数

		- 事件对象中封装了当前对象相关的一切信息

	- 解决事件对象兼容性问题
 event = event || window.event;

- 常用的事件

	- - onload：当网页加载完成时。只能给&lt;body&gt;用。

		- Window.onload  -会在整个页面加载完以后才触发

	- - onclick：当点击时，所有标记都适用。
	- - onscroll：当拖动滚动条时
	- - onmouseover：当鼠标放上时
	- - onmouseout：当鼠标移开时
	- - onsubmit：当提交表单时
	- - onreset：当重置表单时
	- - onfocus：当获得焦点时，把光标定位到文本框中。
	- - onblur：当失去焦点时，把光标从文本框中移开。
	- - onchange：当下拉列表内容改变时。用在下拉列表、上传文件。
	- - onselect：当选中文本时。
	- - onresize：当改变窗口大小时，发生的事件。
	- onkeydown 某个键盘按键被按下。 
	- onkeyup 某个键盘按键被松开。 

### DOM属性

- DOM常见属性

	- 当前文档页面的宽高

		- document.documentElement.clientHeight
		- document.documentElement.clientWidth

	- 元素占有的可见空间

		- 属性是只读的，不能修改  这两个属性都不带px 都是一个数字  可以直接进行计算
		- clientWidth

			- 获取元素宽度  :width+padding (不包含border)

		- clientHeight

			- 获取元素高度 : Height+padding (不包含border)

		-  element.offsetHeight 

			- 获取元素高度 : Height+padding +border

		- element.offsetWidth 

			- 获取元素宽度 : Height+padding +border

	- 滚动属性

		-  获取元素滚动条滚动的距离

			-  scrollLeft
			-  scrollTop

		- 获取元素滚动区域的宽度和高度

			-  scrollWidth
			-  scrollHeight

	-  offsetParent 

		- 获取当前元素的定位父元素   获取离当前最近的开启定位的祖先元素 如果所有的祖先元素都没有开启定位 则返回body

	- 元素到边界的偏移

		-  offsetLeft :   当前元素左边框距离父元素的距离  如果父元素没有定位  就是相对于浏览器窗口 如果有定位 就是相对于定位的父级元素
		-  offsetTop  : 当前元素上边框距离父元素的距离

- DOM常用属性

	- document.body : body元素
	- document.title  获取设置文档的标题
	- document.URL:  获取完整的URL
	- document.domain:  获取域名

- 获取节点上的属性

	- getAttribute(属性)

- 节点创建一个新属性

	- setAttribute(属性,值)

- 删除一个节点上的属性

	- removeAttribute(name)

### DOM 对象的样式

- 设置DOM对象的样式

	- 元素.style.styleName = ""
	- 注: 这种方式添加的是行内样式

- 获取当前有效样式

	- function getStyle(elem , attr ) {
    //第一种方式
  if (window.getComputedStyle) {
    //正常的浏览器 具有getComputedStyle()方法
    return getComputedStyle(elem , null)[name]
  } else {
    //IE8以下的浏览器
    return obj.currentStyle[name]
    //第二种方式
    //return window.getComputedStyle? getComputedStyle(obj)[attr]:elem.currentStyle[name];
}

### DOM方法

- 新建节点元素

	- document.createElement('元素名');

		- 创建新的元素节点

	- document.createTextNode('文本内容');

		- 创建新的文本节点

	- document.createComment('注释节点');

		- 创建新的注释节点

	- document.createDocumentFragment( );

		- 创建文档片段节点

- 添加元素节点

	- parent.appendChild( element/txt/comment/fragment );

		- 向父节点的最后一个子节点后追加新节点

	- parent.insertBefore( newChild, existingChild );

		- 向父节点的某个特定子节点之前插入新节点

- 删除元素节点

	- parentNode.removeChild( existingChild );

		- 删除子节点

	- child.remove();

- 替换元素节点

	- parentNode.replaceChild( newChild, existingChild );

		- 用新节点替换父节点中已有的子节点

- 修改/获取行间元素属性

	- element.getAttribute('属性名') 

		- 方法返回指定属性名的属性值。

	- element.removeAttribute('属性名'); 	删除具有指定属性名称的属性，无返回值
	- element.setAttribute( attributeName, attributeValue ); 	若原元素已有该节点，此操作能达到修改该属性值的目的

## BOM浏览器对象模型

### 什么是BOM对象

BOM：Browser Object Model 是浏览器对象模型，浏览器对象模型提供了独立与内容的、可以与浏览器窗口进行互动的对象结构，BOM由多个对象构成，其中代表浏览器窗口的window对象是BOM的顶层对象，其他对象都是该对象的子对象

- BOM和DOM的区别

	- DOM描述了处理网页内容的方法和接口，BOM描述了与浏览器进行交互的方法和接口
	- 1) DOM是W3C的标准[所有浏览器都遵循的标准]
	- 2) DOM（文档对象模型）是 HTML 和 XML 的应用程序接口（API）
	- 3) BOM各个浏览器厂商根据DOM在各自浏览器上的实现;[表现为不同浏览器定义有差别,实现方式不同
	- 4) BOM 主要处理浏览器窗口和框架，不过通常浏览器特定的 JavaScript 扩展都被看做 BOM 的一部分。这些扩展包括window(窗口)、location（地址栏内容相关）、history（历史）、screen（屏幕）、navigator（有很多浏览器相关的内容，通常判断浏览器类型都是通过这个对象）
	- DOM 是为了操作文档出现的 API，document 是其的一个对象
	- BOM 是为了操作浏览器出现的 API，window 是其的一个对象

### Window对象

-  代表整个浏览器窗口，同时Window也是网页的全局对象
- 属性

	- 窗口的大小

		- 视口的大小

			- document.body.clientWidth或者document.body.clientHeight

		- 窗口本身的尺寸

			- window.outerWidth

				- -可以获取浏览器窗口整个宽

			- window.outerHeight

				- -可以获取浏览器窗口整个高

		- 页面视图区的大小(减去边框)

			- window.innerWidth

				-  - 浏览器窗口的内部宽度(包括滚动条)

			- window.innerHeight

				-  - 浏览器窗口的内部高度(包括滚动条)

	- 窗口的位置

		- screenLeft或者screenTop
		- screenX或者screenY

	- 窗口关系与框架

		- top指向最外层的框架
		- parent指向当前的父框架
		- self指向自身

	- closed 返回窗口是否已被关闭。 

- 方法

	- 打开窗口open

		- window.open('page.html', 'newwindow', 'height=100, width=400, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')
		- window.open 弹出新窗口的命令； 
		- 'page.html' 打开窗口的网页； 
		- 'newwindow' 弹出窗口的名字（不是文件名），非必须，可用空''代替； 
		- height=100 窗口高度； 
		- width=400 窗口宽度； 
		- top=0 窗口距离屏幕上方的象素值； 
		- left=0 窗口距离屏幕左侧的象素值； 
		- toolbar=no 是否显示工具栏，yes为显示； 
		- menubar，scrollbars 表示菜单栏和滚动栏。 
		- resizable=no 是否允许改变窗口大小，yes为允许； 
		- location=no 是否显示地址栏，yes为允许； 
		- status=no 是否显示状态栏内的信息（通常是文件已经打开），yes为允许；
		- fullscreen 窗口是否最大化

	- 对话框

		- alert();

			- 系统对话框

		- confirm();

			- 确认 取消 选择框

		- prompt()；

			- 文本提示框

	- 间隔与延迟

		- 间隔执行一段代码（函数）：window.setInterval("要执行的代码"，间隔的毫秒数)
		- 延迟一段时间执行某一段代码（函数）：window.setTimeout("要执行的代码"，延迟的毫秒数)
		- 清除间隔执行：window.clearInterval(间隔的id); 循环一次之后用来清除隔执行的代码
		- 清除延迟：window.clearTimeout(延迟的id)；清除setTimeout

	- 窗口位置移动

		- resizeTo() 

			- -调整当前窗口的尺寸高度和宽度

		- resizeBy() 

			- 调整窗口的大小

		- moveTo()

			-  -移动当前窗口

		- scrollBy() 

			- 按照指定的像素值来滚动内容 

		- scrollTo()

			-  把内容滚动到指定的坐标

	- 关闭窗口

		- 关闭当前窗口close()
		- 关闭多个子窗口：先将打开的窗口存入数组内，利用循环将其挨个关闭；
		- w.close()：关闭保存在变量w中的那个窗口；
		- window.opener.close()；  关闭打开当前窗口的源窗口

### Navigator 对象

-  代表当前浏览通过改对象可以识别不同的浏览器
- 属性

	- userAgent

		- 返回由浏览器发送到服务器的用户代理报头（user-agent header）
		- userAgent 是一个字符串 包含有用来描述浏览器信息的内容  不用的浏览器有不同的userAgent
		- 正则判断浏览器

			- var ua = navigator.userAgent;
        console.log(ua);
        //正则判断浏览器
        if(/firefox/i.test(ua)){
            alert("火狐");
        }else if(/chrome/i.test(ua)){
            alert("Chrome");
        }else if(/msie/i.test(ua)){
            alert("IE");
        }else if("ActiveXObject" in window){
            alert("IE11");
        }

	- appVersion 

		- 返回浏览器平台和版本信息

	- platform

		- 返回浏览器操作系统

	- language 

		- 返回浏览器语言

	- online

		- true浏览器是否在线

	- appName

		- 返回浏览器的名称

### Location 对象

- 代表当前浏览器地址栏信息，可以获取浏览器地址栏信息，或者操作浏览器跳转页面
- 属性

	- window.location对象：用于获得当前页面的地址 (URL)，并把浏览器重定向到新的页面
	- hash

		- 获取地址栏中#号后面的字符串，不包含散列，如果没有，则返回空字符串

	- search

		- 获取返回地址栏 ？号后面的所有值

	- host

		- 返回服务器名称和端口号

	- port 

		- 返回URL中的指定的端口号，如URL中不包含端口号返回空字符串

	- portocol 

		- 返回页面使用的协议。 http:或https:

	- pathname 

		- 返回目录和文件名。 /project/test.html

	- host 

		- 返回服务器名称和端口号

	- href

		-  设置指定跳转链接 
		- location = “www.baidu.com”;

- 方法

	- 跳转页面带有历史记录

		- location.herf = 'https://www.baidu.com'常用
		- location.assign("https://www.baidu.com")
		- window.location="www.baidu.com"

	- 跳转页面不带有历史记录

		- repalce()

			- location.replace("https://www.baidu.com")

	- 刷新当前页面

		- reload()

			- 从缓存中重新加载当前页面

		- reload(true)

			- 从服务器加载
			- 强制清空缓存刷新页面

### History 对象

- 代表浏览器的历史记录，可以通过该对象来操作浏览器的历史记录

	- - 由于隐私问题，该对象不能获取具体的历史记录 只能操作浏览器的向前或者向后
	- - 该操作只在当次访问时生效

- 属性

	- Length     获取当前访问的链接数量

- 方法

	- back()       向后一页
	- forward()   向前一页
	- go()传入数字

		- 空 0 刷新页面
		- 参数为-1 ：回退一页
		- 参数为1：前进一页
		- 参数为2：前进两页

### Screen 对象

- 代表用户的屏幕信息，通过该对象可以获取用户的显示器相关信息
- 属性

	- width 属性返回以像素计的访问者屏幕宽度
	- height 属性返回以像素计的访问者屏幕的高度
	- availHeight 属性返回访问者屏幕的高度，以像素计，减去诸如窗口工具条之类的界面特征
	- availWidth 属性返回访问者屏幕的宽度，以像素计，减去诸如窗口工具条之类的界面特征
	- colorDepth 属性返回用于显示一种颜色的比特数
	- pixelDepth 属性返回屏幕的像素深度