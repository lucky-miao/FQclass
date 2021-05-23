<template>
	<view>
		<!-- <view class="top-area">
			<view class="vip-area">
				<text>
					VIP俱乐部：会员专属福利
				</text>
				<button class="vip-open" @click="vipPurchase">立即开通</button>
			</view>
			<image class="bell" src="../../static/images/bell.png"  @click="goToNote"></image>
		</view> -->
		<view class="gray-line">
			<!-- 分隔 -->
		</view>
		<view class="title">
			更多课程
		</view>
		<view class="class-card">
			<image class="class-image" :src="srcLearning"></image>
			<view class="card-text">
				<h2>暂未学习</h2>
				<view>
					<text>学习理财，以富相见</text>
				</view>
			</view>
		</view>
		<view class="gray-line">
			<!-- 分隔 -->
		</view>
		<view class="title">
			课程推荐
		</view>
		<view class="class-card" v-for="(item, index) in classList" @click="goToClass(item)">
			<image class="class-image" :src="src"></image>
			<view class="card-text">
				<h2>{{item.csname}}</h2>
				<view>
					<text>{{item.csdesc}}</text>
				</view>
				<view class="card-introduce">
					近30天{{item.studentnum}}人学习
				</view>
				
				<view class="card-money">
					<text v-if="item.currprice"> ¥{{item.currprice}}</text>
					<button class="card-purchase" type="default" size='mini' @click="">点击了解</button>
				</view>
				<view class="card-listener">
					▶&nbsp;{{item.studentnum}}0人听过
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				src:'/static/images/recommed.png',
				srcLearning:'/static/images/learning-class.png',
				classList:Array,
				studyList: Array
			}
		},
		methods: {
			goToNote: function(e) {
				uni.navigateTo({
					url: '../message-note/message-note'
				})
			},
			vipPurchase: function(){
				//VIP购买
				this.sendRequest({
					url:'/persinfo/vip/pay',
					type:'POST',
					
					success(data){
						console.log(data,'66666')
					}
				})
			},
			goToClass: function(item){
				uni.navigateTo({
					url: '../class-detail/class-detail?courseid='+item.courseid
				})
			}
		},
		onLoad() {
			this.sendRequest({
				url:'/course/more/list',
				success:(data)=>{
					this.classList = data.data.slist
					// this.classValue = data.data.slist
					console.log(data.data.slist)
				}
			})
			this.sendRequest({
				url:'/course/study/list',
				success:(data)=>{
					this.studyList = data.data.slist
					// this.classValue = data.data.slist
					console.log(data.data.slist)
				}
			})
		}
	}
</script>

<style lang="scss">
	.top-area{
		margin: 28rpx 0;
		.vip-area{
			margin: 0 24rpx;
			width: 560rpx;
			display: inline-block;
			// background-color: #2A2725;
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
				// background-color: #D6B48A;
				background-image: linear-gradient(to bottom, #EACFAD, #C7A170);
				line-height: 2.4;
				overflow: visible;
				padding: 0 8rpx;
				font-weight: 300;
				display: inline;
				box-shadow:inset 0rpx 0rpx 4rpx #101010;
			}
		}
		.bell{
			width: 50rpx;
			height: 50rpx;
			position: absolute;
			right: 48rpx;
			top: 44rpx;
		}
	}
	.gray-line{
		height: 28rpx;
		background-color: #F0F0F0;
		width: 100%;
	}
	.title{
		padding: 0 12rpx;
		margin: 20rpx 28rpx;
		font-weight: 600;
		font-size: 42rpx;
		border-left: 6rpx solid #FC3A27;
	}
	
	.class-card{
		display: flex;
		margin: 0 24rpx;
		padding: 24rpx 0;
		border-bottom: 1rpx solid #F0F0F0;
		.class-image{
			width: 200rpx;
			height: 246rpx;
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
			.card-listener{
				color: #999999;
				font-size: 26rpx;
				line-height: 34rpx;
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
</style>
