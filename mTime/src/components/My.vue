<template>
    <div class="my">
        <mu-appbar>
            <div solt='left' class="title">欢迎回来~</div>
            <mu-raised-button slot="right" @click.native="loginOut" label='退出' />
        </mu-appbar>
        <div class="Mywrap">
            <div class="info clearFix">
                <img src="../assets/img/user.jpg">
                <span class="nickname">{{name}}</span>
            </div>

            <p class="collect"><mu-icon value="star" color="yellow"/><span>我的收藏</span></p>
            <ul class="collectList">
                <li v-for="collect in collection">{{collect}}</li>
            </ul>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            name: '',
            collection: ''
        }
    },
    created() {
        this.name = window.sessionStorage.getItem("nickname")
        this.$store.commit('bottomNavFn', 'login')
        if (window.sessionStorage.getItem(this.$store.state.nickname)) {
            this.collection = window.sessionStorage.getItem(this.$store.state.nickname).split(',')
        }

    },
    methods: {
        loginOut() {
            this.$store.commit('loginFn', false)
            window.sessionStorage.setItem('loginStatus', false)
            setTimeout(() => {
                this.$router.push({
                    path: '/login'
                });
            }, 1000)
        }
    }
}
</script>
<style lang="less" scoped>
@r: 100rem;
.my{
      background:#f1f1f1;
      position: absolute;
      top: 0;
      left: 0;
      width:100%;
      bottom:1.8rem;
}
.mu-appbar {
    background: #000;
}

.mu-raised-button {
    width: 1.2rem;
    min-width: 0;
    height: 0.8rem;
    margin-right: 40/@r;
}

.nickname {
     float: left;
    font-size: 1rem;
    color: #d23;
   
    line-height:1.6rem;
    width:6rem;
    text-align: center;
}
.Mywrap{
    margin: 0 0.58rem;
    background:#fff;
    min-height:15rem;
   
}
.my .title {
    font-size: 80/@r;
}
.my .info {
    margin-top:80/@r;
    padding:50/@r;
    border-bottom:1px solid #ccc;
   
}
.my .info img {
    float: left;
    width: 1.6rem;
    height: 1.6rem;
    border: 1px solid #ccc;
    border-radius:50%;
    margin-left:80/@r;
}
.my .mu-icon{
    font-size:1.0rem;
    margin-left:1.2rem;
}
.my .collect{
    height: 1rem; 
    margin:0.3rem 0 0.9rem;
}
.my .collect span{
    display:inline-block;
    font-size: 0.8rem;
    vertical-align:top;
    line-height:1rem;
    margin-left:0.6rem;
}
.my .collectList{
    margin:0 1.2rem;
}
.my .collectList li{
    text-indent:0.6rem;
    // height: 0.8rem;
    margin-top:0.3rem;
    font-size:0.6rem;
    line-height:0.8rem;
    border-bottom:1px solid #ccc;
    padding-bottom:20/@r;
    width:9rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
</style>


