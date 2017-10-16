<template>
  <div id="app">
    <mu-paper class="muTab">
      <mu-bottom-nav :value="this.$store.state.bottomNav" shift @change="handleChange">
        <mu-bottom-nav-item value="index" title="首页" icon="home" to="/index" />
        <mu-bottom-nav-item value="hot" title="购票" icon="shop" to="/hot" @click.native="hot" />

        <mu-bottom-nav-item value="login" title="我的" icon="face" @click.native="change" />

      </mu-bottom-nav>
    </mu-paper>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app',
  methods: {
    handleChange(val) {
      this.bottomNav = val
    },
    hot() {
      this.$store.commit('hotFn', true);
    },
    change() {
      if (window.sessionStorage.getItem('loginStatus')=="true") {
        this.$router.push({
          path: '/my'
        });
      } else {
        this.$router.push({
          path: '/login'
        });
      }
    },
  },

  computed: mapState([
    "isLogin"
  ])
}
</script>

<style>
@import "assets/css/reset.css";
.muTab {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
}

#app {
  height: 100%;
}

.mu-bottom-nav-shift {
  background: #000;
  height: 1.9rem!important;
}

.mu-icon {
  font-size: 0.7rem;
}

.mu-bottom-item-active .mu-bottom-item-text {
  font-size: 0.5rem;
}

.mu-bottom-item-icon {
  width: 0.7rem;
}
</style>

