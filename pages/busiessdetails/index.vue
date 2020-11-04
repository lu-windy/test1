<template>
	<view class="main">
		<view class="u-wrap">
			<u-navbar :is-back="true" :title="title" title-color='#000000'></u-navbar>
		</view>
		<view v-html="content.data" class="content">
			{{content.data}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				content:[],
				background: {
					'background-image': '#FFFFFF'
				},
			}
		},
		methods: {
			toNav(url){
				this.$u.route({
					url: url,
					type: 'reLaunch',
					params: {}
				});
			},
		},
		async onLoad(data){
			let id = parseInt(data.data)
			let params = {
				id:id
			}
			let res = await this.$u.post('rhbusiness/getdetail',params)
			this.content = res
		}
	}
</script>

<style lang="scss">
   .main{
   	.content{
   		width: 100%;
   		padding: 0 40rpx;
   	}
   }
</style>
