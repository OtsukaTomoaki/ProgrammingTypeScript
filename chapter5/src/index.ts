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
// interface Sushi {
//     calories: number,
//     salty: boolean,
//     tasty: boolean
// }
// type Cake = {
//     calories: number,
//     sweet: boolean,
//     tasty: boolean
// }
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
