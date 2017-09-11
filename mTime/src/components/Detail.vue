<template>
  <div id="detail">
       <scroller  :on-infinite="infinite" >
         <div class="detailwrap">
      <header>
        <a href="javascript:;" @click="back" class="back">
          <span></span>
        </a>
        <a href="" class="collection">
          <span></span>
        </a>
        <a href="" class="share">
          <span></span>
        </a>
      </header>
      <div class="detailBg">
        <span :style="{backgroundImage:'url('+details.image+')'}"></span>
        <span :style="{backgroundImage:'url('+details.image+')'}"></span>
      </div>
      <div class="wrap">
        <div class="content">
          <div class="img">
            <img :src="details.image">
          </div>

          <div class="text">
            <h3>{{details.titleCn}}</h3>
            <p class="subTitle">{{details.titleEn}}</p>
            <p class="time">{{details.runTime}}</p>
            <p class="type">
              <strong v-for="type in details.type">{{type}}</strong>
            </p>
            <p class="onTime">{{details.release.date|formatDate('y年m月d日')}}{{details.release.location}}上映</p>
            <p class="button">
              <span>我想看</span>
              <span>我要评分</span>
            </p>
          </div>

        </div>
        <p class="describe">
          <span></span>{{details.commonSpecial}}</p>
        <div class="fixBuy">
          <span>查讯息/购票</span>
        </div>

      </div>
      <p class="line"></p>
      <div class="comment">
        <div v-if="show" class="commentFalse">
          <p> {{details.content|strLength}}</p>
        
          <span @click="showContent"></span>
        </div>
        <div v-if="!show" class="commentTrue">
          <p>   {{details.content}}</p>
       
          <span @click="showContent2"></span>
        </div>

      </div>
      <p class="line"></p>
      <p class="line"></p>
      <div class="actorWrap commenWrap">
        <header>
          <h3>{{details.personCount}}位演职员</h3>
          <span></span>
        </header>
        <div class="actorContent ">
          <div class="director">
            <span>导演</span>
            <a href="#">
              <img :src="details.director.directorImg">
              <h4>{{details.director.directorName}}</h4>
              <p>{{details.director.directorNameEn}}</p>
            </a>
          </div>
          <div class="actors">
            <h4>主要演员</h4>
            <div class="main">
              <ul>
                <li v-for="actor in details.actorList">
                  <img :src="actor.actorImg" class="actorImg">
                  <h3>{{actor.actor}}</h3>
                  <p>{{actor.actorEn}}</p>
                  <img :src="actor.roleImg" class='roleImg'>
                  <p>饰:{{actor.roleName}}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <p class="line"></p>
      <div class="imageWrap commenWrap">
        <header>
          <h3>{{details.imageCount}}张图片</h3>
          <span></span>
        </header>
        <ul class="imageList">
          <li v-for="image in details.images">
            <img :src="image">
          </li>
        </ul>
      </div>
      <p class="line"></p>
      <div class=" commenWrap greatComment">
        <header>
          <h3>精彩影评({{comment.total}})</h3>
          <span></span>
        </header>
        <h4>{{comment.list.title}}</h4>
        <p>{{comment.list.content|strLength }}</p>
        <div class="commentUser">
          <img :src="comment.list.headImg">
          <div class="commentUserContent">
            <h5>{{comment.list.nickname}}</h5>
            <p>{{(comment.list.commentDate- 3600 * 8)*1000|formatDate('y-m-d H:i:s')}}</p>
          </div>
        </div>
      </div>
      <p class="line"></p>
      </div>
    </scroller>
  </div>
