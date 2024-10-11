<template>
    <div class="supplement_sign">
        <div class="supplement_sign_con">
            <div class="supplement_sign_desc">完成以下补录项</div>
            <div class="supplement_sign_con_info" v-for="(item, index) in replenishDetailList">
                <div>
                    {{ item.itemName }}
                </div>
                <div v-if="item.status === 'SUCCESS'">
                    <el-button>已认证</el-button>
                </div>
                <div v-else>
                    <el-button @click="toVerification(item)">去认证></el-button>
                </div>
            </div>
            <!-- <div class="supplement_sign_con_info">
                <div>活体补录</div>
                <div class="supplement_sign_con_info_btn" @click="livingRecord">去认证></div>
            </div>
            <div class="supplement_sign_con_info">
                <div>征信协议</div>
                <div class="supplement_sign_con_info_btn" @click="agreement">去认证></div>
            </div>
            <div class="supplement_sign_con_info">
                <div>借款协议</div>
                <div class="supplement_sign_con_info_btn" @click="agreement">去认证></div>
            </div> -->
        </div>
        <div>
            <el-drawer v-model="drawerShow" :title="headerTitle" :direction="'btt'" :before-close="handleClose">
                <div class="supplement_sign_coninfo_content" v-if="isShow.smsVerificationShow">
                    <div class="supplement_sign_smsinfo_form">
                        <label for="手机号">手机号</label>
                        <div class="supplement_sign_smsinfo_inputBox">
                            <el-input class="input" placeholder="请输入手机号" v-model="formData.account" />
                        </div>
                    </div>
                    <div class="supplement_sign_smsinfo_form">
                        <label for="验证码">验证码</label>
                        <div class="supplement_sign_smsinfo_inputBox">
                            <el-input class="input" placeholder="请输入验证码" v-model="formData.verificationCode" />
                            <div class="code" @click="sendCode">获取验证码</div>
                        </div>
                    </div>
                    <el-button class="large_btn" @click="smsConfirm">确定</el-button>
                </div>
                <div class="supplement_sign_coninfo_content" v-if="isShow.livingRecordShow">
                    <div class="supplement_sign_livingRecord_con">
                        <div class="upload">
                            <!-- :on-success="onUpload" -->
                            <el-upload v-model:file-list="state.photoList" :action="uploadUrl"
                                accept=".jpg,.png,.jpeg,.mp4,.mov,.avi" list-type="picture-card" multiple :limit="10"
                                :class="state.photoList.length === 10 ? 'hideUpload' : ''" :on-success="uploadSuccess">
                                <el-icon>
                                    <Plus />
                                </el-icon>
                                <template #file="{ file }">
                                    <div>
                                        <img v-if="
                                            file.name.indexOf('.jpg') > -1 ||
                                            file.name.indexOf('.png') > -1 ||
                                            file.name.indexOf('.jpeg') > -1
                                        " :src="file.url" alt="" class="el-upload-list__item-thumbnail" />
                                        <video v-else-if="
                                            file.name.indexOf('.mp4') > -1 ||
                                            file.name.indexOf('.mov') > -1 ||
                                            file.name.indexOf('.avi') > -1
                                        " class="el-upload-list__item-thumbnail" style="width: 100%; height: 100%"
                                            autoplay :src="file.url">
                                            <source :src="file.url" type="video/mp4" />
                                            <source :src="file.url" type="video/mov" />
                                            <source :src="file.url" type="video/avi" />
                                        </video>
                                        <span class="el-upload-list__item-actions">
                                            <span class="el-upload-list__item-preview" @click="handlePreview(file)">
                                                <el-icon><zoom-in /></el-icon>
                                            </span>
                                            <span v-if="!state.disabledBtn" class="el-upload-list__item-delete"
                                                @click="handleRemove(file)">
                                                <el-icon>
                                                    <Delete />
                                                </el-icon>
                                            </span>
                                        </span>
                                    </div>
                                </template>
                            </el-upload>
                            <el-dialog v-model="state.dialogVisible">
                                <img w-full :src="state.dialogImageFile.url" alt="" v-if="
                                    state.dialogImageFile.name.indexOf('.jpg') > -1 ||
                                    state.dialogImageFile.name.indexOf('.png') > -1 ||
                                    state.dialogImageFile.name.indexOf('.jpeg') > -1
                                " />
                                <video v-else-if="
                                    state.dialogImageFile.name.indexOf('.mp4') > -1 ||
                                    state.dialogImageFile.name.indexOf('.mov') > -1 ||
                                    state.dialogImageFile.name.indexOf('.avi') > -1
                                " w-full style="width: 100%; height: 100%" controls autoplay
                                    :src="state.dialogImageFile.url">
                                    <source :src="state.dialogImageFile.url" type="video/mp4" />
                                    <source :src="state.dialogImageFile.url" type="video/mov" />
                                    <source :src="state.dialogImageFile.url" type="video/avi" />
                                </video>
                            </el-dialog>
                        </div>
                    </div>
                    <el-button class="large_btn" @click="livingRecordConfirm">确定</el-button>
                </div>
                <div class="supplement_sign_coninfo_content" v-if="isShow.creditReportAgreementShow">
                    <credit-agreement :key="Math.random()" :busiType="busiType" :applyNo="applyNo"
                        :replenishData="replenishData" @isCheckAgreement="isCheckAgreement"></credit-agreement>
                    <el-button @click="agreementConfirm">确定</el-button>
                </div>
            </el-drawer>
        </div>
    </div>
