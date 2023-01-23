<template>
 <div class="form-widget" >
        <!--submit prevent zapobiega defaultowemu wysłaniu formy i zrealoadowaniu strony po submicie,
            dzieki temu mozna najpierw wypelnic forme i potem po stronie klienta wyslac
            wypelnione dane jako nowego uzytkownika
         -->
        <form @submit.prevent="addUser">
            <label for="firstName">First Name:</label>
            <input v-model="firstName" type="text" id="firstName" required  class="form-element">
            <br>
            <label for="lastName">Last Name:</label>
            <input v-model="lastName" type="text" id="lastName" required  class="form-element">
            <br>
            <label for="email">Email:</label>
            <input v-model="email" type="email" id="email" required  class="form-element">
            <br>
            <label for="age">Age:</label>
            <input v-model="age" type="number" id="age" required  class="form-element">
            <br>
            <label for="password">Password:</label>
            <input v-model="password" type="password" id="password" required  class="form-element">
            <label for="password">Password:</label>
            <input v-model="password" type="password-confirmation" id="password" required  class="form-element">
            <button type="submit" class="add-button" >Register</button>
        </form>
    </div>
    <p v-if="message" class="message">{{ message }}</p>
</template>

<script>
import axios from 'axios'
  export default {
    data() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        password: '',
        name: '',
        role: '',
        error: '',
        message: '',
      }
    },
    methods: {
      addUser(){
                axios.post('http://localhost:8083/api/clients', {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                age: this.age,
                password: this.password,
                role: 'user',
                })
                .then((response) => {
                    console.log(response.data);
                    this.showAddUserForm = false;
                    this.firstName = '';
                    this.lastName = '';
                    this.email = '';
                    this.age = '';
                    this.password = '';
                    this.$router.push({ name: 'login' });
                    this.message = 'Successfully registered';
                })
                .catch(error => {
                    console.log(error);
                });
            },
    }
  }
</script>

<style>

  .form-widget {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #2E5AAC;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%; 
    margin: 0 auto;
  }

  form {
    background: white;
    border-radius: 4px;
    padding: 20px;
  }

  .form-element {
    width: 80%;
    margin: 0 auto;
  }

  .form-input {
    width: 20em;
    padding: .5em;
    border: none;
    border-radius: 5px;
    margin-bottom: 1em;
    display:inline-block;
  }  

  .message {
  color: white;
  font-weight: bold;
  font-size: 1.5em;
  margin-top: 10px;
  }
</style>