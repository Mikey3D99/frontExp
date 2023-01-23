<template>
  <div id="app" class="bg-color">
    <router-view />
  </div>
</template>


<script>
export default {
  name: 'App',
  components: {
},
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
}
.bg-color {
  background-color: #4994f5;
}
</style>
