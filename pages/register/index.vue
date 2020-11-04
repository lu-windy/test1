<template>
	<view class="wrap" style="background-image: url(/static/register/bj.png);">
		<view class="wrap_img" style="background-image: url(/static/register/cs.png);"></view>
		<view class="upper">榕河科技</view>
		<view class="middle">
			<view class="middle_wrap">
				<view class="middle_wrap_box">
					<u-tabs-swiper activeColor="#fff" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false"
					 :bold="true" inactive-color="#fff" bg-color="none" :show-bar="false">
					</u-tabs-swiper>
					<view class="top-bor"></view>
					<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
						<!-- 手机号码登录 -->
						<swiper-item class="swiper-item">
							<scroll-view scroll-y @scrolltolower="reachBottom">
								<view class="middle_box_one">
									<view class="box_bor" style="margin-bottom: 40rpx;">
										<image src="/static/register/zh.png" mode="widthFix"></image>
										<input type="text" maxlength="11" focus placeholder="请输入您的手机号码" :placeholder-style="placeholderStyle" @input="input"
										 v-model="phone" />
									</view>
									<view class="box_bor">
										<view>
											<image src="/static/register/mm.png" mode="widthFix"></image>
											<input type="text" maxlength="6" focus placeholder="请输入验证码" :placeholder-style="placeholderStyle" v-model="code" />
											<u-button size="mini" hover-class="none" :plain="false" shape="circle" type="primary" class="right" @click="btnplay"
											 :custom-style="canSend?btnStyle2:btnStyle">{{send}}</u-button>

										</view>
									</view>
									<text>忘记密码</text>
									<view class="box_bottom">
										<u-button size="default" :custom-style="customStyle1" shape="circle" type="primary" @click="jump">登录</u-button>
									</view>
								</view>

							</scroll-view>
						</swiper-item>

						<!-- 账号登录 -->
						<swiper-item class="swiper-item">
							<scroll-view scroll-y @scrolltolower="reachBottom">
								<view class="middle_box_one">
									<view class="box_bor" style="margin-bottom: 40rpx;">
										<image src="/static/register/zh.png" mode="widthFix"></image>
										<input type="text" focus placeholder="请输入您的账号" :placeholder-style="placeholderStyle" v-model="phone"/>
									</view>
									<view class="box_bor">
										<view>
											<image src="/static/register/mm.png" mode="widthFix"></image>
											<input type="password" focus placeholder="请输入您的密码" :placeholder-style="placeholderStyle" v-model="pwd"/>
										</view>
									</view>
									<text style="color:#FFFFFF;">忘记密码</text>
									<view class="box_bottom">
										<u-button size="default" :custom-style="customStyle1" shape="circle" type="primary" @click="pwdLoginaction">登录</u-button>
									</view>
								</view>
							</scroll-view>
						</swiper-item>
					</swiper>
				</view>

			</view>
		</view>
		<view class="lower">
			<view class="lower_bor">
				<view>第三方登录</view>
			</view>
			<button type="default" <!-- #ifndef MP -->
				@click = "wechatLogin(false)"
				<!-- #endif -->

				<!-- #ifdef MP -->
				@getUserInfo = "wechatLogin"
				<!-- #endif -->

				<!-- #ifndef H5 -->
				v-if="provider.includes('weixin')"
				<!-- #endif -->

				open-type="getUserInfo"
				>
				<image src="/static/register/wx.png"></image>
			</button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						name: '手机快捷登录'
					},
					{
						name: '账号密码登录'
					},
				],
				send: '发送验证码',
				current: 1,
				swiperCurrent: 1,
				dx: 0,
				mobile: '',
				placeholderStyle: 'color:#fff',
				customStyle1: {
					display: 'flex',
					justifyContent: 'center',
				},
				showIcons: false,
				provider: [], //支持的登录类型
				userInfo: {},
				btnStyle: {
					'width': '140rpx',
					'backgroundColor': '#8a8a8a'
				},
				btnStyle2: {
					'width': '140rpx',
				},
				canSend: false,
				phone: '',
				code: '',
				pwd:''
			}
		},
		mounted(e) {
			//获取本机支持多少种登录
			uni.getProvider({
				service: 'oauth',
				success: res => {
					this.provider = res.provider
				},
			});
			// #ifdef H5
			function GetQueryString(name) //获取参数
			{
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if (r != null) return unescape(r[2]);
				return null;
			}

			let code = GetQueryString("code")
			this.wechatLogin(code);
			// #endif
		},
		methods: {
			
			//
			change(index) {
				this.swiperCurrent = index;
			},
			reachBottom() {
				// 此tab为空数据
				if (this.current != 1) {
					// this.loadStatus.splice(this.current,1,"loading")
					// setTimeout(() => {
					// 	this.getOrderList(this.current);
					// }, 1200);
				}
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
			},
			showIcon() {
				this.showIcons = !this.showIcons
			},
			jump() {
				this.verification()
			},
			
			//
			//第三方登录获取信息
			//
			dianji() {
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes.authResult);
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								console.log('用户昵称为：' + infoRes.userInfo.avatarUrl);
							}
						});
					}
				});
			},
			
			
			//
			//手机号登录判断是否为手机号
			//
			input() {
				if (this.$u.test.mobile(this.phone)) {
					this.canSend = true
				} else {
					this.canSend = false
				}
			},
			//
			//验证码登录
			//
			btnplay() {		
				if (this.canSend === true) {
					this.getCaptcha()
				}
			},
			async getCaptcha() {
				let _this = this;
				let params = {
					'type': 9,
					'phone': _this.phone
				};
				_this.$u.post('default/sendsms', params).then(res => {
					if (!res.status) {
						_this.$u.toast(res.info || '参数错误!!!');
						return;
					}
					if(res.status===1){
						this.send = 60
						this.canSend = false
						let time = setInterval(() => {
							this.send -= 1
							if (this.send == 0) {
								clearInterval(time)
								this.send = '重新发送'
								this.canSend = true
							}
						}, 1000)
					}
				})
			},
			
      //登录
			verification() {
				let _this = this;
				if (_this.$u.test.mobile(_this.phone)) {
					let params = {
						'type': 9,
						'phone': _this.phone,
						'codeText': _this.code
					};
					_this.$u.post('default/login', params).then(res => {
						if (!res.status) {
							_this.error = true;
							_this.errorText = res.info || '验证码错误，请重新输入';

							this.$refs.uToast.show({
								title: '验证码错误',
								type: 'error'
							})
							return;
						} else {
							_this.$u.vuex('vuex_user.hasLogin', true);
							//_this.$u.vuex('userinfo',res.user);
							_this.$u.route({
								type: 'reLaunch',
								url: '/pages/index/index',
								params: {}
							});
						}
					})
				} else {
					_this.$u.toast('请输入正确的手机号码!!!');
				}
			},
			
			
			pwdLoginaction(){
				let _this = this;
				if (_this.$u.test.mobile(_this.phone)) {
					let params = {
						'userName': _this.phone,
						'passWord': _this.pwd
					}
					_this.$u.post('default/passlogin', params).then(res => {
						if (!res.status) {
							return;
						} else {
							_this.$u.vuex('vuex_user.hasLogin', true);
							uni.setStorage({
							    key: 'token',
							    data: res.data.token.token,
							    success: function () {
							        _this.$u.route({
							        	type: 'reLaunch',
							        	url: '/pages/index/index',
							        	params: {}
							        });
							    }
							});	
						}
					})
				}else {
					_this.$u.toast('请输入正确的手机号码!!!');
				}
			},




			//
			//第三方登录
			//
			async wechatLogin(e) {
				let _this = this;

				// #ifdef H5
				if (e) {
					var requireData = {
						"code": e
					}
				} else {
					// const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?'+
					// 			'appid=请填写你的服务号appid'+
					// 			'&redirect_uri=请填写回调域名?'+
					// 			'&response_type=code'+
					// 			'&scope=snsapi_userinfo'+
					// 			'&state=STATE&connect_redirect=1#wechat_redirect';
					// this.url = url;
					// location.href= url
					return false
				}
				// #endif
				// #ifndef H5
				let [err, requireData] = await uni.login({
					provider: 'weixin'
				})
				// #endif

				// #ifdef MP
				requireData.userInfo = e.mp.detail.userInfo
				// #endif
				// #ifdef APP-PLUS
				let {
					userInfo
				} = await new Promise((callback) => {
					uni.getUserInfo({
						provider: 'weixin',
						success: infoRes => {
							callback(infoRes)
						}
					})
				})
				requireData.userInfo = userInfo;
				// #endif

				//判断本地授权成功
				if (requireData && requireData.errMsg == 'login:ok') {
					// #ifdef MP-WEIXIN
					requireData.userInfo.code = requireData.code;
					// #endif

					requireData.userInfo.pid = uni.getStorageSync("pid") || 0;

					_this.$u.post('default/weixinlogin', requireData.userInfo).then(res => {
						if (_this.$fns.checkError(res, 's', function(errno, error) {
								uni.showToast({
									title: error,
									icon: 'none',
									success() {
										if (error == '没有绑定手机') {
											setTimeout(function() {
												_this.$u.route({
													url: 'pages/login/threelogin',
													params: {},
												})
											}, 1000);
										}
									}
								})
							})) {
							this.$u.vuex('vuex_user.hasLogin', true);
							_this.$u.route({
								type: 'reLaunch',
								url: 'pages/my/index',
								params: {}
							});
						}
					})
				}
			}

		},

	}
