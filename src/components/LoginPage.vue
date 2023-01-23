<template>
    <form @submit="login">
      <label>Username:</label>
      <input type="text" v-model="username" />
      <br />
      <label>Password:</label>
      <input type="password" v-model="password" />
      <br />
      <button type="submit">Log In</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </template>
  
<script>
import axios from 'axios'
  export default {
    data() {
      return {
        username: '',
        password: '',
        error: ''
      }
    },
    methods: {
      login(event) {
        event.preventDefault()
        // Validate the user's input
        if (!this.username || !this.password) {
          this.error = 'Please enter a username and password.'
          return
        }
        // Send a request to the server to check the user's credentials
        axios.post('/login', {
          username: this.username,
          password: this.password
        })
        .then(response => {
          // If the credentials are valid, redirect the user
          console.log(response);
          this.$router.push({ name: 'home' })
        })
        .catch(error => {
          console.log(error);
          this.error = 'Invalid username or password.'
        })
      }
    }
  }
</script>
  
  <style>
  .error {
    color: red;
  }
  </style>
  