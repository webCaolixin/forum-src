<template>
	<section id="game-card">
    <el-row class="no-data" v-if="gameData.length === 0">
      <img src="../assets/images/no-data.png" alt="No Data..."/>
      <div>暂无数据</div>
    </el-row>
    <el-row v-else>
      <el-card class="card-box" v-for="i in gameData" :key="i.id">
        <el-row>
          <el-col :span="4" class="user-pic-box">
            <img class="user-pic" src="../assets/images/logo.png" alt=""/>
          </el-col>
          <el-col :span="20">
            <el-row>
              <el-col :span="5" class="grid-content">比赛类型：</el-col>
              <el-col :span="7" class="grid-content">{{i.type}}</el-col>
              <el-col :span="5" class="grid-content">场地：</el-col>
              <el-col :span="7" class="grid-content">{{i.place}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="5" class="grid-content">开始时间：</el-col>
              <el-col :span="7" class="grid-content">{{i.startTime}}</el-col>
              <el-col :span="5" class="grid-content">结束时间：</el-col>
              <el-col :span="7" class="grid-content">{{i.endTime}}</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="still-need">
          <el-col class="grid-content">还需 <span>{{i.peopleNum}}</span> 人</el-col>
        </el-row>
        <el-row class="describe">
          <el-col :span="4">&nbsp;</el-col>
          <el-col :span="20">
            <el-col :span="5" class="grid-content">描述：</el-col>
            <el-col :span="15" class="grid-content">{{i.description}}</el-col>
            <el-button
              :span="4" size="mini" type="primary" plain
              class="join-in"
              @click="handleJoinIn">参加</el-button>
          </el-col>
        </el-row>
      </el-card>

      <el-row class="pagination-box">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 20]"
          :page-size="paginationOpt.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="gameData.length">
        </el-pagination>
      </el-row>
    </el-row>
	</section>
</template>

<script>
  import { mapState } from 'vuex'
  import $axios from '@/plugins/ajax'

	export default {
		data() {
			return {
			  gameData: [],
			  paginationOpt: {
          pn: 1,
          pageSize: 5,
          navigatePages: null
        }
			}
		},
		props: {
      dataList: {
		    type: Array,
        default() {
		      return []
        }
      }
		},
		computed: {
      ...mapState({
        userId: state => state.userInfo.uid
      })
    },
		methods: {
      handleJoinIn() {
        if (this.userId) {
          this.$message.info('已登录！')
        } else {
          this.$message.warning('请先登录系统！')
        }
      },
      handleSizeChange(currentSize) {
        this.paginationOpt.pageSize = currentSize
        this.getGameData()
      },
      handleCurrentChange(currentPage) {
        this.paginationOpt.pn = currentPage
        this.getGameData()
      },
      getGameData() {
        $axios.post('/game/v1/list', this.paginationOpt).then(({res}) => {
          if (res.statusCode === 200) {
            this.gameData = res.data.list
          }
        })
      }
		},
		created() {
		  if (this.dataList.length > 0) {
		    this.gameData = this.dataList
      } else {
        this.getGameData()
      }
		}
	}
</script>

<style lang="stylus">
  #game-card
    min-height 300px
    .no-data
      margin-top 100px
      text-align center
      color #5e6d82
      font-size 18px
      letter-spacing 3px
      img
        margin-bottom 30px
		.card-box
			.el-card__body
				padding 12px !important
		.card-box
			margin-bottom 12px
			.user-pic-box
				text-align center
				.user-pic
					height 60px
			.still-need
				text-align center
        span
          color #409EFF
          font-size 20px
          font-weight bold
			.join-in
				float right
			.grid-content
				padding 5px 10px
		.pagination-box
			text-align center
</style>
