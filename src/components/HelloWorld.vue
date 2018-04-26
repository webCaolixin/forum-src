<template>
  <section>
    <el-button @click="showMessage">按钮</el-button>
  <el-table :data="list">
    <el-table-column label="第一项"></el-table-column>
    <el-table-column label="第二项"></el-table-column>
    <el-table-column label="第三项"></el-table-column>
    <el-table-column label="第四项"></el-table-column>
    <el-table-column label="第五项"></el-table-column>
  </el-table>

  <el-button @click="dialogVisible = true">点击打开 Dialog</el-button>

  <el-dialog
    title="提示"
    :visible="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
  </section>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      list: [],
      dialogVisible: false
    }
  },
  methods: {
    showMessage () {
      this.$message.info('这是一条提示消息！')
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$message.info('您点击了确定！')
        })
        .catch(() => {
          this.$message.info('操作已取消！')
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
