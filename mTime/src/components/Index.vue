<template>
    <div id="index">
        <m-header class="MHeader"></m-header>
        <div ref="indexWrap" class="indexWrap">
            <section class="section">
                <swiper loop auto class="swiper">
                    <swiper-item v-for="now,index in nowMovie" v-if="index<=4">
                        <img :src="now.img" @click="$router.push({name:'Detail', params:{id:now.movieId}})">
                    </swiper-item>
                </swiper>
                <div class=" commenWrap">
                    <header @click="hotList">
                        <h3>正在热映({{nowMovie.totalHotMovie}})</h3>
                        <span></span>
                    </header>
                    <div class="wrapper" ref="wrapper">
                        <div class="box1">
                            <div class="box1-item" v-for="hotList,index in $store.state.hotLists" v-if="index<=10">
                                <img :src="hotList.img" @click="$router.push({name:'Detail', params:{id:hotList.id}})">
                            </div>
                        </div>
                    </div>
                </div>
                <div class=" commenWrap">
                    <header @click="soonList">
                        <h3>即将上映({{$store. state.hotLists.total}})</h3>
                        <span></span>
                    </header>
                    <div class="wrapper" ref="soonList">
                        <div class="box1">
                            <div class="box1-item" v-for="soonList,index in $store.state.soonLists.moviecomings" v-if="index<=10">
                                <img :src="soonList.image" @click="$router.push({name:'Detail', params:{id:soonList.id}})">
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
import MHeader from '@/components/MHeader.vue'
import BScroll from 'better-scroll'
import { Swiper, SwiperItem } from 'vux'
export default {
    data() {
        return {
            nowMovie: {
                totalHotMovie: ''
            }
        }
    },
    components: {
        MHeader,
        Swiper,
        SwiperItem,

    },
    mounted() {
        this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.wrapper, {
                scrollX: true,
            })
        });
        this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.soonList, {
                scrollX: true,
            })
        })
        this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.indexWrap, {
                scrollY: true,
            })
        })
        fetch('/api/PageSubArea/HotPlayMovies.api?locationId=292')
            .then(response => {
                return response.json();
            })
            .then(result => {
                this.nowMovie = result.movies;
                this.nowMovie.totalHotMovie = result.totalHotMovie
            });
        fetch('/api/Showtime/LocationMovies.api?locationId=292')
            .then(response => {
                return response.json();
            })
            .then(result => {
                this.$store.commit('hotListFn', result);
            })
        fetch('/api/Movie/MovieComingNew.api?locationId=292')
            .then(response => {
                return response.json();
            })
            .then(result => {
                this.$store.commit('soonListFn', result);

            })
    },
    methods: {
        hotList() {
            this.$store.state.isShow = true;
            this.$router.push({ name: 'Home' });
            //  this.$store.dispatch('hot', this.$store.state.isShow)
            //     .then(data => {
            //             this.$store.commit('hotFn', true);
            //     });
        },
        soonList() {
            this.$store.state.isShow = false;
            this.$router.push({ name: 'Home' });
            console.log(this.$store.state.isShow)
        }
    }

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
        padding-top:170/@r;
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
    height:1800/@r;
    overflow:hidden;
    
    
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
</style>

