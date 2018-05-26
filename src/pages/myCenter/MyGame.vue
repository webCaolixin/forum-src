<template>
	<section id="myGame">
		<el-tabs v-model="activeTabName" @tab-click="handleTabClick">
			<el-tab-pane label="我参与的比赛" name="joinIn">
				<game-card v-if="activeTabName==='joinIn'" gameType="joinIn"></game-card>
			</el-tab-pane>
			<el-tab-pane label="我发布的比赛" name="published">
				<game-card v-if="activeTabName==='published'" gameType="published"></game-card>
			</el-tab-pane>
			<el-tab-pane label="已完成/已取消的比赛" name="finishCancel">
				<game-card v-if="activeTabName==='finishCancel'" gameType="finishCancel"></game-card>
			</el-tab-pane>
		</el-tabs>
	</section>
</template>

<script>
	import GameCard from '@/components/GameCard'

	export default {
		data() {
			return {
				activeTabName: 'joinIn'
			}
		},
		components: {
			GameCard
		},
		methods: {
			handleTabClick(tab) {
				this.activeTabName = tab.name
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