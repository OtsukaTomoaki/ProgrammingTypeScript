//例外のスロー

//カスタムエラー型
class InvalidDateFormatError extends RangeError {}
class DateIsInTheFutureError extends RangeError {}

function ask() {
    return 'hgoeghoe'
}
/**
 * @throws {InvalidDateFormatError}
 * @throws {DateIsInTheFutureError}
 * @param birthday {string}
 * @returns {Date}
 */
function parse(birthday: string): Date {
    let date = new Date(birthday)
    if(!isValid(date)) {
        throw new InvalidDateFormatError('Enter a date in the from YYYY/MM/DD')
    }
    if(date.getTime() > Date.now()) {
        throw new DateIsInTheFutureError('Are you a timeload?')
    }
    return new Date(birthday)
}
//与えられた日付が有効かチェックします
function isValid(date: Date) {
    return Object.prototype.toString.call(date) === '[object Date]'
        && !Number.isNaN(date.getTime())
}

try {
    let date = parse(ask())
    if(date){
        console.info('Date is ', date.toISOString())
    } else {
        console.error('Error parsing date for some reason.')
    }
} catch(e) {
    if(e instanceof InvalidDateFormatError || e instanceof DateIsInTheFutureError) {
        console.error(e)
    } else {
        throw e
    }
}

