import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
        state: {
            hotLists: {
                total: ''
            },
            soonLists: {
                moviecomings: '',
                attention: ''
            },
            show: true,
            isShow: true

        },
        mutations: {
            hotListFn(state, result) {
                state.hotLists = result.ms;
                state.hotLists.total = result.totalComingMovie;
            },
            soonListFn(state, result) {
                state.soonLists.moviecomings = result.moviecomings;
                state.soonLists.attention = result.attention;
            },
            hotFn(state, result) {
                state.isShow = result;
            }
        }
    }) // 这里你可能已经有其他 module

store.registerModule('vux', { // 名字自己定义
    state: {
        isLoading: false
    },
    mutations: {
        updateLoadingStatus(state, payload) {
            state.isLoading = payload.isLoadin;

        },


    }
})

export default store