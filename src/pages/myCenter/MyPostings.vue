<template>
	<section id="myPostings">
		<el-tabs v-model="activeTabName" @tab-click="handleTabClick">
			<el-tab-pane label="我发布的帖子" name="myPublishedPostings">
				我发布的帖子
				<my-pub-post-card></my-pub-post-card>
			</el-tab-pane>
			<el-tab-pane label="我的回复" name="myReply">
				我的回复
				<my-reply-card></my-reply-card>
			</el-tab-pane>
		</el-tabs>
	</section>
</template>

<script>
	import MyPubPostCard from './MyPubPostCard.vue'
	import MyReplyCard from './MyReplyCard.vue'

	export default {
		data() {
			return {
				activeTabName: 'myPublishedPostings'
			}
		},
		components: {
			MyPubPostCard,
			MyReplyCard
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
</style>