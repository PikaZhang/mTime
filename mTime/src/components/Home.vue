<template>
  <div class="index">
    <m-tab class="mTab" v-model='$store.state.isShow'></m-tab>

    <div class="listWrap" ref="listWrap">
      <!-- content goes here -->
      <div class="homeWrap">
        <ul class="hotList" v-show="$store.state.isShow">
          <li v-for="hotList in $store.state.hotLists" @click="$router.push({name:'Detail', params:{id:hotList.id}})">
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

        <div v-show="showSoon">
          <section>
            <div class="commonSoon">
              <h2>最受关注</h2>
              <span>({{$store.state.soonLists.attention.length}})</span>
            </div>
            <div class="commonSoonWrapper" ref="wrapper">
              <div class="box1">
                <div class="box1-item" v-for="attention,index in $store. state.soonLists.attention" v-if="index<=10" @click="$router.push({name:'Detail', params:{id:attention.id}})">
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
            </div>
          </section>
          <section>
            <div class="commonSoon">
              <h2>即将上映</h2>
              <span>({{$store.state.soonLists.moviecomings.length}})</span>
            </div>
            <div class="comingWrap">
              <p class="timeTitle">9月</p>
              <ul class="comingList">
                <li v-for="moviecoming in $store.state.soonLists.moviecomings" v-if="moviecoming.rMonth==9">
                  <span>{{moviecoming.rDay}}日</span>
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

          </section>

        </div>
      </div>
      <div class="con"></div>
    </div>
  </div>
</template>

<script>
import format from '@/filters/format.js'
import MTab from '@/components/MTab.vue'
import BScroll from 'better-scroll'
export default {
  data() {
    return {

    }
  },
  components: {
    MTab
  },
  methods: {
    showSoon() {
      this.$store.state.isShow = false;
    },
    // showHot(){
    //    this.$store.state.isShow = true;
    // }
  },
  filters: {
    format
  },
  mounted() {

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

    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollX: true,
      })
    });
    this.$nextTick(() => {
      this.listWrap = new BScroll(this.$refs.listWrap, {
        scrollY: true,
      })
    });

  }
}
</script>
<style lang="less" scoped>
@r: 100rem;
.listWrap {
  height: 2000/@r;
  overflow: hidden;
}

.commonSoonWrapper {
  // overflow: hidden;
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
  //   overflow: hidden;
}

.commonContent {
  float: left;
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
</style>

<style >
.vux-tab {
  background-color: #1c2635!important;
  height: 1.5rem!important;
}

.index {
  margin-bottom: 10rem;
  height: 100%;
}

.mTab {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%
}












/* 正在热映 */

.hotList {}

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
  margin-left: 0.24rem;
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

.listWrap {
  margin-top: 1.5rem;

  overflow: hidden;
}

.con {
  height: 5rem;
}













/* .v-container{
  margin-bottom:4rem;
} */
</style>
