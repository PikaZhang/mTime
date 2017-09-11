<template>
  <div id="app">
    <!-- <mu-tabs :value="activeTab" @change="handleTabChange" class="muTab">
        <mu-tab value="tab1" icon="home" title="首页" @click="$router.push({name:'Index'})"/>
        <mu-tab value="tab2" icon="shop" title="购票" @click="$router.push({name:'Home'})" />
        <mu-tab value="tab3" icon="face" title="我的" @click="$router.push({name:'Login '})"/>
      </mu-tabs> -->
    <mu-paper style="max-width: 376px; " class="muTab">
      <mu-bottom-nav :value="bottomNav" shift @change="handleChange">
        <mu-bottom-nav-item value="tab1" title="首页" icon="home" to="/index" selected/>
        <mu-bottom-nav-item value="tab2" title="购票" icon="shop" to="/home"/>
        <mu-bottom-nav-item value="tab3" title="我的" icon="face" to="/login"/>
      </mu-bottom-nav>
    </mu-paper>
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
  },
  data() {
    return {
      bottomNav: 'tab1',
      // bottomNavColor: 'movies'
    }
  },
  methods: {
    handleChange(val) {
      this.bottomNav = val
    }
  }
}
</script>

<style>
@import "assets/css/reset.css";
.muTab {
  position: fixed;
  bottom: 0;
  left: 0;
  width:100%;
  z-index:3;
}

#app {
  height: 100%;
}
</style>

