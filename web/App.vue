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
