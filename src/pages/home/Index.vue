<template>
  <section id="index">
    <main class="main-content">
      <el-row class="publishGameBtnBox">
        <el-button
          plain
          type="primary"
          @click="publishGame">发布比赛</el-button>
          <el-button
            class="search-btn"
            type="primary"
            plain
            @click="searchGame">搜 索</el-button>
          <el-select
            v-model="searchOpt.type"
            placeholder="搜选择比赛类型..."
            class="search-select">
            <el-option
              v-for="(item, $index) in gameTypeLists"
              :label="item.type"
              :value="item.type"
              :key="$index">
            </el-option>
          </el-select>
      </el-row>
      <el-row>
        <game-card :dataList="searchResultList" :gameType="gameType"></game-card>
      </el-row>
    </main>

    <el-dialog
      title="发布比赛"
      top="8vh"
      width="700px"
      v-if="publishGameDialog"
      :visible.sync="publishGameDialog">
      <publish-game-form
        ref="publishGameRef"
        @closePubGameDialog="closePubGameDialog"></publish-game-form>
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
        gameType: 'allGame',
        publishGameDialog: false,
        searchOpt: {
          type: ''
        },
        searchResultList: [],   // 搜索结果
        gameTypeLists: []       // 比赛类型
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
      // 获取比赛类型
      getGameType() {
        $axios.get('/user/v1/typeList').then(({data}) => {
          if (data.statusCode === 200) {
            this.gameTypeLists = data.data
          }
        })
      },
      // 按类型搜索比赛
      searchGame() {
        $axios.get(`/game/v1/search/${this.searchOpt.type}`).then(({data}) => {
          if (data.statusCode === 200) {
            this.searchResultList = data.data
          }
        })
      },
      closePubGameDialog() {
        this.publishGameDialog = false
        this.gameType = ''
        this.gameType = 'allGame'
      }
    },
    created() {
      this.getGameType()
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
    .search-select, .search-btn
      float right
    .search-btn
      width 60px
    .search-select
      width 300px
</style>
