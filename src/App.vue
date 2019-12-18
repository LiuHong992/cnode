<template>
  <div>
    <Backtop>
      <router-view></router-view>
    </Backtop>
  </div>
</template>
<script>
import Backtop from "../src/components/Backtop";
export default {
  components: {
    Backtop
  }
};
</script>

<style lang="scss">
@import "../src/styles/common";
body {
  background-color: #e1e1e1;
  margin: 0;
  padding: 0;
}
ul li{
  list-style: none;
}
</style>
