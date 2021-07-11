//プロトタイプを安全に拡張する

//.zipについてTypeScriptに伝えます
interface Array<T> {
    zip<U>(list: U[]): [T, U][]
}

//.zipを実装します
Array.prototype.zip = function(list) {
    return this.map((v, k) =>
        [v, list[k]]
    )
}