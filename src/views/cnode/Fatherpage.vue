<template>
  <div>
    <el-container>
      <el-container class="el__header">
        <!-- 父路由头部 -->
        <el-header class="fatherhome">
          <div class="homeleft">
            <img
              @click="goTohome"
              src="../../assets/images/cnodejs_light.svg"
              alt
              style="width:125px;height:35px;margin-top:4px;"
            />
            <el-input class="el-ipt" prefix-icon="el-icon-search" v-model="input2"></el-input>
          </div>
          <div class="homeright">
            <div @click="goTohome">首页</div>
            <div>新手入门</div>
            <div>API</div>
            <div>关于</div>
            <div>注册</div>
            <div @click="exitHome" v-if="this.users">退出</div>
            <div @click="goToHome" v-else>登录</div>
          </div>
        </el-header>
        <!-- 父路由内容层和侧边栏 -->
        <el-container class="middlecontainer">
          <!-- 父路由内容层 -->
          <el-main class="homecontainer">
            <router-view />
          </el-main>
          <!-- 父路由侧边栏 -->
          <el-aside class="homeaside" width="22%">
            <div class="loginstate" v-if="this.users">
              <h3>
                <span>用户名：</span>
                {{users}}
              </h3>
              <p>欢迎来到CNode：Node.js专业中文社区</p>
              <el-button type="primary" @click="exitHome">退出登录</el-button>
            </div>
            <div class="loginstate" v-else>
              <h3>CNode：Node.js专业中文社区</h3>
              <p>
                您可以
                <span>登录</span> 或
                <span>注册</span> , 也可以
              </p>
              <el-button type="primary" @click="goToHome">立即登录</el-button>
            </div>
            <div class="homeimages">
              <img src="../../assets/images/Detailpage-aside1.jpg" alt />
              <img src="../../assets/images/Detailpage-aside2.jpg" alt />
              <img src="../../assets/images/Detailpage-aside3.jpg" alt />
            </div>
            <div class="noperson">
              <h1>无人回复的话题</h1>
              <ul>
                <li>前台 vue ssr ，后台react 多权限管理的发...</li>
                <li>每日有限 的配送都是东西没有收到，却自...</li>
                <li>当当网双十二大部分书籍5折后，满200减...</li>
                <li>node v8.1.3 pm2问题</li>
                <li>直播监控网站设计</li>
              </ul>
            </div>
            <div class="integral">
              <h1>积分榜 TOP 100 >></h1>
              <ul>
                <li>21805 i5ting</li>
                <li>15695 alsotang</li>
                <li>9350 leapon</li>
                <li>9305 atian25</li>
                <li>8780 jiyinyiyong</li>
                <li>7465 yakczh</li>
                <li>6835 im-here</li>
                <li>6115 DevinXian</li>
                <li>5815 chapgaga</li>
                <li>5355 magicdawn</li>
              </ul>
            </div>
            <div class="friendshipcommunity">
              <h1>友情社区</h1>
              <ul>
                <li>
                  <img src="../../assets/images/h1.png" alt />
                </li>
                <li>
                  <img src="../../assets/images/h2.png" alt />
                </li>
                <li>
                  <img src="../../assets/images/h3.png" alt />
                </li>
                <li>
                  <img src="../../assets/images/h4.png" alt />
                </li>
              </ul>
            </div>
            <div class="ewm">
              <h1>客户端二维码</h1>
              <div class="erweimaimage">
                <img src="../../assets/images/erweima.png" alt />
                <h2>客户端源码地址</h2>
              </div>
            </div>
          </el-aside>
        </el-container>
        <!-- 父路由底部导航栏 -->
        <el-footer class="footers">
          <div class="footermain">
            <div class="links">
              <span>RSS</span>
              <span>|</span>
              <span>源码地址</span>
            </div>
            <p>CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。</p>
            <p>
              服务器赞助商为
              <img src="../../assets/images/bottom1.jpg" alt />，
              存储赞助商为
              <img src="../../assets/images/bottom2.jpg" alt />，
              由
              <img src="../../assets/images/bottom3.jpg" alt />
              提供应用性能服务。
            </p>
            <p>
              新手搭建 Node.js 服务器，推荐使用无需备案的
              <span>DigitalOcean(https://www.digitalocean.com/)</span>
            </p>
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import Backtop from '../../components/Backtop'
export default {
  data() {
    return {
      input2: "",
      users: ""
    };
  },
  components: {
    // Backtop,
  },
  methods: {
    goTohome() {
      this.$router.push("/homepage");
    },
    exitHome() {
      this.users = "";
      sessionStorage.removeItem("user");
      console.log(this.users);
    },
    goToHome() {
      this.$router.push("/");
    }
  },
  mounted() {
    this.users = sessionStorage.getItem("user");
    // window.history.back((this.users = ""));
  },
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
ul {
  list-style: none;
}
.el__header {
  width: 100%;
  background-color: #444444;
  //首页头部
  .fatherhome {
    display: flex;
    justify-content: space-between;
    width: 88%;
    margin: 0 auto;
    // 头部左边
    .homeleft {
      display: flex;
      width: 380px;
      height: 50px;
      .el-ipt {
        width: 235px;
        margin: 10px 0 10px 20px;
      }
    }
    // 头部右边
    .homeright {
      display: flex;
      justify-content: space-around;
      width: 355px;
      height: 50px;
      color: #cccccc;
      text-align: center;
      line-height: 50px;
      font-size: 14px;
      div:hover {
        cursor: pointer;
        color: white;
      }
    }
  }
  //首页内容层和侧边栏
  .middlecontainer {
    width: 88%;
    margin: 20px auto;
    // 首页内容层
    .homecontainer {
      width: 77%;
      // border: 1px solid darkgray;
    }
    // 首页侧边栏
    .homeaside {
      margin-left: 1%;
      .loginstate {
        height: 125px;
        padding: 10px;
        font-size: 14px;
        margin-bottom: 10px;
        background-color: white;
        h3 {
          height: 26px;
          line-height: 26px;
          margin-bottom: 10px;
          span {
            font-size: 14px;
            font-weight: normal;
          }
        }
        p {
          margin-bottom: 10px;
          span {
            color: darkgray;
          }
        }
      }
      .homeimages {
        height: 212px;
        padding: 7px;
        margin-bottom: 10px;
        background-color: white;
        img {
          width: 270px;
          height: 65px;
          margin-bottom: 5px;
        }
      }
      .noperson {
        height: 220px;
        margin-bottom: 10px;
        font-size: 14px;
        background-color: white;
        h1 {
          height: 20px;
          line-height: 20px;
          padding: 10px;
          background-color: #f6f6f6;
          margin: 0;
        }
        ul {
          padding: 10px;
          margin: 0;
          li {
            height: 30px;
            line-height: 30px;
            color: rgb(172, 169, 169);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .integral {
        height: 355px;
        margin-bottom: 10px;
        background-color: white;
        h1 {
          height: 20px;
          line-height: 20px;
          padding: 10px;
          background-color: #f6f6f6;
          font-size: 14px;
          margin: 0;
        }
        ul {
          padding: 10px;
          font-size: 12px;
          margin: 0;
          li {
            height: 30px;
            line-height: 30px;
            color: rgb(172, 169, 169);
          }
        }
      }
      .friendshipcommunity {
        height: 295px;
        margin-bottom: 10px;
        background-color: white;
        h1 {
          height: 20px;
          line-height: 20px;
          padding: 10px;
          background-color: #f6f6f6;
          font-size: 14px;
          margin: 0;
        }
        ul {
          height: 235px;
          padding: 10px;
          margin: 0;
          li {
            width: 270px;
            height: 50px;
            margin-bottom: 10px;
            img {
              width: 150px;
              height: 50px;
            }
          }
        }
      }
      .ewm {
        height: 285px;
        background-color: white;
        h1 {
          height: 20px;
          line-height: 20px;
          padding: 10px;
          background-color: #f6f6f6;
          font-size: 14px;
          margin: 0;
        }
        .erweimaimage {
          padding: 10px;
          img {
            width: 200px;
            height: 200px;
            margin: 5px 35px;
          }
          h2 {
            font-size: 14px;
            text-align: center;
            color: darkgray;
            margin: 0;
          }
        }
      }
    }
  }
  //首页底部
  .footers {
    width: 100%;
    margin-top: 10px;
    background-color: white;
    .footermain {
      width: 88%;
      height: 190px;
      margin: 0 auto;
      font-size: 14px;
      .links {
        height: 26px;
        line-height: 26px;
        span {
          &:nth-child(2) {
            margin: 0 5px 0;
            color: darkgray;
          }
        }
      }
      p {
        height: 20px;
        line-height: 20px;
        margin-bottom: 10px;
        color: #ababab;
        &:nth-child(3) {
          display: flex;
          height: 54px;
          line-height: 54px;
          img {
            display: block;
            width: 92px;
            height: 20px;
            margin-top: 17px;
            &:nth-child(2) {
              width: 115px;
              height: 44px;
              margin-top: 5px;
            }
            &:last-child {
              width: 166px;
              height: 54px;
              margin-top: 0px;
            }
          }
        }
        span {
          color: steelblue;
        }
      }
    }
  }
}
</style>