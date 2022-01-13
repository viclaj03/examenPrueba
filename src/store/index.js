import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    empresas: [],
  },
  mutations: {
    loadEmpresas(state,payload){
      state.empresas = payload
    }
  },
  actions: {
    loadEmpresas(context){
      api.empresas.getAll()
    .then((response)=> (context.commit('loadEmpresas',response.data)))
    .catch((error)=> alert(error))
    }
  },
  modules: {
    
  }
})
