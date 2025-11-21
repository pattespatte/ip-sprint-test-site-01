import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'

// Import FKUI plugin
import FkuiPlugin from './plugins/fkui'
import '@fkui/theme-default'

const app = createApp(App)

app.use(router)
app.use(FkuiPlugin)

// Add compiler options to handle custom elements
app.config.compilerOptions = {
  isCustomElement: (tag) => tag.startsWith('fk-'),
}

app.mount('#app')
