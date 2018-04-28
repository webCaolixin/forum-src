// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store/index.js'

Vue.use(ElementUI)
Vue.config.productionTip = false

// 路由跳转前，登录状态判断
router.beforeEach((to, from, next) => {
	let userUid = sessionStorage.getItem('userUuid')
  // sessionStorage中userUid不为空，说明用户已登录
	if (userUid !== null) {
    // vue中state.userInfo.uid为空，说明用户刷新了页面
		if (!store.state.userInfo.uid) {
      store.commit('SET_USER_INFO', userUid)// 重新提交mutation，设置state.userInfo.uid
      router.addRoutes(store.getters.userDynamicRouters)// 添加动态路由
    }
    next()
	} else {
		// 没有登录信息，说明没有登录
		if (to.path.indexOf('/MyCenter') !== -1) {
			next('/Home')
		} else {
			next()
		}
	}
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
