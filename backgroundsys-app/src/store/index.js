import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
    state:{
        isGetRoute: false,
        isCollapse: false
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
        }
    },
    plugins: [
        createPersistedState({
            paths: ['isCollapse']
        })
    ],
    modules:{

    }
})