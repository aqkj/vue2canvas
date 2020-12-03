<template>
  <div class="app" style="color: #000;background-color: #ddd;height: 200px" :style="style">
    <div class="a" style="background-color: red; height: 100px;">123</div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      style: {
        color: 'red'
      }
    }
  }
}
</script>

<style lang="less">
.app{
  color: #fff;
}
</style>