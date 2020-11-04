<template>
	<view class="wrap">
		<u-navbar :is-fixed="true" :title="title" :is-back="false" title-color="#000000" title-size="34rpx"></u-navbar>
		<view class="upper_title">
			<view>
				<text>星期{{upperTime | showDay}} {{upperMonths()}}</text>
				<text>{{greet()}}</text>
			</view>
			<image src="/static/index/gerenzhongxin.png" mode="widthFix" @click="BrandCase"></image>
			<!-- <button @click="BrandCase">{{upperClickDetails}}</button> -->
		</view>
		<view class="upper_bg" style="background-image: url(/static/index/smoke.png);">
			<view class="upper_text">{{upperBrand}}</view>
			<text>{{upperBrandTitle}}</text>
			<view class="upper_pos">
				<button @click="understanding">{{upperButton}}</button>
			</view>
		</view>


		<view class="upper_rotation">
			<swiper class="upper_swiper" circular :indicator-dots="true" indicator-active-color="#00A0E9">
				<swiper-item class="upper_swiper_item" :key="swiper" v-for="(item,swiper) in banners">
					<view class="upper_swiper_content" @click="onSwiper(item.id)">
						<image :src="item.image | imgurl" mode="center"></image>
						<view class="upper_content_text">
							<view>{{item.value}}</view>
							<view>{{item.title}}</view>
							<view style="display: -webkit-box;overflow: hidden;-webkit-box-orient: vertical;-webkit-line-clamp: 2;">{{item.describes}}</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<button @click="more">{{swiperButton}}</button>
		</view>
		<view class="middle_bg" style="background-image: url(/static/index/fireworks.png)">
			<view class="middle_bg_one">{{middleOne1}}</view>
			<view class="middle_bg_one" style="margin-top: 20rpx;">{{middleOne2}}</view>
			<view class="middle_bg_two">{{middleTwo}}</view>
			<view class="middle_bg_three" style="background-image: url(/static/index/gradients.png);">
				<view class="middle_bg_img">
					<u-grid :col="3" :border="false" align="center" hover-class="none">
						<u-grid-item :key="img" v-for="(item,img) in logo" bg-color="none">
							<view style="height: 110rpx; display: flex; align-items: center;">
								<image :src="item.logoImg" mode="widthFix"></image>
							</view>
						</u-grid-item>
					</u-grid>
				</view>
			</view>
		</view>
		<view class="middle_order" v-for="(items,i) in model" :key="i">
			<view class="middle_order_title">
				<text>{{i | showTitle}}</text>
				<image src="/static/index/return.png" @click="jump(i)"></image>
			</view>
			<view class="middle_order_content">
				<view class="order_box" :key="index" v-for="(item,index) in items">
					<view  @click="orderInfo(item.id,i)">
						<text>{{item.title}}</text>
						<text v-if="i=='cores'">{{item.item}}</text>
						<text v-if="i=='dynamics'">{{item.date | timeFormat}}</text>
					</view>
					<image :src="item.image | imgurl"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				upperTime: '',
				model: {},
				banners: [],
				title: "榕河科技",
				upperClickDetails: '品牌案例',
				upperBrand: '品牌价值通天下',
				upperBrandTitle: 'Brand value is universal',
				upperButton: '了解榕河',

				swiperButton: '了解更多案例',
				middleOne1: '服务世界品牌',
				middleOne2: '创建品类标杆',
				middleTwo: '累计服务品牌总数1000',
				logo: [{
						span: 4,
						logoImg: '/static/index/life.png',
					},
					{
						span: 4,
						logoImg: '/static/index/huawei.png',
					},
					{
						span: 4,
						logoImg: '/static/index/zglt.png',
					},
					{
						span: 4,
						logoImg: '/static/index/pingan.png',
					},
					{
						span: 4,
						logoImg: '/static/index/zgsy.png',
					},
					{
						span: 4,
						logoImg: '/static/index/zxjt.png',
					},
					{
						span: 4,
						logoImg: '/static/index/zgdj.png',
					},
					{
						span: 4,
						logoImg: '/static/index/aks.png',
					},
					{
						span: 4,
						logoImg: '/static/index/zgyh.png',
					},
					{
						span: 4,
						logoImg: '/static/index/gsyh.png',
					},
					{
						span: 4,
						logoImg: '/static/index/wem.png',
					},
					{
						span: 4,
						logoImg: '/static/index/dfqc.png',
					},
				],

				user: {}
			}
		},
		filters: {
			showDay(value) {
				switch (value) {
					case 0:
						value = '天'
						break;
					case 1:
						value = '一'
						break;
					case 2:
						value = '二'
						break;
					case 3:
						value = '三'
						break;
					case 4:
						value = '四'
						break;
					case 5:
						value = '五'
						break;
					case 6:
						value = '六'
						break;
				}
				return value
			},
			showTitle(i) {
				switch (i) {
					case 'cores':
						i = '核心业务'
						break;
					case 'dynamics':
						i = '榕河动态'
						break;
				}
				return i
			}
		},
		async mounted() {
			this.upperTime = new Date().getDay()
			let params = {
				pageSize:4,
				pageNum:1
			}
			//获取资源
			const res = await this.$u.post('index/list',params)
			this.model = {
				cores: res.cores,
				dynamics: res.dynamics
			}
			this.banners = res.banners
		},
		methods: {
			
			
			//时间
			upperMonths() {
				let month = new Date().getMonth()
				let day = new Date().getDate()
				month += 1
				return month + '月' + day + '日'
			},
			greet() {
				let hours = new Date().getHours()
				if (hours < 12) {
					return '上午好'
				} else if (hours < 18) {
					return '下午好'
				} else {
					return '晚上好'
				}
			},
			onSwiper(id){
				uni.navigateTo({
					url: `/pages/details/index?data=${id}`
				});
			},
			async orderInfo(id,i){
				if (i == 'cores') {
					
					uni.navigateTo({
						url: `/pages/busiessdetails/index?data=${id}`
					});
				} else {
					
					uni.navigateTo({
						url: `/pages/palace/index?data=${id}`
					});
				}
				
			},

			BrandCase() {
				let str = JSON.stringify(this.user)
				let params = {
					user: str
				}
				this.$u.route({
					url: '/pages/personData/personData',

					params
				})
			},
			understanding() {
				this.$u.route({
					url: '/pages/translate/index',
					type: 'switchTab',
				})
			},
			more() {
				this.$u.route({
					url: '/pages/works/index',
					type: 'switchTab',
				})
			},
			jump(i) {
				if (i == 'cores') {
					this.$u.route({
						url: '/pages/business/index',
						type: 'switchTab',
					})
				} else {
					this.$u.route({
						url: '/pages/dynamic/index',
						type: 'switchTab',
					})
				}
			},
			
		},
		async onLoad() {
			let data = await this.$u.post("comuser/getuser")
			this.user = data.data
		},
		onShow() {
			let that = this
			uni.getStorage({
				key: 'token',
				success: function(res) {
					if (res.data.length > 0) {} else {
						that.$u.route({
							url: '/pages/register/index',
							type: 'reLaunch',
						})
					}
				},
				fail: function() {
					that.$u.route({
						url: '/pages/register/index',
						type: 'reLaunch',
					})
				}
			})
		} 
	}
