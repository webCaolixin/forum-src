<template>
	<section id="game-card">
		<el-card class="card-box" v-for="o in 4" :key="o">
			<el-row>
				<el-col :span="4" class="user-pic-box">
					<img class="user-pic" src="../assets/images/logo.png" alt=""/>
				</el-col>
				<el-col :span="20">
					<el-row>
						<el-col :span="5" class="grid-content">比赛类型：</el-col>
						<el-col :span="7" class="grid-content">篮球</el-col>
						<el-col :span="5" class="grid-content">场地：</el-col>
						<el-col :span="7" class="grid-content">篮球1号场地</el-col>
					</el-row>
					<el-row>
						<el-col :span="5" class="grid-content">开始时间：</el-col>
						<el-col :span="7" class="grid-content">2018-04-22 00:00:00</el-col>
						<el-col :span="5" class="grid-content">结束时间：</el-col>
						<el-col :span="7" class="grid-content">2018-04-22 00:00:00</el-col>
					</el-row>
				</el-col>
			</el-row>
			<el-row class="still-need">
				<el-col class="grid-content">还需2人</el-col>
			</el-row>
			<el-row class="describe">
				<el-col :span="4">&nbsp;</el-col>
				<el-col :span="20">
					<el-col :span="5" class="grid-content">描述：</el-col>
					<el-col :span="15" class="grid-content">描述描述描述描述描述描述描述描述描述描述描述</el-col>
					<el-button :span="4" size="small" type="primary" plain class="join-in">参加</el-button>
				</el-col>
			</el-row>
		</el-card>

		<el-row class="pagination-box">
			<el-pagination
				background
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:page-sizes="[5, 10, 20]"
				:page-size="100"
				layout="total, sizes, prev, pager, next, jumper"
				:total="100">
			</el-pagination>
		</el-row>
	</section>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		props: {
		},
		methods: {
			handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSizeChange() {
      },
      handleCurrentChange() {
      }
		},
		created() {
		}
	}
</script>

<style lang="stylus">
	#game-card
		.card-box
			.el-card__body
				padding 12px !important
		.card-box
			margin-bottom 12px
			.user-pic-box
				text-align center
				.user-pic
					height 60px
			.still-need
				text-align center
			.join-in
				float right
			.grid-content
				padding 5px 10px
		.pagination-box
			text-align center
</style>