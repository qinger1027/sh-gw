<!-- 工单申请 -->
<template>
  <div class="apply_order">
    <el-form ref="ruleFormRef" :model="applyInfoFormData" :rules="rules">
      <!-- 工单申请 -->
      <el-form-item v-for="(item, index) in applyOrder" :prop="item.key">
        <div class="apply_order_form_item" slot="label">
          <label :class="{ label_width: true }">
            <span v-if="item.key !== 'remark'">*</span>
            {{ item.label }}:
          </label>
          <!-- 下拉框  -->
          <template v-if="item.type == 'select'">
            <el-select
              v-model="applyInfoFormData[item.key]"
              placeholder="请选择"
              style="width: 300px"
              :disabled="item.disabled"
            >
              <el-option
                v-for="(select, index) in item?.selectData"
                :label="select.text"
                :value="select.value"
              />
            </el-select>
          </template>
          <!-- 输入框 -->
          <template v-else>
            <el-input
              v-model="applyInfoFormData[item.key]"
              autocomplete="off"
              style="width: 300px"
              :disabled="item.disabled"
            />
          </template>
        </div>
      </el-form-item>
    </el-form>
    <!-- 上传文件 -->
    <div style="padding: 26px 26px 26px 16px">
      <label for="上传文件" style="margin-bottom: 10px; display: inline-block">
        <span style="color: red">*</span>
        上传材料<!-- (支持jpg,png,mp4) -->
      </label>
      <div>
        <!-- 必填： -->
        <div style="display: flex">
          <label for=""><span class="required">*</span>必填：</label>
          <template v-for="(item, index) in applyGetMaterialData" :key="index">
            <div v-if="item.required" class="material_bg">
              <el-upload
                :class="{ material_upload: item?.src }"
                list-type="picture-card"
                :action="uploadUrl"
                :show-file-list="false"
                :on-change="onUpload.bind(null, { index: index, data: item })"
                :on-success="
                  uploadSuccess.bind(null, { index: index, data: item })
                "
                :before-upload="beforeAvatarUpload"
                :disabled="item?.src ? true : false"
                :multiple="item?.bizCode === 'other' ? true : false"
              >
                <template v-if="!item?.src && status !== 'detail'">
                  <div>
                    <el-icon>
                      <Plus />
                    </el-icon>
                    {{ item?.bizType ? item?.bizType : "其他" }}
                  </div>
                </template>
                <template v-else>
                  <img
                    v-if="
                      item?.fileType === 'jpg' ||
                      item?.fileType === 'png' ||
                      item?.fileType === 'jpeg'
                    "
                    :src="item.src"
                    alt=""
                    style="width: 100%; height: 100%"
                    class="el-upload-list__item-thumbnail"
                  />
                  <video
                    v-else-if="
                      item?.fileType === 'mp4' ||
                      item?.fileType === 'mov' ||
                      item?.fileType === 'avi'
                    "
                    class="el-upload-list__item-thumbnail"
                    style="width: 100%; height: 100%"
                    :src="item.src"
                  >
                    <source :src="item.src" type="video/mp4" />
                    <source :src="item.src" type="video/mov" />
                    <source :src="item.src" type="video/avi" />
                  </video>
                  <div class="material_icon">
                    <el-icon @click="handlePreview(item)"><zoom-in /></el-icon>
                    <el-icon
                      v-if="status !== 'detail'"
                      @click.stop="delImg(item, index)"
                    >
                      <Delete />
                    </el-icon>
                  </div>
                </template>
              </el-upload>
            </div>
          </template>
        </div>
        <!-- 必填：end -->
        <!-- 非必填： -->
        <div style="display: flex; margin-top: 16px; flex-wrap: wrap">
          非必填：
          <template v-for="(item, index) in applyGetMaterialData" :key="index">
            <div v-if="!item.required" class="material_bg">
              <!-- *非必填： -->
              <!-- <template v-if="status !== 'detail'"> -->
              <el-upload
                list-type="picture-card"
                :class="{ material_upload: item?.src }"
                :action="uploadUrl"
                :file-list="fileList"
                :show-file-list="false"
                :on-change="onUpload.bind(null, { index: index, data: item })"
                :on-success="
                  uploadSuccess.bind(null, { index: index, data: item })
                "
                :before-upload="beforeAvatarUpload"
                :disabled="item?.src ? true : false"
                :multiple="item?.bizCode === 'other' ? true : false"
              >
                <template v-if="!item?.src && status !== 'detail'">
                  <div>
                    <el-icon>
                      <Plus />
                    </el-icon>
                    {{ item?.bizType ? item?.bizType : "其他" }}
                  </div>
                </template>
                <template v-else>
                  <img
                    v-if="
                      item?.fileType === 'jpg' ||
                      item?.fileType === 'png' ||
                      item?.fileType === 'jpeg'
                    "
                    :src="item.src"
                    alt=""
                    style="width: 100%; height: 100%"
                    class="el-upload-list__item-thumbnail"
                  />
                  <video
                    v-else-if="
                      item?.fileType === 'mp4' ||
                      item?.fileType === 'mov' ||
                      item?.fileType === 'avi'
                    "
                    class="el-upload-list__item-thumbnail"
                    style="width: 100%; height: 100%"
                    :src="item.src"
                  >
                    <source :src="item.src" type="video/mp4" />
                    <source :src="item.src" type="video/mov" />
                    <source :src="item.src" type="video/avi" />
                  </video>
                  <div class="material_icon">
                    <el-icon @click="handlePreview(item)"><zoom-in /></el-icon>
                    <el-icon
                      v-if="status !== 'detail'"
                      @click.stop="delImg(item, index)"
                    >
                      <Delete />
                    </el-icon>
                  </div>
                </template>
              </el-upload>
            </div>
          </template>
        </div>
        <!-- 非必填：end -->
        <!-- 预览 -->
        <el-dialog v-model="state.dialogVisible" style="width: 26%">
          <img
            w-full
            :src="state.dialogImageFile.src"
            alt=""
            v-if="
              state.dialogImageFile?.fileType == 'jpg' ||
              state.dialogImageFile?.fileType == 'png' ||
              state.dialogImageFile?.fileType == 'jpeg'
            "
            style="width: 100%"
          />
          <video
            v-else-if="
              state.dialogImageFile?.fileType == 'mp4' ||
              state.dialogImageFile?.fileType == 'mov' ||
              state.dialogImageFile?.fileType == 'avi'
            "
            w-full
            style="width: 100%"
            controls
            autoplay
            :src="state.dialogImageFile.src"
          >
            <source :src="state.dialogImageFile.src" type="video/mp4" />
            <source :src="state.dialogImageFile.src" type="video/mov" />
            <source :src="state.dialogImageFile.src" type="video/avi" />
          </video>
        </el-dialog>
      </div>
    </div>
    <!-- 公共upload -->
    <!-- <common-upload :applyGetMaterialData="applyGetMaterialData"></common-upload> -->
    <el-button type="primary" @click="submit" v-if="status !== 'detail'">
      提交
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import apply_order from "@/assets/order/apply_order";
import apply_info_form_data from "@/assets/order/apply_order_form_data";
import {
  ElMessage,
  ElMessageBox,
  type FormInstance,
  type FormRules,
  type UploadProps,
  type UploadUserFile,
} from "element-plus";
import {
  applyGetMaterial,
  applyOrderSave,
  queryApplyListSearch,
  uploadFile,
} from "@/api/apply";
import { useRouter } from "vue-router";
import { updateApply } from "@/api/customer";
import { useMenuStore } from "@/stores/modules/menuTabs";
// import commonUpload from "@/components/upload/index.vue";
import { baseURL } from "@/utils/request";
import { loadingHide, loadingShow } from "@/utils/util";
const router = useRouter();
// router query
const routerQuery: any = router.currentRoute.value.query;
const status = routerQuery?.status || "";
// 申请工单字段
const applyOrder = ref(apply_order);
// 申请工单form
const applyInfoFormData: any = ref(apply_info_form_data);
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  productCode: [
    {
      required: true,
      message: "请输入产品代码",
      trigger: "blur",
      type: "string",
    },
  ],
  custType: [
    {
      required: true,
      message: "请输入客户类型",
      trigger: "blur",
    },
  ],
  partnerCode: [
    {
      required: true,
      message: "请输入合作机构号",
      trigger: "blur",
    },
  ],
  partnerProductCode: [
    {
      required: true,
      message: "请输入合作机构产品号",
      trigger: "blur",
    },
  ],
  loanPurpose: [
    {
      required: true,
      message: "请输入贷款用途",
      trigger: "blur",
    },
  ],
  loanType: [
    {
      required: true,
      message: "请输入贷款类型",
      trigger: "change",
    },
  ],
  bankCreditAmount: [
    {
      required: true,
      message: "请输入资方授信额度",
      trigger: "blur",
    },
  ],
  bankYearRate: [
    {
      required: true,
      message: "请输入年利率",
      trigger: "blur",
    },
  ],
  applyAmount: [
    {
      required: true,
      message: "请输入客户申请额度",
      trigger: "blur",
    },
  ],
  payType: [
    {
      required: true,
      message: "请输入还款方式",
      trigger: "change",
    },
  ],
  creditInstalments: [
    {
      required: true,
      message: "请输入分期期数",
      trigger: "blur",
    },
  ],
  creditStagingUnits: [
    {
      required: true,
      message: "请输入分期周期单位",
      trigger: "blur",
    },
  ],
  ccy: [
    {
      required: true,
      message: "请输入币种",
      trigger: "blur",
    },
  ],
  agrTerm: [
    {
      required: true,
      message: "请输入申请期限（月）",
      trigger: "blur",
    },
  ],
  rateType: [
    {
      required: true,
      message: "请输入利率类型",
      trigger: "blur",
    },
  ],
  rate: [
    {
      required: true,
      message: "请输入利率",
      trigger: "blur",
    },
  ],
  custRate: [
    {
      required: true,
      message: "请输入对客利率",
      trigger: "blur",
    },
  ],
  uumCustNo: [
    {
      required: true,
      message: "请输入客户中心编号",
      trigger: "blur",
    },
  ],
  salesPersonId: [
    {
      required: true,
      message: "请输入销售人员编号",
      trigger: "blur",
    },
  ],
});
const customer_info: any = localStorage.getItem("customer_info");
console.log(customer_info, JSON.parse(customer_info));
const customer_info_data = JSON.parse(customer_info);
// applyInfoFormData.value.mobile = JSON.parse(customer_info)?.mobile
applyInfoFormData.value.mobile = routerQuery?.mobile;

