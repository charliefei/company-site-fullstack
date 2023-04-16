import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
    state:{
        isGetRoute: false,
        isCollapse: false,
        userInfo: {}
    },
    getters:{

    },
    actions:{
    },
    mutations:{
        changeIsGetRoute(state, value){
            state.isGetRoute = value
        },
        changeCollapseState(state){
            state.isCollapse = !state.isCollapse
        },
        getUserInfo(state, value) {
            state.userInfo = {
                ...state.userInfo,
                ...value
            }
        },
        clearUserInfo(state) {
            state.userInfo = {}
        }
    },
    plugins: [
        createPersistedState({
            paths: ['isCollapse', 'userInfo']
        })
    ],
    modules:{

    }
})