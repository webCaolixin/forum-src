<template>
	<section id="myReplyCard">
    <el-row class="no-data" v-if="myReplyData.length === 0">暂无数据</el-row>
    <el-row v-else>
      <el-card class="myReplyCard"  v-for="i in 5" :key="i.id">
        <el-row class="reply-title">
          <el-col>
            来自：<span class="title-content">{{i.title}}</span>
          </el-col>
        </el-row>
        <el-row class="reply-detail">
          <el-col>
            回复内容：
            <span class="detail-content">{{i.answerContext}}</span>
          </el-col>
        </el-row>
        <el-row class="reply-footer">
          <el-col :span="12" class="icon-box">
            <i class="fa fa-commenting-o" aria-hidden="true" title="评论数"> {{100}}</i>
            <i class="fa fa-thumbs-o-up" aria-hidden="true" title="点赞数"> {{i.handNum}}</i>
            <i class="fa fa-thumbs-o-down" aria-hidden="true" title="被踩数"> {{i.footNum}}</i>
          </el-col>
          <el-col :span="12" class="delete-btn">
            <el-button type="primary" size="mini" plain>删除</el-button>
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
          :total="myReplyData.Length">
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
      myReplyData: [],
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
      this.getMyReplyData()
    },
    handleCurrentChange(currentPage) {
      this.paginationOpt.pn = currentPage
      this.getMyReplyData()
    },
    getMyReplyData() {
      $axios.post('/user/v1/userAnswer', this.paginationOpt).then(({res}) => {
        if (res.statusCode === 200) {
          this.myReplyData = res.data.list
        }
      })
    }
	},
	created() {
    this.getMyReplyData()
	}
}
</script>

<style lang="stylus" scoped>
#myReplyCard
  min-height 300px
  .no-data
    line-height 300px
    text-align center
    color #5e6d82
    font-size 18px
    letter-spacing 3px
  .myReplyCard
    margin-bottom 12px
    .reply-title, .reply-detail
      text-align center
      padding 5px 10px
    .icon-box
      line-height 28px
      .fa
        display inline-block
        margin-right 15px
        cursor default
    .delete-btn
      text-align right
  .pagination-box
    text-align center
</style>
