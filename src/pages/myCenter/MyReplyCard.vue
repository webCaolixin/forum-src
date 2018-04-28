<template>
	<section id="myReplyCard">
		<el-card  v-for="i in 5" :key="i">
			<el-row class="reply-title">
				<el-col>
					来自：<span class="title-content">湖人真的很强！强到飞起！</span>
				</el-col>
			</el-row>
			<el-row class="reply-detail">
				<el-col>
					回复内容：
					<span class="detail-content">帖子详情！帖子详情！帖子详情！帖子详情！帖子详情！</span>
				</el-col>
			</el-row>
			<el-row class="reply-footer">
				<el-col :span="12" class="icon-box">
					<i class="fa fa-commenting-o" aria-hidden="true" title="评论数"> {{500}}</i>
					<i class="fa fa-thumbs-o-up" aria-hidden="true" title="点赞数"> {{500}}</i>
					<i class="fa fa-thumbs-o-down" aria-hidden="true" title="被踩数"> {{500}}</i>
				</el-col>
				<el-col :span="12" class="delete-btn">
					<el-button type="primary" size="small" plain>删除</el-button>
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
#myReplyCard
	.reply-title, .reply-detail
		text-align center
		padding 5px 10px
	.reply-footer
		margin-top 10px
	.icon-box
		line-height 32px
		.fa
			display inline-block
			margin-right 15px
			cursor default
	.delete-btn
		text-align right
</style>