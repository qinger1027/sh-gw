<template>
  <div class="app-full">
    <!-- 侧边内容 -->
    <aside>
      <layout-aside />
    </aside>

    <div class="app-hmain">
      <header>
        <layout-header />
      </header>
      <main>
        <layout-main />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import LayoutHeader from '@/layout/default/components/main/header.vue'
import LayoutAside from '@/layout/default/components/main/aside.vue'
import LayoutMain from '@/layout/default/components/main.vue'
</script>
<style lang="scss" scoped>
.app-full {
  width: 100%;
  display: flex;

  aside {
    width: var(--aside-width);

  }
}


.app-hmain {
  width: calc(100% - var(--aside-height));

  main {
    background: var(--bg-color-page);
    padding: 16px;
    height: calc(100% - 54px - 86px);
  }
}
</style>