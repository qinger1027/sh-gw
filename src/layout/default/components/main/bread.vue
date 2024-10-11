<template>
    <div class="header">
        <div class="breadcrumb">
            <el-icon>
                <HomeFilled />
            </el-icon>
            <el-breadcrumb class="app-breadcrumb">
                <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
                    {{ item.meta.title }}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-popover :visible="visible" placement="bottom" :width="220">
            <div style="text-align: right; margin: 0">
                <div style="padding: 6px 0;">
                    用户名：{{ userInfo.username }}
                </div>
                <div>
                    <el-button type="danger" @click="generateQRCode">生成二维码</el-button>
                    <el-button type="danger" @click="resetPassword">修改密码</el-button>
                    <el-button type="danger" @click="logout">退出</el-button>
                </div>
            </div>
            <template #reference>
                <div @click="visible = !visible">
                    <el-icon>
                        <UserFilled />
                    </el-icon>
                </div>
            </template>
        </el-popover>

        <common-dialog ref="passworddialogRef" :headerTitle="'修改密码'" @confirm="resetPasswordConfirm"
            @cancel="resetPasswordCancel">
            <div>
                <label for="" class="mr-16">旧密码:</label>
                <el-input type="text" v-model="password.oldPassword" class="w-300" />
            </div>
            <div>
                <label for="" class="mr-16">新密码:</label>
                <el-input type="text" v-model="password.newPassword" class="w-300" />
            </div>
        </common-dialog>
        <common-dialog ref="qrCodedialogRef" :headerTitle="''">
            <img :src="qrCodeUrl" alt="QR Code" v-if="text" />
        </common-dialog>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
import { useWatchRoute } from '@/hooks/useWatchRoute'
import type { RouteLocationMatched, RouteLocationNormalizedLoaded } from 'vue-router'
import { useUserStore } from "@/stores/modules/user";
import commonDialog from "@/components/dialog/index.vue";
import { ElMessage } from "element-plus";
import QRCode from 'qrcode';
const qrCodedialogRef = ref();
const passworddialogRef = ref();
const password = ref({
    oldPassword: '',
    newPassword: ''
});
const text = ref(import.meta.env.VITE_APP_H5_URL)
const qrCodeUrl = ref('')
const breadcrumbs = ref<RouteLocationMatched[]>([])
const getBreadcrumb = (route: RouteLocationNormalizedLoaded) => {
    const matched = route.matched.filter((item) => item.meta && item.meta.title)
    breadcrumbs.value = matched
}

useWatchRoute((route) => {
    getBreadcrumb(route)
})

const visible = ref(false)
const getUserInfo: any = localStorage.getItem("userInfo")
const userInfo: any = JSON.parse(getUserInfo)

const logout = async () => {
    const userStore = useUserStore();
    await userStore.logout()
}

const resetPassword = async () => {
    passworddialogRef.value.show();
}
const resetPasswordConfirm = async () => {
    const userStore = useUserStore();
    const data: any = await userStore.resetPassword(password.value);
    if (data.code == 200) {
        ElMessage({
            message: "修改成功",
            type: "success",
            duration: 3000, // 显示3秒后消失
        });
        passworddialogRef.value.close();
    }
}
const resetPasswordCancel = () => {
    password.value = {
        oldPassword: '',
        newPassword: ''
    }
}
// 生成二维码
const generateQRCode = async () => {
    try {
        qrCodedialogRef.value.show();
        qrCodedialogRef.value.isShowFooter(false);
        qrCodeUrl.value = await QRCode.toDataURL(`${text.value}?userId=${userInfo.id}&storeId=${userInfo.storeId}`);
    } catch (err) {
        console.error(err);
    }
}
</script>
<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;

    .breadcrumb {
        display: flex;
        align-items: center;

        .app-breadcrumb {
            padding: 20px 10px !important;
        }
    }
}
</style>