</template>
<script>
import formatDate from '@/filters/formatDate.js'
import strLength from '@/filters/strLength.js'
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      details: {
        release: '',
        content: '',
        director: '',
        actorList: '',
      },
      comment: {
        list: ''
      },
      show: true
    }
  },
  mounted() {
    fetch('/api/movie/detail.api?locationId=292?&movieId=' + this.$route.params.id)
      .then(response => {
        return response.json();
      })
      .then(result => {
        this.details = result
        this.details.release = result.release
        this.details.content = result.content
        this.details.director = result.director
        this.details.actorList = result.actorList
      });
    fetch('/plus/movie/hotComment.api?movieId=' + this.$route.params.id)
      .then(response => {
        return response.json();
      })
      .then(result => {
        this.comment = result.data.plus;
        this.comment.list = result.data.plus.list[0]

      });

  },
  filters: {
    formatDate,
    strLength
  },
  methods: {
    showContent() {
      this.show = false;
    },
    showContent2() {
      this.show = true;
    },
      
      infinite(){},
      back(){
        this.$router.go(-1);
      }
  }
}
</script>

<style lang="less" scoped>
@r: 100rem;
#detail {
  font-family: '微软雅黑';
}
.detailwrap {
  position: relative;
}
#detail header {
  overflow: hidden;
  position: relative;
  z-index: 2;
}

#detail header a {
  float: left;
}

#detail .back span {
  background: url('../assets/img/h_btn_back.png') no-repeat center center;
  float: left;
  width: 150/@r;
  height: 150/@r;
  background-size: auto 80/@r;
}

#detail header a:nth-of-type(2),
#detail header a:nth-of-type(3) {
  float: right;
}

#detail .collection span {
  background: url('../assets/img/i_h_collection.png') no-repeat center center;
  float: left;
  width: 150/@r;
  height: 150/@r;
  background-size: auto 80/@r;
}

#detail .share span {
  background: url('../assets/img/i_h_share.png') no-repeat center center;
  float: left;
  width: 150/@r;
  height: 150/@r;
  background-size: auto 80/@r;
}

#detail .detailBg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 400/@r;
  overflow: hidden;
}

#detail .detailBg span:nth-of-type(1) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: 100% auto;
  filter: blur(10px);
  z-index: 1;
}

#detail .detailBg span:nth-of-type(2) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: 100% auto;
  filter: blur(5px);
  z-index: 0;
  transform: scale(1.2)
}

#detail .content {
  overflow: hidden;
}

#detail .img {
  float: left;
}

#detail .img img {
  width: 407/@r;
  height: 612/@r;
  border: 8/@r solid #fff;
}

#detail .wrap {
  padding: 0 58/@r;
  position: relative;
  z-index: 2; // background:#fff;
}

#detail .text {
  float: left;
  margin-left: 40/@r;
  width: 666/@r;
}

#detail .text h3 {
  margin-top: 40/@r;
  color: #fff;
  font-size: 64/@r;
  line-height: 1;
  text-overflow: ellipsis;
  overflow: hidden;
}

#detail .text .subTitle {
  color: #fff;
  margin-top: 30/@r;
  font-size: 40/@r;
  line-height: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

#detail .text .time {
  margin-top: 100/@r;
  font-size: 50/@r;
  font-weight: bold;
  line-height: 1;
}

#detail .text .type {
  margin-top: 30/@r;
  font-size: 50/@r;
  font-weight: bold;
  line-height: 1;
}

#detail .text .onTime {
  margin-top: 30/@r;
  font-size: 50/@r;
  font-weight: bold;
  line-height: 1;
}

#detail .button {
  margin-top: 30/@r;
}

#detail .button span {
  display: inline-block;
  font-size: 50/@r;
  line-height: 128/@r;
  width: 310/@r;
  text-align: center;
  border: 1px solid #999;
  border-radius: 67/@r;
  margin-right: 15/@r;
}

#detail .describe {
  color: #ff8600;
  text-align: center;
  margin-top: 35/@r;
  font-size: 48/@r;
}

#detail .describe span {
  display: inline-block;
  width: 50/@r;
  height: 48/@r;
  background: url('../assets/img/i_dot.png');
  background-size: 100% 100%;
  margin-right: 2px;
}

#detail .fixBuy {
  width: 100%;
  height: 160/@r;
  background: #ff8600;
  text-align: center;
  margin: 58/@r 0 108/@r;
  border-radius: 70/@r;
}

