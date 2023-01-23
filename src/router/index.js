import {createRouter, createWebHistory} from 'vue-router'
import HomePage from './../components/HomePage.vue'
import AboutPage from './../components/AboutPage'
import LoginPage from './../components/LoginPage'
import NotFound from './../components/NotFound'
import RegisterPage from './../components/RegisterPage'
import UserList from './../components/UserList'


const routes = [
  {
    name: 'login',
    path: '/',
    component: LoginPage
  },
  {
    name: 'about',
    path: '/about',
    component: AboutPage
  },
  {
    name: 'home',
    path: '/home',
    component: HomePage
  },
  {
    name: 'register',
    path: '/register',
    component: RegisterPage
  },
  {
    name: 'userlist',
    path: '/users',
    component: UserList
  },
  {
    name: 'notfound',
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router