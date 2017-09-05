import Vue from 'vue'
import Router from 'vue-router'
import Hot from '@/components/Hot.vue'
import Soon from '@/components/soon.vue'
import store from '@/store'
import Detail from '@/components/Detail.vue'


Vue.use(Router)

// export default new Router({
//     routes: [{
//         path: '/',
//         redirect: '/hot'
//     }, {
//         path: '/hot',
//         name: 'hot',
//         component: Hot
//     }, {
//         path: '/soon',
//         name: 'soon',
//         component: Soon
//     }]
// })
const router = new Router({
    routes: [{
        path: '/',
        redirect: '/hot'
    }, {
        path: '/hot',
        name: 'hot',
        component: Hot
    }, {
        path: '/soon',
        name: 'soon',
        component: Soon
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