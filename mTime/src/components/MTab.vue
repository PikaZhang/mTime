<template>
  <div class="mTab">
    <tab  active-color='#fff' bar-active-color='#fff' defaultColor="#fff" custom-bar-width="2.0rem">
      <tab-item selected  @on-item-click='hot'>正在热映</tab-item>
      <tab-item @on-item-click='soon'>即将上映</tab-item>

    </tab>
  </div>
</template>
<script>
import { Tab, TabItem } from 'vux'
export default {
  components:{
    Tab,
    TabItem
  },
  methods:{
    hot(){
         this.$router.push('/hot')
    },
    soon(){

         this.$router.push('/soon')
    }
  }
}
</script>
<style>
.vux-tab{
  background-color:#1c2635!important;
  height:1.5rem!important;
}
.mTab {
  position:fixed;
  top:1.70rem;
  left:0;
  width:100%
}
</style>
