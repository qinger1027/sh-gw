<template>
  <!-- 上传 -->
  <div style="padding: 26px 26px 26px 16px">
    <label for="上传文件" style="margin-bottom: 10px; display: inline-block">
      <span style="color: red">*</span>
      <div>上传材料：支持.jpg,.png,.jpeg,.mp4,.mov,.avi</div>
    </label>
    <div class="upload">
      {{ state.photoList }}
      <el-upload
        v-model:file-list="state.photoList"
        :action="uploadUrl"
        accept=".jpg,.png,.jpeg,.mp4,.mov,.avi"
        list-type="picture-card"
        multiple
        :limit="10"
        :on-success="onUpload"
        :class="state.photoList.length === 10 ? 'hideUpload' : ''"
      >
        <template #default>
          <el-icon>
            <Plus />
          </el-icon>
        </template>
        <template #file="{ file }">
          <div v-if="file.required">
            <div>
              <img
                v-if="
                  file?.fileType == 'jpg' ||
                  file?.fileType == 'png' ||
                  file?.fileType == 'jpeg'
                "
                :src="file.url"
                alt=""
                class="el-upload-list__item-thumbnail"
              />
              <video
                v-else-if="
                  file?.fileType == 'mp4' ||
                  file?.fileType == 'mov' ||
                  file?.fileType == 'avi'
                "
                class="el-upload-list__item-thumbnail"
                style="width: 100%; height: 100%"
                autoplay
                :src="file.url"
              >
                <source :src="file.url" type="video/mp4" />
                <source :src="file.url" type="video/mov" />
                <source :src="file.url" type="video/avi" />
              </video>
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePreview(file)"
                >
                  <el-icon><zoom-in /></el-icon>
                </span>
                <span
                  v-if="!state.disabledBtn"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <el-icon>
                    <Delete />
                  </el-icon>
                </span>
              </span>
            </div>
          </div>
          <div v-else="!file.required">
            <el-icon>
              <Plus />
            </el-icon>
          </div>
        </template>
      </el-upload>
      <el-dialog v-model="state.dialogVisible">
        <img
          w-full
          :src="state.dialogImageFile.url"
          alt=""
          v-if="
            state.dialogImageFile?.fileType == 'jpg' ||
            state.dialogImageFile?.fileType == 'png' ||
            state.dialogImageFile?.fileType == 'jpeg'
          "
        />
        <video
          v-else-if="
            state.dialogImageFile?.fileType == 'mp4' ||
            state.dialogImageFile?.fileType == 'mov' ||
            state.dialogImageFile?.fileType == 'avi'
          "
          w-full
          style="width: 100%; height: 100%"
          controls
          autoplay
          :src="state.dialogImageFile.url"
        >
          <source :src="state.dialogImageFile.url" type="video/mp4" />
          <source :src="state.dialogImageFile.url" type="video/mov" />
          <source :src="state.dialogImageFile.url" type="video/avi" />
        </video>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  applyGetMaterial,
  queryApplyListSearch,
  uploadFile,
} from "@/api/apply";
import router from "@/router";
import { baseURL } from "@/utils/request";
import { ElMessage, type UploadProps, type UploadUserFile } from "element-plus";
import { onMounted, reactive, ref } from "vue";
const props = defineProps({
  applyGetMaterialData: Array,
});
const state = reactive({
  photoList: [] as any, // 上传图片
  dialogVisible: false as boolean,
  dialogImageFile: "" as any,
  disabledBtn: false as boolean,
});
// state.photoList = props.applyGetMaterialData;
// console.log(state.photoList);
// const applyGetMaterialData: any = ref(props.applyGetMaterialData);
const routerQuery: any = router.currentRoute.value.query;
const status = routerQuery?.status || "";
const init = async () => {
  await applyGetMaterial().then((res: any) => {
    if (res.code === 200) {
      let data = res.data;
      state.photoList = data;
    }
  });

  // 工单详情
  if (status === "detail" || status === "edit") {
    let params = {
      customerCode: routerQuery?.customerCode,
      applyNo: routerQuery?.applyNo,
    };
    await queryApplyListSearch(params)
      .then((res: any) => {
        if (res.code === 200) {
          console.log(res.data);
          let data = res.data;
          console.log(state.photoList);
          state.photoList.map((ele: any) => {
            data.files.map((file: any) => {
              if (file.bizType === ele.bizCode) {
                ele.url = file.fileUrl;
                ele.fileName = file.fileName;
                ele.fileType = file.fileType;
              }
            });
          });
          console.log(state.photoList);
        } else {
          // 接口status不管是200还是500 && response.code不为200
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
onMounted(() => {
  init();
});

const uploadUrl = `${baseURL}/api/cos/upload`;
const fileList = ref<UploadUserFile[]>([]);
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const crtindex = ref();

const onUpload = async (obj: any, file: any, fileList: any) => {
  console.log(`onUpload===：${obj}`);
  console.log(obj);
  console.log(file);
  console.log(fileList, fileList.length);
};
// 预览图片和视频
const handlePreview = (file: any) => {
  state.dialogImageFile = file;
  state.dialogVisible = true;
};
// 删除图片视频
const handleRemove = (file: any) => {
  // state.photoList.map((item: any, index: number) => {
  //   if (item.response && item.response.data) {
  //     if (
  //       item.response.data == file.response?.data ||
  //       item.response.data == file.url
  //     ) {
  //       state.photoList.splice(index, 1);
  //     }
  //   } else if (item.url) {
  //     if (item.url == file.response?.data || item.url == file.url) {
  //       state.photoList.splice(index, 1);
  //     }
  //   }
  // });
  file.url = "";
  file.fileType = "";
};
</script>

<style lang="scss" scoped></style>
