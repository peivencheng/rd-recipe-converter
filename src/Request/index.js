//在index.js中引入axios
import axios from 'axios';
//引入qs模組，用來序列化post型別的資料
import QS from 'qs';
//antd的message提示元件，大家可根據自己的ui元件更改。
import { message } from 'antd'

//儲存環境變數
const isPrd = process.env.NODE_ENV === 'test';

//區分開發環境還是生產環境基礎URL
export const basicUrl = isPrd ? '' : 'http://localhost:3000/'

//設定axios基礎路徑
const service = axios.create({
  baseURL: basicUrl
})

// 請求攔截器
service.interceptors.request.use(config => { 
  // 每次傳送請求之前本地儲存中是否存在token，也可以通過Redux這裡只演示通過本地拿到token
  // 如果存在，則統一在http請求的header都加上token，這樣後臺根據token判斷你的登入情況
  // 即使本地存在token，也有可能token是過期的，所以在響應攔截器中要對返回狀態進行判斷 
  const token = window.localStorage.getItem('userToken') || window.sessionStorage.getItem('userToken');
  //在每次的請求中新增token
  config.data = Object.assign({}, config.data, {
    token: token,
  })
  //設定請求頭
  config.headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
  }
  //序列化請求引數，不然post請求引數後臺接收不正常
  config.data = QS.stringify(config.data)
  return config
}, error => { 
    return error;
})

// 響應攔截器
service.interceptors.response.use(response => {
  //根據返回不同的狀態碼做不同的事情
  // 這裡一定要和後臺開發人員協商好統一的錯誤狀態碼
  if (response.code) {
    switch (response.code) {
      case 200:
        return response.data;
      case 401:
        //未登入處理方法
        break;
      case 403:
        //token過期處理方法
        break;
      default:
        message.error(response.data.msg)
    }
  } else { 
    return response;
  }
})
//最後把封裝好的axios匯出
export default service