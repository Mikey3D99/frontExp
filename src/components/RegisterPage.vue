<template>
 <div v-if="showAddUserForm" class="form-widget" >
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
            <br>
            <label for="password">Password:</label>
            <input v-model="password" type="password" id="password" required  class="form-element">
            <br>
            <button type="submit" class="add-button" >Add User</button>
            <button @click="showAddUserForm = false" class="add-button">Cancel</button>
        </form>
    </div>
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


  .form-widget {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
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

  </style>
  