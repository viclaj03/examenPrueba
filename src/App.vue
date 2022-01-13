<template>
  <div id="app">
    <app-nav></app-nav>
    <router-view/>
    <footer>Victor Lajara</footer>
  </div>
</template>

<script>
import AppNav from "./components/AppNav.vue";
export default ({
  
  created(){
    this.$store.dispatch('loadEmpresas')
  },
  components: {
    AppNav,
  }
})
</script>


<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
