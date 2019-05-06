//created by Yan on 17/11/9
import axios from 'axios'
axios.defaults.timeout = 10000;//10秒还未得到请求答复，就报超时错误
export function fetch(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
  }).catch((error) => {

  })
}


//各个功能对应接口
export default {
  //删除api
  deletePpApi(url,params){
    return fetch(url, params)
  },
  //新增规格
  addguige(url,params){
    return fetch(url,params)
  },
//详情页接口
  detialApi(url,params) {
    let urls = 'http://134.96.161.143:9301'+url;
    return fetch(urls, params)
  }
}
