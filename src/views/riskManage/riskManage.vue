<template>
    <div class="apply_order">
        <div class="customer_info">
            <!-- <div class="header_title">用户信息</div> -->
            <customer-info></customer-info>
        </div>
        <div class="">
            <!-- <div class="header_title">工单信息</div> -->
            <apply-info></apply-info>
        </div>
        <el-button type="primary" @click="risk()">
            风控审核
        </el-button>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import customerInfo from "@/components/customer_info/index.vue";
import applyInfo from "@/components/apply_info/index.vue";
onMounted(() => {
});

// 风控审核
const risk = async (status?: any) => {
    // if (status === 'reject') {
    //     if (!downAccountFormRef.value) return
    //     await downAccountFormRef.value?.validate(async (valid: any, fields: any) => {
    //         if (valid) {
    //             try {
    //                 await updatedownAccountStatus(status)
    //             } catch (error) {
    //                 console.error('Failed to data:', error);
    //             }
    //         } else {
    //             console.log('error submit!', fields)
    //         }
    //     })
    // } else {
    //     await updatedownAccountStatus(status);
    // }
};
</script>

<style lang="scss" scoped>
.apply_order {
    padding: 16px;
    background: #fff;
}
</style>
