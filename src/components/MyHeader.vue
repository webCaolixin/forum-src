<template>
	<section id="header">
		<h1>球迷联盟</h1>
		<ul class="nav">
			<li v-for="(item, index) in userStatusMenu" class="nav-item" :key="index">
				<a
					:href="`#${item.path}`"
					:class="{'active-link': currentPath.indexOf(item.path)!==-1}">
					{{item.name}}
				</a>
			</li>
		</ul>
		<ul class="tool-bar">
			<li class="tool-item" v-if="!this.userUid"><a href="#/Register">注册</a></li>
			<li class="tool-item"><a @click="handleLogInOut">{{logInOut.name}}</a></li>
		</ul>
	</section>
</template>

<script>
import {mapState, mapGetters} from 'vuex'

export default {
	data() {
		return {
		}
	},
	computed: {
		currentPath() {
			return this.$route.path
		},
		...mapState({
			userUid: state => state.userInfo.uid
		}),
		...mapGetters(['userStatusMenu']),
		logInOut() {
			return this.userUid ? {type: 'logOut', name: '退出'} : {type: 'Login', name: '登录'}
		}
	},
	methods: {
		handleLogInOut() {
			if (this.logInOut.type === 'logOut') {
				this.$confirm('确定退出当前登录用户？', '提示', {
					confirmButtonText: '退出',
					cancelButtonText: '取消',
					type: 'info'
				}).then(() => {
					localStorage.clear()
					this.$store.commit('SET_USER_INFO', '')
					this.$message.info('登录已退出！')
					setTimeout(() => {
						this.$router.push('/Home')
						window.location.reload()
					}, 500)
				}).catch(() => {
					this.$message.info('退出操作已取消！')
				})
			} else {
				this.$router.push('/Login')
			}
		}
	},
	created() {
		console.log('render header...')
	}
}
</script>

<style lang="stylus" scoped>
#header
	h1
		float left
		color #409eff
		line-height 60px
		font-size 26px
		margin-right 120px
	.nav, .tool-bar
		float left
		height 100%
		line-height 60px
		background transparent
		padding 0
		margin 0
	.nav-item, .tool-item
		margin 0
		float left
		list-style none
		position relative
		cursor pointer
		a
			text-decoration none
			color #888
			display block
			padding 0 22px
			border-bottom 2px solid transparent
			&:hover
				color #409eff
				font-weight bold
				border-bottom 2px solid #409eff
	.tool-bar, .tool-item
		float right
	.tool-item
		a
			font-size 14px
			padding 0 15px
			&:hover
				color #888
				font-weight bold
				border-bottom 2px solid transparent
	.nav .nav-item .active-link
		color #409eff
		font-weight bold
		border-bottom 2px solid #409eff
</style>
