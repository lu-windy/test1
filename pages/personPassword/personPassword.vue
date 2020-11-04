<template>
	<view class="main">
		<u-navbar back-text="修改密码"></u-navbar>
		<view class="content">
			<view class="code-content">
				<view class="code">
					<u-input v-model="code" type="number" placeholder-style="color: #8a8a8a;font-size:28rpx;"
					 :clearable="false" placeholder="请输入验证码"/>	
				</view>
			   <view class="get-btn" @click="getCode" :class="isactive?'get-btn-active':'get-btn-clk'">
					{{btn_text}}
			   </view>
			</view>
			<view class="password">
			    <u-input v-model="pwd1" :type="type" placeholder-style="color: #8a8a8a;font-size:28rpx;"
			     :clearable="false" placeholder="请输入新密码"/>	
			</view>
			<view class="now-password">
			    <u-input v-model="pwd2" :type="type" placeholder-style="color: #8a8a8a;font-size:28rpx;"
			     :clearable="false" placeholder="再次输入新密码"/>	
			</view>
			<view class="button">
				<u-button type="primary" @click="toSubmit">完成</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code:'',
				type:'password',
				btn_text:'获取验证码',
				isactive:true,
				user:{},
				pwd2:'',
				pwd1:''
			}
		},
		methods: {
			async toSubmit(){
				if(this.pwd1 == ''||this.pwd2 == ''){
					uni.showToast({
						title:'密码不能为空',
						icon:'none'
					})
				}else if(this.code==''){
					uni.showToast({
						title:'验证码不能为空',
						icon:'none'
					})
				}else if(this.pwd1!=this.pwd2){
					uni.showToast({
						title:'密码不一致',
						icon:'none'
					})
				}else{
					let params = {
						username:this.user.phone,
						codeNew:this.code,
						password:this.pwd1
					}
					let users = await this.$u.post('comuser/resetpwd',params)
					if(users.status === 1){
						//console.log(123)
						uni.removeStorage({
						    key: 'token',
						    success: function (res) {
						        console.log('success');
										uni.switchTab({
											url:'/pages/index/index'
										})
										// uni.redirectTo({
										// 	url:'/pages/index/index'
										// })
						    }
						});
					}
					
				}
			},
			getCaptcha() {
				let _this = this;
				let phone = parseInt(this.user.phone)
				//console.log(this.user)
				let params = {
					'type': 9,
					'phone': phone
				};
				_this.$u.post('default/sendsms', params).then(res => {
					if (!res.status) {
						_this.$u.toast(res.info || '参数错误!!!');
						return;
					}
					//this.getCode()
				})
			},
			getCode(){
				if(this.isactive){
					this.isactive = false
					this.getCaptcha()
					this.btn_text = 60
					this.timer = setInterval(() => {
						this.btn_text = this.btn_text - 1
						if (this.btn_text == 0) {
							clearTimeout(this.timer)
							this.btn_text = '获取验证码'
							this.isactive = true
						}
					}, 1000)
				}
			}
		},
		async onLoad(params) {
			this.user = params
			//this.getCaptcha()
		}
	}
</script>

<style lang="scss" scoped>
   .content{
	   padding:20rpx;
	   .password,.now-password{
		   height: 90rpx;
		   // line-height: 95rpx;
		   background-color: #FFFFFF;
		   border-radius: 20rpx;
		   padding:10rpx 0 0 20rpx;
		   margin-bottom: 20rpx;
	   }
	   .button{
		   margin:60rpx auto;
		   width: 95%;
	   }
	   .code{
		   width: 70%;
		   background-color: #FFFFFF;
		    border-radius: 20rpx;
			padding:10rpx 0 0 20rpx;
			height: 90rpx;
	   }
	   .code-content{
		   height: 90rpx;
		   // line-height: 95rpx;
		   border-radius: 20rpx;
		   
		   margin-bottom: 20rpx;
		   display: flex;
		   justify-content: space-between
	   }
	   .get-btn{
		   width: 25%;
		   height: 70rpx;
		   color: #FFFFFF;
		   border-radius: 20rpx;
		   text-align: center;
		   line-height: 70rpx;
	   }
	   .get-btn-active{
		   background-color: #00a0e9;
	   }
	   .get-btn-clk{
			background-color: #82848A;
	   }
   }
</style>
