<script setup lang="ts">
import commonSearch from "@/components/search.vue";
import { ref } from "vue";

const title = ref("管理员页面")
const msgfromChild = ref<any>('')
let i=0;
const fromChild = (value:any)=>{
    // value为子组件传过来的数据
    msgfromChild.value = value;
    // console.log(msgfromChild.value);
    i++;
    // console.log(i);
}
// 父组件通过 ref 获取子组件实例，再调用子组件的方法获取属性。
const childRef = ref<any>(null)
const getChildMessage = () => {
    // console.log(childRef.value?.getMsg()); // 打印子组件的 message 属性
    // console.log(childRef.value.title1);
};

// 暴露给子组件
defineExpose({
    title,
    getparent(){
        return 'parent msg'
    }
})
</script>

<template>
    <commonSearch ref="childRef" :title="title" @updateValue="fromChild"></commonSearch>
    <button @click="getChildMessage">父组件</button>
</template>
<style lang="scss" scoped>
</style>