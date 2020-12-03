<template>
  <div class="app" :id="'abc'" :class="{ a: true, b: false }" :style="style">
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
<style lang="less">
.app{
  background-color: blue;
  height: 200px;
  width: 200px;
  overflow: hidden;
}
</style>