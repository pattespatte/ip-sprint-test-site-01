// src/plugins/fkui.ts
import type { App } from 'vue'
// Import all FKUI components and register them globally
import * as FKUI from '@fkui/vue'

export default {
  install(app: App) {
    // DEBUG: Provide basic screen reader context to fix undefined error
    app.provide('screenReaderContextKey', {
      screenReaderContextKey: Symbol('screenReaderContext')
    })
    
    // Register all FKUI components globally
    Object.entries(FKUI).forEach(([name, component]) => {
      if (name.startsWith('F')) {
        app.component(name, component)
      }
    })
    
    console.log('DEBUG: FKUI plugin installed with components:', Object.keys(FKUI).filter(name => name.startsWith('F')))
  }
}