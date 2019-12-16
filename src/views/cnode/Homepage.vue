<template>
  <div>
    <div class="hmheader">
      <div @click="changeBg(1)" :class="{bg: num === 1}">全部</div>
      <div @click="changeBg(2)" :class="{bg: num === 2}">精华</div>
      <div @click="changeBg(3)" :class="{bg: num === 3}">分享</div>
      <div @click="changeBg(4)" :class="{bg: num === 4}">问答</div>
      <div @click="changeBg(5)" :class="{bg: num === 5}">招聘</div>
      <div @click="changeBg(6)" :class="{bg: num === 6}">客户端测试</div>
    </div>
    <div class="topictemplate"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 1,
      arr:[]
    };
  },
  components: {},
  methods: {
    getMessage() {
      this.$axios.req('/topics').then(res => {
        this.arr = res
        // console.log(this.arr);
      }).catch(err => {
        console.log(err);
      })
    },
    changeBg(index) {
      this.num = index;
    }
  },
  mounted() {
    this.getMessage()
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
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
.topictemplate{
  

}
</style>