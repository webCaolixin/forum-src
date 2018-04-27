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
  </section>
</template>

<script>
  import { mapState } from 'vuex'
  import MyHeader from '@/components/MyHeader'
  import MyFooter from '@/components/MyFooter'
  import GameCard from '@/components/GameCard'
  export default {
    data() {
      return {
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
      GameCard
    },
    methods: {
      publishGame() {
        if (this.userId) {
          this.$message.info('已登录！')
        } else {
          this.$message.warning('登陆后才能发布比赛哦！')
        }
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
