import Vue from 'vue'
import App from './App'
import fns from '@/common/fns.js';
// 在main.js注册全局组件
	import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
	Vue.component('mescroll-body', MescrollBody)
	Vue.component('mescroll-uni', MescrollUni)
Vue.config.productionTip = false

App.mpType = 'app'

//过滤器
Vue.filter('numformat', function (value) {
	if (!value)
		return 0;

	return parseInt(value);
})

Vue.filter('imgurl', function (img,url) {
	url = url?url:'https://img.yzddg.com/';
	img = img?img:'2f75a19a7162c857f2434e2111227762.png';
	if(img.substr(0,7).toLowerCase() == "http://" || img.substr(0,8).toLowerCase() == "https://")
		return img;
	else
		return url + img;
})
Vue.prototype.$fns = fns;
// 此处为演示Vue.prototype使用，非uView的功能部分
Vue.prototype.vuePrototype = '枣红'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView)

// 此处为演示vuex使用，非uView的功能部分
import store from '@/store'

// 引入uView提供的对vuex的简写法文件
let vuexStore = require('@/store/$u.mixin.js')
Vue.mixin(vuexStore);

// 引入uView对小程序分享的mixin封装
let mpShare = require('uview-ui/libs/mixin/mpShare.js');
Vue.mixin(mpShare);

const app = new Vue({
  store,
  ...App
})

// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor, app)

// http接口API抽离，免于写url或者一些固定的参数
import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)

app.$mount()