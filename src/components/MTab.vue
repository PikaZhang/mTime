<template>
    <div>
        <tab active-color='#fff' bar-active-color='#fff' defaultColor="#fff" custom-bar-width="2.0rem">
            <tab-item :selected="this.$store.state.isShow==true" @on-item-click="tabHot">正在热映</tab-item>
            <tab-item :selected="this.$store.state.isShow==false" @on-item-click="tabSoon">即将上映</tab-item>
        </tab>
    </div>
</template>
<script>
import { Tab } from 'vux'
import { TabItem } from 'vux'

export default {
    components: {
        Tab,
        TabItem
    },
    methods: {
        tabHot() {
            this.$router.push({ name: 'Hot' })
            this.$store.commit('hotFn',true)
        },
        tabSoon() {
            this.$router.push({ name: 'Soon' })
            this.$store.commit('hotFn',false)
        }
    }
}
</script>
<style>
.vux-tab {
  background-color: #1c2635!important;
  height: 1.5rem!important;
}
.vux-tab .vux-tab-item{
    line-height:1.5rem!important;
    font-size:0.6rem!important;
}
</style>
