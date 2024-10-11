<template>
    <div class="create">
        <div>
            <div>
                <label for="类型" class="create_label" style="">类型:</label>
                <el-select v-model="type" placeholder="请选择" class="w-300" @change="typeChange">
                    <el-option v-for="(select, index) in typeSelectData" :label="select.label" :value="select.value" />
                </el-select>
            </div>
            <div>
                <label for="key" class="create_label"
                    style="padding-right: 10px; width: 150px; display: inline-block">key:</label>
                <el-input v-model="key" autocomplete="off" class="w-300" />
            </div>
            <div>
                <label for="value" class="create_label"
                    style="padding-right: 10px; width: 150px; display: inline-block">值:</label>
                <div v-if="type === 'image'">
                    <div class="header_title" style="">上传</div>
                    <div>
                        <div class="upload">
                            <el-upload v-model:file-list="state.photoList" :action="uploadUrl" list-type="picture-card"
                                :on-success="onUpload" :on-preview="handlePreview" :on-remove="handleRemove">
                                <el-icon>
                                    <Plus />
                                </el-icon>
                            </el-upload>

                            <el-dialog v-model="state.dialogVisible">
                                <img w-full :src="state.dialogImageFile.url" alt="Preview Image" />
                            </el-dialog>
                        </div>
                    </div>
                </div>
                <template v-else>
                    <el-input v-model="value" autocomplete="off" class="w-300" />
                </template>
            </div>
            <div>
                <label for="remark" class="create_label"
                    style="padding-right: 10px; width: 150px; display: inline-block">备注:</label>
                <el-input v-model="remark" autocomplete="off" class="w-300" />
            </div>

            <!-- <div>
                <label for="状态" class="create_label"
                    style="padding-right: 10px; width: 150px; display: inline-block">状态:</label>
                <el-select v-model="status" placeholder="请选择" class="w-300">
                    <el-option v-for="(select, index) in statusSelectData" :label="select.label"
                        :value="select.value" />
                </el-select>
            </div> -->
        </div>

        <!-- <div>
            <div class="header_title" style="">内容</div>
            <div style="border: 1px solid #ccc">
                <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
                    :mode="'default'" />
                <Editor style="height: 500px; overflow-y: hidden;" v-model="content" :defaultConfig="editorConfig"
                    :mode="'default'" @onCreated="handleCreated" />
            </div>
        </div> -->
        <el-button @click="create">{{ currentStatus === 'edit' ? '更新' : '创建' }}</el-button>
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref, shallowRef } from "vue";
import {
    ElMessage,
    type UploadProps,
} from "element-plus";
import { uploadFile } from "@/api/apply";
import { cmsSlideCreate, cmsArticleCreate, cmsDetail, cmsSlideUpdate, cmsArticleUpdate, categorySelectList, configSave, updateConfig, configDetail } from "@/api/officialSite";
import '@wangeditor/editor/dist/css/style.css' // 引入 css
// import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { useRouter } from 'vue-router';
const router = useRouter();
// router query
const routerQuery: any = router.currentRoute.value.query;
const currentStatus = routerQuery?.status || '';
const type = ref("String");
const typeSelectData = ref([
    {
        label: "字符串",
        value: "String"
    },
    {
        label: "整型",
        value: "Integer"
    },
    {
        label: "图片",
        value: "image"
    },
    // {
    //     label: "JSON",
    //     value: "Json"
    // },
])
const coverImageAddr = ref("");
const title = ref("");
const weight = ref("");
const content = ref("");
const position = ref("");
const category = ref("");
const categorySelectData: any = ref([])

const key = ref("");
const value = ref("");
const remark = ref("");
const status = ref("0");
const statusSelectData: any = ref([
    {
        label: "启用",
        value: "0"
    },
    {
        label: "禁用",
        value: "1"
    },
])

