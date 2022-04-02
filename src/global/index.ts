import registerElement from './register-element'
import registerIconCpns from './register-icon-cpns'
import registerProperties from './register-properties'

import type { App } from 'vue'

export function globalRegister(app: App) {
  registerElement(app)
  registerIconCpns(app)
  registerProperties(app)
}
