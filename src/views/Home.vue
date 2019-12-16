<template>
  <div>
    <div class="logincontainer">
      <h1>欢迎来到cNode社区</h1>
      <el-form
        class="logincontent"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="110px"
      >
        <el-form-item label="请输入用户名" prop="username">
          <el-input v-model="ruleForm.username" type="text" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="请输入密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="请确认密码" prop="passwordagain">
          <el-input v-model="ruleForm.passwordagain" type="password" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-button class="loginbtn" type="primary" @click="submitForm('ruleForm')">立即登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.passwordagain !== "") {
          this.$refs.ruleForm.validateField("passwordagain");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: "",
        passwordagain: ""
      },
      rules: {
        username: [
          {
            required: "true",
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            min: 3,
            max: 10,
            message: "用户名长度在3到10个字符",
            trigger: "blur"
          }
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        passwordagain: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  components: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message({
            message: "登录成功",
            type: "success"
          });
          sessionStorage.setItem('user',this.ruleForm.username)
          sessionStorage.setItem('password',this.ruleForm.password)
          this.$store.state.user = this.ruleForm.username
          this.$store.state.password = this.ruleForm.password
          this.$router.push('/homepage')
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  mounted() {},
  watch: {},
  computed: {
    user() {
      return this.$store.state.user;
    },
    password() {
      return this.$store.state.password;
    }
  }
};
</script>

<style scoped lang='scss'>
.logincontainer {
  width: 480px;
  height: 340px;
  margin: 150px auto;
  box-shadow: 2px 2px 30px rgba($color: #000000, $alpha: 0.3);
  border: 1px solid darkgray;
  h1 {
    height: 50px;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    line-height: 50px;
    border-bottom: 1px solid darkgray;
  }
  .logincontent {
    width: 440px;
    margin: 20px auto;
    .loginbtn {
      margin-left: 191px;
    }
  }
}
</style>