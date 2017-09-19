<template>
  <div >
    <x-header class="XHeader" title="Hori-Cinema">
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
 .vux-header .vux-header-title{
   height:1.7rem!important;
 }
.vux-header .vux-header-title > span{
  font-size:0.8rem;
  line-height:1.7rem!important;
  color:#fff;
}
</style>


