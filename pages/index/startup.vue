<template>
    <view class="main"></view>
</template>

<script>
export default {
    data() {
        return {
			// 句柄返回的是object
			simpleCache: getApp().globalData.simpleCache
		};
    },
    onLoad() {
        this.loadExecution();
    },
    methods: {
        loadExecution: function() {
			let _this = this;
            /**
             * 获取本地存储中launchFlag的值
             * 若存在，说明不是首次启动，直接进入首页；
             * 若不存在，说明是首次启动，进入引导页；
             */
            try {
                //const value = false;//uni.getStorageSync('launchFlag');
				//读缓存
				const value = _this.simpleCache.get('launchFlag');
                if (value) {
                    if (value == true) {
                        uni.switchTab({
                            url: '/pages/index/index'
                        });
                    } else {
                        uni.redirectTo({
                            url: '/pages/index/guide'
                        });
                    }
                } else {
                    // uni.setStorage({
                    //     key: 'launchFlag',
                    //     data: true,
                    //     success: function() {
                    //         console.log('存储launchFlag');
                    //     }
                    // });
					// 设置缓存 且设置时间(秒)
					_this.simpleCache.put("launchFlag",true,7200);
                    uni.redirectTo({
                        url: '/pages/index/guide'
                    });
                }
            } catch (e) {
                // 设置缓存 且设置时间(秒)
                _this.simpleCache.put("launchFlag",true,7200);
                uni.redirectTo({
                    url: '/pages/index/guide',
                });
            }
        }
    }
};
</script>
<style></style>