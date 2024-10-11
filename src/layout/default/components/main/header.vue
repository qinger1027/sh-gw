<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
// const { removeOtherTab, addTab, removeAllTab, removeTab, tabsLists, currentTab } = useMultipleTabs()
import { useMenuStore } from "@/stores/modules/menuTabs";
import LayoutBread from "@/layout/default/components/main/bread.vue";
const currentTab = ref(""); //定义基础类型
const menuStore = useMenuStore();
const tabsLists = menuStore.menuItems;

const router = useRouter();
const route: any = useRoute();
const handleClick = (tab: any) => {
  const currentItem = tabsLists[tab.index];
  console.log(currentItem);
  router.push({
    path: tab.props.name,
    query: currentItem.query,
  });
};
const removeTab = (tab: any) => {
  console.log(tab);
  menuStore.removeMenuItem(tab);
};

watch(
  () => route.path,
  () => {
    currentTab.value = route.path;
    // 第一次加载一次path=/
    if (tabsLists.every((v) => v.path !== route.path) && route.path !== "/") {
      tabsLists.push({
        path: route.path,
        fullPath: route.fullPath,
        query: route.query || {},
        name: route.meta.title,
      });
    }
  },
  { immediate: true }
);
</script>

<template>
  <layout-bread />
  <el-tabs
    class="demo-tabs"
    v-model="currentTab"
    :closable="tabsLists.length > 1"
    @tab-click="handleClick"
    @tab-remove="removeTab($event)"
  >
    <el-tab-pane
      v-for="item in tabsLists"
      :key="item.path"
      :label="item.name"
      :name="item.path"
    >
    </el-tab-pane>
  </el-tabs>
</template>
<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.el-tabs {
  padding: 0 10px;
}
</style>
