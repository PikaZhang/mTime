export default function(value) {
    let str = value + '';
    if (str.indexOf('.') == -1) {
        str = value + '.0'
    }
    return str
}