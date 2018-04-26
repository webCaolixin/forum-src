<template>
	<el-row>
		<el-col :span="4" class="sprate">
			<a href="">管理员入口</a>
		</el-col>
		<el-col :span="20" class="friend-link">
			<el-row>
				<el-col :span="4" class="link-item sprate">友情链接</el-col>
				<el-col :span="4" class="link-item">
					<a href="https://www.hupu.com/" target="_blank">虎扑体育</a>
				</el-col>
				<el-col :span="4" class="link-item">
					<a href="http://sports.qq.com/" target="_blank">腾讯体育</a>
				</el-col>
				<el-col :span="4" class="link-item">
					<a href="http://sports.sina.com.cn/" target="_blank">新浪体育</a>
				</el-col>
				<el-col :span="4" class="link-item">
					<a href="http://sports.sohu.com/" target="_blank">搜狐体育</a>
				</el-col>
				<el-col :span="4" class="link-item">
					<a href="http://sports.163.com/" target="_blank">网易体育</a>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="4" class="link-item sprate">&nbsp;</el-col>
				<el-col :span="4" class="link-item">
					<a href="http://sports.ifeng.com/" target="_blank">凤凰体育</a>
				</el-col>
				<el-col :span="4" class="link-item">
					<a href="http://www.lesports.com/" target="_blank">乐视体育</a>
				</el-col>
				<el-col :span="4" class="link-item">
					<a href="http://sports.youku.com/" target="_blank">优酷体育</a>
				</el-col>
				<el-col :span="4" class="link-item">
					<a href="http://sports.pptv.com/" target="_blank">PPTV体育</a>
				</el-col>
				<el-col :span="4" class="link-item">
					<a href="https://www.zhibo8.cc/" target="_blank">直播吧</a>
				</el-col>
			</el-row>
		</el-col>
	</el-row>
</template>

<script>
</script>
<style lang="stylus" scoped>
.sprate
	border-right: 1px solid #ebebeb
.friend-link
	.link-item
		text-align center
		a
			font-size 14px
			color #5e6d82
			text-decoration none
			&:hover
				color #409eff
				text-decoration underline
</style>