#detail .fixBuy span {
  display: block;
  font-size: 60/@r;
  line-height: 160/@r;
  color: #fff;
}

#detail .line {
  height: 48/@r;
  background: #f6f6f6;
}

#detail .comment {
  // height: 340/@r;
  padding: 42/@r 58/@r 0;
  
  
}
#detail .comment p{
  font-size: 54/@r;
  line-height: 80/@r;
}
#detail .commentFalse span {
  display: block;
  width: 100%;
  height: 120/@r;
  background: url('../assets/img/i-tmore.png') no-repeat center center;
  background-size: 70/@r 30/@r;
}

#detail .commentTrue span {
  display: block;
  width: 100%;
  height: 120/@r;
  background: url('../assets/img/i-tmore1.png') no-repeat center center;
  background-size: 70/@r 30/@r;
}

#detail .line:nth-of-type(3) {
  margin-top: 20/@r;
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

.actorContent {
  padding-bottom: 20/@r;
  overflow: hidden;
}

.actorContent .director {
  float: left;
  width: 365/@r;
  padding: 0 33/@r 0 0; // border-right:2px solid #d8d8d8; 
}

.actorContent .director span,
.actors h4 {
  display: block;
  font-size: 48/@r;
  height: 66/@r;
}

.actorContent .director img {
  width: 332/@r;
  height: 441/@r;
}

.actorContent .director h4 {
  margin-top: 94/@r;
  font-size: 46/@r;
  line-height: 1;
  color: #000;
  padding-left: 8/@r;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.actorContent .director p {
  text-align: center;
  width: 230/@r;
}

.actorContent .director p,
.actors p:nth-of-type(1) {
  margin-top: 20/@r;
  font-size: 36/@r;
  line-height: 44/@r;
  color: #000;
  padding-left: 8/@r;
}

.actors {
  float: left;
  width: 761/@r;
  padding-left: 35/@r;
  border-left: 1px solid #d8d8d8;
}

.actors ul {
  overflow: hidden;
}

.actors ul li {
  float: left;
  width: 332/@r;
  text-align: center;
}

.actors ul li:nth-of-type(1) {
  margin-right: 58/@r;
}

.actors .actorImg {
  width: 332/@r;
  height: 332/@r;
}

.actors ul h3 {
  margin-top: 32/@r;
  font-size: 46/@r;
  line-height: 1;
  color: #000;
  width: 100%;
  float: none;
}

.actors p:nth-of-type(1) {
  margin-top: 40/@r;
  height: 90/@r;
}

.actors .roleImg {
  width: 156/@r;
  height: 156/@r;
  border-radius: 50%;
  margin: 30/@r 0;
}

.actors p:nth-of-type(2) {
  height: 100/@r;
  font-size:40/@r;
}

.imageWrap {
  padding-bottom: 110/@r;
}

.imageList {
  overflow: hidden;
}

.imageList li {
  padding: 0 12/@r;
  float: left;
}

.imageList li img {
  width: 250/@r;
  height: 250/@r;
  border: 1px solid #ccc;
}

.greatComment h4 {
  font-size: 58/@r;
  line-height: 1;
  font-weight: bold;
}

.greatComment>p {
  margin-top: 40/@r;
  font-size: 55/@r;
  line-height: 80/@r;
}

.commentUser {
  overflow: hidden;
  margin: 40/@r 0;
}

.commentUser img {
  float: left;
  width: 155/@r;
  height: 155/@r;
  border: 1px solid #ccc;
  border-radius: 50%;
}

.commentUser .commentUserContent {
  float: left;
  margin-left: 50/@r;
  color: #777;
}

.commentUser .commentUserContent h5,
.commentUser .commentUserContent p {
  font-size: 50/@r;
}

.commentUser .commentUserContent h5 {
  margin-top: 30/@r;
}

.commentUser .commentUserContent p {
  margin-top: 10/@r;
}
</style>
