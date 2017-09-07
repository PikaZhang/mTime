export default function(value) {
    let str = value + '';
    let newStr = ''
    if (str.length) {
        if (str.length > 50) {
            newStr = str.substring(0, 50) + '…';
            return newStr;
        } else {
            return str;
        }
    }


}