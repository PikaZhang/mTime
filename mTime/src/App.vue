<template>
  <div id="app">
    <m-header></m-header>
     <m-tab></m-tab>
    <loading v-model="isLoading"></loading>
    <router-view></router-view>
   
  </div>
</template>

<script>
import MHeader from '@/components/MHeader.vue'
import MTab from '@/components/MTab.vue'
import { Loading } from 'vux'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    MHeader,
    MTab,
    Loading
  },
  computed: {
    ...mapState({
      isLoading: state => state.vux.isLoading
    })
  }
}
</script>

<style>
 @import "assets/css/reset.css";
  #app{
    padding-top:3.2rem;
  }
</style>

