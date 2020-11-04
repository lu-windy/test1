<template>
	<view>
		<u-navbar :is-fixed="true" :title="title" :is-back="false" title-color="#000000" title-size="34rpx"></u-navbar>
		<view class="background">
			<image :src="backgrounsrc" style="width: 100%;height: 400rpx;"></image>
			<view class="text">
				<view class="top">{{text}}</view>
				<view class="bottom">{{backvalue}}</view>
			</view>
		</view>
		<view class="brief">
			<view class="briefst">
				<view class="brief-tips" v-for="(item,index) in briefarr" :key="index">
					<view style="font-size: 36rpx;color: #000000;">{{item.name}}</view>
					<u-line color="#00A0E9" :length="item.height" margin="10rpx 0rpx 20rpx 20rpx"></u-line>
					<view style="font-size: 28rpx;">{{item.title}}</view>
					<image :src="item.src" class="brifeimg" mode="widthFix"></image>
				</view>
			</view>
			<view class="hope" style="		border: 1rpx solid rgba(230,230,230,0.5);border-radius: 20rpx;">
				<view style="font-size: 36rpx;color: #000000;">{{hope}}</view>
				<u-line color="#00A0E9" length="80rpx" margin="10rpx 0 20rpx 20rpx"></u-line>
				<view>
					{{hopetitle}}
				</view>
				<image :src='hopesrc' style="margin-top: -100rpx;" class="brifeimg"></image>
			</view>
			<view class="hope">
				<view style="font-size: 36rpx;color: #000000;margin-left: 0rpx;">{{rhtitle}}</view>
				<u-line color="#00A0E9" length="170rpx" margin="10rpx 0 20rpx 0rpx"></u-line>
				<view>
					{{rhtext}}
				</view>
			</view>
		</view>
		<view class="brand" style="background-image: url(/static/images/translate/brand.png);background-size: 100%;">
			<view style="color: #FFFFFF;font-size: 35rpx;padding-top: 40rpx;text-align: center;">{{brandtitle}}</view>
			<view class="brandsize" >
				<u-grid :col="4" :border="false" align="center" hover-class="none">
					<u-grid-item v-for="(item,index) in brandsizeArr" :key="index" bg-color="none">
						<view style="height: 70rpx; display: flex; align-items: center;">
							<image :src="item.src" mode="widthFix"></image>
						</view>
						
					</u-grid-item>
				</u-grid>
			</view>
		</view>

		<view class="quality">
			<view :class="item.class"  v-for="(item,index) in qualityArr" :key="index">
				<view class="splitimg">
					<image :src="item.src">
					</image>
				</view>
				<view class="splittext">
					{{item.num}}
				</view>
				<view class="splittips">
					{{item.title}}
				</view>
			</view>
		</view>
		<view class="aboutus">
			<view style="font-size: 36rpx;color: #000000;margin-left: 0rpx;">{{aboutus}}</view>
			<u-line color="#00A0E9" length="170rpx" margin="10rpx 0 20rpx 0rpx"></u-line>
			<view class="abouttext" v-for="(item,index) in aboutarr" :key="index">{{item.id}}：{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "成长",
				backgrounsrc: "/static/images/translate/background.png",
				text: "品牌价值通天下",
				backvalue: "Brand value is universal",
				rhtitle: '榕河科技',
				rhtext: "    榕河（东莞）科技有限公司，是一家专业品牌整合创新公司，矢志成为全球领先的系统性品牌管理和营销集团。榕河秉承“品牌是企业的核心”价值观，服务品牌全生命周期，通过整合：战略品牌咨询、战略品牌设计、品牌整合营销、战略品牌实施四大品牌管理服务，助力企业创建品类标杆，打造具备持续竞争力的领导品牌。总部位于中国东莞，主要服务行业：政企、科技、时尚、泛家居、大健康、汽车、互联网、快消、消费电子、电器、地产等众多世界品牌及品类标杆，包括：中国石化、创想激光、oppo、一加手机、中国联通、沃助理、美的等500+国内外上市和旗帜品牌。",
				briefarr: [{
						name: '使命',
						title: '品牌价值通天下！',
						src: '/static/images/translate/ball.png',
						height: '80rpx'
					},
					{
						name: '价值观',
						title: '品牌是企业的核心',
						src: '/static/images/translate/jiazhiguan.png',
						height: '110rpx'
					}
				],
				aboutarr: [{
						id: '客服热线',
						name: "周一~周五  8:00~20:00  18988744818",
					},
					{
						id: '公司官网',
						name: "www.rhidea.cn",
					},
					{
						id: '公司地址',
						name: "东莞市黄江镇黄江东进路富康商业大厦1106",
					}
				],
				brandtitle:"服务世界品牌　打造品类冠军",
				brandsizeArr:[
					{
						span:"3",
						src:"/static/index/life.png",
					},
					{
						span:"3",
						src:"/static/index/zgdj.png",
					},
					{
						span:"3",
						src:"/static/index/huawei.png",
					},
					{
						span:"3",
						src:"/static/index/zglt.png",
					},
					{
						span:"3",
						src:"/static/index/pingan.png",
					},
					{
						span:"3",
						src:"/static/index/zgsy.png",
					},
					{
						span:"3",
						src:"/static/index/zgyh.png",
					},
					{
						span:"3",
						src:"/static/index/zxjt.png",
					},
					{
						span:"3",
						src:"/static/index/gsyh.png",
					},
					{
						span:"3",
						src:"/static/index/aks.png",
					},
					{
						span:"3",
						src:"/static/index/wem.png",
					},
					{
						span:"3",
						src:"/static/index/dfqc.png",
					},
				],
				aboutus: "榕河科技",
				hope: '愿景',
				hopesrc: "/static/images/translate/hope.png",
				hopetitle: '帮助客户建立领导品牌，成为全球领先的品牌全案管理赋能平台，打造最具竞争力品牌管理系统，成	为品牌创造精英。',
				brandsrc: '/static/images/translate/brand.png',
				qualityArr:[
					{	
						src:'/static/images/translate/hand.png',
						class:'Split',
						num:'1000+',
						title:'累计服务总数'
					},
					{
						src:'/static/images/translate/benchmarking.png',
						class:'Split-bored Split',
						num:'20%',
						title:'品牌标杆'
					},
					{
						src:'/static/images/translate/price.png',
						class:'Split',
						num:'50+',
						title:'品牌市值过万亿'
					},
				]
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.background {
		position: relative;
		height: 400rpx;
		display: flex;
		align-items: center;
		image {
			position: absolute;
			top: 0;
		}

		.text {
			position: absolute;
			left: 0;
			right: 0;
			text-align: center;
			margin: 0 auto;
			color: #fff;
			view {

			}
		}
	}
	.top{
		font-size: 62rpx;
		 width: 350rpx;
		 margin: 0 auto;
		 letter-spacing: 10rpx;
		 line-height: 130rpx;
	}
	.bottom{
		letter-spacing: 4rpx;
		opacity: 0.8;
	}


	.brief {
		width: 90%;
		margin: auto;
		margin-top: 20rpx;
	}

	.brief-tips {
		width: 48%;
		height: 200rpx;
		padding-top: 20rpx;
		float: left;
		margin-left: 1.5%;
		border: 1rpx solid rgba(230, 230, 230, 0.5);
		border-radius: 20rpx;
	}

	.brief-tips view {
		margin-left: 20rpx;
		letter-spacing: 3rpx;
	}

	.brifeimg {
		width: 100rpx;
		height: 100rpx;
		float: right;
		margin-top: -40rpx;
		z-index: -1;
	}

	.briefst {
		width: 100%;
		height: 200rpx;
	}

	.hope {
		width: 100%;
		margin-top: 20rpx;
	}

	.hope view {
		font-size: 25rpx;
		letter-spacing: 4rpx;
		margin-left: 20rpx;
	}

	.brand {
		margin-top: 30rpx;
		width: 100%;
		height: 500rpx;
		.brandsize{
		}
		image{
			width: 90rpx;
		}
	}

	.quality {
		margin-top: 20rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: stretch;

	}

	.Split {
		width: 223rpx;
		height: 220rpx;
		float: left;
		box-sizing: border-box;
	}

	.Split-bored {
		border-left: 1px solid #e6e6e6;
		border-right: 1px solid #e6e6e6;
	}
	.splitimg {
		height: 80rpx;
		width: 80rpx;
		margin: auto;
	}

	.Split image {
		height: 80rpx;
		width: 80rpx;
	}

	.splittext {
		margin-top: 40rpx;
		text-align: center;
	}

	.splittips {
		margin-top: 20rpx;
		text-align: center;
	}

	.aboutus {
		width: 92%;
		height: 300rpx;
		margin: auto;
		margin-top: 60rpx;
	}

	.abouttext {
		font-size: 26rpx;
		letter-spacing: 3rpx;
		margin-top: 20rpx;
	}
</style>
