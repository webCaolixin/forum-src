<template>
	<section id="discussZone">
		<main class="main-content">
			<el-row class="pub-posting-btn-box">
				<el-button class="pub-posting-btn" type="primary" plain>我要发帖</el-button>
			</el-row>
			<posting-card></posting-card>
		</main>
	</section>
</template>

<script>
import PostingCard from './PostingCard.vue'

export default {
	data() {
		return {
		}
	},
	components: {
		PostingCard
	},
	methods: {
	},
	created() {
	}
}
</script>

<style lang="stylus" scoped>
#discussZone
	.main-content
		width 70%
		padding 20px
		margin 0 auto
		margin-bottom 60px
		.pub-posting-btn-box
			margin-bottom 10px
		.pub-posting-btn
			width 130px
</style>