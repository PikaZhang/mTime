<template>
    <div>
        <tab active-color='#fff' bar-active-color='#fff' defaultColor="#fff" custom-bar-width="2.0rem">
            <tab-item :selected="$store.state.isShow"  @on-item-click="$store.state.isShow=true">正在热映</tab-item>
            <tab-item :selected="!$store.state.isShow" @on-item-click="$store.state.isShow=false">即将上映</tab-item>
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
    methods:{
    }
}
</script>
