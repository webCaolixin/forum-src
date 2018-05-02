import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index.js'

const Wrapper = () => import('@/pages/Wrapper')
const Login = () => import('@/pages/Login')
const Register = () => import('@/pages/Register')
const NotFound = () => import('@/pages/NotFound')
const Home = () => import('@/pages/home/Index')
const DiscussZone = () => import('@/pages/discussZone/Index')
const MyCenter = () => import('@/pages/myCenter/Index')
const MyGame = () => import('@/pages/myCenter/myGame')
const MyPostings = () => import('@/pages/myCenter/MyPostings')

Vue.use(Router)

/**
 * 静态路由
 */
export const staticRouters = [{
	path: '/',
	redirect: '/Home'
}, {
	path: '/Home',
	component: Wrapper,
	children: [{
		path: '',
		name: 'Home',
		component: Home
	}],
	meta: {
		name: '首页'
	}
}, {
	path: '/DiscussZone',
	component: Wrapper,
	children: [{
		path: '',
		name: 'DiscussZone',
		component: DiscussZone
	}],
	meta: {
		name: '讨论区'
	}
}, {
	path: '/Login',
	name: 'Login',
	component: Login
}, {
	path: '/Register',
	name: 'Register',
	component: Register
}]

/**
 * "个人中心" 子路由
 */
export const myCenterRouter = [{
  path: '',
  redirect: '/MyCenter/myGame'
}, {
  path: 'myGame',
  name: 'myGame',
  component: MyGame,
  meta: {
    name: '我发布的比赛'
  }
}, {
  path: 'myPostings',
  name: 'myPostings',
  component: MyPostings,
  meta: {
    name: '我的帖子'
  }
}]

/**
 * 动态路由
 */
export const dynamicRouters = [{
	path: '/MyCenter',
	component: Wrapper,
	children: [{
		path: '',
		component: MyCenter,
		children: myCenterRouter
	}],
	meta: {
		name: '个人中心'
	}
}, {
  path: '*',
  name: '404',
  component: NotFound
}]

let router = new Router({
	routes: staticRouters
})

// 路由跳转前，登录状态判断
router.beforeEach((to, from, next) => {
  let userUid = sessionStorage.getItem('userUuid')
  // sessionStorage中userUid不为空，说明用户已登录
  if (userUid) {
    // vue中state.userInfo.uid为空，说明用户刷新了页面
    if (!store.state.userInfo.uid) {
      store.commit('SET_USER_INFO', userUid)              // 重新提交mutation，设置state.userInfo.uid
      router.addRoutes(store.getters.userDynamicRouters)  // 添加动态路由
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

export default router
