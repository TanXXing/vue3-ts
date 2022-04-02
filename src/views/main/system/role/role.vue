<template>
  <div class="role">
    <page-search :search-form-config="searchFormConfig"></page-search>
    <page-content
      :content-table-config="contentTableConfig"
      pageName="role"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/page-search/index'
import PageContent from '@/components/page-content/index'

import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'

export default defineComponent({
  name: 'role',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    return {
      contentTableConfig,
      searchFormConfig
    }
  }
})
</script>

<style scoped lang="less"></style>
