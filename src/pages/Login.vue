<template>
	<section id="login">
		<div class="login-wrapper">
			<div id="login-form-wrapper">
				<h1 class="login-title">球迷联盟·登录</h1>
				<el-form ref="loginForm" :model="loginForm" :rules="loginFormRules">
					<el-form-item prop="username">
						<el-input
							v-model="loginForm.username"
							placeholder="用户名"
							@keyup.enter="login">
							<template slot="prepend">
                <i class="fa fa-user" aria-hidden="true"></i>
							</template>
						</el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input
							v-model="loginForm.password"
							placeholder="密码"
							@keyup.enter="login">
							<template slot="prepend">
                <i class="fa fa-lock" aria-hidden="true"></i>
              </template>
						</el-input>
					</el-form-item>

					<el-row class="login-button-box">
						<el-button
							class="login-button"
							type="primary"
							plain @click="login">登 录</el-button>
					</el-row>
					<el-row class="toRegister">
						<a href="#/Register">注册</a>
						<a href="#/Home">首页</a>
					</el-row>
				</el-form>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				loginForm: {
					username: '',
					password: ''
				},
				loginFormRules: {
					username: [{required: true, message: '不能为空', trigger: 'blur'}],
					password: [{required: true, message: '不能为空', trigger: 'blur'}]
				}
			}
		},
		methods: {
			login() {
				this.$refs.loginForm.validate((valid) => {
					if (valid) {
						this.$store.dispatch('login', this.loginForm).then(data => {
							sessionStorage.setItem('userUuid', data.data.uid)			// session同时存储id，手动刷新页面时用它重写vuex用户id
							this.$router.push('/Home')                          	// 跳转到首页
						})
					} else {
						this.$message.warning('请完善登录信息！')
						return false
					}
				})
			}
		},
		created() {
		}
	}
</script>

<style lang="stylus" scoped>
#login
  .login-wrapper
    display flex
    justify-content center
    align-items center
    width 100%
    height 100vh
    background url('../assets/images/login.jpg') no-repeat center
    background-size cover
    #login-form-wrapper
      width 350px
      padding 30px
      background #ffffff
      border-radius 4px
      box-shadow 0px 1px 12px 0px rgba(0, 0, 0, 0.2)
      .fa
        font-size 18px
      .login-title
        text-align center
        color #409eff
        font-size 24px
        font-weight lighter
        letter-spacing 0.3em
        margin-bottom 20px
      .login-button-box
        margin-top 40px
        .login-button
          width 100%
      .toRegister
        text-align right
        margin-top 10px
        a
          font-size 14px
          color #999999
          text-decoration none
          margin-left 15px
          &:hover
            color #282828
</style>
