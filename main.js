import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.sendRequest = function(params) {
	let ZTOKEN = uni.getStorageSync('token')
	uni.request({
		url: "https://wyuat.ftd6.cn" + params.url,
		method: params.type || 'GET',
		header: {
			ZTOKEN: ZTOKEN || '',
			channel:'mini'
		},
		data: params.data || {},
		success:(res)=> {
			console.log(res,'res')
			if(res.statusCode == 401){
				uni.removeStorage({
					key: 'token',
					success: (e) => {
						console.log('清除token',e)
						logIn(params)
					}
				})

			}else{
				typeof params.success == "function" && params.success(res.data);
			}
		},
		fail(res) {
			typeof params.fail == "function" && params.fail(res);
		}

	})
}

function logIn(params){
	uni.login({
		provider: 'weixin',
		success: (loginRes)=> {
		console.log(loginRes,'loginRes')
		Vue.prototype.sendRequest({
			url:'/user/wxlogin?code='+loginRes.code,
			type:'POST',
			success(data){
				if(data.code === 1000){
					uni.setStorage({
						key: 'token',
						data: data.data.token
					})
					Vue.prototype.sendRequest(params)
				}
			}
			})
		}
	});	
}

Vue.prototype.transToChinese = function(e) {
	switch (e) {
		case 0:
			return '零';
		case 1:
			return '一';
		case 2:
			return '二';
		case 3:
			return '三';
		case 4:
			return '四';
		case 5:
			return '五';
		case 6:
			return '六';
		case 7:
			return '七';
		case 8:
			return '八';
		case 9:
			return '九';
	}
}
const app = new Vue({
	...App
})
app.$mount()
