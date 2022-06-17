import PageContent from '@/components/page-content/index'

import { ref } from 'vue'

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()

  const handleResetClick = () => {
    /*
    为什么点击重置按钮之后，仍然，需要调用getPageData进行重新请求数据呢？而不是，
    直接直接清空输入框中的内容就好了呢？
    因为，我们在http://localhost:8080/main/system/user对应的页面中，如果，我们
    先在输入框中，输入内容之后，然后点击搜索内容，发现，没有搜索到内容的话，此时，下面的
    page-content的内容会没有显示，当我们点击重置按钮之后，我们希望，下面的page-content
    中的内容也是处于之前的状态（el-pagination中，page-size和current-page的状态）
    */

    pageContentRef.value?.getPageData()
  }
  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo)
  }

  return [pageContentRef, handleResetClick, handleQueryClick]
}
