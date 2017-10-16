<template>
  <div id="detail">
    <pacman-loader :loading="loading"></pacman-loader>

    <div class="fixedBuyWrap" v-show="!isFix" ref="fixBuy">
      <div class="fixBuy fixedBuy">
        <span>查讯息/购票</span>
      </div>
    </div>
    <div v-if="!loading">
      <div class="detailwrap" ref="detailwrap">
        <div ref="dataHeight">
          <header>
            <!-- 返回 -->
            <a href="javascript:;" @click="back" class="back">
              <span></span>
            </a>

            <a href="javascript:;" class="share">
              <span></span>
            </a>
            <!-- 星星 -->
            <a href="javascript:;" class="collection" @click="star">
              <div v-if="loginStatus()">
                <span v-show='isStar'></span>
                <span v-show='!isStar'></span>
              </div>
              <div v-else>
                <span @click="open" label="dialog"></span>

              </div>
            </a>
            <!-- dialog组件 -->
            <mu-dialog :open="dialog" title="请先登入！！！" @close="close">
              <mu-flat-button slot="actions" @click="close" primary label="取消" />
              <mu-flat-button slot="actions" primary @click="close" label="确定" />
            </mu-dialog>
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
                <p class="onTime" v-if="details.release.date">{{details.release.date|formatDate('y年m月d日')}}{{details.release.location}}上映</p>
                <p class="button">
                  <span>我想看</span>
                  <span>我要评分</span>
                </p>
              </div>

            </div>
            <p class="describe" v-if="details.commonSpecial">
              <span></span>{{details.commonSpecial}}</p>
            <div class="fixBuy" ref="fixBuy">
              <span>查讯息/购票</span>
            </div>

          </div>
          <p class="line"></p>
          <div class="comment">
            <div v-if="showCon" class="commentFalse">
              <p> {{details.content|strLength}}</p>

              <span @click="showContent"></span>
            </div>
            <div v-if="!showCon" class="commentTrue">
              <p> {{details.content}}</p>

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
          <div class=" commenWrap greatComment" v-if="commentPlus.totalCount>0">
            <header>
              <h3>精彩影评({{commentPlus.totalCount}})</h3>
              <span></span>
            </header>

            <h4>{{commentPlus.comments[0].title}}</h4>
            <p>{{commentPlus.comments[0].content|strLength }}</p>
            <div class="commentUser">
              <img :src="commentPlus.comments[0].headurl">
              <div class="commentUserContent">
                <h5>{{commentPlus.comments[0].nickname}}</h5>
                <p>{{(commentPlus.comments[0].modifyTime - 3600 * 8)*1000|formatSoon('y-m-d H:i:s')}}</p>
              </div>
            </div>
          </div>
          <p class="line"></p>
          <div class=" commenWrap miniComment">
            <header>
              <h3>网友影评({{commentMini.totalCount}})</h3>
            </header>

            <ul class="commentUser " id="miniContent">
              <li v-for="mini in commentMini.cts">
                <img :src="mini.caimg">
                <div class="commentUserContent">
                  <div class="header">
                    <h5>{{mini.ca}}</h5>
                    <p>{{(mini.cd - 3600 * 8)*1000|formatSoon('y-m-d H:i:s')}}
                      <span v-if="mini.cr !=0">-评</span>
                      <span v-if="mini.cr !=0">{{mini.cr|format}}</span>
                    </p>
                  </div>

                  <p>{{mini.ce|strLength }}</p>
                  <p class="reply">
                    <i></i>
                    <span>回复</span>
                    <i></i>
                    <span>{{mini.commentCount|praise}}</span>
                  </p>
                </div>
              </li>
            </ul>

          </div>
          <clip-loader :loading="pullupLoading" class="clipLoad"></clip-loader>
          <div class="loading-wrapper" ref="loading">

          </div>

          <div class="con"></div>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
import PacmanLoader from 'vue-spinner/src/PacmanLoader.vue'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import formatSoon from '@/filters/formatSoon.js'
import formatDate from '@/filters/formatDate.js'
import strLength from '@/filters/strLength.js'
import format from '@/filters/format.js'
import praise from '@/filters/praise.js'
import BScroll from 'better-scroll'
import { mapState } from 'vuex'
import Scroll from '@/components/Scroll.vue'

export default {
  data() {
    return {
      showCon: true,
      pageCount: 1,
      pullupLoading: false,
      isStar: true,
      isFix: true,
      dialog: false
    }
  },
  mounted() {
  
    let detailObj = {};
    let id = this.$route.params.id
    detailObj.id = this.$route.params.id;
    detailObj.cityId = this.$store.state.chooseCityId
    let fixBuy = this.$refs.fixBuy
    let fixBuyHeihgt = fixBuy.getBoundingClientRect().top
    this.$store.commit('loadingFn', true);
    this.$store.commit('bottomNavFn', "hot")
    this.$store.dispatch('getDetails', detailObj).then(() => {
      setTimeout(() => {
        this.$store.commit('loadingFn', false);
      }, 1000)
      setTimeout(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.detailwrap, {
            click: true,
            probeType: 3
          })
          this.scroll.on('scroll', () => {
            if (this.scroll.y < -fixBuyHeihgt) {

              this.isFix = false;
            } else {
              this.isFix = true;
            }
          })
          this.scroll.on('scrollEnd', () => {
            // 滚动到底部

            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.pullupLoading = true
              this.$refs.loading.innerText = ''
              setTimeout(() => {
                this.pageCount++;
                fetch('/api/Showtime/HotMovieComments.api?pageIndex=' + this.pageCount + '&movieId=' + id)
                  .then(response => {
                    return response.json();
                  })
                  .then(result => {
                    let data = result.data.cts
                    if (data == '') {
                      this.pullupLoading = false
                      this.$refs.loading.innerText = "没有更多数据了"
                    } else {
                      this.$store.state.commentMini.cts = this.$store.state.commentMini.cts.concat(data)
                      this.pullupLoading = false

                    }

                    //等DOM渲染完成再重新计算高度
                    setTimeout(() => {
                      this.scroll.refresh()
                    }, 200)
                  });
              }, 500)
            }

          })


        }
      }, 1000)
    })
    this.$store.dispatch('getCommentsPlus', id)
    this.$store.dispatch('getCommentsMini', id)

  },
  filters: {
    formatDate,
    strLength,
    praise,
    formatSoon,
    format
  },

  methods: {
    showContent() {
      this.showCon = false;
    },
    showContent2() {
      this.showCon = true;
    },
    back() {
      this.$router.go(-1);
    },
    star() {
      let collection = [];

      if (window.sessionStorage.getItem('loginStatus') == "true") {
        if (this.isStar) {
          this.$store.commit('collectFn', this.$store.state.details.titleCn)
          var arr = this.$store.state.collection
          //去除重复名字
          for (var i = 0; i < arr.length; i++) {
            for (var j = i + 1; j < arr.length; j++) {
              if (arr[i] == arr[j]) {
                arr.splice(j, 1);
              }
            }
          }
          window.sessionStorage.setItem(this.$store.state.nickname, arr)
        } else {

        }
        this.isStar = !this.isStar


      } else {

      }
    },
    loginStatus() {
      return window.sessionStorage.getItem('loginStatus') == "true"
    },
    open() {
      this.dialog = true
    },
    close() {
      this.dialog = false
    }
  },
  computed: mapState([
    'details',
    'commentPlus',
    'commentMini',
    'loading'
  ]),
  components: {
    PacmanLoader,
    Scroll,
    ClipLoader
  }
}
</script>

<style lang="less">
@import '../assets/css/detail.less';
</style>
