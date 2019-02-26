//封装模块
var storage={
    set(key,value){
        // 将对象序列化为json 字符串
        localStorage.setItem('key',JSON.stringify(value))
    },
    get(key){
        // 将字符串反序列化为对象
        return JSON.parse(localStorage.getItem('key'))
    },
    remove(key){
        localStorage.removeItem(key)
    }
}
export default storage