<template>
  <section id="index">
    <main class="main-content">
      <el-row>
        <el-col :span="4" class="publishGameBtn-box">
          <el-button
            plain
            type="primary"
            class="publishGameBtn"
            @click="publishGame">发布比赛</el-button>
        </el-col>
        <el-col :span="20">
          <game-card></game-card>
        </el-col>
      </el-row>
    </main>
  </section>
</template>

<script>
  import MyHeader from '@/components/MyHeader'
  import MyFooter from '@/components/MyFooter'
  import GameCard from '@/components/GameCard'

  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    components: {
      MyHeader,
      MyFooter,
      GameCard
    },
    methods: {
      publishGame() {
        this.$message.info('登陆后才能发布比赛哦！')
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
  .publishGameBtn
    width 80%
</style>