<template>
    <div class="apply_order">
        <div class="customer_info">
            <!-- <div class="header_title">用户信息</div> -->
            <customer-info @downAccountInfoData="getdownAccountInfoData"></customer-info>
        </div>
        <div class="">
            <!-- <div class="header_title">工单信息</div> -->
            <apply-info @applyInfoData="getapplyData"></apply-info>
        </div>
        <div>
            <div class="header_title" style="">下户</div>
            <div>上传材料：支持.jpg,.png,.jpeg,.mp4,.mov,.avi</div>
            <div>
                <div class="upload">
                    <el-upload v-model:file-list="state.photoList" :action="uploadUrl"
                        accept=".jpg,.png,.jpeg,.mp4,.mov,.avi" list-type="picture-card" multiple :limit="10"
                        :on-success="onUpload" :class="state.photoList.length === 10 ? 'hideUpload' : ''">
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
                                " class="el-upload-list__item-thumbnail" style="width: 100%; height: 100%" autoplay
                                    :src="file.url">
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
                        "  class="w-full"/>
                        <video v-else-if="
                            state.dialogImageFile.name.indexOf('.mp4') > -1 ||
                            state.dialogImageFile.name.indexOf('.mov') > -1 ||
                            state.dialogImageFile.name.indexOf('.avi') > -1
                        " w-full class="w-full" controls autoplay :src="state.dialogImageFile.url">
                            <source :src="state.dialogImageFile.url" type="video/mp4" />
                            <source :src="state.dialogImageFile.url" type="video/mov" />
                            <source :src="state.dialogImageFile.url" type="video/avi" />
                        </video>
                    </el-dialog>
                </div>
            </div>
        </div>
        <!-- A12下户审核中&A03审核拒绝时不能再点击按钮 -->
        <el-button type="primary" v-if="applyInfoData.applyStatus ==='A12' && applyInfoData.guestStatus !=='A03'" @click="downAccount('pass')">
            下户审核通过
        </el-button>
        <el-button type="primary" v-if="applyInfoData.applyStatus ==='A12' && applyInfoData.guestStatus !=='A03'" @click="downAccountdialogRef.show();">
            下户审核拒绝
        </el-button>
        <!-- 拒绝 弹框 -->
        <common-dialog ref="downAccountdialogRef" :headerTitle="''" @confirm="downAccount('reject')"
            @cancel="downAccountCancel">
            <el-form ref="downAccountFormRef" :model="downAccountInfoData" :rules="downAccountStatusRules">
                <el-form-item v-for="(item, index) in downAccountStatusColumns" :label="item.label" :prop="item.key"
                    :label-width="item.width">
                    <el-input v-model="downAccountInfoData[item.key]" autocomplete="off" style="width:360px;" />
                </el-form-item>
            </el-form>
        </common-dialog>
        <!-- 拒绝 弹框end -->
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import {
    ElMessage,
    type FormInstance,
    type FormRules,
    type UploadProps,
} from "element-plus";
import { useRouter } from "vue-router";
import customerInfo from "@/components/customer_info/index.vue";
import applyInfo from "@/components/apply_info/index.vue";
import commonDialog from "@/components/dialog/index.vue";
import { downAccountPass, downAccountReject } from "@/api/downAccount";
import { baseURL } from "@/utils/request";
import { uploadFile } from "@/api/apply";
const router = useRouter();
// router query
const routerQuery: any = router.currentRoute.value.query;
// 下户需要用到的数据
const downAccountInfoData: any = ref({});
const applyInfoData: any = ref({});
// 拒绝弹框字段
interface ruleForm {
    remark: string
}
const downAccountStatusColumns = ref([
    { width: 100, label: '拒绝原因', key: 'remark' },
]);
const downAccountStatusRules = reactive<FormRules<ruleForm>>({
    remark: [
        { required: true, message: '请输入拒绝原因', trigger: 'blur', type: 'string' },
    ]
})
const downAccountdialogRef = ref()
const downAccountFormRef = ref<FormInstance>()
onMounted(() => {
    // init()
});
const uploadUrl = uploadFile();
const onUpload = async (obj: any, file: any, fileList: any) => {
    console.log(`onUpload===：${obj}`);
    console.log(obj);
    console.log(file);
    console.log(fileList, fileList.length);
};

