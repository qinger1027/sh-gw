<script setup lang="ts">
import { defineEmits, ref } from 'vue'
 
defineProps({
  // 父传子
  title: String
});
// 子传父
const emit = defineEmits(['updateValue'])
const send = () =>{
  emit('updateValue', {
    child:"from child"
  })
}
// 使用 defineExpose 方法来向外暴露组件的属性
const message = ref('child方法');
defineExpose({
  title1:'child title',
  getMsg(){
    return message.value
  }
})

const handleClick = ($parent:any) => {
  // console.log($parent.getparent());
}
</script>

<template>
    {{ title }}
    <button @click="send">点击</button>
    <button @click="handleClick($parent)">click me!</button>
</template>
<style lang="scss" scoped>
</style>