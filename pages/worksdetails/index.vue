<template>
	<view class="wrap">
		<u-navbar :is-fixed="true" :title="title" :is-back="true" title-color="#000000" title-size="34rpx"></u-navbar>
		<view class="content">
			<view class="content-one" v-for="(item,index) in worksdetails" :key="index" @click="toWork(item.id)">
				<view class="upper">
					<image :src="item.image | imgurl" mode="widthFix"></image>
				</view>
				<view class="lower">
					<view>{{item.title}}</view>
					<text>{{item.describes}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				worksdetails: []
			}
		},
		methods:{
			toWork(id){
				uni.navigateTo({
				    url: `/pages/details/index?data=${id}`
				});
			}
		},
		
		onLoad(data) {
			if(data){
				let pageData = JSON.parse(data.data)
				this.worksdetails = pageData;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		

		.content {
			background-color: #f5f3f0;
			margin: 20rpx 0;

			.content-one {
				background-color: #FFFFFF;
				margin: 30rpx 0;
				padding-bottom: 30rpx;
				image {
					width: 750rpx;
				}

				.lower {
					padding: 30rpx 40rpx 0 40rpx;

					view {
						font-size: 28rpx;
					}

					text {
						font-size: 20rpx;
						color: #8A8A8A;
						display: -webkit-box;
						overflow: hidden;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}
				}
			}
		}
	}
</style>
