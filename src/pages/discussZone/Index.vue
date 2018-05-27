<template>
	<section id="discussZone">
		<main class="main-content">
			<el-row>
				<el-col :span="4">
					<el-row class="hotPostingTitle">
          	<span> | </span>热门帖子
         	</el-row>
					<el-row class="hotPostingContent">
            <img v-if="hotPostingList.length===0" src="../../assets/images/no-data2.jpg" alt="No Data..."/>
						<ul v-else class="hotPostingUl">
							<li
								class="hotPostItem"
								v-for="i in hotPostingList"
								:key="i.id"
								@click="gotoDetail(i.id)">
								{{i.title}}
							</li>
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
      v-if="pubPostingDialog"
      :visible.sync="pubPostingDialog">
      <publish-posting @closePubPosting="closePubPosting"></publish-posting>
    </el-dialog>
	</section>
</template>

<script>
import { mapState } from 'vuex'
import $axios from '@/plugins/ajax'
import PostingCard from './PostingCard.vue'
import PublishPosting from './PublishPosting.vue'

export default {
	data() {
		return {
		  hotPostingList: [],
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
		// 发布帖子
		handelpublishPosting() {
			if (this.userId) {
				this.pubPostingDialog = true
			} else {
				this.$message.warning('登陆后才能发贴哦！')
			}
		},
		// 关闭饭贴弹框
		closePubPosting() {
			this.getHostPostings()
			this.pubPostingDialog = false
		},
		// 获取热门帖子
		getHostPostings() {
			$axios.get('/forum/v1/topTen').then(({data}) => {
				if (data && data.statusCode === 200) {
					this.hotPostingList = data.data
				}
			})
		},
		gotoDetail(id) {
			this.$router.push(`/DiscussZone/postingDetail/${id}`)
		}
	},
	created() {
		this.getHostPostings()
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
    .hotPostingContent
      img
        display block
        margin 100px auto 0
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
