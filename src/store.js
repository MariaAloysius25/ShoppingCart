import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
 
Vue.use(Vuex)
 
export default new Vuex.Store({
  state: {
    cart:[],
    products : [ {
          id: 1,
          name: 'Axe',
          price: 190.95
      },
      {
          id: 2,
          name: 'Bandsaw',
          price: 562.13
      },
      {
          id: 3,
          name: 'Chisel',
          price:12.9
      },
      {
          id: 4,
          name: 'Hacksaw',
          price:18.45
      }]
  },
  getters: {
    products: (state) => state.products,
    cart: (state) => state.cart,
  },
  mutations: {
    add_Product(state, payload) {
      state.cart.push(payload);
    },

    remove_Product(state, index) {
      state.cart.splice(index, 1);
    }
  },
  actions: {
    addToCart(context, obj) {
      context.commit("add_Product", obj);
    },

    removeFromCart(context, index) {
      context.commit("remove_Product", index);
    }
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })]
})

