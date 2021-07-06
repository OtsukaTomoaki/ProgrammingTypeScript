//ファクトリーパターン
type Shoe = {
    purpuse: string
}
class BalletFlat implements Shoe {
    purpuse = 'dancing'
}
class Boot implements Shoe {
    purpuse = 'woodcutting'
}
class Sneaker implements Shoe {
    purpuse = 'walking'
}

let Shoe = {
    create(type: 'balletFlat' | 'boot' | 'sneaker'): Shoe {
        switch(type) {
            case 'balletFlat': return new BalletFlat
            case 'boot': return new Boot
            case 'sneaker': return new Sneaker
        }
    }
}
let boot = Shoe.create('boot')
console.log(boot)

//ビルダーパターン
class RequestBuilder {
    private data: object | null = null
    private method: 'get' | 'post' | null = null
    private url : string | null = null
    setMethod(method: 'get' | 'post'): this {
        this.method = method
        return this
    }
    setData(data: object): this {
        this.data = data
        return this
    }
    setURL(url: string): this {
        this.url = url
        return this
    }
    send() {
        console.info(`send ${this.url}`)
        return
    }
}

let reqBuilder = new RequestBuilder
reqBuilder.setMethod('get').setURL('https://hogehoge.co.jp').send()