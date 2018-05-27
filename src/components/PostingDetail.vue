<template>
	<section id="postingDetailBox">
    <el-row class="postInfo">
      <el-col :span="24">
        <el-row class="post-title">
          <span class="title-content">{{postInfo.title}}</span>
        </el-row>
        <el-row class="post-content">
          详情：<span class="content-detail">{{postInfo.content}}</span>
        </el-row>
        <el-row class="post-footer">
          <el-col :span="12" class="comment-num">
            <i class="fa fa-commenting-o" aria-hidden="true" title="评论数"> {{postInfo.num}}</i>
          </el-col>
          <el-col :span="12" class="post-time">
            <i class="fa fa-clock-o" aria-hidden="true" title="发帖时间"> {{formateDate(postInfo.createTime)}}</i>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row class="replyTip">以下是回复内容</el-row>
    <div id="replyListBox">
      <el-row
        class="postReplyItem"
        v-for="i in postReplyList"
        :key="i.id">
        <el-col :span="4" class="replyUserName">{{i.name}}</el-col>
        <el-col :span="20">
          <el-row>{{i.answerContext}}</el-row>
          <el-row  class="replyDetailFooter">
            <el-col :span="12">
              <i class="fa fa-thumbs-o-up" aria-hidden="true" title="点赞数"> {{i.handNum}}</i>
            </el-col>
            <el-col :span="12">
              <i class="fa fa-thumbs-o-down" aria-hidden="true" title="被踩数"> {{i.footNum}}</i>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <el-row class="replyForm">
      <el-form
        :model="replyForm"
        ref="replyForm">
        <el-form-item prop="answerContext">
          <el-input
          v-model="replyForm.answerContext"
          type="textarea"
          placeholder="请发表积极健康的评论信息..."
          :rows="8"
          :autosize="false"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right;">
          <el-button
            type="primary" plain
            @click="publishReply">
              回 复
            </el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import $axios from '@/plugins/ajax'
import formateDate from '@/utils'

export default {
  data() {
    return {
      postId: this.$route.params.postId,
      postInfo: '',
      postReplyList: [],
      replyForm: {
        answerContext: ''
      }
    }
  },
  computed: {
    ...mapState({
      userId: state => state.userInfo.uid
    })
  },
  methods: {
    formateDate(millSeconds) {
      return formateDate(millSeconds)
    },
    // 获取帖子详情
    getPostingDetail() {
      $axios.post(`/forum/v1/detail/${this.postId}`).then(({data}) => {
        if (data.statusCode === 200) {
          this.postInfo = data.post
          this.postReplyList = data.data
        }
      })
    },
    // 发布回复
    publishReply() {
      if (!this.userId) {
        this.$message.warning('登陆后才能回复帖子哦！')
      } else {
        if (this.replyForm.answerContext === '') {
          this.$message.warning('请输入回复内容！')
        } else {
          $axios.post(`/forum/v1/reply/${this.postId}`, this.replyForm).then(({data}) => {
            if (data.statusCode === 200) {
              this.getPostingDetail()
              this.$message.success(data.message)
            } else {
              this.$message.error(data.message)
            }
          })
        }
      }
    }
  },
  created() {
    this.getPostingDetail()
  }
}
</script>

<style lang="stylus" scoped>
#postingDetailBox
  width 60%
  margin 0 auto 60px
  padding 15px
  .postInfo
    margin-bottom 50px
    .post-title
      text-align center
    .title-content
      font-size 20px
      font-weight bold
      letter-spacing 3px
      color: #409eff
    .post-content
      color: #5e6d82
    .post-footer
      margin-top 15px
    .content-detail
      color: #000
  .replyTip
    color #409eff
    font-weight bold
    padding-bottom 3px
    margin-bottom 20px
    border-bottom 1px solid #ebebeb
  .postReplyItem
    padding 10px 20px
    margin-bottom 15px
    border-bottom 1px solid #aeabab
    .replyDetailFooter
      margin-top 8px
  .replyForm
    margin 30px auto 60px
</style>