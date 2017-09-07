import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Index from '@/components/Index.vue'
import Detail from '@/components/Detail.vue'


Vue.use(Router)

const router = new Router({
    routes: [{
        path: '/',
        redirect: '/index'
    }, {
        path: '/index',
        name: 'Index',
        component: Index
    }, {
        path: '/detail/:id',
        name: 'Detail',
        component: Detail
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