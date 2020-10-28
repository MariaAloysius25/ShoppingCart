<template>
  <div id="app">
    <h1>Welcome to Online Shopping</h1>
   <Cart />
  </div>
</template>

<script>
import Cart from './components/Cart.vue'

export default {
  name: 'App',
  components: {
      Cart
  },   
  computed: {      
      totalAmount() {
          return this.$store.getters.total
      }
  } 
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: #81d84e;
  font-family: 'Roboto', sans-serif;
}

* {
  box-sizing: border-box;
}
 
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: #81d84e;
  font-family: 'Roboto', sans-serif;
}
</style>
