<template>
	<section id="myGame">
		<el-tabs v-model="activeTabName" @tab-click="handleTabClick">
			<el-tab-pane label="我参与的比赛" name="join-in">
				我参与的比赛
				<game-card></game-card>
			</el-tab-pane>
			<el-tab-pane label="我发布的比赛" name="published">
				我发布的比赛
				<game-card></game-card>
			</el-tab-pane>
			<el-tab-pane label="已完成/已取消的比赛" name="finish-cancel">
				已完成/已取消的比赛
				<game-card></game-card>
			</el-tab-pane>
		</el-tabs>
	</section>
</template>

<script>
	import GameCard from '@/components/GameCard'

	export default {
		data() {
			return {
				activeTabName: 'join-in'
			}
		},
		components: {
			GameCard
		},
		methods: {
			handleTabClick() {
			}
		},
    created() {
    }
	}
</script>

<style lang="stylus" scoped>
	#myGame
		.el-tab-pane
			padding 0 15px 15px
</style>