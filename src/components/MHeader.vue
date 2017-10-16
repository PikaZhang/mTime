<template>
  <div>
    <x-header class="XHeader" :title='title'>
      <div slot='overwrite-left' @click="$router.push({path:'/area'})">
        <span class="glyphicon glyphicon-map-marker"></span>
        <span>{{this.$store.state.chooseCity}}</span>
      </div>
      <div slot='right' @click = "$router.push({path:'/search'})">
        <mu-icon value="search" color="#fff" />
      </div>
    </x-header>
  </div>
</template>

<script>
import { XHeader } from 'vux'

export default {
  props: ['title'],
  components: {
    XHeader
  }
}
</script>
<style>
@import '../assets/css/MHeader.css';
</style>


