
# 正则表达式
1. 正则表达式用于定义一些字符串的规则
  计算机可以根据正则表达式，来检查一个字符串是否符合规则。
获取将字符串符合规则的内容提取出来。

2. 创建正则表达式对象
 
(1) 语法：`var变量= new RegExp("正则表达式","匹配模式");`
   
(2)  使用字面量创建正则表达式
    语法：`var 变量 = /正则表达式/匹配模式 `
    
注:  使用字面量创建方式简单，但是使用构造函数更加灵活
    
用typeof检查正则对象，会返回Object。
在构造函数中可以传递一个匹配模式作为第二个参数。
i  忽略大小写
g  全局模式 
                   
3. 正则表达式的方法
test()
- 用来检查一个字符串是否符合正则表达式的规则。
如果符合规则返回true 否则返回false 。

###### 练习
- [] 里面的内容也是或的意思
- [ab]  == a|b 
- [a-z]  任意小写字母
- [A-Z]  任意大写字母
- [A-z]  任意字母
- [0-9]  任意数字
- [ ^ ]  除了  不是
1.  创建一个正则表达式，检查字符串是否有a或者b
使用  |  表示或者的意思

```js
var reg = /a|b/;
console.log(reg.test("acshjgksdf"));
```

       
2.  创建一个正则表达式，检查字符串是否有字母


```js
`var reg = /[a-z]/;
console.log(reg.test("q"));`
```
      
3.  检查一个字符串中是有含有abc 或adc 或aec

```js
`var reg = /a[bde]c/;
console.log(reg.test("abc"));`
```

       
4. 检查字符串除了a b的字母

```js
`var reg = /[^ab]/;
console.log(reg.test("ab"));`
```

       
  #### 正则表达式和字符串
1. split()

-- 讲一个字符串拆分数组，方法中可以传递一个正则表达式作为参数

1.1 根据任意字母去拆分

```js
`var str = "1a2b3c4d5e6f7";
var result = str.split(/[A-z]/);
console.log(result);`
```


2.  search()
可以搜索字符串中是否含有指定内容
可以接受一个正则表达式作为参数，根据正则表达式检索字符串


```js
var str2 = "liwenju  abc  liwenju afc"
搜索字符串中是否含有 abc 或 afc
var results = str2.search(/a[bf]c/);
console.log(results);`
```


3.match()
从一个字符串中将符合条件的内容提取出来
默认情况下match只会查找第一个符合条件的内容，找到以后就停止检索
可以设置正则表达式为全局匹配模式。就可以匹配到所有内容
-match()会将匹配的内容封装到一个数组中返回，即使只查询的一个结果


```js
var str3 = "1a2b3c4d5e6f7A8B";
var result3 = str3.match(/[a-z]/gi);
console.log(result3);
console.log(result3[2]);`
```

4.replace()
可以将字符串的指定内容替换新的内容
- 默认只替换一个 需设值全局模式

```js
var str4="1a2b3c4d5e6f7A8B";
var result4 = str4.replace(/[a-z]/gi,"");  //删除内容 设置空字符串
 var result4 = str4.replace(/[a-z]/gi,"@");
console.log(result4);
```

      
####  量词
   
> 通过量词可以设置一个内容出现的次数，量词只对前面一个内容起作用
- { n }   包含n次
- {m,n}   包含m-n次
- {m,}    包含m次以上
- n+至少一次 相当于{1,}
- n* 0个或多次 相当于{0,}
- n?  0个或一次 相当于{0,1}
- ^n 任何开头为 n 的字符
- n$  任何 n 结尾的字符

1. 创建一个正则表达式检查一个字符串中是否含有多个aaa?


var reg = /a{4}/;  
        
reg = /(ab){3}/; //(ab) 出现三次

reg = /ab{1,3}c/;  //b  出现 1 到 3 次

reg = /ab{3,}c/;  //b  连续出现3次以上

reg =/ab+c/;  //至少出现一次

reg =/ab*c/;  //出现0次或多次

reg =/ab?c/;  //出现0次或一次

reg =/^a/;  //检查字符是否以a开头

reg =/a$/;  //检查字符是否以a结尾

reg = /^a|a$/;  //a开头或者a结尾

 console.log(reg.test("abc"));



#### 元字符
1. 检查一个字符串是是否含有单词 lrving
       `var reg = /\blrving\b/;      
       console.log(reg.test("hello lrving !"));`
      
 2. 检查字符空格

```js
var str =prompt("请输入你的用户名");
var str = "   he llo    ";
去除字符串前后的空格
//去除空格就用""来替换空格
//str = str.replace(/\s/g,"");
//去除开头的空格
//  str= str.replace(/^\s*/,"");
//去除结尾的空格
str= str.replace(/\s*$/,"");
//去除开头空格和结尾空格 保留中间空格
str= str.replace(/^\s*|\s*$/g,"");
console.log(str);
```