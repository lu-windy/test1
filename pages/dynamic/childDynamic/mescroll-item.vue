<template>
	<view>
		<mescroll-uni ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<!-- // @init="mescrollInit" @down="downCallback" @up="upCallback"为固定值,不可删改(与mescroll-mixins保持一致)
			// :down="downOption" :up="upOption" 绝大部分情况无需配置
			// :top="顶部偏移量" :bottom="底部偏移量" :topbar="状态栏" :safearea="安全区" (常用)
			// 字节跳动小程序 ref="mescrollRef" 必须配置 -->
			<!-- <view v-for="data in dataList"> 数据列表... </view> -->
			<view class="content" v-for="(item,index) in model" :key="index" @click="toDetails(item.id)">
				<view class="content_l">
					<view class="content_l_title">{{item.title}}</view>
					<view class="content_l_time">{{item.date | timeFormat}}</view>
				</view>
				<view class="content_r">
					<image :src="item.image|imgurl"></image>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/components/mescroll-uni/mixins/mescroll-more-item.js";
	export default {
		mixins: [MescrollMixin, MescrollMoreItemMixin], // 使用mixin

		props: {
			i: Number
		},
		data() {
			return {
				model: [],
				downOption: {
					//auto: false // 不自动加载 (mixin已处理第一个tab触发downCallback)
				},
				// 上拉加载的配置(可选)
				upOption: {
					auto: false, // 不自动加载
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 6 // 每页数据的数量
					},
					noMoreSize: 1, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty: {
						tip: '~ 空空如也 ~', // 提示
					}
				},
			}
		},
		methods: {
			/*下拉刷新的回调*/
			downCallback() {
				// 与 mescroll-body 的处理方式一致 > 
				this.mescroll.resetUpScroll();
			},
			/*上拉加载的回调*/
			async upCallback(page) {
				let params = {
					type: this.i,
					pageSize: page.size,
					pageNum: page.num
				}
				// 与 mescroll-body 的处理方式一致 > 
				let res = await this.$u.post('dynamic/list', params)
				//this.model = res.data
				if (page.num == 1) this.model = []; //如果是第一页需手动制空列表
				this.model = this.model.concat(res.data); //追加新数据
				console.log(this.model)
				//this.mescroll.endSuccess()
				this.mescroll.endBySize(res.data.length, res.length)
			},
			async toDetails(id) {
				uni.navigateTo({
					url: `/pages/palace/index?data=${id}`
				});
			},
			onLoad(data) {
				if(data){
					let detailsData = JSON.parse(data.data)
					this.model = detailsData;
				}
			}, 
		},



	}
</script>


<style lang="scss" scoped>
	.content {
		width: 96%;
		height: 160rpx;
		display: flex;
		padding: 20rpx;
		margin-top: 10rpx;
		margin: 0 auto;
		border-bottom: 2rpx solid #E6E6E6;
		position: relative;
		.content_l {
			width: 70%;

			.content_l_title {
				font-size: 24rpx;
				color: #000000;
				display: -webkit-box;
				overflow: hidden;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			}

			.content_l_time {
				position: absolute;
				bottom: 20rpx;
				font-size: 20rpx;
				color: #8A8A8A;
			}
		}

		.content_r {
			width: 30%;

			image {
				width: 200rpx;
				height: 120rpx;
			}
		}
	}
</style>
