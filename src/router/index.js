import Vue from 'vue'
import Router from 'vue-router'

const Wrapper = () => import('@/pages/Wrapper')
const Login = () => import('@/pages/Login')
const Register = () => import('@/pages/Register')
const NotFound = () => import('@/pages/NotFound')
const Home = () => import('@/pages/home/Index')
const DiscussZone = () => import('@/pages/discussZone/Index')
const MyCenter = () => import('@/pages/myCenter/Index')
const MyGame = () => import('@/pages/myCenter/myGame')
const MyPosttings = () => import('@/pages/myCenter/MyPosttings')

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
const myCenterRouter = [{
	path: 'myGame',
	name: 'myGame',
	component: MyGame,
	meta: {
		name: '我发布的比赛'
	}
}, {
	path: 'myPosttings',
	name: 'myPosttings',
	component: MyPosttings,
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

export default new Router({
	routes: staticRouters
})
