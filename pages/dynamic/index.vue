<template>
	<view class="main">
		<view class="u-wrap">
			<u-navbar :is-fixed="true" :title="title" :is-back="false" title-color="#000000" title-size="34rpx"></u-navbar>
		</view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper ref="tabs" height="80" :list="list" bar-height="3" bar-width="60" :bold="false" active-color="#00A0E9"
				 inactive-color="#010101" :current="current" @change="change" :is-scroll="false">
				</u-tabs-swiper>
			</view>

			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<!-- 企业新闻 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom" class="all_body">
						<mescroll-item ref="mescrollItem0" :i="0" :index="current"></mescroll-item>
						
					</scroll-view>
				</swiper-item>

				<!-- 营销文章 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom" class="all_body">
						<mescroll-item ref="mescrollItem1" :i="1" :index="current"></mescroll-item>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import mescrollItem from './childDynamic/mescroll-item.vue'
	
	export default {
		
		components:{
			mescrollItem
		},
		data() {
			return {
				dynamics: [],
				keyword: '',
				title: '动态',
				
				background: {
					'background-image': '#FFFFFF'
				},
				swiperCurrent: 0,
				list: [{
						name: '企业新闻'
					},
					{
						name: '营销文章'
					},
				],
				current: 0,
				dx: 0,
			}
		},
		mounted() {
			//获取资源

		},
		methods: {
			toDetails(url) {
				this.$u.route({
					url: url,
					// type: 'reLaunch',
					params: {}
				});
			},
			change(index) {
				this.swiperCurrent = index;
			},
			reachBottom() {
				// 此tab为空数据
				if (this.current != 2) {}
			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			}
		},
	}
</script>

<style lang="scss" scoped>
	.main {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.swiper-box {
		width: 100%;
		flex: 1;
	}

	.u-tabs-box {
		border-bottom: 2rpx solid #e9e9e9;
	}

	.font {
		letter-spacing: 4rpx;
	}

	.swiper-item {
		width: 100%;
	}

	.wrap {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
</style>
