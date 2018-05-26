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
              <el-col :span="7" class="grid-content">{{formateDate(i.startTime)}}</el-col>
              <el-col :span="5" class="grid-content">结束时间：</el-col>
              <el-col :span="7" class="grid-content">{{formateDate(i.endTime)}}</el-col>
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
              v-if="gameType==='allGame'"
              :span="4" size="mini" type="primary" plain class="join-in"
              :disabled="userId===i.userUid"
              @click="handleJoinIn(i.uid)">参加</el-button>
              <el-button
              v-if="gameType==='joinIn'"
              :span="4" size="mini" type="primary" plain class="join-in"
              @click="handleCancelJoin(i.uid)">取消预约</el-button>
              <el-button
              v-if="gameType==='published'"
              :span="4" size="mini" type="primary" plain class="join-in"
              @click="handleCancelPub(i.uid)">取消发布</el-button>
              <el-button
              v-if="gameType==='finishCancel'"
              :span="4" size="mini" type="primary" plain class="join-in"
              :disabled="true">已结束</el-button>
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
          :total="totalCount">
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
        getURL: '',
        totalCount: 0,
			  paginationOpt: {
          pn: 1,
          pageSize: 5
        }
			}
		},
		props: {
      gameType: {
		    type: String,
        default: ''
      },
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
    watch: {
      dataList(val) {
        if (val instanceof Array) {
          this.gameData = val
        }
      }
    },
		methods: {
      // 首页获取全部比赛信息
      getGameData(url) {
        $axios.post(url, this.paginationOpt).then(({data}) => {
          if (data.statusCode === 200) {
            this.gameData = data.data.list
            this.totalCount = data.data.total
          }
        })
      },
      // 参加比赛
      handleJoinIn(gameUid) {
        if (this.userId) {
          $axios.post('/game/v1/join', {gameUid: gameUid}).then(({data}) => {
            if (data.statusCode === 200) {
              this.$message.success(data.message)
              this.getGameData(this.getURL)
            } else {
              this.$message.error(data.message)
            }
          })
        } else {
          this.$message.warning('请先登录系统！')
        }
      },
      // 取消预约
      handleCancelJoin(gameUid) {
        if (this.userId) {
          $axios.post('/game/v1/quit', {gameUid: gameUid}).then(({data}) => {
            if (data.statusCode === 200) {
                this.$message.success(data.message)
                this.getGameData(this.getURL)
              } else {
                this.$message.error(data.message)
              }
          })
        } else {
          this.$message.warning('请先登录系统！')
        }
      },
      // 取消发布
      handleCancelPub(gameUid) {
        if (this.userId) {
          $axios.post('/game/v1/end', {gameUid: gameUid}).then(({data}) => {
            if (data.statusCode === 200) {
              this.$message.success(data.message)
              this.getGameData(this.getURL)
            } else {
              this.$message.error(data.message)
            }
          })
        } else {
          this.$message.warning('请先登录系统！')
        }
      },
      // 分页页大小改变
      handleSizeChange(currentSize) {
        this.paginationOpt.pageSize = currentSize
        this.getGameData(this.getURL)
      },
      // 分页当前页码改变
      handleCurrentChange(currentPage) {
        this.paginationOpt.pn = currentPage
        this.getGameData(this.getURL)
      },
      // 格式化日期
      formateDate (millSeconds) {
        if (!millSeconds) {
          return ''
        } else {
          let date = new Date(millSeconds)
          let str = '';
          str += date.getFullYear() + '-';
          str += ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          str += (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
          str += (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
          str += (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
          str += (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
          return str;
        }
      }
		},
		created() {
      switch (this.gameType) {
        case 'allGame':
          this.getURL = '/game/v1/list'
          break
        case 'joinIn':
          this.getURL = '/user/v1/userGame'
          break
        case 'published':
          this.getURL = '/user/v1/authorGame'
          break
        case 'finishCancel':
          this.getURL = '/user/v1/finishGame'
          break
      }
      this.getGameData(this.getURL)
      console.log(this.userId)
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
