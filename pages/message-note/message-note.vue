<template>
	<view>
		<view class="selectNav">
		    <view class="selectNav_text" :class="{'nav-hover' : id == currentId}" v-for="(item,id) in section" @click='handleTap(id)'>
				{{item.name}}
		    </view>
		</view>
		<view v-if="noData" class="empty">
			<image src="../../static/images/no-data.png" class="no-data-img" mode=""></image>
			<view class="empty-text">
				更多发表状态笔记 好友会给你评论哟～
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentId: 0,
				noData: true,
				section: [{
					name: '我的评论',
					typeId: 0
				}, {
					name: '我的点赞',
					typeId: 1
				}, {
					name: '我的笔记',
					typeId: 2
				}],
			}
		},
		methods: {
			handleTap: function(e) {
			    // let id = e.currentTarget.id;
				console.log(e)
			    this.currentId = e
			},
		}
	}
</script>

<style lang="scss">
	.selectNav{
	  width: 100%;
	  display:flex;
	  justify-content: space-around;
	  align-items: center;
	  line-height: 72rpx;
	  box-shadow: 0rpx 0rpx 20rpx #808080;
	  // margin: 10rpx 0;
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
	}
	.empty{
		text-align: center;
		margin-top: 200rpx;
		.no-data-img{
			width: 460rpx;
			height: 460rpx;
		}
		.empty-text{
			color:#C0C0C0;
		}
	}

</style>
