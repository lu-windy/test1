<template>
	<view class="main">
		<u-navbar :is-fixed="true" :title="title" :is-back="false" title-color="#000000" title-size="34rpx"></u-navbar>
		<view class="content">
			<view class="content_title">作品介绍</view>
			<u-row gutter="0">
				<u-col span="4" :key="index" v-for="(item,index) in works">
					<view class="demo-layout" @click="toNav(item.id)">
						<image :src="item.image"></image>
						<text class="demo-layout-text">{{item.title}}</text>
					</view>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '作品',
				works: [],
				background: {
					'background-image': '#FFFFFF'
				},
			}
		},
		async mounted() {

			const res = await this.$u.post('worksitems/list')
			this.works = res.data

		},

		methods: {
			async toNav(id) {
				let params = {
					type:id,
				}
				let res = await this.$u.post('worksitems/getlist',params);
				if(res.status===1){
					let dataStr = JSON.stringify(res.data)
					uni.navigateTo({
					    url: `/pages/worksdetails/index?data=${dataStr}`
					});
				}
			},
		}
	}
</script>

<style lang="scss">
	.demo-layout {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 250rpx;
		font-size: $font-sm + 2upx;
		border-radius: 8rpx;
		border-top: 4rpx solid #e6e6e6;
		border-right: 4rpx solid #e6e6e6;
		position: relative;

		image {
			width: 246rpx;
			height: 250rpx;
			filter: brightness(50%);
		}

		.demo-layout-text {
			position: absolute;
			top: 45%;
			left: 30%;
			color: #FFFFFF;
			font-size: 28rpx;
			font-weight: bold;
		}
	}

	.content {
		width: 100%;

		.content_title {
			font-size: 28rpx;
			margin: 40rpx 0;
			padding-left: 40rpx;
		}
	}
</style>
