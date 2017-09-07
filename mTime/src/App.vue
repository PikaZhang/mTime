<template>
  <div id="app">
   
    <router-view></router-view>
  </div>
</template>

<script>

import { Loading } from 'vux'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
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
</style>

