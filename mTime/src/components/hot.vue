<template>
    <div>
        <pacman-loader :loading="loading"></pacman-loader>
        <div v-if="!loading">
            <scroll class="listWrap">
                <div>
                <ul class="hotList">
                    <li v-for="hotList in $store.state.hotLists.ms" @click="$router.push({name:'Detail', params:{id:hotList.id}})">
                        <!-- <router-link  class="Mclick" :to="{name:'Detail',params:{id:hotList.id}}"> -->
                        <img :src=hotList.img class="hotImg">
                        <div class="hotContent">
                            <h3>{{hotList.t}}
                                <span class="score">{{hotList.r|format}}</span>
                            </h3>
                            <p>
                                <span></span>{{hotList.commonSpecial}}</p>
                            <p class="tag">
                                <span v-for='ver in hotList.versions'>{{ver.version}}</span>
                            </p>
                            <p class="movieTotal">
                                <span>{{hotList.cC}}家影院上映{{hotList.NearestShowtimeCount}}场</span>
                                <span class="buy">购票</span>
                            </p>

                        </div>
                        <!-- </router-link> -->
                    </li>
                </ul>
                <div class="con"></div>
                </div>
            </scroll>
        </div>

    </div>
</template>
<script>
import format from '@/filters/format.js'
import BScroll from 'better-scroll'
import { mapState } from 'vuex'
import PacmanLoader from 'vue-spinner/src/PacmanLoader.vue'
import Scroll from '@/components/Scroll.vue'
export default {
    components: {
        PacmanLoader,
        Scroll
    },
    created() {
        this.$store.commit('bottomNavFn', "hot")
        this.$store.commit('loadingFn', true)
        
    },
    mounted() {
        this.$store.dispatch('getHotList').then(() => {
            setTimeout(() => {
                this.$store.commit('loadingFn', false)
            }, 1000)
        })

    },
    filters: {
        format
    },
    computed: mapState([
        "loading"
    ])
}
</script>
<style lang="less" scoped>
@r: 100rem;
.listWrap {
    position: absolute;
    overflow: hidden;
    top: 1.5rem;
    width: 100%;
    left: 0;
    bottom: 2rem;
}

.Mclick {
    display: inline-block;
}

.hotList li {
    overflow: hidden;
    border-bottom: 1px solid #ddd;
    margin-left: 0.58rem;
}

.hotList>a {
    display: inline-block;
}

.hotList .hotImg {
    width: 2.47rem;
    height: 3.73rem;
    border: 1px solid #dddddd;
    float: left;
    margin: 0.58rem 0.58rem 0.48rem 0;
}

.hotContent {
    float: left;
    margin-top: 0.58rem;
}

.hotContent h3 {
    font: bold 0.54rem/1 "宋体";
    color: #000;
}

.hotContent .score {
    display: inline-block;
    font: 0.42rem/0.70rem Arial;
    padding: 0 0.12rem;
    background: #659d0e;
    color: #fff;
    height: 0.7rem;
    margin-left: 0.24rem;
    position: relative;
    top: -0.1rem;
}

.hotContent p:nth-of-type(1) {
    margin-top: 0.36rem;
    font: 0.48rem/1 '宋体';
    color: #659d0e;
}

.hotContent p:nth-of-type(1) span {
    display: inline-block;
    width: 0.4rem;
    height: 0.32rem;
    background: url('../assets/img/hotico1.png');
    background-size: 0.4rem 0.32rem;
    position: relative;
    left: 0;
    top: -0.2rem;
    margin-right: 0.15rem;
}

.tag {
    margin-top: 0.34rem;
}

.tag span {
    display: inline-block;
    font: 0.36rem/0.54rem '宋体';
    border: 1px solid #659d0e;
    border-radius: 2px;
    padding: 0 0.12rem;
    color: #659d0e;
    margin-right: 0.08rem;
}

.movieTotal {
    margin-top: 0.50rem;
}

.v-spinner {
    position: absolute;
    left: 500/@r;
    top: 1100/@r;
    z-index: 10;
}

.con {
    height: 1.5rem;
}
</style>
