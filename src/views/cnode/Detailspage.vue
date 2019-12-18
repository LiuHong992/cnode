<template>
  <div>
    <!-- 详情页模板 -->
    <div class="cotentup">
      <!-- 详情页头部 -->
      <div class="detailsheader">
        <!-- 详情页头部的标签和标题 -->
        <p>
          <span class="top" v-if="contents.top === true">置顶</span>
          <span class="top" v-else-if="contents.good === true">精华</span>
          <span v-else></span>
          {{contents.title}}
        </p>
        <!-- 文章的详情(发布时间、作者、浏览数等) -->
        <div class="changes" v-if="contents">
          <span>
            · 发布于
            {{countTime(contents.create_at)}}
          </span>
          <span>· 作者 {{contents.author.loginname}}</span>
          <span>· {{contents.visit_count}} 次浏览</span>
          <span v-if="contents.tab === 'share'">·来自 分享</span>
          <span v-else>·来自 问答</span>
        </div>
      </div>
      <!-- 文章具体内容 -->
      <div class="maincontent markdown-body" v-html="contents.content"></div>
    </div>
    <!-- 文章回复框（判断条件：是否获取到首页传过来的id值决定是否进行页面渲染） -->
    <div class="contentdown" v-if="contents">
      <!-- 文章的回复框 -->
      <div class="downheader">
        <!-- 文章的回复数总和 -->
        <span class="dhspan">{{contents.reply_count}} 回复</span>
        <!-- 文章的回复模板 -->
        <div class="anwser" v-for="(item,index) in reply" :key="index">
          <!-- 回复者的头像 -->
          <div class="imgd">
            <img :src="item.author.avatar_url" alt />
          </div>
          <!-- 文章回复者的信息和回复的相关内容 -->
          <div class="rightc">
            <!-- 回复者的信息和点赞数 -->
            <div class="rightcup">
              <!-- 回复者的信息 -->
              <div class="rightid">
                <span>{{item.author.loginname}}</span>
                <span>{{index+1}}楼·{{countTime(item.create_at)}}</span>
              </div>
              <!-- 回复者所获得的点赞数 -->
              <div class="rightdz">
                <img src="../../assets/images/dz.svg" alt />
                <span>{{item.ups.length}}</span>
              </div>
            </div>
            <!-- 回复者回复的相关内容 -->
            <div class="rightcdown markdown-body" v-html="item.content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 首页传过来的ids由id来接收
      id: "",
      // contents是接收跳转过来所请求详情页的相关文章内容
      contents: "",
      // reply是接收回复的参数
      reply: []
    };
  },
  components: {},
  methods: {
    // 请求数据的方法（id值为首页子路由跳转过来时所带的参数（ids））
    getDetails(id) {
      this.$axios
        .req(`/topic/${id}`)
        .then(res => {
          this.contents = res.data;
          // console.log(res.data);
          this.reply = res.data.replies;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 计算该帖子的创建时间与当前时间的间隔
    countTime(oldTime) {
      let nowTime = new Date();
      let time = this.$dayjs(nowTime).valueOf() - this.$dayjs(oldTime);
      let month = Math.ceil(time / (30 * 24 * 60 * 60 * 1000));
      let day = Math.ceil(time / (24 * 60 * 60 * 1000));
      let hour = Math.ceil(time / (60 * 60 * 1000));
      let min = Math.ceil(time / (60 * 1000));
      if (month >= 1) {
        return `${month} 个月前`;
      } else if (month <= 1 && day >= 1) {
        return `${day}天前`;
      } else if (day <= 1 && hour >= 1) {
        return `${hour}小时前`;
      } else return `${min}分钟前`;
    }
  },
  mounted() {
    // 此处的this.id为首页（子路由）跳转到当前页面所带过来的参数，
    // 该参数用来在详情页上进行数据请求时进行匹配
    this.id = this.$route.query.ids;
    // 跳转到该路由时就请求数据
    this.getDetails(this.id);
    // 跳转时就调用计算时间的方法
    this.countTime();
  },
  watch: {},
  computed: {}
};
</script>


<style scoped lang='scss'>
// 对该路由里的span页面进行初始化操作
span {
  margin: 0;
  padding: 0;
}
// 详情页模板
.cotentup {
  .maincontent /deep/{
    line-height: 38px;
    strong{
      display: block;
    }
    img {
      margin: 20px auto;
      display: block;
      max-width: 100% !important;
    }
    p {
      text-indent: 2em;
    }
  }
  margin-bottom: 10px;
  background-color: white;
  padding: 10px;
  // 详情页头部
  .detailsheader {
    width: 100%;
    height: 65px;
    padding: 10px 0;
    border-bottom: 1px solid#e5e5e5;
    border-radius: 3px 3px 0 0;
    // 详情页头部的标签和标题
    p {
      width: 95%;
      height: 31px;
      // line-height: 30px;
      font-size: 22px;
      font-weight: 700;
      margin: 10px 0 10px 5px;
      .top {
        display: inline-block;
        width: 24px;
        height: 14px;
        padding: 2px 4px;
        font-size: 12px;
        color: white;
        background-color: #80bd01;
        border-radius: 3px;
        text-align: center;
      }
    }
    // 文章的详情(发布时间、作者、浏览数等)
    .changes {
      width: 85%;
      font-size: 12px;
      color: #838383;
      margin: 10px 0 10px 5px;
    }
  }
}
// 文章回复框
.contentdown {
  background-color: white;
  // 文章的回复数总和
  .dhspan {
    display: inline-block;
    width: 98.1%;
    padding: 10px;
    background-color: #f6f6f6;
    font-size: 14px;
  }
  // 文章的回复模板
  .anwser {
    display: flex;
    padding: 10px 0 10px 10px;
    border-bottom: 1px solid #e1e1e1;
    // 回复者的头像
    .imgd {
      width: 4.5%;
      img {
        width: 30px;
        height: 30px;
      }
    }
    // 文章回复者的信息和回复的相关内容
    .rightc {
      width: 95.5%;
      // 回复者的信息和点赞数
      .rightcup {
        display: flex;
        position: relative;
        // justify-content: space-between;
        // 回复者的信息
        .rightid {
          display: flex;
          font-size: 14px;
          span:first-child {
            padding: 0;
            background-color: white !important;
          }
          span:nth-child(2) {
            padding: 0;
            background-color: white !important;
            color: #08c;
            margin-left: 10px;
            &:hover {
              cursor: pointer;
              text-decoration: underline;
            }
          }
        }
        // 回复者所获得的点赞数
        .rightdz {
          position: absolute;
          right: 10px;
          text-align: center;
          img {
            width: 14px;
            height: 14px;
            // margin-top: 5px;
          }
          span {
            line-height: 30px;
          }
        }
      }
    }
  }
}
</style>