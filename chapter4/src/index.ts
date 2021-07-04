//関数宣言と呼び出し

import { SourceMap } from "module";
import { isContext } from "vm";

//名前つき関数
function greet(name : string) {
    return 'hello ' + name;
}

//関数式
let greet2 = function(name : string) {
    return 'hello ' + name;
}

//アロー関数
let greet3 = (name : string) => {
    return 'hello ' + name;
}

//アロー関数の省略記法
let greet4 = (name : string) =>
    'hello ' + name

console.log(greet('hoge'));

//オプションパラメータとデフォルトパラメータ
function log(message : string, userId? : string) {
    let time = new Date().toLocaleDateString();
    console.log(time, message, userId || 'Not signed in.');
}

log('Page loaded');
log('User signed in', 'da753be');

type Context = {
    appId? : string;
    userId? : string;
}
function log2(message : string, context : Context = {}) {
    let time = new Date().toLocaleDateString();
    console.log(time, message, context.userId);
}
log2('Thumbnail viewed');
log2('Preview viewed', { appId : 'hoge', userId : 'da753be'});

//レストパラメータ
function sum(numbers : number[]): number {
    return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum([1, 2, 4]));

function sumVariadicSafe(...numbers: number[]): number {
    return numbers.reduce((total, n) => total + n, 0);
}
console.log(sumVariadicSafe(1, 3, 5, 7));

//thisの型付け
function fancyDate(this : Date) {
    return `${this.getMonth() + 1}/${this.getDate()}/${this.getFullYear()}`;
}
console.log(fancyDate.call(new Date));