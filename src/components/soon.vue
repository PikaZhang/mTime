<template>
    <div>
        <pacman-loader :loading="loading"></pacman-loader>
        <div v-if="!loading">
            <scroll class="listWrap">
                <section>
                    <div class="commonSoon">
                        <h2>最受关注</h2>
                        <span>({{soonLists.attention.length}})</span>
                    </div>
                    <scroll class="commonSoonWrapper" :scrollX="scrollX">
                        <div class="box1" ref="box1">
                            <div class="box1-item" v-for="attention,index in soonLists.attention" v-if="index<=10" @click="$router.push({name:'Detail', params:{id:attention.id}})" ref="boxItem">
                                <img :src="attention.image">
                                <div class="commonContent">
                                    <h3>{{attention.title}}</h3>
                                    <p>
                                        <span>{{attention.wantedCount}}</span>人想看-{{attention.type}}</p>
                                    <p>导演：{{attention.director}}</p>
                                    <p>演员：{{attention.actor1}},{{attention.actor2}}</p>
                                    <p class="commonButton">
                                        <span class="isTicket" v-if="attention.isTicket">超前预售</span>
                                        <span class="isVideo" v-if="attention.isVideo">预告片</span>
                                    </p>

                                </div>
                                <span class="data">{{attention.rMonth}}月{{attention.rDay}}日</span>
                            </div>
                        </div>
                    </scroll>
                    <div class="commonSoon">
                        <h2>即将上映</h2>
                        <span>({{soonLists.moviecomings.length}})</span>
                    </div>
                    <div class="comingWrap">
                        <div>
                            <!-- <p class="timeTitle"></p> -->
                            <ul class="comingList">
                                <li v-for="moviecoming in soonLists.moviecomings"  @click="$router.push({name:'Detail', params:{id:moviecoming.id}})">
                                    <!-- <span>{{moviecoming.rMonth}}.{{moviecoming.rDay}}</span> -->
                                    <img :src="moviecoming.image">
                                    <div class="commonContent">
                                        <h3>{{moviecoming.title}}</h3>
                                        <p>
                                            <span>{{moviecoming.wantedCount}}</span>人想看-{{moviecoming.type}}</p>
                                        <p>导演：{{moviecoming.director}}</p>
                                        <p class="commonButton">
                                            <span class="isTicket" v-if="moviecoming.isTicket">超前预售</span>
                                            <span class="isVideo" v-if="moviecoming.isVideo">预告片</span>
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="con"></div>
                </section>
            </scroll>
        </div>
    </div>
</template>
<script>
import PacmanLoader from 'vue-spinner/src/PacmanLoader.vue'
import BScroll from 'better-scroll'
import { mapState } from 'vuex'
import Scroll from '@/components/Scroll.vue'
export default {
    data() {
        return {
            scrollX: true,
            month: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        }
    },
    created() {
        this.$store.commit('hotFn', false);
        this.$store.commit('bottomNavFn', "hot")
        this.$store.commit('loadingFn', true)

    },
    mounted() {
        let cityId = this.$store.state.chooseCityId

        this.$store.dispatch('getSoonList', cityId).then(() => {

            setTimeout(() => {
                this.$store.commit('loadingFn', false)

            }, 1000)
            setTimeout(() => {
                let box1 = this.$refs.box1;
                box1.style.width = (this.$refs.boxItem[0].getBoundingClientRect().width +this.$refs.boxItem[0].getBoundingClientRect().left ) * this.$refs.boxItem.length + "px";
            }, 1000)

        });


    },
    components: {
        PacmanLoader,
        Scroll
    },
    computed: mapState([
        'soonLists',
        'loading'
    ])
}
</script>
<style  lang="less" scoped>
@r: 100rem;
.listWrap {
    position: absolute;
    overflow: hidden;
    top: 1.5rem;
    width: 100%;
    left: 0;
    bottom: 2rem;
}

.box1 {
    height: 600/@r;
    position: relative;
    width: 11500/@r;
}

.indexWrap {
    height: 1800/@r;
    overflow: hidden;
}

.box1-item {
    width: 1090/@r;
    height: 570/@r;
    background-color: #fff;
    float: left;
    border-top: 1px solid #bbb;
    border-right: 1px solid #bbb;
    margin: 0 0 0 58/@r;
    padding-top: 58/@r;
    position: relative;
}


.box1-item img {
    float: left;
    width: 320/@r;
    height: 500/@r;
    border: 1px solid #000;
    margin: 0 60/@r 0 0;
}

.commonSoon {
    height: 203/@r;
    margin-left: 58/@r;
}

.commonSoon h2,
.commonSoon span {
    float: left;
    font-size: 74/@r;
    font-weight: bold;
    line-height: 160/@r;
}

.commonSoon span {
    color: #999;
    margin-left: 20/@r;
}

.commonSoonWrapper {
    width: 100%;
}

.commonContent {
    float: left;
    width:6.8rem;
}

.commonContent h3 {
    font-size: 60/@r;
    font-weight: bold;
    line-height: 1;
    height: 80/@r;
    width: 660/@r;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.commonContent p {
    font-size: 42/@r;
    color: #000;
    margin-top: 35/@r
}

.commonContent p:nth-of-type(1) span {
    // margin-top:60/@r;
    color: #ff8600;
    display: inline-block;
    font-size: 42/@r;
}

.commonContent .commonButton span {
    float: left;
    width: 314/@r;
    line-height: 106/@r;
    text-align: center;
    border-radius: 120/@r;
}

.commonContent .commonButton .isTicket {
    background: #ff8600;
    color: #fff;
    border: 1px solid #ff8600;
}

.commonContent .commonButton .isVideo {
    background: #fff;
    color: #659c0d;
    border: 1px solid #659c0d;
    margin-left: 30/@r;
}

.data {
    width: 220/@r;
    font-size: 50/@r;
    position: absolute;
    background: #fff;
    height: 50/@r;
    left: 0;
    top: -30/@r;
}

.timeTitle {
    font-size: 44/@r;
    height: 100/@r;
    color: #000
}

.comingList img {
    width: 246/@r;
    height: 400/@r;
    border: 1px solid #ccc;
    float: left;
    margin: 0 60/@r 0 22/@r;
}

.comingWrap {
    margin-left: 58/@r;
}

.comingList li {
    overflow: hidden;
    border-top: 1px solid #d8d8d8;
    padding: 58/@r 0;
}

.comingList li>span {
    float: left;
    font-size: 44/@r;
    color: #999;
}

.v-spinner {
    position: absolute!important;
    left: 50%;
    top: 50%;
    z-index: 10;
    margin-top:-25/@r;
    margin-left: -100/@r;
}

.con {
    height: 1rem;
}
</style>

