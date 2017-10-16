export default function(value) {
    let str = value + '';
    if (str.indexOf('.') == -1 & str != 10 & str != 0) {
        str = value + '.0'
    }
    return str
}