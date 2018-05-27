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
const PostingDetail = () => import('@/components/PostingDetail')
const AdminHome = () => import('@/pages/admin/Index')
const AllPostings = () => import('@/pages/admin/AllPostings')
const InputPlaces = () => import('@/pages/admin/InputPlaces')

Vue.use(Router)

/**
 * "个人中心" 子路由
 */
export const myCenterRoutes = [{
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
 * 模块路由
 */
export const routes = [{
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
	}, {
    path: 'postingDetail/:postId',
    name: 'PostingDetail',
    component: PostingDetail
  }],
	meta: {
		name: '讨论区'
	}
}, {
  path: '/MyCenter',
  component: Wrapper,
  children: [{
    path: '',
    component: MyCenter,
    children: myCenterRoutes
  }],
  meta: {
    name: '个人中心'
  }
}, {
  path: '/Admin',
  name: 'Admin',
  component: AdminHome,
  children: [{
    path: '',
    component: AllPostings
  }, {
    path: 'managePostings',
    name: 'ManagePostings',
    component: AllPostings
  }, {
    path: 'inputPlaces',
    name: 'InputPlaces',
    component: InputPlaces
  }]
}, {
  path: '/Login',
  name: 'Login',
  component: Login
}, {
  path: '/AdminLogin',
  name: 'AdminLogin',
  component: Login
}, {
  path: '/Register',
  name: 'Register',
  component: Register
}, {
  path: '*',
  name: '404',
  component: NotFound
}]

let router = new Router({
	routes: routes
})

// 路由跳转前，登录状态判断
router.beforeEach((to, from, next) => {
  console.log('................................')
  let userUid = sessionStorage.getItem('userUuid')
  if (userUid) {  // sessionStorage中userUid不为空，说明用户已登录
    if (!store.state.userInfo.uid) {              // vue中state.userInfo.uid为空，说明用户刷新了页面
      store.commit('SET_USER_INFO', userUid)      // 重新提交mutation，设置state.userInfo.uid
    }
    next()
  } else {
    // 没有登录信息，说明没有登录
    if (to.path.indexOf('/MyCenter') !== -1) {
      next('/404')
    } else {
      next()
    }
  }
});

export default router
