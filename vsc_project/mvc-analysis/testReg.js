'use strict'

var re1 = /\d{3}\-\d{3,8}/;
var re2 = new RegExp(/\d{3}\-\d{3,8}/);
var re3 = new RegExp('\\d{3}\\-\\d{3,8}');

console.log(re1.test('021-8888'));//true
console.log(re2.test('021-8888'));//true
console.log(re3.test('021-8888'));//true

//g代表全局搜索，以字符串的replace()为例
var s = '1234324-ffwfwef-mmmmj-end';
var regS = /\-/;
console.log(s.replace(regS,'+'));//1234324+ffwfwef-mmmmj-end


var regs2 = /\-/g;//全局搜索替换
console.log(s.replace(regs2,'+'));//1234324+ffwfwef+mmmmj+end