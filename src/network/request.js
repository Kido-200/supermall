import axios from 'axios'

export function request(config){
  const instance = axios.create({
    //接口有问题
    baseURL:'接口请加老师微信',
    timeout : 5000
  })

  instance.interceptors.request.use(config =>{
    // console.log(config);
    return config
  },err =>{
    // console.log(err);
  })
  
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  },
  err =>{
    console.log(err);
  })
  //3.发送真正的网络请求
  return instance(config)
}
