<template>
	<view class="main">
		<u-navbar back-text="个人资料"></u-navbar>
		<view class="content">
			<view class="content-top" @click="changeHead">
				<view class="head">头像</view>
				<image src="/static/images/person-image.png"></image>
				<u-icon name="arrow-right" color="#8a8a8a" size="28"></u-icon>
			</view>
			<view class="content-buttom">
				<view class="content-buttom-name">
					<label>名称</label>
					<u-input v-model="value" :type="type" placeholder-style="color: #000000;text-align:right;font-size:24rpx;"
					 :clearable="false" placeholder="请输入您的昵称" input-align="right"/>
				</view>
				<view class="content-buttom-name">
					<label>电话号码</label>
					<u-input v-model="value" :type="number" placeholder-style="color: #000000;text-align:right;font-size:24rpx;"
					 :clearable="false" :disabled="true" input-align="right" :placeholder="user.username"/>
				</view>
				<view class="content-buttom-pad" @click="toPassword">
					<label>修改登录密码</label>
					<u-icon name="arrow-right" color="#8a8a8a" size="28"></u-icon>
				</view>
			</view>
		</view>
		<u-modal v-model="headShow" :content="headShowText" :show-cancel-button="false"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				maxlength:5,
				user:{},
				headShow:false,
				headShowText:'功能未开放'
			}
		},
		methods: {
			toPassword(){
				let params = {
					phone:this.user.username,
					id:this.user.id
				}
				this.$u.route({
					url:'/pages/personPassword/personPassword',
					type:'redirect',
					params
				})
			},
			changeHead(){
				this.headShow = true
			}
		},
		onLoad(params) {
			let data = JSON.parse(params.user)
			this.user = data
			console.log(data)
		}
	}
</script>

<style lang="scss" scoped>
	.main{
		height: 100vh;
		background-color: #FFFFFF;
	}
  .content{
	  padding: 40rpx;
  }
  .content-top{
	  display: flex;
	  height: 100rpx;
	  line-height: 100rpx;
	  .head{
		  width: 80%;
	  }
	  image{
		  width: 100rpx;
		  height: 100rpx;
		  margin-right: 20rpx;
	  }
  }
  .content-buttom{
	  label{
		  font-size:24rpx ;
	  }
	  .content-buttom-name{
	  	  margin-top: 20rpx;
	  	  display: flex;
	  	  border-bottom: 2rpx solid #E6E6E6;
	  	  label{
	  		  width: 50%;
	  		  margin-top: 10rpx;
	  	  }
	  }
	  .content-buttom-pad{
	  	  height: 86rpx;
	  	  line-height: 86rpx;
	  	  display: flex;
	  	  border-bottom: 2rpx solid #E6E6E6;
	  	  label{
	  	  		  width: 90%;
	  	  }
	  }
  }
</style>
