import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Home from '@/components/Home.vue'
import Detail from '@/components/Detail.vue'
import Register from '@/components/Register.vue'
import Login from '@/components/Login.vue'
import Index from '@/components/Index.vue'



Vue.use(Router)

const router = new Router({
    routes: [{
        path: '/',
        redirect: '/Index'
    }, {
        path: '/index',
        name: 'Index',
        component: Index
    }, , {
        path: '/home',
        name: 'Home',
        component: Home
    }, {
        path: '/detail/:id',
        name: 'Detail',
        component: Detail
    }, {
        path: '/register',
        name: 'Register',
        component: Register
    }, {
        path: '/login',
        name: 'Login',
        component: Login
    }]
}); //这里可以带有路由器的配置参数




router.beforeEach(function(to, from, next) {
    store.commit('updateLoadingStatus', { isLoading: true })
    next()
})

router.afterEach(function(to) {
    store.commit('updateLoadingStatus', { isLoading: false })
})


export default router