import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
        state: {
            hotLists: {},
            soonLists: {
                moviecomings: '',
                attention: ''
            },
            nowMovie: {},
            details: {
                release: '',
                director: ''
            },
            isShow: true,
            bottomNav: '',
            commentPlus: {},
            commentMini: {
                data: ''
            },
            loading: false,
            pageCount: 1,
            isLogin: false,
            //昵称
            nickname: '',
            collection: [],
            //定位
            area: '',
            chooseCity: '上海',
            chooseCityId: '292',
            searchList:''
        },
        actions: {
            //首页轮播图
            getPagesubArea({ commit }, cityId) {
                return new Promise(function(resolve) {
                    fetch('/api/PageSubArea/HotPlayMovies.api?locationId=' + cityId)
                        .then(response => {
                            return response.json();
                        })
                        .then(result => {
                            commit('PageSubArea', result)
                            resolve()
                        });
                })
            },
            //即将上瘾
            getSoonList({ commit }, cityId) {
                return new Promise(function(resolved) {
                    fetch('/api/Movie/MovieComingNew.api?locationId=' + cityId)
                        .then(response => {
                            return response.json();
                        })
                        .then(result => {
                            commit('soonListFn', result);
                            resolved()
                        })
                })
            },
            //热门
            getHotList({ commit }, cityId) {
                return new Promise(function(resolved) {
                    fetch('/api/Showtime/LocationMovies.api?locationId=' + cityId)
                        .then(response => {
                            return response.json();
                        })
                        .then(result => {
                            commit('hotListFn', result);
                            resolved()
                        })
                })
            },
            //详情
            getDetails({ commit }, detailObj) {
                return new Promise(function(resolved) {
                    fetch('/api/movie/detail.api?locationId=' + detailObj.cityId + '?&movieId=' + detailObj.id)
                        .then(response => {
                            return response.json();
                        })
                        .then(result => {
                            commit('detailsFn', result)
                            resolved()
                        });
                })
            },
            //精彩评论
            getCommentsPlus({ commit }, id) {
                return new Promise(function(resolved) {
                    fetch('/plus/Movie/HotLongComments.api?pageIndex=1&movieId=' + id)
                        .then(response => {
                            return response.json();
                        })
                        .then(result => {
                            commit('commentPlusFn', result)
                            resolved()
                        });
                })
            },
            //短评
            getCommentsMini({ commit }, id) {
                return new Promise(function(resolved) {
                    fetch('/api/Showtime/HotMovieComments.api?pageIndex=1&movieId=' + id)
                        .then(response => {
                            return response.json();
                        })
                        .then(result => {
                            commit('commentMiniFn', result)
                            resolved()
                        });
                })
            },
            //定位
            getArea({ commit }) {
                return new Promise(function(resolved) {
                    fetch('/api/Showtime/HotCitiesByCinema.api')
                        .then(response => {
                            return response.json();
                        })
                        .then(result => {
                            commit('areaFn', result)
                            resolved()
                        })
                })
            },
            //搜索
            getSearch({commit},value){
                return new Promise(function(resolved) {
                    fetch('/sear/Service/callback.mi/Showtime/SearchVoice.api?keyword='+value+'&pageIndex=1')
                        .then(response => {
                            return response.json();
                        })
                        .then(result => {
                            commit('searchFn', result)
                            resolved()
                        })
                })
            }
        },
        mutations: {
            hotListFn(state, result) {
                state.hotLists = result;
            },
            soonListFn(state, result) {
                state.soonLists.moviecomings = result.moviecomings;
                state.soonLists.attention = result.attention;
            },
            hotFn(state, result) {
                state.isShow = result;

            },
            PageSubArea(state, result) {
                state.nowMovie = result.movies;
                state.nowMovie.totalHotMovie = result.totalHotMovie;
            },
            bottomNavFn(state, result) {
                state.bottomNav = result;
            },
            detailsFn(state, result) {
                state.details = result;
            },
            commentPlusFn(state, result) {
                state.commentPlus = result;
            },
            commentMiniFn(state, result) {
                state.commentMini = result.data;
            },
            loadingFn(state, result) {
                state.loading = result;
            },
            loginFn(state, result) {
                state.isLogin = result

            },
            collectFn(state, result) {
                state.collection.push(result)
            },
            nicknameFn(state, result) {
                state.nickname = result
            },
            areaFn(state, result) {
                state.area = result.p;
            },
            chooseCityFn(state, result) {
                state.chooseCity = result;
            },
            chooseCityIdFn(state, result) {
                state.chooseCityId = result;
            },
            searchFn(state,result){
                state.searchList = result.movies
                console.log(state.searchList)
            }
        }
    }) // 这里你可能已经有其他 module

// store.registerModule('vux', { // 名字自己定义
//     state: {
//         isLoading: false
//     },
//     mutations: {
//         updateLoadingStatus(state, payload) {
//             state.isLoading = payload.isLoading;

//         },


//     }
// })

export default store