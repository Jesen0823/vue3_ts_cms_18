import axios from 'axios'

// API https://v.api.aa1.cn/api/yiyan/index.php
// https://api.yuk0.com/yiyan/index.php

/// 1. 全局配置
axios.defaults.baseURL = 'https://v.api.aa1.cn'
axios.defaults.timeout = 10000
// axios.defaults.headers = {}

axios
  .get('/api/yiyan/index.php', {
    // 每个请求单独配置
    timeout: 15000,
    headers: {}
  })
  .then((res) => {
    console.log('response=> ', res.data)
  })

// 多个请求合并
axios
  .all([
    axios
      .get('/api/yiyan/index.php', {
        // 每个请求单独配置
        headers: {}
      })
      .then((res) => {
        console.log('response=> ', res.data)
      })
  ])
  .then((resArray) => {
    console.log(resArray[0])
  })

// 拦截器
// 参数1：请求发送成功要执行的函数
// 参数2：请求发送失败要执行的函数
// 响应拦截类似，axios.interceptors.response.use
axios.interceptors.request.use(
  (config) => {
    // 设置修改操作
    return config
  },
  (err) => {
    console.log('err', err)
    return err
  }
)
