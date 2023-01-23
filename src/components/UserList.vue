<template>
    <div>
    <input type="text" v-model="searchText" placeholder="Search by email" />
    <button @click="searchUser" class="search-button">Search</button>
    <button @click="getUsers" class="modern-button">Reload Users</button>
    <button @click="showAddUserForm = true" class="add-button">Add User</button>
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
            <button type="submit" class="add-button" >Add User</button>
            <button @click="showAddUserForm = false" class="add-button">Cancel</button>
        </form>
    </div>

    <div v-if="showEditUserForm" class="form-widget" >
        <!--submit prevent zapobiega defaultowemu wysłaniu formy i zrealoadowaniu strony po submicie,
            dzieki temu mozna najpierw wypelnic forme i potem po stronie klienta wyslac
            wypelnione dane jako nowego uzytkownika
         -->
        <form @submit.prevent="editUser">
            <label for="firstName">First Name:</label>
            <input v-model="currentFirstName" type="text" id="firstName" required  class="form-element">
            <br>
            <label for="lastName">Last Name:</label>
            <input v-model="currentLastName" type="text" id="lastName" required  class="form-element">
            <br>
            <label for="email">Email:</label>
            <input v-model="currentEmail" type="email" id="email" required  class="form-element">
            <br>
            <label for="age">Age:</label>
            <input v-model="currentAge" type="number" id="age" required  class="form-element">
            <br>
            <button type="submit" @click="editUser(currentId)" class="add-button" >Update</button>
            <button @click="showEditUserForm = false" class="add-button">Cancel</button>
        </form>
    </div>

    <table class="centered">
        <tr class="centered"> 
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Age</th>
        </tr>
        <tr v-for="user in filteredUsers" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.email}}</td>
          <td>{{ user.age}}</td>
          <td>
            <button @click="deleteUser(user.id)" class="delete-button">Delete</button>
            <button @click="showEditUserForm = true, currentId = user.id,
            currentFirstName = user.firstName,
            currentLastName = user.lastName,
            currentAge = user.age,
            currentEmail = user.email"
             class="edit-button">Edit</button>
          </td>
        </tr>
      </table>
    </div>
  </template>

<script>
import axios from 'axios'
    export default {
        name: 'UserList',
        data(){
            return{
                users: [],
                dataFetched: false,
                searchText: '',
                filteredUsers: [],
                showAddUserForm: false,
                showEditUserForm: false,
                currentId: -1,
                currentFirstName: '',
                currentLastName: '',
                currentEmail: '',
                currentAge: 0,
                firstName: '',
                lastName: '',
                email: '',
                age: '',
            }
        },
        created() {
            if (!this.dataFetched) {
                this.getUsers()
                this.dataFetched = true
             }
        },
        methods:{
            getUsers(){
                axios.get('http://localhost:8083/api/clients')
                .then((response) => {
                    console.log(response.data)
                    this.users = response.data
                    this.filteredUsers = response.data

                })
                .catch(error=>{
                    console.log(error)
                })
            },
            deleteUser(id) {
                if (confirm('Are you sure you want to delete this user?')) {
                    axios.delete(`http://localhost:8083/api/clients/${id}`)
                    .then(response => {
                        // Reload the users list
                        console.log(response);
                        this.getUsers();
                    })
                    .catch(error => {
                        console.log(error);
                    });
                }
            },
            searchUser(){
                this.filteredUsers = this.filteredUsers.filter(user => user.email.includes(this.searchText))
                console.log(this.filteredUsers)
            },
            addUser(){
                axios.post('http://localhost:8083/api/clients', {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                age: this.age,
                })
                .then((response) => {
                    console.log(response.data);
                    this.showAddUserForm = false;
                    this.firstName = '';
                    this.lastName = '';
                    this.email = '';
                    this.age = '';
                    this.getUsers();
                })
                .catch(error => {
                    console.log(error);
                });
            },
            editUser(id){
                axios.put(`http://localhost:8083/api/clients/${id}`, {
                firstName: this.currentFirstName,
                lastName: this.currentLastName,
                email: this.currentEmail,
                age: this.currentAge,
                })
                .then((response) => {
                    console.log(response.data);
                    this.showEditUserForm = false;
                    this.currentFirstName = '';
                    this.currentLastName = '';
                    this.currentEmail = '';
                    this.currentAge = 0;
                    this.getUsers();
                })
                .catch(error => {
                    console.log(error);
                });
            }
        }
    }
</script>

<style scoped>
    .modern-button {
  display: inline-block;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  text-align: center;
  text-decoration: none;
  padding: 15px 30px;
  border: none;
  border-radius: 4px;
  background-color: #0b54b3;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.1s ease-in-out;
  margin: 20px;
}


.modern-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.modern-button:active {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.delete-button {
  display: inline-block;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  text-align: center;
  text-decoration: none;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #ff4557;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.1s ease-in-out;
  margin: 20px;
}

.delete-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.delete-button:active {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

table {
  border-collapse: collapse;
  border: 1px solid #ddd;
  margin: 10px;
}

td, th {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

th {
  text-align: left;
}

table.centered {
  margin: auto;
  width: 100%;
}

input[type="text"] {
  padding: 16px;
  border: 1px solid #ccc;
  background-color: #fff;
  transition: all 0.2s ease-in-out;
  border-radius: 4px;
}

input[type="email"] {
  padding: 16px;
  border: 1px solid #ccc;
  background-color: #fff;
  transition: all 0.2s ease-in-out;
  border-radius: 4px;
}


input[type="number"] {
  padding: 16px;
  border: 1px solid #ccc;
  background-color: #fff;
  transition: all 0.2s ease-in-out;
  border-radius: 4px;
}


input[type="text"]:focus {
  border: 1px solid #4caf50;
  box-shadow: 0 0 10px #4caf50;
}

input[type="email"]:focus {
  border: 1px solid #4caf50;
  box-shadow: 0 0 10px #4caf50;
}


input[type="number"]:focus {
  border: 1px solid #4caf50;
  box-shadow: 0 0 10px #4caf50;
}


.search-button {
  display: inline-block;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  text-align: center;
  text-decoration: none;
  padding: 15px 30px;
  border: none;
  border-radius: 4px;
  background-color: #0b54b3;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.1s ease-in-out;
  margin: 20px;
}

.search-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.search-button:active {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.add-button {
  display: inline-block;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  text-align: center;
  text-decoration: none;
  padding: 15px 30px;
  border: none;
  border-radius: 4px;
  background-color: #0b54b3;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.1s ease-in-out;
  margin: 20px;
}

.add-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.add-button:active {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
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

.edit-button {
  display: inline-block;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  text-align: center;
  text-decoration: none;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #e8d335;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.1s ease-in-out;
  margin: 20px;
}

.edit-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.edit-button:active {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

</style>