<template>
	<section id="inputPlacesBox">
		<el-form
		inline
		:model="addPlaceForm"
		:rules="addPlaceFormRules"
		ref="addPlaceForm">
			<el-form-item label="类型" prop="type">
				<el-input v-model="addPlaceForm.type"></el-input>
			</el-form-item>
			<el-form-item label="场地号" prop="identifier">
				<el-input v-model="addPlaceForm.identifier"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button
					type="primary" plain
					@click="addPlace">添 加</el-button>
			</el-form-item>
		</el-form>
		<el-table
	    :data="placesList"
	    stripe
	    style="width: 100%">
	    <el-table-column
	      prop="type"
	      label="类型">
	    </el-table-column>
	    <el-table-column
	      prop="identifier"
	      label="场地号">
	    </el-table-column>
	    <el-table-column
	      label="使用开始时间">
	      <template slot-scope="scope">
	      	<span>{{formateDate(scope.row.startTime)}}</span>
	      </template>
	    </el-table-column>
	    <el-table-column
	      label="使用结束时间">
	      <template slot-scope="scope">
	      	<span>{{formateDate(scope.row.endTime)}}</span>
	      </template>
	    </el-table-column>
	    <el-table-column
	      label="录入时间">
	      <template slot-scope="scope">
	      	<span>{{formateDate(scope.row.createTime)}}</span>
	      </template>
	    </el-table-column>
	    <el-table-column
	      label="操作">
	      <template slot-scope="scope">
	      	<i
	      		class="fa fa-trash" aria-hidden="true"
	      		@click="deletePlace(scope.row.id)"></i>
	      </template>
	    </el-table-column>
	  </el-table>
	</section>
</template>

<script>
	import $axios from '@/plugins/ajax'
	import formateDate from '@/utils'

	export default {
		data() {
			return {
				addPlaceForm: {
					type: '',
					identifier: ''
				},
				addPlaceFormRules: {
					type: [{required: true, message: '不能为空', trigger: 'blur'}],
					identifier: [{required: true, message: '不能为空', trigger: 'blur'}]
				},
				placesList: []
			}
		},
		methods: {
			formateDate(millSeconds) {
				return formateDate(millSeconds)
			},
			getAllPlaces() {
				$axios.get('/admin/v1/placeList', {
          headers: {'x-auth-token': sessionStorage.getItem('token') || ''}
        }).then(({data}) => {
					if (data.statusCode === 200) {
						this.placesList = data.data
					}
				})
			},
			addPlace() {
				this.$refs.addPlaceForm.validate(valid => {
					if (valid) {
						$axios.post('/admin/v1/add/sportPlace/', this.addPlaceForm, {
		          headers: {'x-auth-token': sessionStorage.getItem('token') || ''}
		        }).then(({data}) => {
							if (data.statusCode === 200) {
								this.getAllPlaces()
								this.$message.success(data.message)
							} else {
								this.$message.eroor(data.message)
							}
						})
					} else {
						return false
					}
				})
			},
			deletePlace(id) {
				this.$confirm('确定删除该帖子？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
	      }).then(() => {
	      	$axios.delete(`/admin/v1/del/sportPlace/${id}`, {
	          headers: {'x-auth-token': sessionStorage.getItem('token') || ''}
	        }).then(({data}) => {
						if (data.statusCode === 200) {
							this.getAllPlaces()
							this.$message.success(data.message)
						} else {
							this.$message.eroor(data.message)
						}
					})
	      }).catch(() => {
	      	this.$message.info('删除操作已取消！')
	      })
			}
		},
		created() {
			this.getAllPlaces()
		}
	}
</script>

<style lang="stylus" scoped>
#inputPlacesBox
	.fa-tras
		cursor pointer
		color #409eff
</style>