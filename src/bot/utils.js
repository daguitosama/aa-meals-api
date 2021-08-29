/**
 * 
 * @param {String} idsString 
 * Parse the comma separated ids string  
 * and returns an array with the id values
 */
export function telegramIdsStrToArray(idsString = "id,id,id") {
    if (typeof idsString != 'string' || !idsString.length) {
        throw new Error(`Non idsString value passed: ${idsString}`)
    }
    var temp = idsString.split(',');
    temp = temp.map(function idStringToNumber(id) {
        const n = Number(id);
        if (isNaN(n)) {
            throw new Error(`Non valid id value passed: ${id}`)
        }
        return n
    });
    return temp;
}