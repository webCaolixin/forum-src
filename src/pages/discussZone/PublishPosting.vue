<template>
	<section id="pubPostingBox">
		<el-form
			ref="pubPostingForm"
			:model="pubPostingForm"
			:rules="pubPostingFormRules"
			label-width="80px">
				<el-form-item label="标题：" prop="title">
					<el-input v-model="pubPostingForm.title"></el-input>
				</el-form-item>
				<el-form-item label="内容：" prop="content">
					<el-input
						type="textarea"
						v-model="pubPostingForm.content"
						:autosize="{minRows:3,maxRows:5}"></el-input>
				</el-form-item>
				<el-form-item class="pubPostingFooter">
					<el-button type="primary" plain @click="resetForm">重 置</el-button>
					<el-button type="primary" @click="pubPosting">发 布</el-button>
				</el-form-item>
			</el-form>
	</section>
</template>

<script>
import $axios from '@/plugins/ajax'

export default {
	data() {
		return {
			pubPostingForm: {
				title: '',
				content: ''
			},
			pubPostingFormRules: {
				title: [{required: true, message: '不能为空', trigger: 'blur'}],
				content: [{required: true, message: '不能为空', trigger: 'blur'}]
			}
		}
	},
	methods: {
		// 重置表单
		resetForm() {
			this.$refs.pubPostingForm.resetFields()
		},
		// 发布帖子
		pubPosting() {
			this.$refs.pubPostingForm.validate((valid) => {
				if (valid) {
					$axios.post('/forum/v1/add', this.pubPostingForm).then(({data}) => {
						if (data.statusCode === 200) {
							this.$emit('closePubPosting')
							this.$refs.pubPostingForm.resetFields()
							this.$message.success(data.message)
						} else {
							this.$message.error(data.message)
						}
					})
				} else {
					return false
				}
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
#pubPostingBox
	.pubPostingFooter
		text-align right
</style>
