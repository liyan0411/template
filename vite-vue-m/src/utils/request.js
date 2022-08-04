import axios from 'axios'
import router from '@/router'
import { Notify } from '@nutui/nutui'
// create an axios instance   创建axios实例
const service = axios.create({
	baseURL: import.meta.env.VITE_BASE_API , // api 的 base_url

	// baseURL: '"http://10.108.26.146:28060/idesk"', // 测试
	// baseURL: '"http://10.108.2.30/idesk"', // uat
	// baseURL: 'https://desk.anji-plus.com/idesk', // 生产
	// baseURL: 'http://10.108.12.20:9998/idesk', // 耿祥本地
	timeout: 80000, // request timeout  设置请求超时时间
	responseType: 'json',
	// withCredentials: true, // 是否允许带cookie这些
	headers: {
		// 'Content-Type': 'application/json;charset=utf-8'
	}
})
// request interceptor
service.interceptors.request.use(
	config => {
		// console.log('config', config)
		// Do something before request is sent

		return config
	},
	error => {
		// 对请求错误处理
		// Message.warning(error, 2)
		return Promise.reject(error)
	}
)
// response interceptor
service.interceptors.response.use(
	response => {
		const res = response.data
		if (res.code == 'noLogin' || res.code == '500402') {
			Notify.danger("登录失败，请重新进入")
			// 登录态失效
			setTimeout(() => {
				sessionStorage.clear()
				router.replace({ path: '/login' })
			}, 2000)

		} else if (res.code != '200' && res.code != 0) {
			// 返回流文件的处理  同时存在类型 和大小
			if (res.type && res.size) {
				return Promise.resolve(res)
			}
			Notify.danger( res.msg )
			return Promise.reject(res)
		} else {
			return Promise.resolve(res)
		}
	},
	error => {
		// console.log("error",JSON.stringify(error))
		if (error.message.indexOf('Network Error') !== -1) {
			Notify.danger( '网络异常，请检查网络！')
		} else if (error.message.indexOf('timeout') !== -1) {
			Notify.danger('请求超时，请稍后再试！' )
			// return service.request(originalRequest);//例如再重复请求一次
		} else {
			Notify.danger( `服务器${error.response.status}错误` )
		}
		return Promise.reject(error)
	}
)
export default service
