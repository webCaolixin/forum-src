<template>
	<el-container>
    <el-header>
		  <section id="header">
				<h1>球迷联盟</h1>
				<ul class="tool-bar">
					<li class="tool-item"><a @click="handleLogInOut">退出</a></li>
				</ul>
			</section>
    </el-header>

    <el-main>
    	<section id="admin">
				<el-row>
					<el-col :span="3">
						<el-menu
							id="myCenter-menu"
							:router="true"
							default-active="/Admin/managePostings"
							class="el-menu-vertical-demo">
								<el-menu-item index="/Admin/managePostings">
									<i class="el-icon-news"></i>
									<span slot="title">管理帖子</span>
								</el-menu-item>
								<el-menu-item index="/Admin/inputPlaces">
									<i class="el-icon-location"></i>
									<span slot="title">录入场地</span>
								</el-menu-item>
						</el-menu>
					</el-col>
					<el-col :span="21" id="admin-view">
						<router-view></router-view>
					</el-col>
				</el-row>
			</section>
    </el-main>
  </el-container>
</template>

<script>
import $axios from '@/plugins/ajax'

export default {
	data() {
		return {
		}
	},
	methods: {
		handleLogInOut() {
			this.$confirm('确定退出当前登录用户？', '提示', {
				confirmButtonText: '退出',
				cancelButtonText: '取消',
				type: 'info'
			}).then(() => {
				$axios.delete('/admin/v1/login', {
          headers: {'x-auth-token': sessionStorage.getItem('token') || ''}
        }).then(({data}) => {
					if (data.statusCode === 200) {
							sessionStorage.clear()
							this.$store.commit('SET_USER_INFO', '')
							this.$message.info('登录已退出！')
							setTimeout(() => {
								this.$router.push('/Home')
								window.location.reload()
							}, 500)
					} else {
						this.$message.error(data.message)
					}
				})
			}).catch(() => {
				this.$message.info('退出操作已取消！')
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
.el-header
	border-bottom 1px solid #ebebeb
.el-main
	padding 0
#header
	h1
		float left
		color #409eff
		line-height 60px
		font-size 26px
		margin-right 120px
	.tool-bar
		float right
		height 100%
		line-height 60px
		background transparent
		padding 0
		margin 0
	.tool-item
		margin 0
		list-style none
		position relative
		cursor pointer
		a
			font-size 14px
			color #888
			text-decoration none
			display block
			padding 0 22px
			&:hover
				font-weight bold
#admin-view
	padding 15px
</style>
