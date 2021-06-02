import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    workers: [],
    tasks: []
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
    },
    newTask(state,payload){
      state.tasks.push(payload)
    },
    toTasks(state,payload){
      state.tasks = payload
    },
    removeTask(state,payload){
      state.tasks.splice(state.tasks.findIndex(function(i){ return i.id === payload; }), 1);
    },
    changingTask(state,payload){
      state.tasks.find(task => {
        if (task.id == payload.id) {
          task = payload
        }
      })
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
    },
    addNewTask(context,newTask){
      axios.post('http://localhost:3000/tasks',newTask).then(response => {
        context.commit('newTask',response.data)
      })
    },
    getAllTasks(context){
      axios.get('http://localhost:3000/tasks').then(response => {
        context.commit('toTasks',response.data)
      })
    },
    delTask(context,id){
      axios.delete('http://localhost:3000/tasks/'+id).then(response => {
        console.log(response)
        context.commit('removeTask',id)
      })
    },
    changeTask(context,task){
      axios.put('http://localhost:3000/tasks/'+task.id,task).then(response => {
        context.commit('changingTask',response.data)
      })
    }
  },
  getters: {
    tasks(state){
      return state.tasks
    },
    getTaskById(state){
      return id => {
        return state.tasks.find(task => {
          return task.id == id
        })
      }
    },
    workers(state){
      return state.workers
    },
    countWorkers(state){
      return state.workers.length
    },
    getWorkerById(state){
      return id => {
        
        return state.workers.filter(worker => {
          // console.log('getter',id,worker)
          return worker.id == id
        })
      }
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
