<template>
  <div class="index">
    <m-tab class="mTab" v-model='$store.state.isShow'></m-tab>
    <router-view></router-view>
    
  </div>
</template>

<script>
import MTab from '@/components/MTab.vue'
export default {
  data() {
    return {

    }
  },
  components: {
    MTab,
  }
}
</script>
<style lang="less" scoped>
@r: 100rem;


.commonSoonWrapper {
  // overflow: hidden;
}
</style>

<style >

.index {
  margin-bottom: 10rem;
  height: 100%;
}

.mTab {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%
}





/* 正在热映 */

.listWrap {}

.con {
  height: 5rem;
}





/* .v-container{
  margin-bottom:4rem;
} */
</style>
