<template>
	<section id="myPublishedPostingsCard">
		<el-card class="myPubPostCard" v-for="i in 3" :key="i">
			<el-row class="posting-title">
				<el-col>
					标题：<span class="title-content">湖人真的很强！强到飞起！</span>
				</el-col>
			</el-row>
			<el-row class="posting-detail">
				<el-col>
					详情：<span class="detail-content">帖子详情！帖子详情！帖子详情！帖子详情！帖子详情！</span>
				</el-col>
			</el-row>
			<el-row class="posting-footer">
				<el-col :span="12" class="icon-box">
					<i class="fa fa-commenting-o" aria-hidden="true" title="评论数"> {{100}}</i>
					<i class="fa fa-thumbs-o-up" aria-hidden="true" title="点赞数"> {{100}}</i>
					<i class="fa fa-thumbs-o-down" aria-hidden="true" title="被踩数"> {{100}}</i>
				</el-col>
				<el-col :span="12" class="delete-btn">
					<el-button type="primary" size="mini" plain>删除</el-button>
				</el-col>
			</el-row>
		</el-card>
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
#myPublishedPostingsCard
	.myPubPostCard
		margin-bottom 12px
	.posting-title, .posting-detail
		text-align center
		padding 5px 10px
	.posting-footer
		.icon-box
			line-height 28px
			.fa
				display inline-block
				margin-right 15px
				cursor default
		.delete-btn
			text-align right
</style>
