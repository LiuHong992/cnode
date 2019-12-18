<template>
  <div>
    <!-- 首页子路由头部导航栏 -->
    <div class="hmheader">
      <div @click="changeBg(1)" :class="{bg: num === 1}">全部</div>
      <div @click="changeBg(2)" :class="{bg: num === 2}">精华</div>
      <div @click="changeBg(3)" :class="{bg: num === 3}">分享</div>
      <div @click="changeBg(4)" :class="{bg: num === 4}">问答</div>
      <div @click="changeBg(5)" :class="{bg: num === 5}">招聘</div>
      <div @click="changeBg(6)" :class="{bg: num === 6}">客户端测试</div>
    </div>
    <!-- 首页子路由内容层分页 -->
    <div class="block">
      <div class="topictemplate" v-for="(item,index) in arr[currentPage-1]" :key="index">
        <!-- 子模板头像框 -->
        <div class="imgdv">
          <img :src="item.author.avatar_url" :alt="item.author.loginname" />
        </div>
        <!-- 子模板回复数/浏览数 -->
        <div class="reply">
          <span>{{item.reply_count}}</span>
          <span>/ {{item.visit_count}}</span>
        </div>
        <!-- 子模板是否为置顶帖或者分享问答帖 -->
        <div class="top" v-if="item.top === true">置顶</div>
        <div class="top" v-else-if="item.good === true">精华</div>
        <div class="share" v-else-if="item.tab === 'share'">分享</div>
        <div class="share" v-else>问答</div>

        <!-- 子模板标题内容 -->
        <p @click="goToDetails(item.id)">{{item.title}}</p>
        <!-- 帖子最新的回复时间距当前时间的间隔 -->
        <span class="lasttime">{{countTime(item.last_reply_at)}}</span>
      </div>
      <!-- 内容层分页组件（element-ui） -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="arr1.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // num为首页导航栏跳转子路由时的第三方判断参数
      num: 1,
      // arr为每次改变每一页的条数后进行重新页面渲染的数组（页面渲染的数组）
      // arr1为请求来的数据的原数组
      arr: [],
      arr1: [],
      // pagesize为每一页的条数，在handleSizeChange方法中进行操作
      pagesize: 10,
      // currentPage为在每一页的条数发生改变后数据重新渲染的arr下标
      currentPage: 1
    };
  },
  components: {},
  methods: {
    // 跳转详情页方法
    goToDetails(ids) {
      this.$router.push({ name: "details", query: { ids: ids } });
    },
    // 以下两个方法为分页组件内置方法
    handleSizeChange(val) {
      this.pagesize = val;
      // console.log(`每页 ${val} 条`);
      // console.log(this.pagesize);
      this.pageChange();
      // console.log(this.arr);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = Number(val);
      // this.currentPage = Number(val)
    },
    // 页面加载的数据条数改变后对页面重新渲染（自定义方法）
    pageChange() {
      this.arr = [];
      for (let i = 0; i < this.arr1.length; i += this.pagesize) {
        this.arr.push(this.arr1.slice(i, i + this.pagesize));
      }
      // console.log(this.arr)
    },
    // 跳转首页子路由后进行数据请求并对页面进行初始渲染
    getMessage() {
      this.$axios
        .req("/topics")
        .then(res => {
          this.arr = [];
          for (let i = 0; i < res.data.length; i += this.pagesize) {
            this.arr.push(res.data.slice(i, i + this.pagesize));
          }
          this.arr1 = res.data;
          // console.log(this.arr);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 内容层头部子路由进行跳转添加类名的方法
    changeBg(index) {
      this.num = index;
    },
    // 计算帖子最新的回复时间距当前时间的间隔
    countTime(oldTime) {
      let nowTime = new Date();
      let time = this.$dayjs(nowTime).valueOf() - this.$dayjs(oldTime);
      let day = Math.ceil(time / (24 * 60 * 60 * 1000));
      let hour = Math.ceil(time / (60 * 60 * 1000));
      let min = Math.ceil(time / (60 * 1000));

      if (day > 1 || hour >= 23) {
        return `${day}天前`;
      } else if (day <= 1 && hour > 1) {
        return `${hour}小时前`;
      } else if(hour <= 1 && min >= 1){
       return `${min}分钟前`;}
    }
  },
  mounted() {
    // 登录后进入首页时请求数据
    this.getMessage();
    // 登录后进入首页对时间进行计算
    this.countTime();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
p {
  margin: 0;
  padding: 0;
}
// 首页子路由头部
.hmheader {
  display: flex;
  width: 100%;
  height: 20px;
  padding: 10px 0;
  background-color: #f6f6f6;
  color: #80bd01;
  line-height: 20px;
  div {
    margin: 0 10px;
    font-size: 14px;
    padding: 0 5px;
    &:hover {
      cursor: pointer;
      color: skyblue;
    }
  }
  .bg {
    background-color: #80bd01;
    color: white !important;
    border-radius: 2px;
  }
}
// 首页子路由渲染的子模板样式
.topictemplate {
  display: flex;
  width: 98%;
  height: 30px;
  padding: 10px;
  line-height: 30px;
  background-color: white;
  // 子模板头像框
  .imgdv {
    width: 130px;
    img {
      width: 30px;
      height: 30px;
    }
  }
  //子模板回复数/浏览数
  .reply {
    display: flex;
    width: 100px;
    margin-left: 10px;
    span {
      font-size: 14px;
      &:nth-child(2) {
        color: #9e78c0;
        margin: 0 5px 0 0;
      }
      &:nth-child(3) {
        color: #b4b4b4;
        font-size: 12px;
      }
    }
  }
  // 子模板是否为置顶帖或者分享问答帖
  .top {
    width: 32px;
    height: 16px;
    padding: 2px 4px;
    font-size: 14px;
    color: white;
    background-color: #80bd01;
    line-height: 18px;
    border-radius: 4px;
    margin-top: 4px;
  }
  .share {
    width: 32px;
    height: 16px;
    padding: 2px 4px;
    font-size: 14px;
    color: #999;
    background-color: #e5e5e5;
    line-height: 18px;
    border-radius: 4px;
    margin-top: 4px;
  }
  // 子模板标题内容
  p {
    width: 680px;
    margin-left: 5px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  span{
    font-size: 14px;
  }
}
</style>