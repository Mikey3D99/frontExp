<template>
  <div class="login-form">
    <form @submit="login">
      <input type="text" v-model="email" class="form-input email-input"/>
      <br />
      <input type="password" v-model="password" class="form-input password-input"/>
      <br />
      <button type="submit" class="form-button">Log In</button>
      <p v-if="error" class="error">{{ error }}</p>
      <button class="form-button" @click="redirectToRegistration">Register</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    data() {
      return {
        email: '',
        password: '',
        error: ''
      }
    },
    methods: {
      login(event) {
        event.preventDefault()
        // Validate the user's input
        if (!this.email || !this.password) {
          this.error = 'Please enter a username and password.'
          return
        }
        // Send a request to the server to check the user's credentials
        axios.post('http://localhost:8083/api/login', {
          email: this.email,
          password: this.password,
        })
        .then(response => {
          if(response.status === 200) {
            console.log("Successfully authenticated!");
            console.log(response.data);
            if(response.data === 'admin') {
              this.$router.push({ name: 'userlist' });
            }
            else if(response.data === 'user') {
              this.$router.push({ name: 'home' });
            }
          } else {
            console.log(response);
            console.log("Invalid username or password.");
            this.error = 'Invalid username or password.';
          }
        })
      },
      redirectToRegistration() {
      this.$router.push({ name: 'register' });
    }
    }
  }
</script>

<style>
  .login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-size: cover;
    padding: 2em;
  }

  .form-input {
    width: 20em;
    padding: .5em;
    border: none;
    border-radius: 5px;
    margin-bottom: 1em;
    display:inline-block;
  }  

  .form-button {
    background-color: #2E5AAC;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 10px;
  }

  .register-button {
    background-color: #2E5AAC;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 10px;
    margin-top: 10px;
    margin-left: 10px;
  }


  .email-input::placeholder,
  .password-input::placeholder {
      color: #ccc;
      font-style:italic;
  }
</style>