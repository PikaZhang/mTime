<template>
    <div>
        <tab active-color='#fff' bar-active-color='#fff' defaultColor="#fff" custom-bar-width="2.0rem">
            <tab-item selected @on-item-click="now">正在热映</tab-item>
            <tab-item @on-item-click="soon">即将上映</tab-item>
        </tab>
    </div>
</template>
<script>
import { Tab } from 'vux'
import { TabItem } from 'vux'
export default {
    props:['show'],
    components: {
        Tab,
        TabItem
    },
    methods:{
        now(){
              this.$emit('update:show', true);
        },
        soon(){
             this.$emit('update:show', false);
        }
    }
}
</script>
