<template>
	<view class="wrap">
		<u-navbar :is-fixed="true" :title="title" :is-back="false" title-color="#000000" title-size="34rpx"></u-navbar>
		<view class="upper_title">
			<view>
				<text>{{upperTime}}</text>
				<text>{{greet}}</text>
			</view>
			<button @click="BrandCase">{{upperClickDetails}}</button>
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
				<swiper-item class="upper_swiper_item" :key="swiper" v-for="(item,swiper) in hotel">
					<view class="upper_swiper_content">
						<image :src="item.image"></image>
						<view class="upper_content_text">
							<view>{{item.swiperText}}</view>
							<view>{{item.swiperTitle}}</view>
							<view>{{item.swiperIntroduce}}</view>
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
				<view class="middle_bg_img" style="padding-left: 10rpx;">
					<u-row gutter="40">
						<u-col :span="item.span" :key="img" v-for="(item,img) in logo" text-align="center" class="middle_bg_logo">
							<image :src="item.logoImg" mode="widthFix"></image>
						</u-col>
					</u-row>
				</view>
			</view>
		</view>
		<view class="middle_order" :key="order" v-for="(item,order) in middleOrder">
			<view class="middle_order_title">
				<text>{{item.middleOrderTitle}}</text>
				<image :src="item.middleOrderImage" @click="jump(item.pages)"></image>
			</view>
			<view class="middle_order_content" >
				<view class="order_box" :key="middleOrderContent" v-for="(item,middleOrderContent) in item.orderBox" @click="orderInfo(item.url)">
					<view>
						<text>{{item.orderBoxText1}}</text>
						<text>{{item.orderBoxText2}}</text>
					</view>
					<image :src="item.orderBoxImg"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				upperTime: '星期六 9月12号',
				greet: '下午好',
				title: "榕河科技",
				upperClickDetails: '品牌案例',
				upperBrand: '品牌价值通天下',
				upperBrandTitle: 'Brand value is universal',
				upperButton: '了解榕河',
				hotel: [{
						image: '/static/index/hotel.png',
						swiperText: '如何做到心智时代的品牌年轻化？',
						swiperTitle: '麗枫酒店',
						swiperIntroduce: '品牌整合创新、品牌互动传播、品牌路演'
					},
					{
						image: '/static/index/hotel.png',
						swiperText: '如何做到心智时代的品牌年轻化？',
						swiperTitle: '麗枫酒店',
						swiperIntroduce: '品牌整合创新、品牌互动传播、品牌路演'
					},
					{
						image: '/static/index/hotel.png',
						swiperText: '如何做到心智时代的品牌年轻化？',
						swiperTitle: '麗枫酒店',
						swiperIntroduce: '品牌整合创新、品牌互动传播、品牌路演'
					},
					{
						image: '/static/index/hotel.png',
						swiperText: '如何做到心智时代的品牌年轻化？',
						swiperTitle: '麗枫酒店',
						swiperIntroduce: '品牌整合创新、品牌互动传播、品牌路演'
					},
					{
						image: '/static/index/hotel.png',
						swiperText: '如何做到心智时代的品牌年轻化？',
						swiperTitle: '麗枫酒店',
						swiperIntroduce: '品牌整合创新、品牌互动传播、品牌路演',
					},
					{
						image: '/static/index/hotel.png',
						swiperText: '如何做到心智时代的品牌年轻化？',
						swiperTitle: '麗枫酒店',
						swiperIntroduce: '品牌整合创新、品牌互动传播、品牌路演'
					}
				],
				swiperButton: '了解更多案例',
				middleOne1: '服务世界品牌',
				middleOne2: '创建品类标杆',
				middleTwo: '累计服务品牌总数1000',
				logo: [{
						span: 4,
						logoImg: '/static/index/huawei.png',
					},
					{
						span: 4,
						logoImg: '/static/index/huawei.png',
					},
					{
						span: 4,
						logoImg: '/static/index/huawei.png',
					},
					{
						span: 4,
						logoImg: '/static/index/huawei.png',
					},
					{
						span: 4,
						logoImg: '/static/index/huawei.png',
					},
					{
						span: 4,
						logoImg: '/static/index/huawei.png',
					},
					{
						span: 4,
						logoImg: '/static/index/huawei.png',
					},
					{
						span: 4,
						logoImg: '/static/index/huawei.png',
					},
					{
						span: 4,
						logoImg: '/static/index/huawei.png',
					},
					{
						span: 4,
						logoImg: '/static/index/huawei.png',
					},
					{
						span: 4,
						logoImg: '/static/index/huawei.png',
					},
					{
						span: 4,
						logoImg: '/static/index/huawei.png',
					},
				],
				middleOrder: [{
						middleOrderTitle: '核心业务',
						middleOrderImage: '/static/index/return.png',
						pages: '/pages/business/index',
						orderBox: [{
								orderBoxText1: '广佛地铁 高速飞驰的城市化品牌',
								orderBoxText2: '政企宣传',
								orderBoxImg: '/static/index/tu.png',
								url: '/pages/details/index',
							},
							{
								orderBoxText1: '华夏银行重庆分行：读懂用户，与他们的生活更贴近,华夏银行重庆分行：读懂用户，与他们的生活更贴近',
								orderBoxText2: '公关活动',
								orderBoxImg: '/static/index/tu.png',
								url: '',
							},
							{
								orderBoxText1: '华夏银行重庆分行：读懂用户，与他们的生活更贴近',
								orderBoxText2: '全案营销',
								orderBoxImg: '/static/index/tu.png',
								url: '',
							},
							{
								orderBoxText1: '华夏银行重庆分行：读懂用户，与他们的生活更贴近',
								orderBoxText2: '营销服务',
								orderBoxImg: '/static/index/tu.png',
								url: '',
							},
							{
								orderBoxText1: '华夏银行重庆分行：读懂用户，与他们的生活更贴近',
								orderBoxText2: '数字广告',
								orderBoxImg: '/static/index/tu.png',
								url: '',
							},
							{
								orderBoxText1: '华夏银行重庆分行：读懂用户，与他们的生活更贴近',
								orderBoxText2: '影视制作',
								orderBoxImg: '/static/index/tu.png',
								url: '',
							},
						]
					},
					{
						middleOrderTitle: '榕河动态',
						middleOrderImage: '/static/index/return.png',
						pages: '/pages/dynamic/index',
						orderBox: [{
								orderBoxText1: '在昨天的业绩说明会上，老板们讲了啥',
								orderBoxText2: '2020-08-10',
								orderBoxImg: '/static/index/tu.png',
								url: '',
							},
							{
								orderBoxText1: '榕河科技5月动态',
								orderBoxText2: '2020-08-10',
								orderBoxImg: '/static/index/tu.png',
								url: '',
							},
							{
								orderBoxText1: '贷款行业获客的关键途径',
								orderBoxText2: '2020-08-10',
								orderBoxImg: '/static/index/tu.png',
								url: '',
							},
							{
								orderBoxText1: '贷款行业获客的关键途径',
								orderBoxText2: '2020-08-10',
								orderBoxImg: '/static/index/tu.png',
								url: '',
							},
						]
					}
				]
			}
		},
		methods: {
			BrandCase() {
				this.$u.route({
					url: '',
					type: 'reLaunch',
				})
			},
			understanding() {
				this.$u.route({
					url: '',
					type: 'reLaunch',
				})
			},
			more() {
				this.$u.route({
					url: '',
					type: 'reLaunch',
				})
			},
			jump(pages) {
				uni.switchTab({
					url: pages,
				})
			},
			orderInfo(url) {
				uni.navigateTo({
					url:url,
				})
			}
		}
	};
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
			button {
				width: 150rpx;
				height: 50rpx;
				margin: 0;
				padding: 0;
				line-height: 50rpx;
				font-size: 24rpx;
				border-radius: 20rpx !important;
				background-color: #00A0E9;
				color: #FFFFFF;
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
						box-shadow:0rpx 10rpx 15rpx 10rpx #d6d5d3;
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
					padding: 40rpx 0;
					image {
						width: 100rpx;
						height: 100rpx !important;
						object-fit: contain;
						margin: 25rpx 0;
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
							bottom: 36rpx;
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

