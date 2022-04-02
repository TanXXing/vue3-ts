import type { App } from 'vue'
import { formatUtcStr } from '@/utils/format-date'

export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatUtcStr
  }
}
