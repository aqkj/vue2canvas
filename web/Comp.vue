<template>
  <div class="app">
    <div class="app2">
      <img class="img" src="https://file.40017.cn/huochepiao/activity/20201117pietyby/images/title.4f0f513f.png"/>
    </div>
    <div class="comp">
      <div class="a">{{ content }}</div>
      <div class="a">{{ content1 }}</div>
      <div class="a">{{ content1 }}</div>
    </div>
  </div>
  <!-- <div class="app" :id="'abc'" :class="{ a: true, b: false }" :style="style">
    <div class="a" style="background-color: red; height: 100px;">123</div>
  </div> -->
</template>

<script>
export default {
  name: 'Comp',
  data() {
    return {
      content: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
      content1: '你猜'
    }
  }
}
</script>

<style lang="less">
.app{
  font-size: 24px;
  background-image: url(https://file.40017.cn/huochepiao/activity/20201117pietyby/images/bg.cddd8281.png);
  background-size: contain;
  background-position:left top;
  height: 100vh;
  .img{
    display: block;
    margin: 0 auto;
    // margin-bottom: 100px;
    // width: 300px;
    // margin-left: 50px;
  }
}
.comp{
  font-size: 0;
}
.a{
  // background-color: #000;
  font-size: 24px;
  color: #000;
}
</style>