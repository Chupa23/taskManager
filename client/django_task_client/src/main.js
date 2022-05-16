import { createApp } from 'vue'
import BootstrapVue3 from 'bootstrap-vue-3'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import 'animate.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

const app = createApp(App).use(router);
app.config.globalProperties.axios = axios;
app.use(BootstrapVue3)
app.mount('#app');

// const app2 = createApp(App)
// app2.use(BootstrapVue3)
// app2.mount('#app2')
