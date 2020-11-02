export const sliceText = function (str, number) {
    let r_str = str.length > number
    if (r_str) {
        str = str.slice(0, number) + '...'
    }
    return str
}