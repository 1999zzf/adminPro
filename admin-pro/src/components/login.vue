<template>
  <div class="wrapper">
    <div class="login_box">
      <div class="login-box-bg">
        <div class="login-box-bg-top" v-if="yifeng === false">
          易丰科技后台管理
          <!-- 欣浩凯科技后台管理 -->
        </div>
        <div class="login-box-bg-top" v-if="huaqin == false">华勤分拣管理</div>
        <div v-show="DisPlay">
          <el-button v-if="huaqin == true" @click="hqbtn()">华勤</el-button>
          <el-button v-if="yifeng === true" @click="yfbtn()">易丰</el-button>
        </div>
        <div style="border: 1px solid #f1f1f1"></div>
        <div class="login-box-bg-body">
          <div class="input-login">
            <div class="input-login-left">账号:</div>
            <div class="input-login-right">
              <input
                v-if="huaqin === true"
                @keyup.enter="get_in()"
                :class="{ user: usernone }"
                v-model="user"
                placeholder="请输入账号"
                type="text"
                class="input"
              />
              <input
                v-if="yifeng === true"
                @keyup.enter="get_in1()"
                :class="{ user: usernone }"
                v-model="user"
                placeholder="请输入账号"
                type="text"
                class="input"
              />
            </div>
          </div>
          <div class="input-login">
            <div class="input-login-left">密码</div>
            <div class="input-login-right">
              <input
                v-if="huaqin === true"
                @keyup.enter="get_in()"
                :class="{ user: pwdnone }"
                v-model="pwd"
                placeholder="请输入密码"
                type="password"
                class="input"
              />
              <input
                v-if="yifeng === true"
                @keyup.enter="get_in1()"
                :class="{ user: pwdnone }"
                v-model="pwd"
                placeholder="请输入密码"
                type="password"
                class="input"
              />
            </div>
          </div>
        </div>

        <div style="border: 1px solid #f1f1f1"></div>
        <div class="get-in">
          <span @click="get_in()" class="get-in-btn" v-if="yifeng === false"
            >提交</span
          >
          <span @click="get_in1()" class="get-in-btn" v-if="huaqin == false"
            >提交</span
          >
        </div>
      </div>
    </div>
    <div :style="backgroundDiv" class="bgVideo">
      <!-- <video :style="fixStyle" muted autoplay="autoplay" loop class="fillWidth">
        <source src="../assets/loginbg.mp4" type="video/mp4" />
      </video> -->
    </div>
    <div class="videoUp"></div>
  </div>
</template>

<script>
let that;
history.pushState(null, null, document.URL);
window.addEventListener("popstate", function () {
  history.pushState(null, null, document.URL);
});
export default {
  inject: ["reload"],
  components: {},
  name: "login",
  props: {},
  data() {
    return {
      backgroundDiv: {
        backgroundImage: "url(" + require("../assets/img_bg.png") + ")",
      },
      user: "",
      usernone: false,
      pwd: "",
      pwdnone: false,
      huaqin: true,
      yifeng: false,
      isopen: "", //判断是否需要展开侧边栏
      fixStyle: "",
      DisPlay: true,
    };
  },
  watch: {
    // user(){
    //   console.log( that.user)
    // }
  },
  computed: {},
  methods: {
    hqbtn() {
      (this.huaqin = false), (this.yifeng = true);
    },
    yfbtn() {
      (this.huaqin = true), (this.yifeng = false);
    },
    get_in1() {
      if (that.user) {
        if (that.pwd) {
          that.pwdnone = false;
          that
            .$axios({
              method: "post",
              url:
                sessionStorage.getItem("IP") +
                "huaQin/huaQinLogin?account=" +
                that.user +
                "&password=" +
                that.pwd,
              headers: {
                "Content-Type":
                  "application/x-www-form-urlencoded;charset=UTF-8",
              },
            })
            .then((response) => {
              console.log(response);
              if (response.data.code === "0000") {
                that.$router.push({
                  path: "/components/hq_waybillManagement",
                });
                that.$message({
                  message: response.data.msg,
                  type: "success",
                });
              } else {
                that.$message({
                  message: response.data.msg,
                  type: "warning",
                });
              }
            })
            .catch((err) => {
              if (err && err.response) {
                switch (err.response.status) {
                  case 400:
                    err.message = "请求错误(400)";
                    break;
                  case 401:
                    err.message = "未授权，请重新登录(401)";
                    break;
                  case 403:
                    err.message = "拒绝访问(403)";
                    break;
                  case 404:
                    err.message = "请求出错(404)";
                    break;
                  case 408:
                    err.message = "请求超时(408)";
                    break;
                  case 500:
                    err.message = "服务器错误(500)";
                    break;
                  case 501:
                    err.message = "服务未实现(501)";
                    break;
                  case 502:
                    err.message = "网络错误(502)";
                    break;
                  case 503:
                    err.message = "服务不可用(503)";
                    break;
                  case 504:
                    err.message = "网络超时(504)";
                    break;
                  case 505:
                    err.message = "HTTP版本不受支持(505)";
                    break;
                  default:
                    err.message = `连接出错(${err.response.status})!`;
                }
              } else {
                err.message = "连接服务器失败!";
              }
              this.$message.error(err.message);
            });
        } else {
          that.$message({
            message: "请填写用户密码",
            type: "warning",
          });
          that.pwdnone = true;
          that.usernone = false;
        }
      } else {
        that.$message({
          message: "请填写用户名",
          type: "warning",
        });
        that.usernone = true;
      }
    },
    get_in() {
      if (that.user) {
        if (that.pwd) {
          that.pwdnone = false;
          that
            .$userpost("userInfo/login", {
              userName: that.user,
              password: that.pwd,
            })
            .then(function (data) {
              if (data && data.code == "0000") {
                that.$router.push({
                  path: "/components/adminpages/index",
                });
              } else {
                that.$message({
                  message: data.msg,
                  type: "warning",
                });
              }
            });
        } else {
          that.$message({
            message: "请填写用户密码",
            type: "warning",
          });
          that.pwdnone = true;
          that.usernone = false;
        }
      } else {
        that.$message({
          message: "请填写用户名",
          type: "warning",
        });
        that.usernone = true;
      }
    },
    refHtml() {
      that.DisPlay = JSON.parse(sessionStorage.getItem("Display"));
      console.log(that.DisPlay);
      // that.reload();
    },
  },
  created() {},
  mounted() {
    that = this;
    that.refHtml();
    //   window.onresize()
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/css/login.scss";
</style>