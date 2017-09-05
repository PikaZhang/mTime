<template>
  <div class="MHeader">
    <x-header class="XHeader">
      <a href="javascript:;" slot="overwrite-title">
        <img src='../assets/img/logo_mtime.png' id='logo'>
      </a>
      <div slot='overwrite-left'>
        <span class="glyphicon glyphicon-map-marker"></span>
        <span>上海</span>
      </div>
    </x-header>
  </div>
</template>

<script>
import { XHeader } from 'vux'
export default {
  components: {
    XHeader
  }
}
</script>
<style>
.vux-header {
  background-color: #1c2635!important;
  height: 1.70rem;
  padding: 0!important;
}

.MHeader {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
}

#logo {
  width: 2.13rem;
  height: 0.70rem;
  margin-top: 0.55rem;
}

.vux-header .vux-header-left {
  left: 0.29rem!important;
  top: 0.59rem!important;
}

.vux-header .vux-header-left span {
  color: #fff!important;
}

.vux-header-title-area {
  text-align: center;
}
</style>


