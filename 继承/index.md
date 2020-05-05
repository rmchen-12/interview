## 确定原型和实例的关系
1. instance instanceof Object // true
2. Object.prototype.isPrototypeOf(instance) // true
3. Object.getPrototypeOf(ColorPoint) === Point // true

## 原型链继承
```
function Father(){
	this.property = true;
}
Father.prototype.getFatherValue = function(){
	return this.property;
}
function Son(){
	this.sonProperty = false;
}
//继承 Father
Son.prototype = new Father();//Son.prototype被重写,导致Son.prototype.constructor也一同被重写
Son.prototype.getSonValue = function(){
	return this.sonProperty;
}
var instance = new Son();
alert(instance.getFatherValue());//true
```
问题
1. 当原型链中包含引用类型值的原型时,该引用类型值会被所有实例共享;
2. 在创建子类型(例如创建Son的实例)时,不能向超类型(例如Father)的构造函数中传递参数

## 经典继承(借用构造函数)
> 基本思想: 即在子类型构造函数的内部调用超类型构造函数.
```
function Father(){
	this.colors = ["red","blue","green"];
}
function Son(){
	Father.call(this);//继承了Father,且向父类型传递参数
}
var instance1 = new Son();
instance1.colors.push("black");
console.log(instance1.colors);//"red,blue,green,black"

var instance2 = new Son();
console.log(instance2.colors);//"red,blue,green" 可见引用类型值是独立的
```
问题
1. 借用构造函数,那么将无法避免构造函数模式存在的问题--方法都在构造函数中定义, 因此函数复用也就不可用了
2. 超类型(如Father)中定义的方法,对子类型而言也是不可见的

## 组合继承
> 基本思路: 使用原型链实现对原型属性和方法的继承,通过借用构造函数来实现对实例属性的继承.
```
function Father(name){
	this.name = name;
	this.colors = ["red","blue","green"];
}
Father.prototype.sayName = function(){
	alert(this.name);
};
function Son(name,age){
	Father.call(this,name);//继承实例属性，第一次调用Father()
	this.age = age;
}
Son.prototype = new Father();//继承父类方法,第二次调用Father()
Son.prototype.constructor = Son
Son.prototype.sayAge = function(){
	alert(this.age);
}
var instance1 = new Son("louis",5);
instance1.colors.push("black");
console.log(instance1.colors);//"red,blue,green,black"
instance1.sayName();//louis
instance1.sayAge();//5

var instance1 = new Son("zhai",10);
console.log(instance1.colors);//"red,blue,green"
instance1.sayName();//zhai
instance1.sayAge();//10
```
问题：
1. 调用了两次父类构造函数, 造成了不必要的消耗

## 下面的方法都是在尝试怎么把构造函数从原型继承中剔除出去
## 原型继承
> 在object()函数内部, 先创建一个临时性的构造函数, 然后将传入的对象作为这个构造函数的原型,最后返回了这个临时类型的一个新实例.
```
// 可以用 Object.create 代替这个函数
function object(o){
	function F(){}
	F.prototype = o;
	return new F();
}

var person = {
	friends : ["Van","Louis","Nick"]
};
var anotherPerson = Object.create(person) || object(person);
anotherPerson.friends.push("Rob");
var yetAnotherPerson = object(person);
yetAnotherPerson.friends.push("Style");
alert(person.friends);//"Van,Louis,Nick,Rob,Style"
```
问题：
1. 其实还只是浅拷贝，引用类型的值会被修改

## 寄生式继承
> 寄生式继承的思路与(寄生)构造函数和工厂模式类似, 即创建一个仅用于封装继承过程的函数,该函数在内部以某种方式来增强对象,最后再像真的是它做了所有工作一样返回对象. 如下.
```
function createAnother(original){
	var clone = object(original);//通过调用object函数创建一个新对象
	clone.sayHi = function(){//以某种方式来增强这个对象
		alert("hi");
	};
	return clone;//返回这个对象
}
```
问题：
1. 不能做到函数复用而降低效率;这一点与构造函数模式类似.

## 寄生组合式继承
> 其背后的基本思路是: 不必为了指定子类型的原型而调用超类型的构造函数
```
function extend(subClass,superClass){
	var prototype = object(superClass.prototype); // 创建对象
	prototype.constructor = subClass; // 增强对象
	subClass.prototype = prototype; // 指定对象
}
```

## 最终继承写法
```
function Father(name){
	this.name = name;
	this.colors = ["red","blue","green"];
}
Father.prototype.sayName = function(){
	alert(this.name);
};
function Son(name,age){
	Father.call(this,name);//继承实例属性，第一次调用Father()
	this.age = age;
}
extend(Son,Father)//继承父类方法,此处并不会第二次调用Father()
Son.prototype.sayAge = function(){
	alert(this.age);
}
var instance1 = new Son("louis",5);
instance1.colors.push("black");
console.log(instance1.colors);//"red,blue,green,black"
instance1.sayName();//louis
instance1.sayAge();//5

var instance1 = new Son("zhai",10);
console.log(instance1.colors);//"red,blue,green"
instance1.sayName();//zhai
instance1.sayAge();//10
```

## new 干了什么
```
var obj  = {};
obj.__proto__ = F.prototype;
F.call(obj);
```
1. 创建空对象
2. 将空对象分配this值
3. 将空对象的__proto__指向构造函数的prototype
4. 如果没有显示return语句，则返回this







