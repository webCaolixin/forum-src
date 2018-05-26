<template>
	<section id="postingCardBox">
    <el-row class="no-data" v-if="postingData.length === 0">
      <img src="../../assets/images/no-data.png" alt="No Data..."/>
      <div>暂无数据</div>
    </el-row>
    <el-row v-else>
      <el-card class="postingCard" v-for="i in postingData" :key="i.id">
        <el-row>
          <el-col class="post-userPic-box" :span="4">
            <img class="post-user-pic" :src="i.picture" :alt="i.name"/>
          </el-col>
          <el-col :span="20">
            <el-row class="post-title">
              标题：<span class="title-content" title="点击查看详情">{{i.title}}</span>
            </el-row>
            <el-row class="post-footer">
              <el-col :span="12" class="comment-num">
                <i class="fa fa-commenting-o" aria-hidden="true" title="评论数"> {{id.num}}</i>
              </el-col>
              <el-col :span="12" class="post-time">
                <i class="fa fa-clock-o" aria-hidden="true" title="发帖时间"> {{'0000-00-00 00:00:00'}}</i>
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
          :total="postingData.length">
        </el-pagination>
      </el-row>
    </el-row>
	</section>
</template>

<script>
  import $axios from '@/plugins/ajax'

	export default {
		data() {
			return {
        postingData: [],
        paginationOpt: {
          pn: 1,
          pageSize: 5,
          navigatePages: null
        }
			}
		},
		methods: {
      handleSizeChange(currentSize) {
        this.paginationOpt.pageSize = currentSize
        this.getPostingData()
      },
      handleCurrentChange(currentPage) {
        this.paginationOpt.pn = currentPage
        this.getPostingData()
      },
      getPostingData() {
        $axios.post('/forum/v1/list', this.paginationOpt).then(({data}) => {
          if (data.statusCode === 200) {
            this.postingData = data.data.list
          }
        })
      }
		},
		created() {
		  this.getPostingData()
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
