import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    vaccineOrders: [],
    vaccinations: [],
    singleOrder: []
  },
  getters: {
    //That getted filter orders by date, and slice unnecessary data.
    sortByDate: (state) => (searchDate) => {
      return state.vaccineOrders.filter(el => el.arrived.startsWith(searchDate))
    }
  },
  mutations: {
    //That mutation sort data by date and save it to state.
    mutateData(state, data) {
      state.vaccineOrders = data.sort((a, b) => new Date(a.arrived) - new Date(b.arrived))
    },
    //That mutation save opened order to state.
    mutateSingleOrder(state, order) {
      state.singleOrder = []
      state.singleOrder = order[0]
    },
    //That mutation save vaccinations to state.
    mutateVaccinations(state, vaccinationsArray) {
      state.vaccinations = vaccinationsArray
    }
  },
  actions: {
    //That async function fetch orders data from DB by REST API 
    async fetchData ({ commit }) {
      await fetch("http://localhost:3000/vaccinesDB", {
        "method": "GET",
        "headers": {
            'Content-Type': 'application/json'
        }
        }).then(response => { 
            if(response.ok){
                return response.json() 
            } else{
                alert("Server returned " + response.status + " : " + response.statusText);
            }                
        }).then(response => {
            let result = response
            commit('mutateData', result)
            return 'done'
        })
        .catch(err => {
            console.log(err);
        });
    },
    //That async function fetch vaccines data from DB by REST API
    async fetchVaccines ({ commit }) {
      await fetch("http://localhost:3000/vaccinations", {
        "method": "GET",
        "headers": {
            'Content-Type': 'application/json'
        }
        }).then(response => { 
            if(response.ok){
                return response.json() 
            } else{
                alert("Server returned " + response.status + " : " + response.statusText);
            }                
        }).then(response => {
            let result = response
            commit('mutateVaccinations', result)
        })
        .catch(err => {
            console.log(err);
        });
    },
    //That async function fetch chosen order data from DB by REST API
    async findById ({ commit }, path) {
      const url = "http://localhost:3000" + path
      await fetch(url, {
        "method": "GET",
        "headers": {
            'Content-Type': 'application/json'
        }
        }).then(response => { 
            if(response.ok){
                return response.json() 
            } else{
                alert("Server returned " + response.status + " : " + response.statusText);
            }                
        }).then(response => {
            let result = response
            commit('mutateSingleOrder', result)
        })
        .catch(err => {
            console.log(err);
        });
    }
  },
  modules: {
    
  }
})

 