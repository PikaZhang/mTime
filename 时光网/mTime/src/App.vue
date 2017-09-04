<template>
  <div id="app">
  <m-header></m-header>
  <m-tab></m-tab>
   <router-view></router-view>
  </div>
</template>

<script>
import MHeader from '@/components/MHeader.vue'
import MTab from '@/components/MTab.vue'
export default {
  name: 'app',
      components: {
        MHeader,
        MTab
    },
}
</script>

<style>
   @import "./assets/css/reset.css"
</style>
