const isShowIndexColumn = true
const isShowSelectionColumn = true
const title = '用户列表'

const propList = [
  { prop: 'name', label: '商品名称', minWidth: '80' },
  { prop: 'oldPrice', label: '原价格', minWidth: '80', slotName: 'oldPrice' },
  { prop: 'newPrice', label: '现价格', minWidth: '80' },
  { prop: 'imgUrl', label: '商品图片', minWidth: '100', slotName: 'image' },
  { prop: 'status', label: '状态', minWidth: '100', slotName: 'status' },
  {
    prop: 'createAt',
    label: '创建时间',
    minWidth: '100',
    slotName: 'createAt'
  },
  {
    prop: 'updateAt',
    label: '更新时间',
    minWidth: '100',
    slotName: 'updateAt'
  },
  { label: '操作', slotName: 'handler' }
]

const contentTableConfig = {
  isShowIndexColumn,
  isShowSelectionColumn,
  title,
  propList
}

/*
导出配置对象(注意，这里导出的是一个对象，因为，对象中可以含有多个属性，
可以批量传递数据，而没有选择一个个的导出) */
export { contentTableConfig }
