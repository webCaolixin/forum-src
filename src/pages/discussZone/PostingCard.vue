<template>
	<section id="postingCardBox">
		<el-card class="postingCard" v-for="i in 10" :key="i">
			<el-row>
				<el-col class="post-userPic-box" :span="4">
					<img class="post-user-pic" src="../../assets/images/logo.png" alt=""/>
				</el-col>
				<el-col :span="20">
					<el-row class="post-title">
						标题：<span class="title-content" title="点击查看详情">湖人真的强！！</span>
					</el-row>
					<el-row class="post-footer">
						<el-col :span="12" class="comment-num">
							<i class="fa fa-commenting-o" aria-hidden="true" title="评论数"> {{100}}</i>
						</el-col>
						<el-col :span="12" class="post-time">
							<i class="fa fa-clock-o" aria-hidden="true" title="发帖时间"> {{'0000-00-00 00:00:00'}}</i>
						</el-col>
					</el-row>
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
#postingCardBox
  .postingCard
    margin-bottom 12px
    .post-userPic-box
      text-align center
      .post-user-pic
        height 62px
    .post-title, .post-footer
      padding 5px 10px
    .post-title
      text-align center
    .post-footer
      .comment-num
        text-align left
      .post-time
        text-align right
</style>
