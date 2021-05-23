<template>
	<view>
		<view class="">
			<!-- <image v-for="item in pics" :src="item" mode="widthFix"></image> -->
			<image style="width: 100%;" :src="pic" mode="widthFix"></image>
		</view>
		
		<view class="bottom">
			<view class="page" v-if="shouUp" @click="upPage">
				上一篇
			</view>
			<view class="page" v-if="shouDown" @click="downPage">
				下一篇
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic: String,
				// pics:[],
				phrase: Number,//当前阶段
				phraseLength: Number,//阶段长度
				sectionnum: Number,//当前课程
				sectionLength: Number,//课程长度
				lastSectionLength: Number,//上一阶段课程长度
				courseid: String,
				shouUp: true,
				shouDown: true
			};
		},
		onLoad(e) {
			console.log(e)
			this.sectionnum = Number(e.sectionnum)
			this.phrase = Number(e.phrase)
			this.courseid = e.courseid
			this.sendRequest({
				url:`/course/details/hourlist?courseid=${e.courseid}`,
				success:(data)=>{
					this.pic = data.data[e.phrase -1].slist[e.sectionnum-1].sectionurl
					console.log(this.pic,'this.pic')
					// this.pics = data.data[e.phrase -1].slist[e.sectionnum-1].sectionurl.split(';')
					this.phraseLength = data.data.length
					this.sectionLength = data.data[e.phrase -1].slist.length
					if(e.phrase>1) this.lastSectionLength = data.data[e.phrase -2].slist.length
					if(this.phrase === 1 && this.sectionnum === 1) this.shouUp = false
					if(this.phraseLength === this.phrase && this.sectionLength === this.sectionnum) this.shouDown = false
				}
			})
		},
		methods:{
			upPage: function(){
				if(this.sectionnum ===1) {
					if(this.phrase ===1) return	
					this.phrase = this.phrase-1
					this.sectionnum = this.lastSectionLength
				}else{
					this.sectionnum= this.sectionnum-1
				}
				this.shouDown = true
				this.sendRequest({
					url:`/course/details/hourlist?courseid=${this.courseid}`,
					success:(data)=>{
						this.pic = data.data[this.phrase -1].slist[this.sectionnum-1].sectionurl
						this.phraseLength = data.data.length
						this.sectionLength = data.data[this.phrase -1].slist.length
						if(this.phrase>1) this.lastSectionLength = data.data[this.phrase -2].slist.length
						if(1 ===this.sectionnum && 1 === this.phrase)	this.shouUp= false
					}
				})
			},
			downPage: function(){
				if(this.sectionLength ===this.sectionnum){
					if(this.phraseLength === this.phrase) return
					this.phrase =this.phrase+1
					this.sectionnum= 1
				}else{
					this.sectionnum= this.sectionnum+1
				}
				this.shouUp= true
				this.sendRequest({
					url:`/course/details/hourlist?courseid=${this.courseid}`,
					success:(data)=>{
						this.pic = data.data[this.phrase -1].slist[this.sectionnum-1].sectionurl
						this.phraseLength = data.data.length
						this.sectionLength = data.data[this.phrase -1].slist.length
						if(this.phrase>1) this.lastSectionLength = data.data[this.phrase -2].slist.length
						if(this.sectionLength ===this.sectionnum && this.phraseLength === this.phrase)	this.shouDown= false
					}
				})
			}
		}
		
		
	}
</script>

<style lang="scss">
	.bottom{
		position: fixed; 
		bottom: 0rpx;
		width: 100%;
		background-color: #FFFFFF;
		box-shadow: 0rpx 0rpx 4rpx #AAAAAA;
		height: 100rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
</style>
