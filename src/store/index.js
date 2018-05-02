import Vue from 'vue'
import Vuex from 'vuex'
// import $axios from '@/plugins/ajax'
import { dynamicRouters } from '@/router/index'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo: {
			uid: '',
			role: ''
		},
		// 静态功能模块
		staticMenuList: [{
			name: '首页',
			path:	'/Home'
		}, {
			name: '讨论区',
			path: '/DiscussZone'
		}],
		// 动态功能模块
		dynamicMenuList: [{
			name: '个人中心',
			path: '/MyCenter'
		}]
	},
	getters: {
		// 设置用户状态功能模块
		userStatusMenu: state => {
		  // 根据vuex中用户id是否有值，判断返回的功能菜单模块
			return !state.userInfo.uid ? state.staticMenuList : state.staticMenuList.concat(state.dynamicMenuList)
		},
		// 设置用户动态路由
		userDynamicRouters: state => {
		  // 根据vuex中用户id是否有值，判断返回的动态路由
			return !state.userInfo.uid ? [] : dynamicRouters
		}
	},
	mutations: {
		// 保存/更新用户信息
		SET_USER_INFO(state, userInfo) {
			// state.userInfo = Object.assign({}, state.userInfo, userInfo)
			state.userInfo.uid = userInfo
		},
		// 设置动态路由
		SET_DYNAMIC_ROUTER(state) {
		}
	},
	actions: {
		// 获取用户信息
		login({state, commit}, loginData) {
			return new Promise((resolve, reject) => {
				// $axios.post('', loginData).then(({data}) => {
				// 	if (data) {
				// 		commit('SET_USER_INFO')
				// 		resolve(data)
				// 	} else {
				// 		reject(data)
				// 	}
				// })
			})
		}
	}
})

export default store
