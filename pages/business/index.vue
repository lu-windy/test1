<template>
	<view class="main">
		<view class="u-wrap">
			<u-navbar :is-fixed="true" :title="title" :is-back="false" title-color="#000000" title-size="34rpx"></u-navbar>
		</view>
		<view class="wrap">
			<view class="content" v-for="(items,index) in buiness">
				<view class="content_title">{{items.title}}</view>
				<u-grid :col="4" :border="false" align="center" hover-class="none">
					<u-grid-item :key="i" v-for="(item,i) in items.data">
						<view class="demo-layout" @click="toNav(item.id)" style="height: 110rpx; display: flex; align-items: center;">
							<image :src="item.image | imgurl" mode="widthFix"></image>
							<text class="demo-layout-text">{{item.name}}</text>
						</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				buiness:[],
				buinessdetails:[],
				title: '业务',
				background: {
					'background-image': '#FFFFFF'
				},
			}
		},
		methods: {
			toNav(id){
				// console.log(id)
				uni.navigateTo({
				    url: `/pages/busiessdetails/index?data=${id}`
				});
			},
		},
		// onLoad(data) {
		// 	if(data){
		// 		let pageData = JSON.parse(data.data)
		// 		this.worksdetails = pageData;
		// 	}
		// },
		async mounted() {
			//获取资源
			const res = await this.$u.post('rhbusiness/list')
				console.log(res)
				this.buiness = res.data;
		}
	}
</script>

<style lang="scss">
	.main{
		width: 100%;
		height: calc(100vh - var(--window-top));
		background-color: #F5F3F0;
		.wrap{
			overflow: hidden;
			.demo-layout {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 142upx;
				font-size: $font-sm + 2upx;
				border-radius: 8rpx;
				margin: 25rpx 0;
				image{
					width: 60rpx;
					margin-bottom: 10rpx;
				}
			}
			.content{
				width: 100%;
				height: auto;
				padding: 20rpx;
				background-color: #FFFFFF;
				margin: 20rpx 0;
				.content_title{
					font-size: 30rpx;
					font-weight: bold;
				}
			}
		}
	}
</style>
