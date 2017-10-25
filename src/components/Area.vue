<template>
    <div class="area">
        <x-header title="选择城市" class="XHeader">
            <div slot="overwrite-left" @click='$router.go(-1)'>
                <span>返回</span>
            </div>
        </x-header>
        <pacman-loader :loading="loading"></pacman-loader>
        <div v-if="!loading">
            <scroll class="indexWrap">
                <div>
                    <div>
                        <p class="hotC">热门城市:</p>
                    </div>
                    <ul class="hotCity">
                        <li v-for="hot,index in this.$store.state.area"  v-if='index<12' @click="getCity(hot)">{{hot.n}}</li>
                    </ul>
                    <div class="allArea">
                        <div v-for="area,key in newCity">
                            <h2 class="zimu">{{key}}</h2>
                            <ul class="allCity clearFix">
                                <li v-for="item in area"  @click="getCity(item)">{{item.n}}</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </scroll>
        </div>

    </div>
</template>
<script>
import { mapState } from 'vuex'
import { XHeader } from 'vux'
import Scroll from '@/components/Scroll.vue'
import PacmanLoader from 'vue-spinner/src/PacmanLoader.vue'
export default {
    data() {
        return {
            zimu: [],
            newCity: ''
        }
    },
    components: {
        XHeader,
        Scroll,
        PacmanLoader
    },
    created() {
        this.$store.commit('loadingFn', true);

    },
    mounted() {
        this.$store.dispatch('getArea').then(() => {
            this.$store.commit('loadingFn', false);
            let zimu = [];
            for (var i = 0; i < this.$store.state.area.length; i++) {
                if (zimu.indexOf(this.$store.state.area[i].pinyinFull.slice(0, 1).toUpperCase()) === -1) {
                    zimu.push(this.$store.state.area[i].pinyinFull.slice(0, 1))
                }
            }
            zimu = zimu.sort();
            let city = {}
            for (let i = 0; i < zimu.length; i++) {
                let newarr = this.$store.state.area.filter(function(value, index) {
                    return value.pinyinFull.slice(0, 1).toUpperCase() === zimu[i]
                })
                city[zimu[i]] = newarr


            }
            this.newCity = city;



        })
    },
    computed: {
        ...mapState([
            'loading'
        ]),

    },
    methods: {
        // getHot() {
        //     return this.$store.state.area.slice(0, 12)
        // }
        getCity(value){
            this.$router.push({name:'Index'})
           this.$store.commit('chooseCityIdFn',value.id)
            this.$store.commit('chooseCityFn',value.n)
        }
    }
}
</script>
<style lang="less">
@import '../assets/css/MHeader.css';
@r: 100rem;
.XHeader {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 170/@r;
}
.vux-header .vux-header-left span:nth-of-type(1){
    margin-left:0.4rem;
}
.vux-header .vux-header-title>span{
    margin-left:0.2rem;
}
.indexWrap {
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 1.7rem;
    bottom: 1.8rem;
    width: 100%;
}

.v-spinner {
    position: absolute!important;
    left: 50%;
    top: 50%;
    z-index: 10;
    margin-top:-25/@r;
    margin-left: -100/@r;
}

.hotCity {
    overflow: hidden;
    padding-left: 0.9rem;
}

.allCity {
    padding-left: 0.9rem;
}

.hotCity li,
.allCity li {
    float: left;
    width: 25%;
    text-align: left;
    font-size: 0.6rem;
    height: 1.4rem;
    line-height: 1.4rem;
}

.zimu,
.hotC {
    height: 1rem;
    color: #777777;
    background: #ebebeb;
    text-indent: 90/@r;
    font-size: 0.7rem;
    line-height: 1rem;
}
</style>