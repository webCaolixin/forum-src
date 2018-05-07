<template>
	<section id="myPublishedPostingsCard">
    <el-row class="no-data" v-if="myPubPostData.length === 0">暂无数据</el-row>
    <el-row v-else>
      <el-card class="myPubPostCard" v-for="i in myPubPostData" :key="i.id">
        <el-row class="posting-title">
          <el-col>
            标题：<span class="title-content">{{i.title}}</span>
          </el-col>
        </el-row>
        <el-row class="posting-detail">
          <el-col>
            详情：<span class="detail-content">{{i.content}}</span>
          </el-col>
        </el-row>
        <el-row class="posting-footer">
          <el-col :span="12" class="icon-box">
            <i class="fa fa-commenting-o" aria-hidden="true" title="评论数"> {{100}}</i>
            <i class="fa fa-thumbs-o-up" aria-hidden="true" title="点赞数"> {{100}}</i>
            <i class="fa fa-thumbs-o-down" aria-hidden="true" title="被踩数"> {{100}}</i>
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
          :total="myPubPostData.length">
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
		  myPubPostData: [],
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
      this.getMyPubPostData()
    },
    handleCurrentChange(currentPage) {
      this.paginationOpt.pn = currentPage
      this.getMyPubPostData()
    },
    getMyPubPostData() {
      $axios.post('/user/v1/userPost', this.paginationOpt).then(({res}) => {
        if (res.statusCode === 200) {
          this.myPubPostData = res.data.list
        }
      })
    }
	},
	created() {
    this.getMyPubPostData()
	}
}
</script>

<style lang="stylus" scoped>
#myPublishedPostingsCard
  min-height 300px
  .no-data
    line-height 300px
    text-align center
    color #5e6d82
    font-size 18px
    letter-spacing 3px
  .myPubPostCard
    margin-bottom 12px
    .posting-title, .posting-detail
      text-align center
      padding 5px 10px
    .posting-footer
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
