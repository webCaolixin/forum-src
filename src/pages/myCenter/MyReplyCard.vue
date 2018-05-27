<template>
	<section id="myReplyCard">
    <el-row class="no-data" v-if="myReplyData.length === 0">
      <img src="../../assets/images/no-data.png" alt="No Data..."/>
      <div>暂无数据</div>
    </el-row>
    <el-row v-else>
      <el-card
        class="myReplyCard"
        v-for="i in myReplyData"
        :key="i.id">
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
            <i class="fa fa-thumbs-o-up" aria-hidden="true" title="点赞数"> {{i.handNum}}</i>
            <i class="fa fa-thumbs-o-down" aria-hidden="true" title="被踩数"> {{i.footNum}}</i>
          </el-col>
          <el-col :span="12" class="delete-btn">
            <el-button
              type="primary" size="mini" plain
              @click="deleteMyReplyPosting(i.id)">删除</el-button>
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

export default {
	data() {
		return {
      myReplyData: [],
      totalCount: 0,
      paginationOpt: {
        pn: 1,
        pageSize: 5
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
      $axios.post('/user/v1/userAnswer', this.paginationOpt, {
          headers: {'x-auth-token': sessionStorage.getItem('token') || ''}
        }).then(({data}) => {
        if (data.statusCode === 200) {
          this.myReplyData = data.data.list
          this.totalCount = data.data.total
        }
      })
    },
    // 删除我的回复
    deleteMyReplyPosting(answerId) {
      this.$confirm('确定删除该帖子？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        $axios.delete(`/forum/v1/reply/${answerId}`, {
          headers: {'x-auth-token': sessionStorage.getItem('token') || ''}
        }).then(({data}) => {
          if (data.statusCode === 200) {
            this.$message.success(data.message)
            this.getMyReplyData()
          } else {
            this.$message.success(data.message)
          }
        })
      }).catch(() => {
        this.$message.info('删除操作已取消！')
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
    margin-top 100px
    text-align center
    color #5e6d82
    font-size 18px
    letter-spacing 3px
    img
      margin-bottom 30px
  .myReplyCard
    margin-bottom 12px
    &:hover
      cursor pointer
      border 1px solid #b3d8ff
      box-shadow 3px 2px 5px 0 rgba(64, 158, 255, 0.3)
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
