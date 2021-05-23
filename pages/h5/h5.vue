<template>
	<view>
		<view class="marginBottom">
			<image v-for="url in urls" :src="url" mode="widthFix" class="pic" ></image>
		</view>
		<view v-if="show" id="code_mask" class="code_mask" @click="hide">
			<image :src="qrcode" mode="widthFix" class="pic qrcode"></image>
		</view>
		<image :src="btn" @click="showCode" mode="widthFix" class="pic btn"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				urls: Array,
				qrcode: String,
				btn: String
			};
		},
		onLoad(e) {
			console.log(e)
			this.sendRequest({
				url:'/common/conf',
				success:(result)=>{
					console.log(result,'result')
					this.urls = result.data.content.split(';')
					this.qrcode = result.data.qrcode
					this.btn = result.data.btn
				}
			})
		},
		methods:{
			onShareAppMessage: function(e){console.log(e,'share')},
			showCode: function(){
				this.show = true;
			},
			hide: function(){
				console.log(this)
				this.show = false;
			}
		},
		
	}
</script>

<style lang="scss">
	.pic{
		width: 100%;
	}
	.code_mask{
	    position: fixed;
	    top: 0;
	    height: 100vh;
	    background: rgba(0,0,0,0.5);
	    z-index: 1;
		
		width: 100%; //小程序独有
	}
	.qrcode{
		margin-top: 30%;
	}
	.marginBottom{
		margin-bottom: 100rpx;
	}
	.btn{
		position:fixed;
		border-radius: 50rpx 50rpx 0 0;
		bottom:0;
		z-index: 0;
	}
</style>
