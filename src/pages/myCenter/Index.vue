<template>
	<section id="myCenter">
		<el-row>
			<el-col :span="3">
				<el-menu
					id="myCenter-menu"
					:router="true"
					default-active="/MyCenter/myGame"
					class="el-menu-vertical-demo">
						<el-menu-item index="/MyCenter/myGame">
							<i class="el-icon-star-on"></i>
							<span slot="title">我的比赛</span>
						</el-menu-item>
						<el-menu-item index="/MyCenter/myPostings">
							<i class="el-icon-news"></i>
							<span slot="title">我的帖子</span>
						</el-menu-item>
				</el-menu>
			</el-col>
			<el-col :span="21" id="myCenter-view">
				<router-view></router-view>
			</el-col>
		</el-row>
	</section>
</template>

<script>
export default {
	data() {
		return {
		}
	},
	methods: {
	},
	created() {
	}
}
</script>

<style lang="stylus" scoped>
	#myCenter
		margin-bottom 60px
	#myCenter-menu
		padding-top 15px
		height 100vh
	#myCenter-view
		padding 15px 20px
</style>
