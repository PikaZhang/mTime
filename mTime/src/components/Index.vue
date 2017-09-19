<template>
    <div id="index">
        <m-header class="MHeader"></m-header>
        <pacman-loader :loading="loading"></pacman-loader>
        <div v-if="!loading">
            <scroll class="indexWrap">
                <section class="section">
                    <swiper loop auto class="swiper" height="6rem">
                        <swiper-item v-for="now,index in nowMovie" v-if="index<=4">
                            <img :src="now.img" @click="$router.push({name:'Detail', params:{id:now.movieId}})">
                        </swiper-item>
                    </swiper>
                    <div class=" commenWrap">
                        <header @click="hotList">
                            <h3>正在热映({{nowMovie.totalHotMovie}})</h3>
                            <span></span>
                        </header>
                        <scroll class="wrapper" :scrollX="scrollX" :scrollY="false">
                            <div class="box1">
                                <div class="box1-item" v-for="hotList,index in hotLists.ms" v-if="index<=10">
                                    <img :src="hotList.img" @click="$router.push({name:'Detail', params:{id:hotList.id}})">
                                </div>
                            </div>
                        </scroll>
                    </div>
                    <div class=" commenWrap">
                        <header @click="soonList">
                            <h3>即将上映({{$store. state.hotLists.totalComingMovie}})</h3>
                            <span></span>
                        </header>
                        <scroll class="wrapper" :scrollX="scrollX" :scrollY="false">
                            <div class="box1">
                                <div class="box1-item" v-for="soonList,index in soonLists.moviecomings" v-if="index<=10">
                                    <img :src="soonList.image" @click="$router.push({name:'Detail', params:{id:soonList.id}})">
                                </div>
                            </div>
                        </scroll>
                    </div>
                </section>
            </scroll>
        </div>
    </div>
</template>
<script>
import MHeader from '@/components/MHeader.vue'
import PacmanLoader from 'vue-spinner/src/PacmanLoader.vue'
import BScroll from 'better-scroll'
import Scroll from '@/components/Scroll.vue'
import { Swiper, SwiperItem } from 'vux'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            scrollX: true
        }
    },
    components: {
        MHeader,
        Swiper,
        SwiperItem,
        PacmanLoader,
        Scroll

    },
    created() {
        this.$store.commit('loadingFn', true);
       
    },
    mounted() {

        this.$store.commit('bottomNavFn', "index")
        this.$store.dispatch('getHotList').then(() => {

        })
        this.$store.dispatch('getSoonList').then(() => {
        })
        this.$store.dispatch('getPagesubArea').then(() => {
            setTimeout(() => {
                this.$store.commit('loadingFn', false);
            }, 1000)

        })



    },
    methods: {
        hotList() {
            this.$store.commit('hotFn', true)
            this.$router.push({ name: 'Hot' });
        },
        soonList() {
            this.$store.commit('hotFn', false)
            this.$router.push({ name: 'Soon' });

        }
    },
    computed: mapState([
        'hotLists',
        'soonLists',
        'nowMovie',
        'loading'
    ])

}
</script>

<<style lang="less" scoped>
    @r: 100rem;
    .MHeader {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height:170/@r;
    }
     #index{
        margin-top:170/@r;
        // margin-bottom:240/@r;
    }
     .swiper{
         height:600/@r;
     }
    .swiper img{
        width:100%;
        // height:600/@r;
    }
    .commenWrap {
  padding: 0 58/@r;
}

.commenWrap header {
  height: 206/@r;
}

.commenWrap h3 {
  float: left;
  font-size: 64/@r;
  line-height: 186/@r;
  font-weight: bold;
}

.commenWrap header span {
  float: right;
  background: url('../assets/img/i-tmore-right.png') no-repeat center center;
  width: 50/@r;
  height: 54/@r;
  background-size: 90/@r 54/@r;
  margin: 80/@r 30/@r 0 0;
}
.wrapper{
    overflow:hidden;
}
.box1 {
  height: 500/@r;
  position: relative;
    width:3470/@r;
   
}
.indexWrap {
  
    overflow:hidden;
    position:absolute;
    left:0;
    top:1.7rem;
    bottom:2.0rem;
    width:100%;
}
.box1-item {
  width: 300/@r;
  height: 500/@r;
  background-color: #ccc;
  display:inline-block;
  margin-left: 15/@r;
  float: left;
  text-align: center;
  line-height: 100/@r;
}
.box1-item:first-child {
  margin-left: 0;
}
.box1-item img{
    width: 300/@r;
    height: 500/@r;
}
.v-spinner {
  position: absolute;
  left: 530/@r;
  top: 900/@r;
  z-index: 10;
}
</style>

