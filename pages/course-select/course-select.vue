<template>
	<view>
		<view v-for="(classItem,kind) in classValue" class="class-card" @click="goToClass">
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
					<text> ¥{{classItem.money}}</text>
					<button class="card-purchase" type="default" size='mini' @click="">{{classItem.buyType===0 ? '点击解锁':'classItem.money'}}</button>
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
				classValue: [
					{
						src: '/static/images/course-1.png',
						title: '理财训练营，每年给自己加薪',
						teacher: '王院长',
						label: '最强大脑',
						introduce: '联合创始人兼百万CEO',
						money:'1999.00',
						listener:345,
						buyType:0,// 0免费 1打折 2 原价
					}
				],
			};
		},
		onLoad() {
			//课程精选List
			this.sendRequest({
				url:'/course/selected/cslist',
				success(data){
					console.log(data,'11111')
				}
			})
		},
		methods:{
			goToClass: function(e){
				uni.navigateTo({
					url: '../class-detail/class-detail'
				})
			},
		}
	}
</script>

<style lang="scss">
	.class-card{
		display: flex;
		margin: 0 24rpx;
		padding: 24rpx 0;
		border-bottom: 1rpx solid #F0F0F0;
		.class-image{
			width: 200rpx;
			height: 220rpx;
		}
		.card-text{
			width: 470rpx;
			display: inline-block;
			margin: 10rpx 20rpx;
			font-weight: 300;
			font-size: 30rpx;
			line-height: 40rpx;
			h2{
				font-weight: 500;
				font-size: 32rpx;
			}
			text{
				line-height: 56rpx;
			}
			.card-label{
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
			.card-money{
				font-size: 34rpx;
				font-weight: 500;
				color: #FB3B28;
				padding: 0 8rpx;
				line-height: 42rpx;
				.card-purchase{
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
	.class-bottom{
		margin: 10rpx 0;
		text-align: center;
		color: #BBBBBB;
	}
</style>
