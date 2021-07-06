//クラスと継承
//チェスのゲームを表す
class Game {
    private pieces = Game.makePieces();

    private static makePieces() {
        return [];
    }
}

//チャスの駒
class Piece {
    protected position : Position;
    constructor(
        private readonly color : ChessColor,
        file : ChessFile,
        rank : ChessRank
    ) {
        this.position = new Position(file, rank)
    }
}

//駒の位置（座標）
class Position {
    constructor (
        private file : ChessFile,
        private rank : ChessRank
    ){}
}

class King extends Piece {}     //キング
class Queen extends Piece {}    //クイーン
class Bishop extends Piece {}   //ビショップ
class Knight extends Piece {}   //ナイト
class Rook extends Piece {}     //ルーク
class Pawn extends Piece {}     //ポーン

type ChessColor = 'Black' | 'White';
type ChessFile = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
type ChessRank = 1 | 2 | 3 | 4 | 5 | 6 | 7| 8;

//インンターフェース
type Food = {
    calories: number,
    tasty: boolean
}
type Sushi = Food & {
    salty: boolean
}
type Cake = Food & {
    sweet: boolean
}
const cake : Cake = { calories: 100, tasty: false, sweet: true };
console.log(cake);

interface IFood {
    calories: number,
    tasty: boolean
}
interface ISushi extends IFood {
    salty: boolean
}
interface ICake extends IFood {
    sweet: boolean
}
const iSushi: ISushi = { calories: 130, tasty: false, salty: true };
console.log(iSushi);

//宣言のマージ
interface User {
    name: string
}
interface User {
    age: number
}

let a: User = {
    name: 'ootsuka',
    age: 28
}
console.log(a);

//実装
interface Animal {
    readonly name: string,
    eat(food: string): void,
    sleep(hours: number): void
}
class Cat implements Animal {
    name = 'Miu'
    eat(food: string) {
        console.info('Ate sime', food, '. Mmm!');
    }
    sleep(hours: number) {
        console.info('Slept for', hours, 'hours');
    }
}

let cat = new Cat();
cat.sleep(4);

//構造的なクラス型付け
class Zebra {
    trot() {
        console.info('trot.')
    }
}
class Poodle {
    trot() {
        console.info('trot.')
    }
}
function ambleAround(animal: Zebra) {
    animal.trot();
}
let zebra = new Zebra;
let poodle = new Poodle;

ambleAround(zebra);//OK!
ambleAround(poodle);//OK!

//クラスは値と型の両方を宣言する
//値
let hoge = 1999;
function fuga() {
    console.info('b done.');
}
//型
type hoge = number;
interface fuga {
    (): void;
}
//typescriptでは、値と型の名前空間が別々に分けられている
//変数の使い方によってtypescriptはそれ型と値どちらとして解決するかを理解する
if (hoge + 1 > 3) console.log();//値
let piyo: hoge = 3;//型

//StringDatabase
type State = {
    [key: string]: string;
}
class StringDatabase {
    state: State = {}
    get(key: string): string | null {
        return key in this.state ? this.state[key] : null;
    }
    set(key: string, value: string): void {
        this.state[key] = value;
    }
    static from(state: State) {
        let db = new StringDatabase;
        for(let key in state) {
            db.set(key, state[key])
        }
        return db
    }
}

let state: State = {'hoge': '1', 'fuga': '2', 'piyo': '3'}
let database = StringDatabase.from(state)
database.set('hogehoge', '4')
console.log(database)