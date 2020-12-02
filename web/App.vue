<template>
  <div class="app" style="color: #000;background-color: #ddd;" :style="style">
    <div class="a">123</div>
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