</script>

<style lang="scss" scoped>
	view,
	text {
		letter-spacing: 5rpx;
	}

	.wrap {
		background-color: #f5f3f0;

		.upper_title {
			width: 100%;
			height: 110rpx;
			padding: 0 30rpx;
			background-color: #FFFFFF;
			display: flex;
			justify-content: space-between;
			align-items: center;

			image {
				width: 50rpx;
			}

			view {
				text:nth-child(1) {
					display: block;
					font-size: 20rpx;
					color: #010101;
					margin-bottom: 12rpx;
				}

				text:nth-child(2) {
					font-size: 28rpx;
					font-weight: 800;
				}
			}
		}

		.upper_bg {
			width: 100%;
			height: 1108rpx;
			background-size: 100%;
			text-align: center;
			color: #FFFFFF;
			padding-top: 150rpx;
			position: relative;

			.upper_text {
				width: 60%;
				margin: 0 auto;
				font-size: 92rpx;
				font-weight: 600;
				line-height: 190rpx;
				margin-bottom: 40rpx;
			}

			text {
				font-size: 40rpx;
				color: #FFFFFF;
			}

			.upper_pos {
				width: 100%;
				position: absolute;
				bottom: 100rpx;
				display: flex;
				align-items: center;

				button {
					width: 240rpx;
					height: 60rpx;
					padding: 0;
					border-radius: 20rpx;
					line-height: 60rpx;
					color: #00A0E9;
					font-size: 32rpx;
				}
			}
		}

		.upper_rotation {
			width: 100%;
			height: 1100rpx;
			padding: 70rpx 0;

			.upper_swiper {
				height: 880rpx;
				width: 100%;

				.upper_swiper_item {
					width: 75% !important;
					margin: 0 90rpx;

					.upper_swiper_content {
						width: 500rpx;
						height: 800rpx;
						margin: 0 auto;
						background-color: #FFFFFF;
						border-radius: 20rpx;
						box-shadow: 0rpx 10rpx 15rpx 10rpx #d6d5d3;

						image {
							width: 500rpx;
							height: 566rpx;
						}

						.upper_content_text {
							padding: 15rpx 20rpx;
							letter-spacing: 5rpx;

							view:nth-child(1) {
								font-size: 24rpx;
								color: #8A8A8A;
							}

							view:nth-child(2) {
								font-size: 34rpx;
								font-weight: bold;
								color: #000000;
								margin: 20rpx 0;
							}

							view:nth-child(3) {
								font-size: 24rpx;
								color: #8A8A8A;
							}
						}
					}
				}
			}

			button {
				width: 500rpx;
				height: 68rpx;
				line-height: 68rpx;
				font-size: 28rpx;
				background-color: #00A0E9;
				color: #FFFFFF;
				margin-top: 20rpx;
				border-radius: 20rpx;
			}
		}

		.middle_bg {
			width: 100%;
			height: 1108rpx;
			background-size: 100%;
			padding-top: 60rpx;

			.middle_bg_one {
				font-size: 60rpx;
				font-weight: bold;
				text-align: center;
				color: #FFFFFF;
			}

			.middle_bg_two {
				font-size: 32rpx;
				text-align: center;
				color: #FFFFFF;
				margin-top: 40rpx;
			}

			.middle_bg_three {
				width: 580rpx;
				height: 708rpx;
				margin: 0 auto;
				margin-top: 60rpx;
				background-size: 100%;

				.middle_bg_img {
					height: 200rpx;
					padding: 20rpx 0;

					image {
						width: 110rpx;
						margin: 15rpx 0;
					}
				}
			}
		}

		.middle_order {
			width: 100%;
			background-color: #FFFFFF;
			padding: 20rpx 40rpx 0 40rpx;
			margin-bottom: 20rpx;

			.middle_order_title {
				height: 80rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				text {
					font-size: 34rpx;
					font-weight: bold;
				}

				image {
					width: 20rpx;
					height: 37rpx;
				}
			}

			.middle_order_content {
				padding-top: 20rpx;

				.order_box {
					padding-top: 10rpx;
					height: 160rpx;
					display: flex;
					justify-content: space-between;
					position: relative;
					border-bottom: 1rpx solid #E6E6E6;

					view {
						width: 80%;
						padding-right: 20rpx;

						text:nth-child(1) {
							display: block;
							font-size: 24rpx;
							display: -webkit-box;
							overflow: hidden;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
						}

						text:nth-child(2) {
							position: absolute;
							bottom: 26rpx;
							font-size: 20rpx;
							color: #8A8A8A;
						}
					}

					image {
						width: 200rpx;
						height: 120rpx;
					}
				}
			}
		}
	}
</style>
