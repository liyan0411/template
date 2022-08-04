<template>
  <div class="container">
    <van-cell-group>
      <van-field label="用户名" placeholder="请输入用户名" v-model="form.name" />
      <van-field label="密码" placeholder="请输入密码" v-model="form.password" />
    </van-cell-group>
    <van-button plain type="primary" @click="login">登录</van-button>
  </div>
</template>

<script>
import { Encrypt } from '@/utils/cryptojs'
import { setCookie } from '@/utils/utils'

import code from "@/config/code"
export default {
  name: 'Login',
  data() {
    return {
      form: {
        name: '',
        password: '',
        loginCode: '111111', //没啥用 随便传个
        loginType: '2' //登陆类型 1：普通登陆 2：域登陆
      }
    }
  },
  created() {},
  methods: {
    login() {
      const { name, password, loginCode, loginType } = this.form
      let param = {
        userName: Encrypt(name),
        password: Encrypt(password),
        loginCode: Encrypt(loginCode),
        loginType: Encrypt(loginType)
      }
      this.$request.post('/user/user/login/1596422598940', param).then(r => {
        console.log('r', r)
        let res=r.content;
        setCookie(code.TOKEN, res.token)
        setCookie(code.USERNAME, res.username)
        setCookie(code.EMAIL, res.email)
        setCookie(code.REALNAME, res.userRealName)
        this.$router.push('/'+this.$route.query.redirect)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.text {
  width: 375px;
  height: 30px;
  box-sizing: border-box;
}
</style>
