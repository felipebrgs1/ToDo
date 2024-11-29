import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles.css'  // Importando o arquivo CSS do Tailwind

createApp(App).mount('#app')

createApp(App)
  .use(router)  // Usando o roteador
  .mount('#app')
