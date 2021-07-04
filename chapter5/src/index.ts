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

