<template>
  <section id="index">
    <main class="main-content">
      <el-row class="publishGameBtnBox">
        <el-button
          plain
          type="primary"
          @click="publishGame">发布比赛</el-button>
          <el-button class="search-btn" type="primary" size="small" plain @click="searchGame">搜 索</el-button>
          <el-input class="search-input" size="small" placeholder="搜索您要的比赛..."></el-input>
      </el-row>
      <el-row>
        <game-card :dataList="searchResultList"></game-card>
      </el-row>
    </main>

    <el-dialog
      title="发布比赛"
      top="12vh"
      width="700px"
      :visible.sync="publishGameDialog">
      <publish-game-form ref="publishGameRef"></publish-game-form>
    </el-dialog>
  </section>
</template>

<script>
  import $axios from '@/plugins/ajax'
  import { mapState } from 'vuex'
  import MyHeader from '@/components/MyHeader'
  import MyFooter from '@/components/MyFooter'
  import GameCard from '@/components/GameCard'
  import PublishGameForm from '@/components/PublishGameForm'

  export default {
    data() {
      return {
        publishGameDialog: false,
        searchOpt: {
          type: ''
        },
        searchResultList: []
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
      // 按类型搜索比赛
      searchGame() {
        $axios.post('/game/v1/search', this.searchOpt).then(({res}) => {
          if (res.statusCode === 200) {
            this.searchResultList = res.data
          }
        })
      }
    },
    created() {
    }
  }
</script>

<style lang="stylus" scoped>
#index
  .main-content
    width 70%
    padding 20px
    margin 0 auto 60px
  .publishGameBtnBox
    margin-bottom 10px
    .el-button
      width 130px
    .search-input, .search-btn
      float right
    .search-btn
      width 60px
    .search-input
      width 300px
</style>
