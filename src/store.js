import Vue from "vue";
import Vuex from "vuex";
 
Vue.use(Vuex);
 
export default new Vuex.Store({
 state: {
    genders: {
        male: 0,
        female: 0
    }
 },
 getters: {
     getMale: (state) => {
         return state.genders.male
     },
     getFemale: (state) => {
        return state.genders.female
    }
 },
 mutations: {
    setGenders(state, data) {
        state.genders.male = data.amount.male
        state.genders.female = data.amount.female
    }
 },
 actions: {}
});
