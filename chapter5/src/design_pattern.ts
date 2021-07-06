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