<template>
	<section id="discussZone">
		<main class="main-content">
			<el-row>
				<el-col :span="4">
					<el-row class="hotPostingTitle">
            <span> | </span>热门帖子</el-row>
					<el-row>
						<ul class="hotPostingUl">
							<li
								class="hotPostItem"
								v-for="(i, $index) in 10"
								:key="$index+1">{{`${$index+1}. `+`${i}`.repeat(30)}}</li>
						</ul>
					</el-row>
				</el-col>
				<el-col class="gutter" :span="20">
					<el-row class="pub-posting-btn-box">
						<el-button
							class="pub-posting-btn"
							type="primary"
							plain
							@click="handelpublishPosting">我要发帖</el-button>
					</el-row>
					<posting-card></posting-card>
				</el-col>
			</el-row>
		</main>

		<el-dialog
      title="发布帖子"
      width="700px"
      :visible.sync="pubPostingDialog">
      <publish-posting></publish-posting>
    </el-dialog>
	</section>
</template>

<script>
import { mapState } from 'vuex'
import PostingCard from './PostingCard.vue'
import PublishPosting from './PublishPosting.vue'

export default {
	data() {
		return {
			pubPostingDialog: false
		}
	},
	components: {
		PostingCard,
		PublishPosting
	},
	computed: {
		...mapState({
			userId: state => state.userInfo.uid
		})
	},
	methods: {
		handelpublishPosting() {
			if (this.userId) {
				this.pubPostingDialog = true
			} else {
				this.$message.warning('登陆后才能发贴哦！')
			}
		}
	},
	created() {
	}
}
</script>

<style lang="stylus" scoped>
#discussZone
  .main-content
    width 85%
    padding 20px
    margin 0 auto
    margin-bottom 60px
    .pub-posting-btn-box
      margin-bottom 10px
    .pub-posting-btn
      width 130px
    .hotPostingTitle
      padding-bottom 3px
      margin 0 15px 5px 0
      color #888
      font-size 15px
      font-weight bold
      border-bottom 1px solid #ebebeb
      span
        color #409eff
        font-weight bold
    .hotPostingUl
      .hotPostItem
        padding 5px 12px 5px 5px
        color #555
        cursor pointer
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        &:hover
          color #409eff
          text-decoration underline
    .gutter
      padding-left 15px
      border-left 1px solid #ebebeb
</style>
