<template>
  <el-container>
    <el-header>
      <my-header></my-header>
    </el-header>

    <el-main>
      <router-view></router-view>
    </el-main>

    <footer>
      <my-footer></my-footer>
    </footer>
  </el-container>
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
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSizeChange() {
      },
      handleCurrentChange() {
      }
    }
  }
</script>

<style lang="stylus">
  .el-header
      border-bottom 1px solid #ebebeb
  .el-main
    padding 0
    padding-top 2px
  footer
    width 100%
    position fixed
    bottom 0px
    padding 15px
    background #fff
    border-top 1px solid #ebebeb
</style>
