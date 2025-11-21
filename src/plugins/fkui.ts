// src/plugins/fkui.ts
import type { App } from 'vue'
// Import all FKUI components and register them globally
import * as FKUI from '@fkui/vue'

// Filter components that start with 'F' and create aliases with 'Fk' prefix
const components: Record<string, any> = {}
Object.keys(FKUI).forEach(name => {
  if (name.startsWith('F') && !name.startsWith('Fk')) {
    const originalComponent = (FKUI as any)[name]
    const fkName = 'Fk' + name.substring(1)
    
    // Register both original and Fk-prefixed versions
    components[name] = originalComponent
    components[fkName] = originalComponent
  }
})

export default {
  install(app: App) {
    // DEBUG: Provide basic screen reader context to fix undefined error
    app.provide('screenReaderContextKey', {
      screenReaderContextKey: Symbol('screenReaderContext')
    })
    
    // Register all FKUI components globally
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
    
    console.log('DEBUG: FKUI plugin installed with components:', Object.keys(components))
  }
}