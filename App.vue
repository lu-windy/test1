<script>
	import simpleCache from "@/common/Simple-Cache.js"
	export default {
		globalData:{
			simpleCache:simpleCache
		},
		onLaunch: function(options ) {
			if(options.query.pid&&options.query.pid)
				uni.setStorageSync('pid', Number(options.query.pid));
			if(options.query.id&&options.query.id)
				uni.setStorageSync('shopid', Number(options.query.id));
			//console.log('App Launch')
		},
		onShow: function() {
			//console.log('App Show')
		},
		onHide: function() {
			//console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";

	/*每个页面公共css */
	/* H5的时候，隐藏滚动条 */
	/* #ifdef H5 */
	::-webkit-scrollbar {
		display: none;  
		width: 0 !important;  
		height: 0 !important;  
		-webkit-appearance: none;  
		background: transparent;  
	}
	/* #endif */
	
	.in2line {
	  display: -webkit-box !important;
	  overflow: hidden;
	  white-space: normal;
	  text-overflow: ellipsis;
	  word-break: break-all;
	  -webkit-box-orient: vertical !important;
	  -webkit-line-clamp: 2;
	}
</style>