<template>
    <div id="login">
        <clip-loader :loading="loading"></clip-loader>
        <div class="userInfo">
            <mu-text-field label="用户名" hintText="请输入用户名/手机" type="text" @input="username" />
            <mu-text-field label="密码" hintText="请输入密码" type="password" @input="password" />
        </div>
        <x-button type="primary" style="border-radius:99px;" @touchstart.native="loginItem">登录</x-button>
        <p class="freeBtns">
            <router-link class="free" :to="{name: 'Register'}">免费注册</router-link>
        </p>
        <toast v-model="isShow" type="text" :time="800" width="200px" is-show-mask :text="texts" :position="position">
        </toast>
    </div>
</template>

<script>
import {
    XHeader,
    XButton,
    Toast
} from 'vux';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import {
    mapState
} from 'vuex'
export default {
    name: 'person',
    data() {
        return {
            str: '',
            usernameVal: '',
            passwordVal: '',
            isShow: false,
            texts: '',
            position: 'default',
        }
    },
    methods: {
        username(value) {
            this.usernameVal = value;
        },
        password(value) {
            this.passwordVal = value;
        },
        /*
         * 判断localStorage中的存的用户名密码和当前登录页面的用户名密码是否一致，一致就返回true
         * 否则就是false
         * */
        loginCeItem() {
            var storage = window.sessionStorage;
            for (var i = 0; i < storage.length; i++) {
                if (this.usernameVal == storage.key(i) && this.passwordVal == storage.getItem(this.usernameVal)) {
                    return true;
                }
            }
            return false;
        },
        loginItem() {
            // console.log(this.loginCeItem());
            if (this.loginCeItem()) {
                this.isShow = true;
                this.texts = '登录成功'
                this.$store.commit('loadingFn', true)
                this.$store.commit('loginFn', true)
                window.sessionStorage.setItem('loginStatus',true)
                //                    this.$store.dispatch('setIsLogin',{
                //                        username:this.usernameVal
                //                    });
                setTimeout(() => {
                    this.isShow = false;
                    this.$store.commit('loadingFn', false)
                    // this.$store.commit('loginFn',window.sessionStorage.getItem('loginStatus'))
                    this.$router.push({
                        path: '/'
                    });
                }, 1200);
            } else {
                this.isShow = true;
                this.texts = '登录失败',
                    setTimeout(() => {
                        this.isShow = false;

                    }, 1000);
            }
        },

    },
    mounted() {
        this.$store.commit('bottomNavFn', 'login')
        this.str = window.location.href; //获取刷新后的地址栏中的字符串
        if (this.str.includes('person')) {
            this.$store.commit('updateHearders');
        }
    },
    components: {
        XHeader,
        XButton,
        Toast,
        ClipLoader
    },
    computed: mapState([
        'loading'
    ])
}
</script>




<style lang="less" scoped>
@r: 100rem;
#login {
    height: 100%;
    background: #fff;
    padding-bottom: 305px;
    padding-top: 200/@r;
}

#login .logo {
    width: 80px;
    height: 30px;
    padding-top: 5px;
}

#login .userInfo {
    background: #fff;
    padding: 0 100/@r 80/@r;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
}

#login .focus-state {
    color: #7e57c2;
}

#login .mu-text-field-focus-line {
    background-color: #7e57c2;
}

#login .mu-text-field.has-label {
    text-indent: 5px;
}

#login button.weui-btn {
    margin-top: 30px;
    width: 88%
}

#login .weui-btn_primary {
    background-color: #7e57c2;
}

#login .freeBtns {
    overflow: hidden;
}

#login .free,
#login .find {
    float: left;
    padding: 0 20px;
    color: #7e57c2;
    font-family: '微软雅黑';
    font-size: 60/@r;
    line-height: 80/@r;
    margin-top: 50/@r;
}

#login .find {
    float: right;
    color: #cccccc;
}

.v-spinner {
    position: absolute;
    left: 520/@r;
    top: 1000/@r;
    z-index: 10;
}

.mu-text-field {
    font-size: 70/@r!important;
    width: 1000/@r;
    margin-bottom: 50/@r;
}


.mu-text-field.has-label {
    min-height: 100/@r;
}

.mu-text-field-label {
    line-height: 70/@r!important;
}
</style>
