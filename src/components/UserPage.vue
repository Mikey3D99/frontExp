<template>
    <div>
      <h1>User Page</h1>
      <h2>Welcome back {{ this.userFirstName }}!</h2>
      <br>
      <h2>Your surname is: {{ this.userLastName }}!</h2>
      <br>
      <h2>Your age is: {{ this.userAge }}!</h2>
      <br>
      <h2>Your email is: {{ this.userEmail}}!</h2>
      <br>
    </div>
  </template>
  
  <script>
import axios from 'axios';

  export default {
    data(){
            return{
                name: 'HomePage',
                dataFetched: false,
                userId: '',
                userAge: '',
                userEmail: '',
                userFirstName: '',
                userLastName: '',
            }
        },
    created() {
            //if (!this.dataFetched) {
                this.getUserInfo();
                this.dataFetched = true
             //}
    },
    methods:{
        getUserInfo(){
            this.userId = this.$route.params.id
            console.log(this.userId);
            axios.get(`http://localhost:8083/api/clients/${this.userId}`)
                .then((response) => {
                    this.userAge = response.data.age;
                    this.userEmail = response.data.email;
                    this.userFirstName = response.data.firstName;
                    this.userLastName = response.data.lastName;
                })
                .catch(error=>{
                    console.log(error)
                })
        }
    }
  }

  </script>
  
  <style>
  
  </style>
  