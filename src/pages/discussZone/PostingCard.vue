<template>
	<section id="postingCardBox">
    <el-row class="no-data" v-if="postingData.length === 0">
      <img src="../../assets/images/no-data.png" alt="No Data..."/>
      <div>暂无数据</div>
    </el-row>
    <el-row v-else>
      <el-card
        class="postingCard"
        v-for="i in postingData"
        :key="i.id">
        <el-row>
          <el-col class="post-userPic-box" :span="4">
            <img class="post-user-pic" :src="i.picture" :alt="i.name"/>
          </el-col>
          <el-col :span="20">
            <el-row class="post-title">
              <span
                class="title-content"
                title="点击查看详情"
                @click="gotoDetail(i.id)">
                标题：{{i.title}}
              </span>
            </el-row>
            <el-row class="post-footer">
              <el-col :span="12" class="comment-num">
                <i class="fa fa-commenting-o" aria-hidden="true" title="评论数"> {{i.num}}</i>
              </el-col>
              <el-col :span="12" class="post-time">
                <i class="fa fa-clock-o" aria-hidden="true" title="发帖时间"> {{formateDate(i.createTime)}}</i>
              </el-col>
            </el-row>
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
  import $axios from '@/plugins/ajax'
  import Bus from '@/plugins/eventBus'
  import formateDate from '@/utils'

	export default {
		data() {
			return {
        totalCount: 0,
        postingData: [],
        paginationOpt: {
          pn: 1,
          pageSize: 5
        }
			}
		},
		methods: {
      formateDate(millSeconds) {
        return formateDate(millSeconds)
      },
      handleSizeChange(currentSize) {
        this.paginationOpt.pageSize = currentSize
        this.getPostingData()
      },
      handleCurrentChange(currentPage) {
        this.paginationOpt.pn = currentPage
        this.getPostingData()
      },
      // 获取所有帖子列表
      getPostingData() {
        $axios.post('/forum/v1/list', this.paginationOpt).then(({data}) => {
          if (data.statusCode === 200) {
            this.postingData = data.data.list
            this.totalCount = data.data.total
          }
        })
      },
      gotoDetail(id) {
        this.$router.push(`/DiscussZone/postingDetail/${id}`)
      }
		},
		created() {
      // 获取所有帖子列表
		  this.getPostingData()
      // 发帖完成，刷新列表
      Bus.$on('closePubPosting', () => {
        this.getPostingData()
      })
		}
	}
</script>

<style lang="stylus" scoped>
#postingCardBox
  min-height 300px
  .no-data
    margin-top 100px
    text-align center
    color #5e6d82
    font-size 18px
    letter-spacing 3px
    img
      margin-bottom 30px
  .postingCard
    margin-bottom 12px
    &:hover
      cursor pointer
      border 1px solid #b3d8ff
      box-shadow 3px 2px 5px 0 rgba(64, 158, 255, 0.3)
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
  .pagination-box
    text-align center
</style>
