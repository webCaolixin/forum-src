<template>
	<section id="notFound">
		<div class="notFound-pic">
			<div class="goBack">
				<el-button round @click="goBackHome">返回首页</el-button>
				<el-button round @click="goBackPre">返回上一页</el-button>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			goBackHome() {
				this.$router.push('/')
			},
			goBackPre() {
				this.$router.back()
			}
		},
		created() {
		}
	}
</script>

<style lang="stylus" scoped>
	#notFound
		.notFound-pic
			width 100%
			height 100vh
			background url('../assets/images/404.jpg') no-repeat center center
			background-size cover
		.goBack
			position absolute
			width 100%
			bottom 12vh
			text-align center
			.el-button+.el-button
				margin-left 50px
</style>