<template>
	<view class="rf-floor-index" v-if="list.length > 0">
		<!--广告图-->
		<view class="banner" v-if="bannerShow" @tap="toBanner(banner.type, banner.id)">
			<image :src="(banner&&banner.image?banner.image:'')|imgurl" mode="aspectFill"/>
		</view>
		<!--列表-->
		<view class="f-header" @tap="toList" v-if="list.length > 1">
			<i class="iconfont icontuijian"/>
			<view class="tit-box">
				<text class="tit">{{ header.title }}</text>
				<text class="tit2">{{ header.desc }}</text>
			</view>
			<i class="iconfont iconyou"></i>
		</view>
		<view class="rf-product-list">
			<!--骨架屏显示 默认显示两项-->
			<view
					v-for="(item, index) in list.length > 1 ? list : []" :key="index"
					class="product-item"
					@tap.stop="detail(item === 0 ? '' : item.id)"
			>
				<view class="image-wrapper">
					<image :src="item.thumb|imgurl" mode="aspectFill"></image>
					<text class="sketch in1line" v-if="item.sketch">{{ item.sketch }}</text>
				</view>
				<text class="title clamp in2line" v-if="item.name">{{item.name}}</text>
				<view class="last-line" v-if="item.name">
					<text class="price in1line">{{item.marketprice}}
					<text class="m-price" v-if="parseFloat(item.market_price) > parseFloat(item.price)">¥ {{ item.market_price }}</text>
					</text>
					<text class="sales in1line">
						<text class="red">{{ item.sales>=1000?(999+'+'):item.sales }}</text>
						人付款
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
    export default {
        name: 'rf-floor-index',
        props: {
            // 列表
            list: {
                type: Array,
                default() {
                    return []
                }
            },
            // 广告图
            banner: {
                type: Object,
                default() {
                    return {}
                }
            },
            // 标题 例: 新品上市
            header: {
                type: Object,
                default() {
                    return {}
                }
            },
            // 是否显示banner图
            bannerShow: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {}
        },
        methods: {
            // 跳转详情页
            detail(id) {
            	if (!id) return;
                this.$emit('detail', id);
            },
            // banner 跳转页
            toBanner(type, id) {
                this.$emit('toBanner', {
                    type,
                    id
                });
            },
            // 列表 跳转页
            toList() {
                this.$emit('toList');
            }
        }
    }
</script>

<style scoped lang="scss">
	.rf-floor-index {
		.banner {
			width: 92%;
			margin: 20upx 4% 0;

			image {
				width: 100%;
				height: 25vw;
				border-radius: 20upx;
				box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.05);
			}
		}

		.f-header {
			display: flex;
			align-items: center;
			height: 120upx;
			padding: 6upx 20upx;
			margin: 0 0 20upx;
			background: #fff;
			border-bottom: 1upx solid rgba(0, 0, 0, 0.05);

			.iconfont {
				color: $base-color;
				font-size: $font-lg + 30upx;
				margin-right: 20upx;
			}

			.tit-box {
				flex: 1;
				display: flex;
				flex-direction: column;
			}

			.tit {
				font-size: $font-lg;
				color: #font-color-dark;
				line-height: 1.3;
			}

			.tit2 {
				font-size: $font-sm;
				color: $font-color-light;
			}

			.iconyou {
				font-size: $font-lg +4upx;
				color: $font-color-light;
			}
		}
	}
	.rf-product-list {
	  display: flex;
	  flex-wrap: wrap;
	  padding: 0 30upx;
	  background: #fff;
	
	  .product-item {
	    box-shadow: 2px 2px 10px rgba(66, 135, 193, 0.1); // 阴影
	    display: flex;
	    flex-direction: column;
	    width: 48%;
	    margin-bottom: 30upx;
		padding: 18upx;
		border-radius: 6upx;
	    &:nth-child(2n+1) {
	      margin-right: 4%;
	    }
	  }
	
	  .image-wrapper {
	    width: 100%;
	    height: 320upx;
	    border-radius: 6upx;
	    overflow: hidden;
	    position: relative;
	
	    image {
	      width: 100%;
	      height: 100%;
	      opacity: 1;
	    }
	
	    .sketch {
	      width: 100%;
	      background-color: rgba(0, 0, 0, 0.4);
	      position: absolute;
	      border-bottom-left-radius: 6upx;
	      bottom: 0;
	      padding: 0 8upx;
	      right: 0;
	      color: #fff;
	      font-size: $font-sm;
	    }
	  }
	
	  .title {
	    font-size: 26upx;
	    color: $font-color-dark;
	    margin: 10upx 0 4upx;
		height: 35rpx;
	  }
	
	  .last-line {
	    display: flex;
	    justify-content: space-between;
	    align-items: center; /* 垂直居中 */
	    .red {
	      color: $base-color;
	      font-size: $font-sm + 2upx;
	      margin-right: 2upx;
	    }
	
	    .sales {
	      font-size: $font-sm + 2upx;
	    }
	  }
	
	  .price {
	    font-size: $font-base;
	    color: $uni-color-primary;
	    line-height: 1;
	
	    &:before {
	      content: '￥';
	      font-size: 26upx;
	    }
	
	    .m-price {
	      margin-left: 4upx;
	      color: $font-color-light;
	      font-size: $font-sm;
	      text-decoration: line-through;
	    }
	  }
	}
</style>
