<template>
	<section id="allPublishedPostingsCard">
    <el-row class="no-data" v-if="allPubPostData.length === 0">
      <img src="../../assets/images/no-data.png" alt="No Data..."/>
      <div>暂无数据</div>
    </el-row>
    <el-row v-else>
      <el-card
        class="allPubPostCard"
        v-for="i in allPubPostData"
        :key="i.id">
        <el-row class="posting-title">
          <el-col>
            <span class="title-content">标题：{{i.title}}</span>
          </el-col>
        </el-row>
        <el-row class="posting-detail">
          <el-col>
            详情：<span class="detail-content">{{i.content}}</span>
          </el-col>
        </el-row>
        <el-row class="posting-footer">
          <el-col :span="12" class="icon-box">
            <i class="fa fa-commenting-o" aria-hidden="true" title="评论数"> {{i.num}}</i>
          </el-col>
          <el-col :span="12" class="delete-btn">
            <el-button
              type="primary" size="mini" plain
              @click="deletePubPosting(i.id)">删除</el-button>
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
      allPubPostData: [],
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
      this.getAllPubPostData()
    },
    handleCurrentChange(currentPage) {
      this.paginationOpt.pn = currentPage
      this.getAllPubPostData()
    },
    // 获取所有发布的帖子
    getAllPubPostData() {
      $axios.post('/forum/v1/list', this.paginationOpt, {
          headers: {'x-auth-token': sessionStorage.getItem('token') || ''}
      }).then(({data}) => {
        if (data.statusCode === 200) {
          this.allPubPostData = data.data.list
          this.totalCount = data.data.total
        }
      })
    },
    // 删除用户发布的帖子
    deletePubPosting(postId) {
      this.$confirm('确定删除该帖子？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        $axios.delete(`/admin/v1/del/${postId}`, {
          headers: {'x-auth-token': sessionStorage.getItem('token') || ''}
        }).then(({data}) => {
          if (data.statusCode === 200) {
            this.$message.success(data.message)
            this.getAllPubPostData()
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
    this.getAllPubPostData()
  }
}
</script>

<style lang="stylus" scoped>
#allPublishedPostingsCard
  min-height 300px
  .no-data
    margin-top 100px
    text-align center
    color #5e6d82
    font-size 18px
    letter-spacing 3px
    img
      margin-bottom 30px
  .allPubPostCard
    margin-bottom 12px
    &:hover
      cursor pointer
      border 1px solid #b3d8ff
      box-shadow 3px 2px 5px 0 rgba(64, 158, 255, 0.3)
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
