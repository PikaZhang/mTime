<template>
    <div class="my">
        <h1>欢迎回来</h1>

        <p>{{name}}</p>
        <p>我的收藏</p>
        <ul>
            <li v-for="collect in collection">{{collect}}</li>
        </ul>
        <button @click="loginOut">退出登入</button>

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
        this.name = window.sessionStorage.getItem(this.$store.state.nameVal)
        this.$store.commit('bottomNavFn', 'login')
        if (window.sessionStorage.getItem(this.$store.state.nickname)) {
            this.collection = window.sessionStorage.getItem(this.$store.state.nickname).split(',')
        }

    },
    methods: {
        loginOut() {
            this.$store.commit('loginFn', false)
            window.localStorage.setItem('loginStatus', false)
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
</style>


