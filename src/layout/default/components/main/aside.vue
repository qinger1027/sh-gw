<script setup lang="ts">
import { useRoute } from "vue-router"
const route = useRoute()
import { useUserStore } from "@/stores/modules/user";
const userStore = useUserStore()
const routes: any = userStore.routes
</script>

<template>
  <div class="menu">
    <div class="logo">
      <img alt="Vue logo" src="@/assets/logo.png" />
      <!-- <span>绅禾科技</span> -->
    </div>
    <el-scrollbar height="calc(100vh - 50px)">
      <el-menu class="el-menu-vertical-demo" :default-active="route.path" router
        background-color="var(--color-primary)" active-text-color="var(--sh-text-color-active)"
        text-color="var(--sh-text-color)">
        <template v-for="(item, index) in routes">
          <!-- 有下拉 -->
          <el-sub-menu :index="item.id + ''" :key="index" v-if="item.children">
            <template #title>
              <el-icon v-if="item?.meta.icon">
                <component :is="item.meta.icon"></component>
              </el-icon>
              <span>{{ item.meta.title }}</span>
            </template>
            <!-- 下拉列表 -->
            <el-menu-item-group v-for="(child, i) in item.children" :key="i">
              <template v-if="child.isShow === 1">
                <el-menu-item :index="item.path + '/' + child.path">
                  <el-icon>
                    <component :is="child.meta.icon"></component>
                  </el-icon>
                  <span>{{ child.meta.title }}</span>
                </el-menu-item>
              </template>
            </el-menu-item-group>
          </el-sub-menu>
          <!-- 有下拉 end -->
          <!-- 无下拉 -->
          <template v-else>
            <template v-if="item.isShow === 1">
              <el-menu-item :index="item.path">
                <el-icon>
                  <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
              </el-menu-item>
            </template>
          </template>
          <!-- 无下拉 end -->
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style scoped>
.menu {
  width: var(--aside-width);
  height: 100%;
  background: var(--color-primary);

  .logo {
    display: flex;
    align-items: center;
    background: #fff;

    img {
      width: 82%;
      padding: 4px;
      padding-left: 16px;
    }

    span {
      font-size: 21px;
      color: var(--el-menu-bg-color-active);
      padding-left: 10px;
    }
  }
}
</style>
