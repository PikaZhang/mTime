import Vue from 'vue'
import Router from 'vue-router'
import Hot from '@/components/Hot.vue'
import Soon from '@/components/soon.vue'


Vue.use(Router)

export default new Router({
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
    }]
})