<template>
	<view>
		<image :src="cstitleimg" class="class-banner"></image>
		<view class="title">
			{{title}}
		</view>
		<view class="tag">
			<view class="card-label" v-for="(data) in tag">{{data}}</view>
			<view class="tag-note">
				<text>{{courseLength}}节课 ｜ {{studentnum||1}}人学习</text>
			</view>
		</view>
		<view class="gray-line">
			<!-- 分隔 -->
		</view>
		
		<view class="class-information">
			 <liuyuno-tabs :tabData="tabs" @tabClick='handleTap' />

			<image v-if="currentId == 0" :src="cslistimg" class="basic" mode="widthFix"></image>
			<view v-else class="basic">
				<uni-collapse @change="change" accordion="true">
				    <uni-collapse-item v-for="(item,id) in phaseList" :title="item.title" :key="id" accordion="true"  :thumb="item.stageImg">
				        <uni-list>
				            <uni-list-item 
								v-for="(data,index) in item.subTitle " 
								:title="data.sectionname" 
								:key="index"  
								@click="showClass(data)"
								clickable
								:thumb="data.pic"
							></uni-list-item>
				        </uni-list>
				    </uni-collapse-item>

				</uni-collapse>
				<view  class="">
					
				</view>
			</view>
		</view>
		<view v-if="!purchaseState" class="bottom">
			<button @click="unLock">立即解锁</button>
		</view>
	</view>
</template>

<script>
	import liuyunoTabs from "@/components/liuyuno-tabs/liuyuno-tabs.vue";
	
	export default {
		data() {
			return {
				purchaseState: true,
				title:'课程标题',
				cstitleimg:'',
				cslistimg:'',
				currentId: 0,
				courseid:'',
				tabs:['课程介绍','课程目录'],
				courseLength: Number,
				studentnum: Number,
				tag:Array,
				phaseList:Array,
				openList:[
					false,
					false,
					false,
					true
				],
				
			};
		},
		components:{
			liuyunoTabs
		},
		methods:{
			onShareAppMessage: function(e){console.log(e,'share')},
			unLock: function(e){
				this.sendRequest({
					url: '/course/details/pay',
					type: 'POST',
					data:{
						courseid: this.courseid
					},
					success: (res)=>{
						console.log(res.data.orderid)
						uni.requestPayment({
						    provider: 'weixin',
							appId: 'wxf33f0a72669f8083',
							nonceStr: res.data.nonceStr,
							package: res.data.package,
							paySign: res.data.paySign,
							signType: res.data.signType,
							timeStamp: res.data.timeStamp,
						    success: (data)=> {	
								this.purchaseState = true
						        console.log(data);	
								uni.navigateTo({
									url: `../class-text/class-text?courseid=${this.courseid}&phrase=1&sectionnum=1`
								})
						    },
						    fail: (data)=> {
						        console.log(data);
						    }
						});
					},
					fail: (res)=>{
						console.log('fail '+ JSON.stringify(res))
					},
				})
				
			},
			handleTap: function(e) {
				console.log(e)
			    this.currentId = e
			},
			showClass: function(e){
				console.log(e,202020,this)
				if(this.purchaseState){
					uni.navigateTo({
						url: `../class-text/class-text?courseid=${this.courseid}&phrase=${e.stagenum}&sectionnum=${e.sectionnum}`
					})
				}
			},
			change: function(e){
				console.log(e)
			}
		},
		onLoad(data) {
			console.log(data,123123)
			this.courseid = data.courseid
			this.sendRequest({
				url:'/course/details?courseid='+data.courseid,
				success:(result)=>{
					console.log(result.data,'result.data')
					this.cstitleimg =result.data.cstitleimg
					this.cslistimg =result.data.cslistimg
					this.title = result.data.csname
					this.tag = result.data.tctag.split(';')
					this.courseLength = result.data.totalsection
					this.studentnum = result.data.studentnum
					setTimeout(()=>{
						if(!result.data.currprice){
							this.purchaseState = true
						}else if(result.data.ifpay === '0'){
							this.purchaseState = false
						}
					},0)
				}
			})
			this.sendRequest({
				url:'/nologin/course/details/nhourlist?courseid='+data.courseid,
				success:(data)=>{
					this.phaseList = data.data.map(el=>{
						return {
							title:el.stagename,
							name: '阶段'+this.transToChinese(el.stagenum),
							stageImg: el.stageImg,
							subTitle:el.slist.map(val=>{
								return {
									sectionname: val.sectionname,
									sectionurl:	val.sectionurl,
									stagenum: val.stagenum,
									sectionnum: val.sectionnum
								}
							})
						}
					})
				}
			})
		}
		
	}
</script>

<style lang="scss">
	.class-banner{
		width: 100%;
	}
	.title{
		font-size: 36rpx;
		margin: 6rpx 24rpx;
		font-weight: 500;
	}
	.tag{
		margin: 0rpx 16rpx 16rpx 16rpx;
		.card-label{
			color: #FB3B28;
			border: 1rpx solid #FB3B28;
			border-radius: 8rpx;
			font-size: 26rpx;
			position: relative;
			display: inline-block;
			margin: 0 8rpx;
			padding: 0 8rpx;
		}
		.tag-note{
			margin: 0 8rpx;
			display: inline;
			float: right;
			color: #909090;
			font-size: 26rpx;
			text{
				line-height: 60rpx;
			}
		}
	}
	.gray-line{
		height: 28rpx;
		background-color: #F0F0F0;
		width: 100%;
	}
	.class-information{
		.basic{
			width: 100%;
			margin-bottom: 100rpx;
		}
	}
	.bottom{
		position: fixed; 
		bottom: 0rpx;
		width: 100%;
		background-color: #FFFFFF;
		// box-shadow: 0rpx 0rpx 4rpx #AAAAAA;
		height: 100rpx;
		button{
			background-color: #FB3B28;
			color: #FFFFFF;
			line-height: 80rpx;
			width: 80%;
			height: 80rpx;
			margin-top: 10rpx;
		}
	}
	.selectNav{
	  width: 100%;
	  display:flex;
	  justify-content: space-around;
	  align-items: center;
	  margin: 10rpx 0;
	}
	.selectNav_text {
	  font-size: 32rpx;
	  color: #656565;
	  font-weight: 500;
	}
	.nav-hover{
	  color: #FB3B28;
	  font-size: 34rpx;
	  font-weight: 600;
	  border-bottom: 4rpx solid #FB3B28;
	  border-bottom-width: 4rpx;
	}

	
</style>
