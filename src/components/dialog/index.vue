<template>
  <!-- 新增弹框 start -->
  <el-dialog v-model="isVisible" @close="handleEvent('cancel')" width="500">
    <template v-if="headerTitle" #header>{{ headerTitle }}</template>

    <!-- 自定义内容 -->
    <slot>{{ content }}</slot>
    <template v-if="isFooter" #footer>
      <div class="dialog-footer">
        <el-button @click="handleEvent('cancel')">取消</el-button>
        <el-button type="primary" @click="handleEvent('confirm')">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 新增弹框 end -->
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isVisible = ref(false)
// 默认显示footer
const isFooter = ref(true)
// 父传子
defineProps({
  headerTitle: String,
  content: String,
});

// 子传父
const emit = defineEmits(['cancel', 'confirm'])
const handleEvent = (type: 'confirm' | 'cancel') => {
  emit(type)
  if (type === 'cancel') {
    close()
  }
}

// 打开
const show = (data?: any) => {
  isVisible.value = true;
}
// 关闭
const close = (data?: any) => {
  isVisible.value = false;
}
// 是否显示footer
const isShowFooter = (data?: any) => {
  isFooter.value = data;
}
// 暴露
defineExpose({
  show, close, isShowFooter
})
</script>

<style lang="scss" scoped></style>