import { ref } from 'vue'
import PageModal from '@/components/page-modal/index'

type newCb = () => void
type editCb = (item: any) => void

export function usePageModal(newCb?: newCb, editCb?: editCb) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()

  const defaultInfo = ref({})

  const handleNewData = () => {
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    // newCb是一个可选类型，有传，就调用，没传，就不调用
    newCb && newCb()
  }

  // 这里的item是点击编辑按钮之后，“回显的数据”
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }

    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }

    // 将item传入到editCb这个函数中
    editCb && editCb(item)
  }

  return [pageModalRef, defaultInfo, handleNewData, handleEditData]
}