const applyGetMaterialData: any = ref([]);
const guestStatus: any = ref({
  status: "",
  remark: "",
});
const guestStatusData: any = ref([
  { value: "A02", text: "资料审核通过" },
  { value: "A03", text: "资料审核拒绝" },
]);
const menuStore = useMenuStore();
const state = reactive({
  dialogVisible: false as boolean,
  dialogImageFile: "" as any,
  disabledBtn: false as boolean,
});
const uploadUrl = uploadFile();
const fileList = ref<UploadUserFile[]>([]);
const init = async () => {
  await applyGetMaterial().then((res: any) => {
    if (res.code === 200) {
      let data = res.data;
      applyGetMaterialData.value = data;
    }
  });

  // 工单详情
  if (status === "detail" || status === "edit" || status === "h5_edit") {
    let params = {
      customerCode: routerQuery?.customerCode,
      applyNo: routerQuery?.applyNo,
    };
    await queryApplyListSearch(params)
      .then((res: any) => {
        if (res.code === 200) {
          console.log(res.data);
          let data = res.data;
          if(status !== "h5_edit"){
            Object.keys(data).map((ele: any) => {
              applyInfoFormData.value = data;
              if (data[ele]?.code) applyInfoFormData.value[ele] = data[ele]?.code;
            });
          } else {
            // h5 编辑
            applyInfoFormData.value.custType = data.personal === 1 ? "个人" : "企业";
            applyInfoFormData.value.loanPurpose = data?.loanPurpose?.code ? data?.loanPurpose?.code : data?.loanPurpose?.name;
            applyInfoFormData.value.applyAmount = data.applyAmount;
            applyInfoFormData.value.agrTerm = data.agrTerm;
            applyInfoFormData.value.applyNo = data.applyNo;
            applyInfoFormData.value.customerCode = data.customerCode;
            applyInfoFormData.value.rowVersion = data.rowVersion;
          }
          console.log(applyInfoFormData.value);
          applyGetMaterialData.value.map((ele: any) => {
            data.files.map((file: any) => {
              if (file.bizType === ele.bizCode) {
                ele.src = file.fileUrl;
                ele.fileName = file.fileName;
                ele.fileType = file.fileType;
              }
            });
          });
          console.log(applyGetMaterialData.value);
        } else {
          // 接口status不管是200还是500 && response.code不为200
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
onMounted(async () => {
  await init();
  if (status === "" || status === "edit") {
    applyInfoFormData.value.loanPurpose = customer_info_data.loanUse;
    applyInfoFormData.value.applyAmount = customer_info_data.loanAmt;
    applyInfoFormData.value.agrTerm = customer_info_data.loanPeriod;
    applyInfoFormData.value.custType = customer_info_data.custType;
  }
});

// 保存逻辑
const handleApplyInfoSave = async () => {
  loadingShow();
  console.log(applyGetMaterialData.value);
  applyInfoFormData.value["files"] = applyGetMaterialData.value
    .filter((item: any) => {
      return item.src;
    })
    .map((ele: any) => {
      return {
        bizType: ele.bizCode,
        fileName: ele.fileName,
        fileType: ele.fileName?.split(".")[1],
      };
    });
  applyInfoFormData.value.applyNo = routerQuery.applyId;
  // applyInfoFormData.value.applyNo = JSON.parse(customer_info).applyId
  console.log(applyInfoFormData.value);
  await applyOrderSave(applyInfoFormData.value).then((data) => {
    console.log(data);
    if (data.code === 200) {
      // 移除当前menu
      menuStore.removeMenuItem("/applyManage/applyForOrder");
      router.push("/applyManage/applyList");
      // 清空弹框信息
      clearFrom();
      localStorage.removeItem("customer_info");
      loadingHide();
    } else {
      // 接口status不管是200还是500 && response.code不为200
      loadingHide();
    }
  });
};

// 修改提交保存
const handleApplyInfoEditSave = async () => {
  loadingShow();
  applyInfoFormData.value["files"] = applyGetMaterialData.value
    .filter((item: any) => {
      return item.src;
    })
    .map((ele: any) => {
      return {
        bizType: ele.bizCode,
        fileName: ele.fileName,
        fileType: ele.fileName?.split(".")[1],
      };
    });
  console.log(applyInfoFormData.value);
  if(applyInfoFormData.value?.createTime) delete applyInfoFormData.value?.createTime;
  if(applyInfoFormData.value?.createUser) delete applyInfoFormData.value?.createUser;
  if(applyInfoFormData.value?.updateTime) delete applyInfoFormData.value?.updateTime;
  if(applyInfoFormData.value?.updateUser) delete applyInfoFormData.value?.updateUser;
  await updateApply(applyInfoFormData.value).then((data: any) => {
    if (data.code === 200) {
      // 移除当前menu
      menuStore.removeMenuItem("/applyManage/applyForOrder");
      // 跳转列表信息
      router.push("/applyManage/applyList");
      // 清空弹框信息
      clearFrom();
      localStorage.removeItem("customer_info");
      loadingHide();
    } else {
      loadingHide();
      console.log(data);
    }
  });
};

// 提交
const submit = async () => {
  console.log(routerQuery);
  if (!ruleFormRef.value) return;
  await ruleFormRef.value?.validate(async (valid, fields) => {
    if (valid) {
      // 判断那个没有上传 提示
      for (let i = 0; i < applyGetMaterialData.value.length; i++) {
        const ele = applyGetMaterialData.value[i];
        // 特定项的提示逻辑
        if (!ele.src && ele.required) {
          ElMessage({
            message: `请上传${ele.bizType}`,
            type: "error",
            duration: 3000, // 显示3秒后消失
          });
          return;
        }
      }
      if (status === "edit" || status === "h5_edit") {
        await handleApplyInfoEditSave();
      } else {
        await handleApplyInfoSave();
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};

// 清空form
const clearFrom = () => {
  Object.keys(applyInfoFormData.value).map((ele: any) => {
    applyInfoFormData.value[ele] = "";
  });
};

const onUpload = async (obj: any, file: any, fileList: any) => {
  console.log(`onUpload===：${obj}`);
  console.log(obj);
  console.log(file);
  console.log(fileList, fileList.length);
  loadingShow();
  if (file.status === "success") {
    loadingHide();
  }
};

/**
 * eg： obj = {index:0,data:{"bizType":"","bizCode":""}}
 * response upload接口响应的数据
 * file 上传的文件的信息
 */
const currentIndex = ref(0);
const uploadSuccess = async (
  obj: any,
  response: any,
  file: any,
  fileList: any
) => {
  console.log("onsuccess==：" + obj, response, file, fileList, fileList.length);
  console.log(obj);
  console.log(file);
  // if (response.code === 200) {
  // console.log(applyGetMaterialData.value);
  if (obj.data.bizCode === "other") {
    // obj.index=6 fileList.length总共传了几个
    // let currentIndex = obj.index + fileList.length;
    // console.log(currentIndex);
    console.log(currentIndex.value);
    if (currentIndex.value === 0) currentIndex.value = obj.index;
    applyGetMaterialData.value[currentIndex.value] = {
      src: file.url,
      fileName: file.response.data.fileName,
      bizCode: obj.data.bizCode,
      bizType: obj.data.bizType,
      required: obj.data.required,
      fileType: file.response.data.fileName.split(".")[1],
    };
    currentIndex.value++;
    // console.log(applyGetMaterialData.value);
  } else {
    console.log(applyGetMaterialData.value);
    applyGetMaterialData.value[obj.index]["src"] = applyGetMaterialData.value[
      obj.index
    ]?.src
      ? applyGetMaterialData.value[obj.index]["src"]
      : file.url;
    applyGetMaterialData.value[obj.index]["fileName"] =
      file.response.data.fileName;
    applyGetMaterialData.value[obj.index]["fileType"] =
      file.response.data.fileName.split(".")[1];
  }
  // } else {
  //   ElMessage({ message: '上传异常', type: 'warning' })
  // }
};
// 上传前
const beforeAvatarUpload: UploadProps["beforeUpload"] = (file) => {
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
const delImg = async (item: any, index: any) => {
  console.log(item);
  // let params = {
  //   fileName: item.fileName
  // }
  // await applyDeleteFile(params).then((res: any) => {
  //   if (res.code === 200) {
  //     ElMessage({
  //       message: "删除成功",
  //       type: 'success',
  //       duration: 3000 // 显示3秒后消失
  //     });
  if (item.bizCode == "other") {
    applyGetMaterialData.value[index].src = "";
    delete applyGetMaterialData.value[index].fileName;
  }
  delete item.src;
  delete item.fileName;
  delete item.fileType;
  console.log(applyGetMaterialData.value);
  // } else {
  // 接口status不管是200还是500 && response.code不为200
  //   }
  // });
};

// 预览图片和视频
const handlePreview = (file: any) => {
  console.log(file);
  state.dialogImageFile = file;
  state.dialogVisible = true;
};
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

      :deep(.el-form-item__error) {
        margin-left: 126px;
      }
    }
  }

  .material_bg {
    position: relative;
    margin-right: 16px;

    &:hover {
      cursor: pointer;

      .upload-overlay {
        background-color: rgba(0, 0, 0, 0.8);
        opacity: 1;
      }
    }
  }

  .material_upload {
    width: 150px;
    height: 150px;
    margin: 1% !important;
    border-radius: 4px;
    position: relative;
    margin-right: 16px;

    &:hover {
      cursor: pointer;

      &::after {
        content: "";
        background-color: rgba(0, 0, 0, 0.5);
        position: absolute;
        left: 0;
        height: 100%;
        top: 0px;
        width: 100%;
        z-index: 99;
        border-radius: 4px;
      }

      .material_icon {
        position: absolute;
        font-size: 24px;
        display: initial;
        z-index: 999;
        color: #fff;

        .el-icon {
          margin-right: 10px;
        }
      }
    }

    .material_icon {
      display: none;
    }
  }

  :deep(.el-upload--picture-card) {
    position: relative;

    span {
      position: absolute;
      right: 6px;
      top: 0px;
    }
  }
}

.required {
  color: red;
}
</style>
