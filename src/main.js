import { createApp } from 'vue'
import App from './App.vue'
// we import the vue router from our router/index.js file
import router from './router'

createApp(App).use(router).mount('#app')