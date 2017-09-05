<template>
  <div id="hot">
    <ul class="hotList">
      <li v-for="hotList in hotLists">
        <router-link :to="{name:'Detail',params:{id:hotList.id}}">
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
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import format from '@/filters/format.js'
export default {
  data() {
    return {
      hotLists: ''
    }
  },
  created() {
    fetch('/api/Showtime/LocationMovies.api?locationId=292')
      .then(response => {
        return response.json();
      })
      .then(result => {
        this.hotLists = result.ms;
      });

  },
  filters: {
    format
  }
}
</script>
<style>
.hotList {}

.hotList li {
  overflow: hidden;
  border-bottom:1px solid #ddd;
  margin-left:0.58rem;
}

.hotList>a {
  display: inline-block;
}

.hotList .hotImg {
  width: 2.47rem;
  height: 3.73rem;
  border: 1px solid #dddddd;
  float: left;
  margin: 0.58rem 0.58rem 0.48rem;
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
</style>
