<template>
    <div class="search">
        <x-header title="Search" class="XHeader">
            <div slot="overwrite-left" @click='$router.go(-1)'>
                <span>返回</span>
            </div>
        </x-header>
        <search @result-click="resultClick" @on-change="getResult" :results="results" v-model="value" position="absolute" auto-scroll-to-top top="1.7rem" @on-focus="onFocus" @on-cancel="onCancel" @on-submit="onSubmit" ref="search" placeholder='请输入要搜索的电影名字'></search>

    </div>
</template>
<script>
import { XHeader } from 'vux'
import { Search } from 'vux'
import Scroll from '@/components/Scroll.vue'
import PacmanLoader from 'vue-spinner/src/PacmanLoader.vue'
export default {
    data() {
        return {
            results: [],
            value: ''
        }
    },
    components: {
        XHeader,
        Scroll,
        PacmanLoader,
        Search
    },
    methods: {
        setFocus() {
            this.$refs.search.setFocus()
        },
        resultClick(item) {
            this.$router.push({ name: 'Detail', params: { id: item.id } })
        },
        getResult(val) {
            this.$store.dispatch('getSearch', this.value).then(() => {
                this.results = val ? getResults(this.$store.state.searchList) : [];
            })

        },
        onSubmit() {
            this.$refs.search.setBlur()
            // this.$vux.toast.show({
            //     type: 'text',
            //     position: 'top',
            //     text: 'on submit'
            // })
        },
        onFocus() {
            console.log('on focus')
        },
        onCancel() {
            this.results = [];
        },
    },

    mounted() {

    }
}
function getResults(item) {

    let rs = []
    for (let i = 0; i < item.length; i++) {
        rs.push({
            title: item[i].name,
            id: item[i].id,
        })
    }

    return rs
}
</script>
<style lang="less">
@import '../assets/css/MHeader.css';
@r: 100rem;
.weui-icon-search {
    font-size: 0.5rem!important;
    margin-right:0.1rem!important;
}

.weui-search-bar__label span {
    font-size: 0.4rem!important;
}
.weui-search-bar__box .weui-search-bar__input{
    padding:0.1rem 0!important ;
    height: 0.7rem!important;
    line-height: 0.7rem!important;
    font-size:0.5rem!important;
}
label{
    margin-bottom:0.1rem;
}
.vux-search-fixed{
    bottom:1.7rem;
    right:0;

}
.weui-search-bar{
    padding:0.26rem 0.35rem!important;
}
.weui-search-bar__box .weui-icon-search{
    line-height:0.9rem!important;
}
.weui-search-bar__box{
    padding:0 1rem!important;
}
.weui-search-bar__cancel-btn{
    line-height:0.9rem!important;
    font-size:0.46rem!important;
}
.weui-cells.vux-search_show{
     max-height:100%!important;
    position: absolute;
    top:1.4rem;
    left: 0;
    right:0;
    bottom:2rem;
    
   

   
}
// .weui-cells:before{
//    bottom:0;
//    height:0!important;
// }
.weui-cell{
    padding:0.2rem 0.4rem!important;
}
.weui-cells{
    font-size:0.5rem!important;
    line-height:0.7rem!important;
}

</style>
