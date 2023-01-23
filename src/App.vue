<template>
  <div id="app" class="bg-color">
    <LoginPage></LoginPage>
    <UserList></UserList>
    <RegisterPage></RegisterPage>
  </div>
</template>

<script>
//import LoginPage from './components/LoginPage.vue';
//import UserList from './components/UserList.vue';
import RegisterPage from './components/RegisterPage.vue';


export default {
  name: 'App',
  components: {
    //UserList,
    RegisterPage
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
