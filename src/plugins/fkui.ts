// src/plugins/fkui.ts
import type { App } from 'vue'
// Import all FKUI components and register them globally
import * as FKUI from '@fkui/vue'

// Filter components that start with 'Fk'
const components: Record<string, any> = {}
Object.keys(FKUI).forEach(name => {
  if (name.startsWith('Fk')) {
    components[name] = (FKUI as any)[name]
  }
})

export default {
  install(app: App) {
    // Register all FKUI components globally
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
  }
}