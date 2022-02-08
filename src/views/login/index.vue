<template>
  <div class="login">
    <van-nav-bar
      title="登陆"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.phone"
        name="phone"
        label="手机号"
        placeholder="请输入手机号"
        :rules="[
          {
            required: true,
            message: '请填写用户名'
          },
          {
            validator: phoneCheck,
            message: '格式有误，请重新输入'
          }
        ]"
      />
      <van-field
        v-model="form.password"
        type="password"
        name="password"
        label="密码"
        placeholder="请输入密码"
        :rules="[
          {
            required: true,
            message: '请填写密码'
          },
          {
            pattern: /^[a-zA-Z0-9]{6,12}$/,
            message: '格式有误，请重新输入'
          }
        ]"
      />
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          :loading="isLoading"
        >登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/services/user'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        phone: '',
        password: ''
      },
      isLoading: false
    }
  },
  methods: {
    phoneCheck (value) {
      return /^1\d{10}$/.test(value)
    },
    async onSubmit () {
      this.isLoading = true
      const { data } = await login(this.form)
      if (data.state === 1) {
        this.$toast.success('登录成功')
        this.$store.commit('setUser', data.content)
        this.$router.push(this.$route.query.redirect || '/')
      } else {
        this.$toast.fail('登录失败')
      }
      this.isLoading = false
    },
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped></style>
