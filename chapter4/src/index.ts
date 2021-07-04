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