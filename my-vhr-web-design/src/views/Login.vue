<template>
  <div>
    <el-form :rules="rules" :model="loginForm" class="loginContainer" ref="loginForm">
      <h3 class="loginTitle">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" aria-placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" aria-placeholder="请输入密码" @keydown.enter.native="submitLogin"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" class="loginRemember"></el-checkbox>
      <el-button type="primary" style="width: 100%;" @click="submitLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123'
      },
      checked: true,
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}]
      }
    }
  },
  methods: {
    submitLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          //调用刚才写在api.js中的方法
          this.postKeyValueRequest('/doLogin', this.loginForm).then(resp=>{
            if (resp) {
              // alert(JSON.stringify(resp.obj))
              window.sessionStorage.setItem("user", JSON.stringify(resp.obj));
              let path = this.$route.query.redirect;
              //获取当前页面中的router对象
              this.$router.replace((path == '/' || path == undefined) ? '/home' : path);
            }
          })
        } else {
          this.$message.error('请输入所有字段！');
          return false;
        }
      });
    }
  }
}
</script>

<style>
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #8212a8; /*阴影效果*/
}

.loginTitle {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #1b5d48;
}

.loginRemember {
  text-align: left;
  margin: 0 0 20px 0;
}
</style>