const isShowIndexColumn = false
const isShowSelectionColumn = false
const title = '菜单列表'
const childrenProps = {
  rowKey: 'id',
  treeProps: {
    children: 'children'
  }
}

const isShowFooter = false

const propList = [
  { prop: 'name', label: '菜单名称', minWidth: '100' },
  { prop: 'type', label: '类型', minWidth: '60' },
  { prop: 'url', label: '菜单url', minWidth: '100' },
  { prop: 'icon', label: '菜单icon', minWidth: '100' },
  { prop: 'permission', label: '按钮权限', minWidth: '100' },
  {
    prop: 'createAt',
    label: '创建时间',
    minWidth: '220',
    slotName: 'createAt'
  },
  {
    prop: 'updateAt',
    label: '更新时间',
    minWidth: '220',
    slotName: 'updateAt'
  },
  { label: '操作', minWidth: '120', slotName: 'handler' }
]

const contentTableConfig = {
  isShowIndexColumn,
  isShowSelectionColumn,
  title,
  propList,
  childrenProps,
  isShowFooter
}

/*
导出配置对象(注意，这里导出的是一个对象，因为，对象中可以含有多个属性，
可以批量传递数据，而没有选择一个个的导出) */
export { contentTableConfig }
