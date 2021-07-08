//型の絞り込み

//文字リテラルの合併型を使って、cssの単位がとりうる値を表現します
type Unit = 'cm' | 'px' | '%'
//単位を列挙します
let units: Unit[] = ['cm', 'px', '%']

//各単位をチェックし、一致するものがなければnullを返します
function parseUnit(value: string): Unit | null {
    for(let i = 0; i < units.length; i++) {
        if(value.endsWith(units[i])) {
            return units[i]
        }
    }
    return null
}

type Width = {
    unit: Unit,
    value: number
}

function parseWidth(width: number | string | null | undefined): Width | null {
    //widthがnullまたはundefindであればすぐに戻ります
    if(width == null) {
        return null
    }
    //widthがnumberであれば、ピクセルをデフォルトの単位とする
    if(typeof width === 'number') {
        return {unit: 'px', value: width}
    }
    //widthから単位を解析します
    let unit = parseUnit(width)
    if(unit) {
        return {unit, value: parseFloat(width)}
    }
    //どれでもなければnullを返す
    return null
}