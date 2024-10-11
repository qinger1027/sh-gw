<template>
    <div class="login">
        <div class="login-bg">
            <img src="@/assets/loginbg.jpg" alt="loginbg" srcset="">
        </div>
        <div class="login-wrapper">
            <el-card class="box-card">
                <div class="title">官网后台管理系统</div>
                <el-form ref="form" :rules="rules" :model="forms">
                    <el-form-item prop="username">
                        <el-input v-model="forms.username" placeholder="请输入用户名" :prefix-icon="User" />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="forms.password" type="password" show-password :prefix-icon="Lock" placeholder="请输入密码" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submit">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { type FormInstance } from "element-plus"
import { useRouter } from 'vue-router';
import { Lock, User } from '@element-plus/icons-vue';
import { useUserStore } from '@/stores/modules/user'
import menulist from '@/assets/menulist';
const router = useRouter()

// do not use same name with ref
interface Iform {
    username: string;
    password: string;
}
const forms = reactive<Iform>({
    username: '',
    password: '',
})
const rules = reactive({
    username: [
        {
            required: true,
            message: "请输入用户名",
            type: "string",
            trigger: "change"
        }],
    password: [
        {
            required: true,
            message: "请输入密码",
            type: "string",
            trigger: "change"
        }
    ]
})
const form = ref<FormInstance>();
const userStore = useUserStore()
const submit = () => {
    form.value?.validate(async (validate: boolean) => {
        if (validate) {
            let formData = {
                username: forms.username,
                password: forms.password
            }
            await userStore.login(formData)
            router.push('/home')
        }
    })
}
</script>

<style lang="scss" scoped>
.login {
    .login-bg {
        width: 100%;
        height: 100vh;

        img {
            width: 100%;
            height: 100vh;
        }
    }

    .login-wrapper {
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;

        .box-card {
            .title {
                text-align: center;
                padding: 26px 0px;
                font-size: 18px;
                font-weight: 600;
            }

            .el-form-item {
                width: 280px;
            }

            button {
                width: 100%;
                margin-top: 20px;
            }
        }
    }
}

@media screen and (min-width: 400px) {
    .login {
        width: 100%;
        .login-wrapper {
            right: 320px;
        }
    }
}
</style>