// 上传前
const beforeUpload: UploadProps["beforeUpload"] = (file) => {
    console.log(file);
    let fileSize = Number(file.size / 1024 / 1024);
    if (fileSize > 5) {
        ElMessage({
            message: "文件大小不能超过5MB，请重新上传。",
            type: "warning",
        });
        return false;
    }
    return true;
};

// 删除图片
// const delImg = async (item: any, index: any) => {
//   if (item.bizCode == "other") {
//     applyGetMaterialData.value[index].src = "";
//     delete applyGetMaterialData.value[index].fileName;
//   }
//   delete item.src;
//   delete item.fileName;
// };
// 确认下户
const confirmDownAccount = async () => {
    // let files = state.photoList.map((ele: any) => {
    //     return {
    //         //   "bizType": ele.bizType,
    //         "fileName": ele.response.data.fileName,
    //         "fileType": ele.response.data.fileName.split(".")[1]
    //     }
    // })
    // console.log(files);
};

const state = reactive({
    photoList: [] as any, // 上传图片
    dialogVisible: false as boolean,
    dialogImageFile: "" as any,
    disabledBtn: false as boolean,
});

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
/**
 * @desc 下户用到的字段
 * @param e "customerCode"，"applyNo"，"rowVersion"
 */
const getdownAccountInfoData = (e: any) => {
    downAccountInfoData.value = e;
    console.log(downAccountInfoData.value);
}
const getapplyData = (e: any) => {
    applyInfoData.value = e;
    console.log(e);
}
// 下户审核
const downAccount = async (status: any) => {
    // 拒绝
    if (status === 'reject') {
        if (!downAccountFormRef.value) return
        await downAccountFormRef.value?.validate(async (valid: any, fields: any) => {
            if (valid) {
                try {
                    await updatedownAccountStatus(status)
                } catch (error) {
                    console.error('Failed to data:', error);
                }
            } else {
                console.log('error submit!', fields)
            }
        })
    } else {
        await updatedownAccountStatus(status);
    }
};
// 更新下户状态
const updatedownAccountStatus = async (status: any) => {
    let params = {
        "customerCode": downAccountInfoData.value.customerCode,
        "applyNo": downAccountInfoData.value.applyNo,
        "remark": downAccountInfoData.value.remark || '',
        "rowVersion": downAccountInfoData.value.rowVersion
    }
    console.log(status, params);
    if (status === 'pass') {
        await downAccountPass(params).then((res: any) => {
            if (res.code === 200) {
                ElMessage({
                    message: "下户审核通过",
                    type: 'success',
                    duration: 3000 // 显示3秒后消失
                });
                downAccountdialogRef.value.close();
                router.push('/applyManage/applyList')
            } else {
                // 接口status不管是200还是500 && response.code不为200
            }
        });
    } else if (status === 'reject') {
        await downAccountReject(params).then((res: any) => {
            if (res.code === 200) {
                ElMessage({
                    message: "下户审核拒绝",
                    type: 'success',
                    duration: 3000 // 显示3秒后消失
                });
                router.push('/applyManage/applyList')
            } else {
                // 接口status不管是200还是500 && response.code不为200
            }
        });
    }
}

const downAccountCancel = () => {
    downAccountdialogRef.value.close();
    if (downAccountInfoData.value?.remark) downAccountInfoData.value.remark = ''
}

</script>

<style lang="scss" scoped>
.apply_order {
    padding: 16px;
    background: #fff;

    .el-form {
        display: flex;
        flex-wrap: wrap;

        .el-form-item {
            width: 400px;
            margin-right: 76px;

            .apply_order_form_item {
                display: flex;

                label {
                    width: 120px;
                    text-align: right;
                    margin-right: 6px;

                    span {
                        color: red;
                    }
                }
            }
        }
    }

    :deep(.el-upload--picture-card) {
        position: relative;
        margin-right: 16px;

        span {
            position: absolute;
            right: 6px;
            top: 0px;
        }

        img {
            &:hover {
                background-color: rgba(0, 0, 0, 0.2);
                opacity: 1;
            }
        }
    }
}

.required {
    color: red;
}

.video-container {
    video {
        width: 148px;
        height: 148px;
    }
}

// :deep(.hideUpload .el-upload--picture-card)  {
//         display: none;
//     }
//     :deep(.el-upload--picture-card) {
//         width: 243px;
//         height: 180px;
//     }
//     :deep(.el-upload-list--picture-card .el-upload-list__item) {
//         width: 243px;
//         height: 180px;
//     }
</style>
