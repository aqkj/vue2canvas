<template>
  <div class="app" :id="'abc'" :class="{ a: true, b: false }" :style="style">
    <div class="a" style="background-color: red; height: 100px;">123</div>
    <Comp />
  </div>
</template>

<script>
export default {
  name: 'Comp'
}
</script>

<style lang="less">
</style>