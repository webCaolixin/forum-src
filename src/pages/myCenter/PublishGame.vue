<template>
	<section id="">
		<el-form ref="form" :model="publishGameForm" label-width="100px">
			<el-form-item label="比赛类型：">
				<el-select v-model="publishGameForm" placeholder="请选择比赛类型">
					<el-option label="区域一" value="shanghai"></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="比赛场地：">
				<el-select v-model="publishGameForm" placeholder="请选择比赛场地">
					<el-option label="区域一" value="shanghai"></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="所需人数：">
				<el-input-number v-model="publishGameForm" :min="1"></el-input-number>
			</el-form-item>

			<el-form-item label="起止时间：">
				<el-date-picker
					v-model="publishGameForm"
					type="datetimerange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期">
				</el-date-picker>
			</el-form-item>

			<el-form-item label="描述：">
				<el-input type="textarea" v-model="publishGameForm.describe" placeholder="请填写比赛具体信息"></el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" plain @click="reset">重 置</el-button>
				<el-button type="primary" @click="publishGame">发 布</el-button>
			</el-form-item>
		</el-form>
		<el-row>
			<el-col>
				友情提示：以上信息是您成功找到球友的重要信息，请务必认真填写！
			</el-col>
		</el-row>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				typeList: [],
				locationList: [],
				publishGameForm: {
					describe: ''
				}
			}
		},
		methods: {
			reset() {
			},
			publishGame() {
			}
		},
		created() {
		}
	}
</script>

<style lang="stylus" scoped>
</style>