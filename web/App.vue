<template>
  <Comp />
</template>

<script>
import Comp from './Comp.vue'
export default {
  name: 'App',
  components: {
    Comp
  },
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