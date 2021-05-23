<template>
	<view class="content">
		<view class="page-section-spacing">
			<swiper :indicator-dots="true" :autoplay="true" :interval="5000" :duration="500">
				<swiper-item v-for="(item,index) in swiperSrc" :key="index">
					<image class="swiper-item" :src="item" @click="jumpToClass(index)"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="classTab">
			<!-- <view class="item" @click="goToCourseSelect">
				<image class="item-image" :src="listIcon[0]"></image>
				<text>课程精选</text>
			</view>
			<view class="item" @click="goToCourseListen">
				<image class="item-image" :src="listIcon[1]"></image>
				<text>每日听书</text>
			</view>
			<view class="item" @click="open">
				<image class="item-image" :src="listIcon[2]"></image>
				<text>学员故事</text>
			</view> -->
		</view>
		<view class="gray-line">
			<!-- 分隔 -->
		</view>
		<view class="classification">
			<view class="title">
				热门课程
				<view class="more">
					更多 >
				</view>
			</view>
			<view class="hot-class" @click.stop="freeBuy">
				<image class="hot-image" :src="hotClass[0].cstitleimg"></image>
				<view class="hot-text">
					<text>热门课程</text>
					<text class="hot-purchase float-right">点击解锁</text>
				</view>
				<view class="hot-text clearfix">
					<text class="hot-purchase float-left" v-if="hotClass[0].currprice">优惠购</text>
					<text class="hot-money float-left" v-if="hotClass[0].currprice">¥{{hotClass[0].currprice}}</text>
					<text class="float-right hot-detail">{{hotClass[0].studentnum}}人听过&nbsp;6天&nbsp;|&nbsp;{{hotClass[0].totalstage}}个阶段</text>
				</view>
			</view>
		</view>
		<view class="gray-line">
			<!-- 分隔 -->
		</view>
		<view class="classification">
			<view class="title">
				更多课程
			</view>
			<view v-for="(classItem,kind) in classValue" class="class-card"  @click.stop="freeBuy">
				<image class="class-image" :src="classItem.src"></image>
				<view class="card-text">
					<h2>{{classItem.title}}</h2>
					<view>
						<text>{{classItem.teacher}}</text>
						<view class="card-label">{{classItem.label}}</view>
					</view>
					<view class="card-introduce">
						{{classItem.introduce}}
					</view>

					<view class="card-money">
						<text v-if="classItem.currprice"> ¥{{classItem.currprice}}</text>
						<button class="card-purchase" type="default" size='mini'>{{classItem.buyType===0 ? '点击解锁':'classItem.currprice'}}</button>
					</view>
					<view class="card-listener">
						▶&nbsp;{{classItem.studentnum}}人听过
					</view>
				</view>
			</view>
		</view>
		<view class="class-bottom">
			我是有底线的～
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				src: '/static/images/publicity.png',
				listIcon: [
					'/static/images/list-course.png',
					'/static/images/list-listen.png',
					'/static/images/list-story.png',
				],
				hotClass: [],
				classValue: [{
					src: '/static/images/course-1.png',
					title: '理财训练营，每年给自己加薪',
					teacher: '王院长',
					label: '最强大脑',
					introduce: '联合创始人兼百万CEO',
					currprice: 1999.00,
					studentnum: 345,
					buyType: 0, // 0免费 1打折 2 原价
				}],
				swiperSrc: Array,
				courseid: Array,
				retype: Array,
			}
		},
		onLoad() {	
			 uni.login({
			     provider: 'weixin',
			     success: (loginRes)=> {
					 console.log(loginRes,'loginRes')
					 this.sendRequest({
					 	url:'/user/wxlogin?code='+loginRes.code,
					 	type:'POST',
					 	success:(data)=>{
					 		if(data.code === 1000){
								uni.setStorage({
									key: 'token',
									data: data.data.token
								})
								console.log( data.data.token,'data.data.token')
								
								//banner轮播图
								this.sendRequest({
									url:'/banners/index',
									success:(data)=>{
										//轮播图
										this.swiperSrc = data.data.slist.map(el=>el.imgurl)
										//课程路径
										this.courseid = data.data.slist.map(el=>el.jumpurl)
										//1 课程 2 H5页面
										this.retype = data.data.slist.map(el=>el.retype)
										console.log(this.courseid)
									}
								})
								
								//热门课程
								this.sendRequest({
									url:'/course/hot/list',
									success:(data)=>{
										this.hotClass = data.data.slist
										console.log(this.hotClass,'this.hotClass')
									}
								})
								//更多课程
								this.sendRequest({
									url:'/course/more/list',
									success:(data)=>{
										data.data.slist.forEach((el,ii)=>{
											this.classValue[ii].currprice =el.currprice
											this.classValue[ii].studentnum =el.studentnum
											this.classValue[ii].teacher =el.teacher
											this.classValue[ii].courseid =el.courseid
										})
										// this.classValue = data.data.slist
										console.log(data.data.slist)
									}
								})
							}
					 	}
					 })
										
			     }
			 });
			
			
			
		// -----------------------------------------------------------------------
			// uni.getProvider({
			// 	service: 'oauth',
			// 	success:(data)=>{
			// 		console.log(data,123)
			// 		if (~data.provider.indexOf('weixin')) {
			// 			uni.getUserInfo({
			// 				provider:data.provider,
			// 				lang:'zh-CN',
			// 				success(res){
			// 					console.log(res,'19191')
			// 				},
			// 				fail(res){
			// 					console.log(res,'888888')
			// 				}
							
			// 			})
						
						
			// 		}
			// 	}
			// })
			
			// function plusReady(){ //uni-app中将此function里的代码放入vue页面的onLoad生命周期中  
			//     // 获取支付通道  
			//     plus.payment.getChannels(function(channels){  
			//         channel=channels[0];  
			//     },function(e){  
			//         alert("获取支付通道失败："+e.message);  
			//     });  
			// }  
		
		// -----------------------------------------------------------------------

		
		},
		methods: {
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			onShareAppMessage: function() {
			    const promise = new Promise(resolve => {
			      setTimeout(() => {
			        resolve({
			          title: '转发标题'
			        })
			      }, 2000)
			    })
			    return {
			      title: '转发标题',
			      path: '../index/index',
			      promise 
			    }
			},
			onShareAppMessage: function(e){console.log(e,'share')},
			goToCourseSelect: function(e) {
				uni.navigateTo({
					url: '../course-select/course-select'
				})
			},
			goToCourseListen: function(e) {
				uni.navigateTo({
					url: '../listen-course/listen-course'
				})
			},
			freeBuy: function(e) {
				uni.navigateTo({
					url: '../class-detail/class-detail?courseid='+this.hotClass[0].courseid
				})
			},
			open: function(e) {
			},
			jumpToClass: function(i){
				console.log(i)
				console.log(this.courseid,'this.courseid')
				console.log(this.retype,'this.retype')
				if(this.retype[i] === '1'){
					uni.navigateTo({
						url: '../class-detail/class-detail?courseid='+this.courseid[i]
					})
				}else if(this.retype[i] === '2'){
					uni.navigateTo({
						url: '../h5/h5?courseid='+this.courseid[i]
					})
				}
				
				
			}
		},
		components: {
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

	}

	.page-section-spacing {
		margin-top: 28rpx;
		width: 700rpx;
	}

	.swiper-item {
		height: 100%;
		width: 100%;
		border-radius: 16rpx;
	}

	.gray-line {
		height: 28rpx;
		background-color: #F0F0F0;
		width: 100%;
	}

	.classTab {
		margin: 20rpx 0;
		width: 100%;
		display: flex;
		justify-content: space-around;
	}

	.item {
		display: inline-block;

		text {
			font-size: 28rpx;
		}
	}

	.item-image {
		width: 80rpx;
		height: 80rpx;
		display: block;
		margin: 0 auto;
	}

	.classification {
		width: 100%;

		.title {
			padding: 20rpx 16rpx 0 16rpx;
			font-weight: 700;
			font-size: 42rpx;

			.more {
				display: inline;
				color: #BBBBBB;
				font-size: 32rpx;
				font-weight: 500;
				float: right;
				padding: 0 16rpx;
			}
		}
	}

	.class-card {
		display: flex;
		margin: 0 24rpx;
		padding: 24rpx 0;
		border-bottom: 1rpx solid #F0F0F0;

		.class-image {
			width: 200rpx;
			height: 246rpx;
		}

		.card-text {
			width: 470rpx;
			display: inline-block;
			margin: 10rpx 20rpx;
			font-weight: 300;
			font-size: 30rpx;
			line-height: 40rpx;

			h2 {
				font-weight: 500;
				font-size: 32rpx;
			}

			text {
				line-height: 56rpx;
			}

			.card-listener {
				color: #999999;
				font-size: 26rpx;
				line-height: 34rpx;
			}

			.card-label {
				color: #FB3B28;
				border: 1rpx solid #FB3B28;
				border-radius: 8rpx;
				font-size: 26rpx;
				position: relative;
				left: 8rpx;
				top: -2rpx;
				display: inline-block;
				margin: 0 4rpx;
				padding: 0 8rpx;
			}

			.card-money {
				font-size: 34rpx;
				font-weight: 500;
				color: #FB3B28;
				line-height: 42rpx;

				.card-purchase {
					font-size: 28rpx;
					font-weight: 600;
					float: right;
					display: inline;
					border-radius: 28rpx;
					border: 1px solid #FB3B28;
					background-color: #FB3B28;
					color: #FFFFFF;
					top: -8rpx;
					padding: 0 14rpx;
				}
			}
		}

	}

	.class-bottom {
		margin: 10rpx 0;
		text-align: center;
		color: #BBBBBB;
	}

	.hot-class {
		width: 90%;
		margin: 16rpx 5% 24rpx 5%;
		padding-bottom: 8rpx;
		border-radius: 24rpx;
		box-shadow: #BBBBBB 4rpx 4rpx 4rpx;

		.hot-image {
			width: 100%;
			height: 200rpx;
		}

		.hot-text {
			margin: 8rpx 14rpx;

			.hot-purchase {
				font-size: 30rpx;
				font-weight: 500;
				display: inline;
				border-radius: 28rpx;
				border: 1px solid #FB3B28;
				background-color: #FB3B28;
				color: #FFFFFF;
				padding: 0 14rpx;
			}

			.float-right {
				float: right;
			}
			.float-left{
				float: left;
			}

			.hot-money {
				font-size: 30rpx;
				font-weight: 500;
				color: #FB3B28;
				padding: 6rpx 16rpx 0rpx;
				line-height: 42rpx;
			}

			.hot-detail {
				font-size: 24rpx;
				line-height: 48rpx;
				color: #999999;
			}
		}
	}
	.clearfix::after{
		display: block;
		content: '';
		clear: both;
	}
</style>
