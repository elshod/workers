import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    workers: []
  },
  mutations: {
    newWorker(state,payload){
      state.workers.push(payload)
    },
    toWorkers(state,payload){
      state.workers = payload
    },
    removeWorker(state,payload){
      state.workers.splice(state.workers.findIndex(function(i){ return i.id === payload; }), 1);
    }
  },
  actions: {
    addNewWorker(context,newWorker){
      axios.post('http://localhost:3000/workers',newWorker).then(response => {
        context.commit('newWorker',response.data)
      })
    },
    getAllWorkers(context){
      axios.get('http://localhost:3000/workers').then(response => {
        context.commit('toWorkers',response.data)
      })
    },
    delWorker(context,id){
      axios.delete('http://localhost:3000/workers/'+id).then(response => {
        console.log(response)
        context.commit('removeWorker',id)
      })
    }
  },
  getters: {
    workers(state){
      return state.workers
    },
    countWorkers(state){
      return state.workers.length
    },
    getWoman(state){
      let womans = state.workers.filter(worker => {
        return worker.gender == 'Ayol'
      })
      return womans.length
    },
    getDude(state){
      let meen = state.workers.filter(worker => {
        return worker.gender == 'Erkak'
      })
      return meen.length
    }
  },
  modules: {
  }
})
