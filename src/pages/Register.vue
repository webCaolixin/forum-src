<template>
	<section id="register">
		<div class="register-wrapper">
			<div id="register-form-wrapper">
				<h1 class="register-title">球迷联盟·注册</h1>
				<el-form ref="registerForm" :model="registerForm" :rules="registerFormRules">
					<el-form-item prop="username">
						<el-input v-model="registerForm.username" placeholder="用户名">
							<template slot="prepend">
                <i class="fa fa-user" aria-hidden="true"></i>
							</template>
						</el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input v-model="registerForm.password" placeholder="密码">
							<template slot="prepend">
                <i class="fa fa-lock" aria-hidden="true"></i>
							</template>
						</el-input>
					</el-form-item>
					<el-form-item prop="confirmPassword">
						<el-input v-model="registerForm.confirmPassword" placeholder="确认密码">
							<template slot="prepend">
                <i class="fa fa-unlock-alt" aria-hidden="true"></i>
							</template>
						</el-input>
					</el-form-item>

					<el-row class="register-button-box">
						<el-button
							class="register-button"
							type="primary"
							plain @click="registe">注 册</el-button>
					</el-row>
					<el-row class="toLogin">
						<a href="#/Login">登录</a>
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
				registerForm: {
					username: '',
					password: '',
					confirmPassword: ''
				},
				registerFormRules: {
					username: [{required: true, message: '不能为空', trigger: 'blur'}],
					password: [{required: true, message: '不能为空', trigger: 'blur'}],
					confirmPassword: [{required: true, message: '请确认密码', trigger: 'blur'}]
				}
			}
		},
		methods: {
			registe() {
				this.$refs.registerForm.validate((valid) => {
					if (valid) {
						this.$router.push('/Home')
					} else {
						this.$message.warning('请按要求完善注册信息！')
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
#register
  .register-wrapper
    display flex
    justify-content center
    align-items center
    width 100%
    height 100vh
    background url('../assets/images/register.jpg') no-repeat center
    background-size cover
  #register-form-wrapper
    width 350px
    padding 30px
    margin 0 auto
    background #ffffff
    border-radius 4px
    box-shadow 0px 1px 12px 0px rgba(0, 0, 0, 0.2)
    .fa
      font-size 18px
    .register-title
      text-align center
      color #409eff
      font-size 24px
      font-weight lighter
      letter-spacing 0.3em
      margin-bottom 20px
    .register-button-box
      margin-top 40px
      .register-button
        width 100%
    .toLogin
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
