<template>
	<view>
		<view class="information">
			<image class="information-pic" :src="avatarUrl" ></image>
			<view class="information-text">
				<view class="information-name">
					{{ nickname}}
				</view>
			</view>
		</view>
		<view class="order-count">
			<view class="">
				<image class="my-order" src="../../static/images/my-order.png" ></image>
				<view class="">
					我的订单
				</view>
			</view>
			<view class="">
				<image class="my-order" src="../../static/images/my-count.png" ></image>
				<view class="">
					我的账号
				</view>
			</view>
		</view>
		<view class="vip-area">
			<text>
				获取用户信息
			</text>
			<!-- <text>
				VIP俱乐部：会员专属福利
			</text> -->
			<button class="vip-open" @click="logIn">点击登陆</button>
		</view>
		<!-- <button class="vip-open" open-type="getPhoneNumber" @getphonenumber="getPhone">手机号</button> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickname: '未登录',
				avatarUrl:'../../static/images/anonymous.png'
				
			}
		},
		onLoad() {
			//个人信息
			// this.sendRequest({
			// 	url:'/persinfo/details/query',
			// 	success(data){
			// 		console.log(data,'vvvvv')
			// 	}
			// })
		},
		methods: {
			logIn(){
				uni.getUserProfile({
					desc: '用户个人页展示',
					lang: 'zh-CN',
					success: (res)=>{
						console.log(res,'login')
						this.nickname= res.userInfo.nickName
						this.avatarUrl= res.userInfo.avatarUrl
					},
					fail(res){
						console.log(res)
					}
					
				})
			},
			getPhone(e){
				console.log(e,'dddd')
			}
		}
	}
</script>

<style lang="scss">
	.information{
		margin: 10rpx 40rpx;
		display: flex;
		.information-pic{
			width: 120rpx;
			height: 120rpx;
			border-radius: 60rpx;
			border: 4rpx solid #FB3B28;
		}
		.information-text{
			display: inline-block;
			margin: 0 20rpx;
			.information-name{
				font-size: 40rpx;
				font-weight: 600;
			}
			.information-message{
				
			}
		}
	}
	.order-count{
		margin: 30rpx 0;
		display: flex;
		justify-content: space-around;
		view{
			display: inline-block;
			image{
				width: 60rpx;
				height: 60rpx;
				display: block;
				margin: 0 auto;
			}
		}
	}
	.vip-area{
		margin: 0 95rpx;
		width: 500rpx;
		display: inline-block;
		background-image: linear-gradient(to bottom, #707070, #303030, #707070);
		border-radius: 30rpx;
		padding: 0 8rpx;
		text-align: center;
		text{
			padding-right: 12rpx;
			font-size: 30rpx;
			color: #FFFFFF;
			font-weight: 600;
		}
		.vip-open{
			background-image: linear-gradient(to bottom, #EACFAD, #C7A170);
			line-height: 2.4;
			overflow: visible;
			padding: 0 8rpx;
			font-weight: 300;
			display: inline;
			box-shadow:inset 0rpx 0rpx 4rpx #101010;
		}
	}
</style>
