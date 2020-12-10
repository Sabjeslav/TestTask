import Vue from "vue";
import Vuex from "vuex";
 
Vue.use(Vuex);
 
export default new Vuex.Store({
 state: {
     genders: {
        male: 15,
        female: 5
     }
 },
 getters: {},
 mutations: {
    setGenders(state, data) {
        state.genders.male = data.amount
    }
 },
 actions: {}
});
