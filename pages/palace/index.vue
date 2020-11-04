<template>
	<view class="wrap">
		<u-navbar :is-fixed="true" title-color="#000000" title-size="34rpx"></u-navbar>
		<view v-html="content" class="content">
			{{content}}
		</view>
	</view>
	
</template>

<script>
	export default {
		data(){
			return{
				content:''
			}
		},
		async onLoad(data){
			let id = parseInt(data.data)
			console.log(data)
			let params = {
				id:id
			}
			let res = await this.$u.post('dynamic/getdetail',params)
			this.content = res.data
			console.log(this.content)
		}
	} 
</script>

<style lang="scss" scoped>
	.wrap{
		.content{
			width: 100%;
			padding: 0 40rpx;
		}
	}
	
</style>
