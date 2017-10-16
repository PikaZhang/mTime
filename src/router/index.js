import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Home from '@/components/Home.vue'
import Detail from '@/components/Detail.vue'
import Register from '@/components/Register.vue'
import Login from '@/components/Login.vue'
import Index from '@/components/Index.vue'
import Hot from '@/components/Hot.vue'
import Soon from '@/components/Soon.vue'
import My from '@/components/My.vue'
import Area from '@/components/Area.vue'
import Search from '@/components/Search.vue'



Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/',
            redirect: '/Index'
        }, {
            path: '/home',
            redirect: '/hot'
        },
        {
            path: '/index',
            name: 'Index',
            component: Index
        }, , {
            path: '/home',
            name: 'Home',
            component: Home,
            children: [{
                    path: '/hot',
                    name: 'Hot',
                    component: Hot
                },
                {
                    path: '/soon',
                    name: 'Soon',
                    component: Soon
                }
            ]
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
        }, {
            path: '/my',
            name: 'My',
            component: My
        }, {
            path: '/area',
            name: 'Area',
            component: Area
        }, {
            path: '/search',
            name: 'Search',
            component: Search
        }
    ]
}); //这里可以带有路由器的配置参数




// router.beforeEach(function(to, from, next) {
//     store.commit('updateLoadingStatus', { isLoading: false })
//     next()
// })

// router.afterEach(function(to) {
//     store.commit('updateLoadingStatus', { isLoading: false })
// })


export default router