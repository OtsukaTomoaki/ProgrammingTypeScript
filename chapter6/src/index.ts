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

//タグ付き合併型
type UserTextEvent = {type: 'TextEvent', value: string, target: string}
type UserMouseEvent = {type: 'MouseEvent', value: [number, number], target: number}

type UserEvent = UserTextEvent | UserMouseEvent

function handle(event: UserEvent) {
    if(event.type === 'TextEvent') {
        console.log(event.value, typeof event.value) //string
        console.log(event.target, typeof event.target)//string
        return
    }
    console.log(event.value, typeof event.value)//[number, number]
    console.log(event.target, typeof event.target)//number
}

handle({type: 'TextEvent', value:'hoge', target: 'fuga'})
handle({type: 'MouseEvent', value:[2, 3], target: 4})

//高度なオブジェクト型
//ルックアップ型
type FriendList = {
    count: number
    friends: {
        firstName: string
        lastName: string
    }[]
}
type APIResponse = {
    user: {
        userId: string
        friendList: FriendList
    }
}
type APIResponse2 = {
    user: {
        userId: string
        friendList: {
            count: number
            friends: {
                firstName: string
                lastName: string
            }[]
        }
    }
}
type FriendList2 = APIResponse['user']['friendList']//キーを指定して型を取得する

// function getAPIResponse(): APIResponse{
//     return
// }
// function renderFriendList(friendList: FriendList) {
//     return
// }
// let response = getAPIResponse()
// renderFriendList(response.user.friendList)

//keyof演算子
type ResponseKeys = keyof APIResponse2//user
let responseKeys: ResponseKeys = 'user'
type UserKeys = keyof APIResponse2['user'] //userId | friendList
let userKeys: UserKeys = 'userId'
type FriendListKeys = keyof APIResponse2['user']['friendList'] //count | friends
let friendListKeys: FriendListKeys= 'friends'
let friends: FriendList = { count:10, friends:[{firstName:'ootsuka', lastName: 'tomoaki'}]}

function get<O extends object, K extends keyof O>(o: O, k: K): O[K] {
    return o[k]
}

type ActivityLog = {
    lastEvent: Date
    events: {
        id: string
        timestamp: Date
        type: 'Read' | 'Write'
    }[]
}
let activityLog: ActivityLog = {
    lastEvent: new Date(2021, 8, 10),
    events: [{id: 'hoge', timestamp: new Date(2021, 7, 11), type: 'Read'}]}
let lastEvent = get(activityLog, 'lastEvent')
console.log('activityLog', activityLog)
console.log('lastEvent', lastEvent)

type Get = {
    <
        O extends object,
        K1 extends keyof O
    >(o: O, k1: K1): O[K1]
    <
        O extends object,
        K1 extends keyof O,
        K2 extends keyof O[K1]
    >(o: O, k1: K1, k2: K2): O[K1][K2]
    <
        O extends object,
        K1 extends keyof O,
        K2 extends keyof O[K1],
        K3 extends keyof O[K1][K2]
    >(o: O, k1: K1, k2: K2, k3: K3): O[K1][K2][K3]
}

let get2: Get = (object: any, ...keys: string[]) => {
    let result = object
    keys.forEach(k => result = result[k])
    return result
}
console.log(get2(activityLog, 'events', 0, 'type'))//Read | Write

//レコード型
type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'
type Day = Weekday | 'Sat' | 'Sun'

let nextDay: Record<Weekday, Day> = {
    Mon: 'Tue',
    Tue: 'Wed',
    Wed: 'Thu',
    Thu: 'Fri',
    Fri: 'Sat'
}
console.log(nextDay)

//マップ型の実装
let nextDay2: {[K in Weekday]: Day} = {
    Mon: 'Thu',
    Tue: 'Wed',
    Wed: 'Thu',
    Thu: 'Fri',
    Fri: 'Sat'
}
console.log(nextDay2)

type Account = {
    id: number
    isEmploy: boolean
    notes: string[]
}
//全てのフィールドを省略可能にします
type OptionalAccount = {
    [k in keyof Account]?: Account[k]
}
//全てのフィールドをnull許容にします
type NullableAccount = {
    [K in keyof Account]: Account[K] | null
}
//全てのフィールドを読み取り専用にします
type ReadonlyAccount = {
    readonly [K in keyof Account]: Account[K]
}
//全てのフィールド
//再び書き込みかのうにします
type Account2 = {
    -readonly [K in keyof ReadonlyAccount]: Account[K]
}

//名前的型
//型のブランド
type CompanyID = string & {readonly bland: unique symbol}
type OrderID = string & {readonly bland: unique symbol}
type UserID = string & {readonly bland: unique symbol}
type ID = CompanyID | OrderID | UserID

function CompanyID(id: string) {
    return id as CompanyID
}
function OrderID(id: string) {
    return id as OrderID
}
function UserID(id: string) {
    return id as UserID
}

function queryForUser(id: UserID) {
    return id
}

let companyId = CompanyID('hogehoge')
let orderID = OrderID('fugafuga')
let userId = UserID('piyopiyo')

//queryForUser(companyId)
//queryForUser(orderID)
queryForUser(userId)