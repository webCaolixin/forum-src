<template>
  <section id="index">
    <main class="main-content">
      <el-row class="publishGameBtnBox">
        <el-button
          plain
          type="primary"
          @click="publishGame">发布比赛</el-button>
      </el-row>
      <el-row>
        <game-card></game-card>
      </el-row>
    </main>

    <el-dialog
      title="发布比赛"
      top="12vh"
      :visible.sync="publishGameDialog">
      <publish-game-form></publish-game-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="publishGameDialog = false">取 消</el-button>
        <el-button type="primary" plain @click="resetPublishGame">重 置</el-button>
        <el-button type="primary" @click="savePublishGame">发 布</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
  import { mapState } from 'vuex'
  import MyHeader from '@/components/MyHeader'
  import MyFooter from '@/components/MyFooter'
  import GameCard from '@/components/GameCard'
  import PublishGameForm from '@/components/PublishGameForm'
  export default {
    data() {
      return {
        publishGameDialog: false
      };
    },
    computed: {
      ...mapState({
        userId: state => state.userInfo.uid
      })
    },
    components: {
      MyHeader,
      MyFooter,
      GameCard,
      PublishGameForm
    },
    methods: {
      publishGame() {
        if (this.userId) {
          this.publishGameDialog = true
        } else {
          this.$message.warning('登陆后才能发布比赛哦！')
        }
      },
      savePublishGame() {
        this.publishGameDialog = false
      },
      resetPublishGame() {
      }
    }
  }
</script>

<style lang="stylus" scoped>
#index
  .main-content
    width 80%
    padding 20px
    margin 0 auto 60px
  .publishGameBtnBox
    margin-bottom 10px
    .el-button
      width 130px
</style>
