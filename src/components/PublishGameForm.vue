<template>
	<section id="publishGameForm">
		<el-form
			ref="publishGameForm"
			:model="publishGameForm"
			:rules="publishGameFormRules"
			label-width="100px">
			<el-form-item label="比赛类型：" prop="type">
				<el-select v-model="publishGameForm.type" placeholder="请选择比赛类型">
					<el-option
            v-for="i in typeList"
            :label="i.type"
            :value="i.type"
            :key="i.id"></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="比赛场地：" prop="placeId">
				<el-select v-model="publishGameForm.placeId" placeholder="请选择比赛场地">
          <el-option
            v-for="i in placeList"
            :label="`${i.type}_${i.identifier}`"
            :value="i.id"
            :key="i.id"></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="所需人数：" prop="peopleNum">
				<el-input-number v-model="publishGameForm.peopleNum" :min="1"></el-input-number>
			</el-form-item>

			<el-form-item label="起止时间：" prop="timeRange">
				<el-date-picker
					v-model="publishGameForm.timeRange"
					type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期">
				</el-date-picker>
			</el-form-item>

			<el-form-item label="描述：" prop="description">
				<el-input
          type="textarea"
          v-model="publishGameForm.description"
          :autosize="{minRows: 3, maxRows: 5}"
          placeholder="请填写比赛具体信息"></el-input>
			</el-form-item>

      <el-form-item class="dialog-footer">
        <el-button type="primary" plain @click="resetPublishGame">重 置</el-button>
        <el-button type="primary" @click="savePublishGame">发 布</el-button>
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
  import $axios from '@/plugins/ajax'
  import Bus from '@/plugins/eventBus'

	export default {
		data() {
			return {
				typeList: [],
				placeList: [],
        timeRange: '',
				publishGameForm: {
          type: '',
          placeId: '',
          peopleNum: '',
          startTime: '',
          endTime: '',
          description: ''
				},
				publishGameFormRules: {
          type: [{required: true, message: '不能为空', trigger: 'blur'}],
          placeId: [{required: true, message: '不能为空', trigger: 'blur'}],
          peopleNum: [{required: true, message: '不能为空', trigger: 'blur'}],
          timeRange: [{required: true, message: '不能为空', trigger: 'blur'}],
          description: [{required: true, message: '不能为空', trigger: 'blur'}]
				}
			}
		},
		methods: {
      savePublishGame() {
        this.$refs.publishGameForm.validate((valid) => {
          if (valid) {
            this.publishGameForm.startTime = this.publishGameForm.timeRange[0]
            this.publishGameForm.endTime = this.publishGameForm.timeRange[1]
            let sendData = Object.assign({}, this.publishGameForm)
            delete sendData.timeRange
            $axios.post('/game/v1/add', this.publishGameForm, {
              headers: {'x-auth-token': sessionStorage.getItem('token') || ''}
            }).then(({data}) => {
              if (data.statusCode === 200) {
                this.$emit('closePubGameDialog')
                Bus.$emit('closePubGameDialog')
                this.$message.success(data.message)
              } else {
                this.$message.error(data.message)
              }
            })
          } else {
            return false
          }
        })
      },
      resetPublishGame() {
        this.$refs.publishGameForm.resetFields()
      }
		},
		created() {
		  // 获取比赛类型列表
      $axios.get('/user/v1/typeList').then(({data}) => {
        if (data.statusCode === 200) {
          this.typeList = data.data
        }
      })
      // 获取场地列表
      $axios.get('/user/v1/placeList').then(({data}) => {
        if (data.statusCode === 200) {
          this.placeList = data.data
        }
      })
		}
	}
</script>

<style lang="stylus" scoped>
#publishGameForm
  .dialog-footer
    text-align right
</style>