</script>

<style lang="scss" scoped>
	.wrap {
		height: calc(100vh - var(--window-top));
		position: relative;
		background-size: 100%;
		padding-top: 178rpx;

		.wrap_img {
			width: 100%;
			height: 225rpx;
			position: absolute;
			bottom: 0;
			background-size: 100%;
		}

		.upper {
			width: 100%;
			font-size: 60rpx;
			font-weight: bold;
			text-align: center;
			color: #FFFFFF;
			letter-spacing: 15rpx;
			margin-bottom: 150rpx;
		}

		.middle {
			margin: 0 40rpx;

			.middle_wrap {
				height: 480rpx;
				border-radius: 40rpx;
				padding: 0 20rpx;
				margin: 0 20rpx;

				.middle_wrap_box {
					height: 480rpx;
					position: relative;

					.top-bor {
						width: 2rpx;
						height: 60rpx;
						background-color: #FFFFFF;
						position: absolute;
						top: 12rpx;
						left: 296rpx;
					}

					.swiper-box {
						height: 430rpx;

						.middle_box_one {
							.box_bor {
								margin-top: 10rpx;
								height: 80rpx;
								background-color: #86B4F5;
								border-radius: 40rpx;
								display: flex;
								align-items: center;
								padding: 0 30rpx;
								position: relative;

								image {
									width: 41rpx;
									float: left;
									margin-right: 20rpx;
								}

								input {
									font-size: 24rpx;
									color: #FFFFFF;
								}

								.right {
									position: absolute;
									right: 30rpx;
								}

								view {
									display: flex;
									justify-content: space-between;
								}
							}

							text {
								font-size: 24rpx;
								letter-spacing: 5rpx;
								float: right;
								margin: 20rpx 20rpx;
								color: #FFFFFF;
							}

							.box_bottom {
								clear: both;
								height: 100rpx;
								margin-top: 30rpx;
							}
						}
					}
				}
			}
		}

		.lower {
			width: 100%;
			height: 100rpx;
			position: absolute;
			bottom: 12%;
			left: 0;
			text-align: center;

			image {
				width: 48rpx;
				height: 48rpx;
			}

			button {
				background-color: transparent;
				width: 60rpx;
				height: 60rpx;
				padding: 0;
			}

			button::after {
				border: none;
			}

			.lower_bor {
				margin: 0 60rpx;
				border-top: 1rpx solid #8A8A8A;
				display: flex;
				justify-content: center;

				view {
					width: 35%;
					text-align: center;
					margin-top: -20rpx;
					color: #FFFFFF;
					letter-spacing: 10rpx;
					background-color: #952DEB;
					z-index: 99;
				}
			}
		}
	}
</style>
