<template>
	<section id="register">
		<div class="register-wrapper">
			<div id="register-form-wrapper">
				<h1 class="register-title">球迷联盟·注册</h1>
				<el-form ref="registerForm" :model="registerForm" :rules="registerFormRules">
					<el-form-item prop="username">
						<el-input
							v-model="registerForm.username"
							placeholder="用户名"
							@keyup.enter="registe">
							<template slot="prepend">
                <i class="fa fa-user" aria-hidden="true"></i>
							</template>
						</el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input
							v-model="registerForm.password"
							type="password"
							placeholder="密码"
							@keyup.enter="registe">
							<template slot="prepend">
                <i class="fa fa-lock" aria-hidden="true"></i>
							</template>
						</el-input>
					</el-form-item>
					<el-form-item prop="confirmPassword">
						<el-input
							v-model="registerForm.confirmPassword"
							type="password"
							placeholder="确认密码"
							@keyup.enter="registe">
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
	import $axios from '@/plugins/ajax'

	export default {
		data() {
			let validatePass = (rule, value, callback) => {
		    if (value === '') {
		      callback(new Error('请输入密码'));
		    } else {
		      if (this.registerForm.confirmPassword !== '') {
		        this.$refs.registerForm.validateField('confirmPassword');
		      }
		      callback();
		    }
		  };
		  let validatePass2 = (rule, value, callback) => {
		    if (value === '') {
		      callback(new Error('请再次输入密码'));
		    } else if (value !== this.registerForm.password) {
		      callback(new Error('两次输入密码不一致!'));
		    } else {
		      callback();
		    }
		  };
			return {
				registerForm: {
					username: '',
					password: '',
					confirmPassword: ''
				},
				registerFormRules: {
					username: [{required: true, message: '不能为空', trigger: 'blur'}],
					password: [{
						required: true, message: '不能为空', trigger: 'blur'}, {
						min: 6, max: 32, message: '密码长度应为6~32个字符', trigger: 'blur'
					}, {
						validator: validatePass, trigger: 'blur'
					}],
					confirmPassword: [{
						required: true, message: '请确认密码', trigger: 'blur'}, {
						validator: validatePass2, trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			registe() {
				this.$refs.registerForm.validate((valid) => {
					if (valid) {
						let registeData = {
							username: this.registerForm.username,
							password: this.registerForm.password
						}
						$axios.post('/user/v1/register', registeData, {
          		headers: {'x-auth-token': sessionStorage.getItem('token') || ''}
        		}).then(({data}) => {
							if (data.statusCode === 200) {
								this.$store.commit('SET_USER_INFO', data.data.uid)
								// session同时存储id，手动刷新页面时用它重写vuex用户id
								sessionStorage.setItem('userUuid', data.data.uid)
								sessionStorage.setItem('token', data.token)
								this.$router.push('/Home')
							} else {
								this.$message.error(data.message)
							}
						})
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
