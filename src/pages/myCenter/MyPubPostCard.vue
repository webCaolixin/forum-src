<template>
	<section id="myPublishedPostingsCard">
    <el-row class="no-data" v-if="myPubPostData.length === 0">
      <img src="../../assets/images/no-data.png" alt="No Data..."/>
      <div>暂无数据</div>
    </el-row>
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
            <i class="fa fa-commenting-o" aria-hidden="true" title="评论数"> {{i.num}}</i>
          </el-col>
          <el-col :span="12" class="delete-btn">
            <el-button
              type="primary" size="mini" plain
              @click="deleteMyPubPosting(i.id)">删除</el-button>
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
		  myPubPostData: [],
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
      this.getMyPubPostData()
    },
    handleCurrentChange(currentPage) {
      this.paginationOpt.pn = currentPage
      this.getMyPubPostData()
    },
    getMyPubPostData() {
      $axios.post('/user/v1/userPost', this.paginationOpt).then(({data}) => {
        if (data.statusCode === 200) {
          this.myPubPostData = data.data.list
          this.totalCount = data.data.total
        }
      })
    },
    // 删除我发布的帖子
    deleteMyPubPosting(postId) {
      this.$confirm('确定删除该帖子？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        $axios.delete(`/forum/v1/del/${postId}`).then(({data}) => {
          if (data.statusCode === 200) {
            this.$message.success(data.message)
            this.getMyPubPostData()
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
    this.getMyPubPostData()
	}
}
</script>

<style lang="stylus" scoped>
#myPublishedPostingsCard
  min-height 300px
  .no-data
    margin-top 100px
    text-align center
    color #5e6d82
    font-size 18px
    letter-spacing 3px
    img
      margin-bottom 30px
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
