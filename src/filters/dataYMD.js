export default function(value) {
    const str = value
    console.log(str)
    return str.replace(/(\d+)\D+(\d+)\D+(\d+)/, function($0, $1, $2, $3) {

        // 第一个参数：当前整个正则所匹配的内容

        return $1 + '年' + $2 + '月' + $3 + '日';

    });


}