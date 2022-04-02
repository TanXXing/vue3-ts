/* import { Edit, Cellphone, Avatar } from '@element-plus/icons-vue'

const iconCpns = [Edit, Cellphone, Avatar]

import type { App } from 'vue'

export default function (app: App) {
  iconCpns.forEach((iconCpn) => {
    app.component(iconCpn.name, iconCpn)
  })
}
*/

import * as ElIconModules from '@element-plus/icons-vue'

import type { App } from 'vue'

export default function (app: App) {
  Object.keys(ElIconModules).forEach((iconName) => {
    app.component(iconName, (ElIconModules as any)[iconName])
  })
}