const uploadUrl = uploadFile();
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const toolbarConfig = {}
const editorConfig: any = {
    placeholder: '请输入内容...', MENU_CONF: {
        uploadImage: {
            // 小于该值就插入 base64 格式（而不上传），默认为 0
            base64LimitSize: 5 * 1024, // 5kb
            // 单个文件的最大体积限制，默认为 2M
            // maxFileSize: 1 * 1024 * 1024, // 1M
            // // 最多可上传几个文件，默认为 100
            // maxNumberOfFiles: 5,
            // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
            allowedFileTypes: ['image/*'],
            // 自定义上传
            async customUpload(file: any, insertFn: any) { // 文件上传
                let form = new FormData();
                form.append("file", file);
                let res = await uploadFile();  //此方法返回上传后的id
                console.log(res);
                // 最后插入图片 insertFn方法参数(url, alt, href)，路径根据自己的项目需求配置
                //   insertFn(`${http://localhost:8183/}file/preview/${res}`, '', `${http://localhost:8183/}file/preview/${res}`)
            }
            // fieldName: 'file',
            // server: uploadUrl,
        },
    }
}
onMounted(async () => {
    // init()
    editorConfig.MENU_CONF['uploadImage'] = {
        server: uploadUrl,
    }
    if (currentStatus === 'edit') {
        let params = {
            id: routerQuery?.id || '',
        }
        await configDetail(params).then((res: any) => {
            if (res.code === 200) {
                console.log(res.data)
                let data = res.data;
                key.value = data.k || "";
                value.value = data.v || "";
                type.value = data.type;
                // typeChange()
                remark.value = data.remark;
                // status.value = data.status || "";
                if (data?.v) {
                    state.photoList.push({
                        name: data.v,
                        fileName: data.v,
                        url: data.fileUrl
                    })
                    console.log(state.photoList);
                }
            } else {

            }
        });
    }
});
const typeChange = async () => {
    if (type.value === 'ARTICLE') {
        await categorySelectList().then((res: any) => {
            if (res.code === 200) {
                console.log(res.data)
                categorySelectData.value = res.data;
            } else {

            }
        });
    }

}
const onUpload = async (obj: any, file: any, fileList: any) => {
    console.log(`onUpload===：${obj}`);
    console.log(obj);
    console.log(file);
    console.log(fileList, fileList.length);
    console.log(state.photoList);
    file.fileName = file?.response?.data?.fileName;
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

const create = async () => {
    let params: any = {
        //   "id": 0,
        "k": key.value,
        "v": type.value === 'image' ? state.photoList[0]?.fileName || '' : value.value,
        "remark": remark.value,
        "status": status.value,
        "type": type.value,
    }
    if (currentStatus !== 'edit') {
        await configSave(params).then((res: any) => {
            if (res.code === 200) {
                ElMessage({
                    message: "创建成功",
                    type: 'success',
                    duration: 3000 // 显示3秒后消失
                });
                router.push({
                    path: '/officialSite/configList',
                    // query: {
                    //     applyNo: row.applyNo,
                    //     customerCode: row.customerCode,
                    //     status: 'detail'
                    // }
                })
            } else {
            }
        });
    } else {
        // 只能修改v字段值，其他现在不可修改
        params['id'] = routerQuery?.id || '';
        await updateConfig(params).then((res: any) => {
            if (res.code === 200) {
                ElMessage({
                    message: "更新成功",
                    type: 'success',
                    duration: 3000 // 显示3秒后消失
                });
                router.push({
                    path: '/officialSite/configList',
                })
            } else {
            }
        });
    }
}
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor: any) => {
    editorRef.value = editor // 记录 editor 实例，重要！
    console.log(editorRef.value);
}
</script>

<style lang="scss" scoped>
.create {
    padding: 16px;
    background: #fff;

}

.create_label {
    padding-right: 10px;
    width: 150px;
    display: inline-block;
    text-align: right;
    margin-top: 10px;
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
</style>
