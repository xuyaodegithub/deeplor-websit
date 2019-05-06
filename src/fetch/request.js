import axios from 'axios';
import qs from 'qs'
import store from '../store'
import { throwErr } from '../utils/setRepose'
// axios.defaults.timeout=10000;//设置请求时间，超过时间报超时错位
// axios.defaults.headers={'X-Custom-Header': 'foobar'}//全局设置请求头
// axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded;charset=UTF-8';//全局设置请求头//表示跨域请求时是否需要使用凭证默认false
// axios.defaults.baseURL='http://test-admin-h5.olquan.cn'//设置域名
// axios.defaults.withCredentials=true//表示跨域请求时是否需要使用凭证,默认false，一般请求携带cookie是设置为true
// var instance  =axios.interceptors.request.use(function () {//设置请求拦截器
//
// })
const instance  =axios.create({
  timeout:10000,
  baseURL:process.env.API_HOST,
  headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
});//自定义axios对象
// instance.defaults.timeout=1000
// instance.defaults.baseURL=process.env.API_HOST
// instance.defaults.headers['Content-Type']='application/x-www-form-urlencoded;charset=UTF-8'
instance.interceptors.request.use(function (config) {//为自定义axios设置请求拦截器
  // 在发送请求之前做些什么config是axios请求实例 里面包含axios各种配置项和相关属性信息
  console.log(config.data)
  // config.data='page=2&rows=30'
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
});
instance.interceptors.response.use(function (response) {//为自定义axios设置响应拦截器
  // 对响应数据做点什么
  if(response.data.code===0){
    return Promise.resolve(response.data)
  }else if(response.data.code===1401){//表示未登录
      store.dispatch('setUserInfo',{})
    message({
      type:'warning',
      message:'未登录'
    })
    return Promise.reject(response.data)
  }else{
    return Promise.reject(response.data)
  }
}, function (error) {
  // 对请求错误做些什么
  if(error && error.response){
    console.log(error.response)
    let err={}
    err.code=error.response.status
    err.msg=throwErr(error.response.status,error.response)
    return Promise.reject(err)
  }
  return Promise.reject(error)
});
// instance.interceptors.request.eject(beforask);//移除请求拦截器方法
// instance.interceptors.response.eject(afterask);//移除响应拦截器方法

 const requestPost = (furlArr)=>{//封装自定义axios请求方法
  return instance({
    method:'post',
    url:furlArr[0],
    dataType:'JSON',
    data:qs.stringify(furlArr[1])
  })
}
const requestGet=(furlArr)=> {
   return instance({
     method:'get',
     url:furlArr[0],
     dataType:'JSON',
     params:furlArr[1]
   })
}



export default {
  requestPost:requestPost,
  requestGet:requestGet
}