</template>

<script setup lang="ts">
import { replenishAgreementCredit, replenishAgreementList, replenishAgreementLoan, replenishFaceCheck, replenishList, replenishsmsSend, replenishsmsSendverify } from '@/api/replenish';
import { baseURL } from '@/utils/request';
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus';
import { computed, onMounted, reactive, ref, shallowRef, watch } from 'vue'
import creditAgreement from "@/components/agreement/agreement.vue";
import { useRouter } from 'vue-router';
import { uploadFile } from '@/api/apply';
const router = useRouter();
// router query
const routerQuery: any = router.currentRoute.value.query;
const applyNo = routerQuery?.applyNo || '';
const headerTitle = ref('')
const isShow = ref({
    smsVerificationShow: false,
    livingRecordShow: false,
    creditReportAgreementShow: false,
    loanAgreementShow: false,
});
const drawerShow = ref(false)
const replenishDetailList: any = ref([]);
const replenishAgreementData: any = ref([]);
const currentReplenishInfo = ref();
const formData = reactive({
    account: '',
    verificationCode: '',
})
const codeBtnText = ref('发送验证码');
const disableBtn = ref(false);
const timer = ref()
const busiType = ref('')
const replenishData = ref()
const isAgreeAgreement = ref(false)
const init = async () => {
    let params: object = {
        applyNo: applyNo
    }
    await replenishList(params).then((res: any) => {
        if (res.code === 200) {
            res.data.map((ele: any) => {
                switch (ele.itemType) {
                    case 'SMS':
                        ele.itemName = '短信验证'
                        break;
                    case 'FACE_CHECK':
                        ele.itemName = '活体补录'
                        break;
                    case 'AGREEMENT_COMMON':
                        ele.itemName = '征信协议'
                        break;
                    case 'AGREEMENT_LOAN':
                        ele.itemName = '借款协议'
                        break;
                    default:
                        break;
                }
            })
            replenishDetailList.value = res.data;
            if (res.data.length === 0) {
                router.push('/applyManage/applyList')
            }
        } else {
        }
    });
}
onMounted(() => {
    init()
})
// 短信-发送验证码
const sendCode = async () => {
    if (disableBtn.value) return;
    if (!formData.account || !/^1[3456789]\d{9}$/.test(formData.account)) {
        // 手机号格式错误处理
        ElMessage({
            message: "请输入正确的手机号",
            type: 'error',
            duration: 3000 // 显示3秒后消失
        });
        // 请输入正确的手机号
        return;
    }
    disableBtn.value = true;
    codeBtnText.value = '60s后再发送';
    const countDown = (num: number) => {
        if (num <= 0) {
            disableBtn.value = false;
            codeBtnText.value = '重新发送验证码';
        } else {
            codeBtnText.value = `${num}s后再发送`;
            timer.value = setTimeout(() => {
                countDown(num - 1);
            }, 1000);
        }
    };
    countDown(60);
    try {
        // 发送验证码
        let params: object = {
            "itemCode": currentReplenishInfo.value.itemCode,
            "itemType": currentReplenishInfo.value.itemType,
            "mobileNo": formData.account,
            "replenishNum": currentReplenishInfo.value.replenishNum
        }
        await replenishsmsSendverify(applyNo, params).then((res: any) => {
            if (res.code === 200) {
                ElMessage({
                    message: "发送成功",
                    type: 'success',
                    duration: 3000 // 显示3秒后消失
                });
                disableBtn.value = false;
            } else {
                clearTimeout(timer.value);
                disableBtn.value = false;
                codeBtnText.value = '发送验证码';
            }
        });
    } catch (error) {
        // 错误处理
    }
};
const handleDrawerShow = () => {
    drawerShow.value = true;
}
const handleDrawerHide = () => {
    drawerShow.value = false;
}
// 短信验证
const toVerification = async (item: any) => {
    cancel()
    switch (item?.itemType) {
        case 'SMS':
            isShow.value.smsVerificationShow = true;
            headerTitle.value = '短信验证'
            currentReplenishInfo.value = item;
            break;
        case 'FACE_CHECK':
            isShow.value.livingRecordShow = true;
            headerTitle.value = '活体补录'
            currentReplenishInfo.value = item;
            break;
        case 'AGREEMENT_COMMON':
            isShow.value.creditReportAgreementShow = true;
            headerTitle.value = '征信协议'
            currentReplenishInfo.value = item;
            replenishData.value = {
                "replenishNum": item?.replenishNum,
            }
            busiType.value = 'REPLENISH_COMMON';
            break;
        case 'AGREEMENT_LOAN':
            isShow.value.creditReportAgreementShow = true;
            headerTitle.value = '借款协议'
            currentReplenishInfo.value = item;
            replenishData.value = {
                "replenishNum": item?.replenishNum,
            }
            busiType.value = 'REPLENISH_LOAN'
            break;
        default:
            break;
    }
    handleDrawerShow();
}
// 短信确认
const smsConfirm = async () => {
    const loading = ElLoading.service({
        lock: true,
        text: '加载中',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    // 发送验证码
    let params: object = {
        "itemCode": currentReplenishInfo.value.itemCode,
        "itemType": currentReplenishInfo.value.itemType,
        "mobileNo": formData.account,
        "replenishNum": currentReplenishInfo.value.replenishNum,
        "smsCode": formData.verificationCode
    }
    await replenishsmsSend(applyNo, params).then((res: any) => {
        if (res.code === 200) {
            handleDrawerHide();
            isShow.value.smsVerificationShow = false;
            init();
            loading.close();
        } else {
            loading.close();
        }
    });
}
const uploadSuccess = async (response: any, file: any, fileList: any) => {
    file['fileName'] = file.response.data.fileName;
}
// 刷脸验证
const livingRecordConfirm = async () => {
    let fileList = state.photoList.map((ele: any) => {
        return {
            name: ele?.fileName,
            // FRONT_PHOTO：活体照片 FRONT_VIDEO：活体视频
            type: ele.raw.type.indexOf('video') > -1 ? 'FRONT_VIDEO' : 'FRONT_PHOTO'
        }
    })
    const loading = ElLoading.service({
        lock: true,
        text: '加载中',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    let params: object = {
        "itemCode": currentReplenishInfo.value.itemCode,
        "itemType": currentReplenishInfo.value.itemType,
        "replenishNum": currentReplenishInfo.value.replenishNum,
        "fileList": fileList
    }
    await replenishFaceCheck(applyNo, params).then((res: any) => {
        if (res.code === 200) {
            handleDrawerHide();
            isShow.value.livingRecordShow = false;
            init();
            loading.close();
        } else {
            loading.close();
        }
    });
}

// 协议确认
const agreementConfirm = async () => {
    if (isAgreeAgreement.value) {
        const loading = ElLoading.service({
            lock: true,
            text: '加载中',
            background: 'rgba(0, 0, 0, 0.7)',
        })
        // 征信
        if (currentReplenishInfo.value.itemType === 'AGREEMENT_COMMON') {
            let params: object = {
                "replenishNum": currentReplenishInfo.value.replenishNum
            }
            await replenishAgreementCredit(applyNo, params).then((res: any) => {
                if (res.code === 200) {
                    ElMessage({
                        message: "认证成功",
                        type: 'success',
                        duration: 3000 // 显示3秒后消失
                    });
                    handleDrawerHide();
                    cancel()
                    init()
                    loading.close();
                } else {
                    loading.close();
                }
            });
        }
        // 借款
        if (currentReplenishInfo.value.itemType === 'AGREEMENT_LOAN') {
            let params: object = {
                "replenishNum": currentReplenishInfo.value.replenishNum
            }
            await replenishAgreementLoan(applyNo, params).then((res: any) => {
                if (res.code === 200) {
                    ElMessage({
                        message: "认证成功",
                        type: 'success',
                        duration: 3000 // 显示3秒后消失
                    });
                    handleDrawerHide();
                    cancel()
                    init()
                    loading.close();
                } else {
                    loading.close();
                }
            });
        }
    } else {
        ElMessage({
            message: "请先阅读协议",
            type: 'error',
            duration: 3000 // 显示3秒后消失
        });
    }
}
const handleClose = (done: () => void) => {
    ElMessageBox.confirm('确认要关闭吗?')
        .then(() => {
            done()
            cancel()
            handleDrawerHide();
        })
        .catch(() => {
            // catch error
        })
}
const cancel = () => {
    isShow.value = {
        smsVerificationShow: false,
        livingRecordShow: false,
        creditReportAgreementShow: false,
        loanAgreementShow: false,
    }
}
const state = reactive({
    photoList: [] as any, // 上传图片
    dialogVisible: false as boolean,
    dialogImageFile: "" as any,
    disabledBtn: false as boolean,
});
const uploadUrl = uploadFile();

// 预览图片和视频
const handlePreview = (file: any) => {
    state.dialogImageFile = file;
    state.dialogVisible = true;
};
// 删除图片视频
const handleRemove = (file: any) => {
    state.photoList.map((item: any, index: number) => {
        if (item.response && item.response.data) {
            if (
                item.response.data == file.response?.data ||
                item.response.data == file.url
            ) {
                state.photoList.splice(index, 1);
            }
        } else if (item.url) {
            if (item.url == file.response?.data || item.url == file.url) {
                state.photoList.splice(index, 1);
            }
        }
    });
};
// 是否阅读协议-状态
const isCheckAgreement = (e?: any) => {
    isAgreeAgreement.value = e;
}
</script>

<style lang="scss" scoped>
.supplement_sign {
    height: calc(100vh - 44px);
    background: #f4f6f8;
    position: relative;


    .supplement_sign_con {
        padding: 16px;

        .supplement_sign_desc {
            height: 9rem;
            line-height: 9rem;
            font-size: 1.4rem;
            font-weight: bold;
        }

        .supplement_sign_con_info {
            height: 4rem;
            background: #fff;
            border-radius: .6rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            padding: 0 1rem;
        }
    }

    // 认证内容
    // .supplement_sign_coninfo {
    // position: absolute;
    // bottom: 0;
    // width: 100%;
    // height: 100%;
    // background: rgba(0, 0, 0, 0.5);

    :deep(.el-drawer){
        height: 50% !important;
    }
    .supplement_sign_coninfo_content {
        width: calc(100% - 2rem);
        height: calc(100% - 42px);
        background: #fff;
        position: absolute;
        bottom: 0;
        padding: 1rem;
        .read_agreement {
            max-height: 280px;
            overflow-y: scroll;
        }
    }

    // 短信认证
    .supplement_sign_smsinfo_form {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ddd;
        position: relative;

        label {
            width: 3rem;
        }

        .supplement_sign_smsinfo_inputBox {
            height: 3rem;
            line-height: 3rem;
            display: flex;
            align-items: center;
            margin-left: 1rem;

            .code {
                position: absolute;
                right: 0;
            }
        }
    }

    // 活体补录
    .supplement_sign_livingRecord_con {
        height: calc(100% - 58px);
    }

    // }
}
</style>