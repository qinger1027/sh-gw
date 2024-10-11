<template>
  <div class="apply_order">
    <!-- <el-steps style="max-width: 600px" :active="active" align-center>
      <el-step title="用户信息"/>
      <el-step title="联系人信息" />
      <el-step title="工单信息"/>
    </el-steps>
    <div v-show="active == 0">我是第一步显示的内容</div>
    <div v-show="active == 1">我是第二步显示的内容</div>
    <div v-show="active == 2">我是第二步完成后的内容</div>
    <el-button type="primary" @click="stepSubmitHandle">下一步</el-button> -->

    <!-- 用户信息申请 -->
    <div style="margin-bottom: 16px">
      <label
        for="类型"
        style="padding-right: 10px; width: 120px; display: inline"
        >类型:</label
      >
      <el-select
        v-model="customerType"
        placeholder="请选择"
        class="w-300"
        @change="customerTypeChange"
        :disabled="status == 'edit' ? true : false"
      >
        <el-option
          v-for="(select, index) in customerTypeData"
          :label="select.text"
          :value="select.value"
        />
      </el-select>
    </div>
    <!-- 个人 -->
    <el-form
      ref="personRuleFormRef"
      :model="customerInfoFormData"
      :rules="personRules"
      v-if="customerType === 1"
    >
      <el-form-item v-for="(item, index) in customerInfoData" :prop="item.key">
        <div class="apply_order_form_item" slot="label">
          <label :class="{ label_width: true }">
            <span v-if="item.require">*</span>
            {{ item.label }}:
          </label>
          <!-- 选择框 -->
          <template v-if="item.type === 'select'">
            <el-select
              v-model="customerInfoFormData[item.key]"
              placeholder="请选择"
              class="w-300"
            >
              <el-option
                v-for="(select, index) in item?.selectData"
                :label="select.text"
                :value="select.value"
              />
            </el-select>
          </template>
          <!-- 下拉框 -->
          <template v-else-if="item.type === 'input'">
            <el-input
              v-model="customerInfoFormData[item.key]"
              autocomplete="off"
              class="w-300"
              :disabled="
                item.key == 'mobile' && status == 'edit' ? true : false
              "
            />
          </template>
          <!-- 日期选择 -->
          <template v-else-if="item.type === 'date'">
            <el-date-picker
              v-model="customerInfoFormData[item.key]"
              type="daterange"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :size="'default'"
              style="width: 210px"
              @change="dateChange"
            />
            <el-button style="margin-left: 10px" @click="dateLongTerm"
              >长期</el-button
            >
          </template>
        </div>
      </el-form-item>
      <!-- 联系人 -->
      <div class="contacts_info">
        <div class="header_title">联系人信息</div>
        <div class="contacts_info_con">
          <template v-for="(contacts, index) in customerInfoContacts">
            <el-form-item
              v-for="(contact, i) in contacts"
              :prop="`customerInfoContacts[${index}][${contact.key}]`"
              :rules="customerInfoContactsRules(contact, index)[contact.key]"
            >
              <div class="apply_order_form_item" slot="label">
                <label :class="{ label_width: true }">
                  <span v-if="contact.require">*</span>
                  {{ contact.label }}:
                </label>
                <!-- 选择框 -->
                <template v-if="contact.type == 'select'">
                  <el-select
                    v-model="
                      customerInfoFormData.customerInfoContacts[index][
                        contact.key
                      ]
                    "
                    placeholder="请选择"
                    class="w-300"
                  >
                    <el-option
                      v-for="(select, index) in contact?.selectData"
                      :label="select.text"
                      :value="select.value"
                    />
                  </el-select>
                </template>
                <!-- 下拉框 -->
                <template v-else>
                  <el-input
                    v-model="
                      customerInfoFormData.customerInfoContacts[index][
                        contact.key
                      ]
                    "
                    autocomplete="off"
                    class="w-300"
                  />
                </template>
              </div>
            </el-form-item>
          </template>
          <!-- <el-button @click="addContactsInfo">
            <el-icon>
              <Plus />
            </el-icon>
          </el-button> -->
        </div>
      </div>
    </el-form>
    <!-- 个人 end -->
    <!-- 企业 -->
    <el-form
      ref="enterpriseRuleFormRef"
      :model="customerInfoFormData"
      :rules="dynamicRules"
      v-if="customerType === 0"
    >
      <el-form-item v-for="(item, index) in customerInfoData" :prop="item.key">
        <div class="apply_order_form_item" slot="label">
          <label :class="{ label_width: true }">
            <span v-if="item.require">*</span>
            {{ item.label }}:
          </label>
          <!-- 选择框 -->
          <template v-if="item.type == 'select'">
            <el-select
              v-model="customerInfoFormData[item.key]"
              placeholder="请选择"
              class="w-300"
            >
              <el-option
                v-for="(select, index) in item?.selectData"
                :label="select?.text"
                :value="select?.value"
              />
            </el-select>
          </template>
          <!-- 下拉框 -->
          <template v-else-if="item.type === 'input'">
            <el-input
              v-model="customerInfoFormData[item.key]"
              autocomplete="off"
              class="w-300"
              :disabled="
                item.key == 'mobile' && status == 'edit' ? true : false
              "
            />
          </template>
          <!-- 日期选择 -->
          <template v-else-if="item.type === 'date'">
            <el-date-picker
              v-model="customerInfoFormData[item.key]"
              type="daterange"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :size="'default'"
              style="width: 280px"
              @change="dateChange"
            />
          </template>
        </div>
      </el-form-item>
      <!-- 联系人 -->
      <div class="contacts_info">
        <div class="header_title">联系人信息</div>
        <div class="contacts_info_con">
          <template v-for="(contacts, index) in customerInfoContacts">
            <el-form-item
              v-for="(contact, i) in contacts"
              :prop="`customerInfoContacts[${index}][${contact.key}]`"
              :rules="customerInfoContactsRules(contact, index)[contact.key]"
            >
              <div class="apply_order_form_item" slot="label">
                <label :class="{ label_width: true }">
                  <span v-if="contact.require">*</span>
                  {{ contact.label }}:
                </label>
                <!-- 选择框 -->
                <template v-if="contact.type == 'select'">
                  <el-select
                    v-model="
                      customerInfoFormData.customerInfoContacts[index][
                        contact.key
                      ]
                    "
                    placeholder="请选择"
                    class="w-300"
                  >
                    <el-option
                      v-for="(select, index) in contact?.selectData"
                      :label="select.text"
                      :value="select.value"
                    />
                  </el-select>
                </template>
                <!-- 下拉框 -->
                <template v-else>
                  <el-input
                    v-model="
                      customerInfoFormData.customerInfoContacts[index][
                        contact.key
                      ]
                    "
                    autocomplete="off"
                    class="w-300"
                  />
                </template>
              </div>
            </el-form-item>
          </template>
        </div>
      </div>
    </el-form>
    <!-- 企业 end -->
    <el-button type="primary" @click="submit"> 提交 </el-button>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, onUnmounted, reactive, ref } from "vue";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { applyNoInfoDetail, updateApplyInfo } from "@/api/apply";
import { useRouter } from "vue-router";
import {
  customer_info_contacts,
  customer_info_person,
} from "@/assets/customer/customer_info_person";
import { customer_info_enterprise } from "@/assets/customer/customer_info_enterprise";
import { customer_info_person_form_data } from "@/assets/customer/customer_info_form";
import { customerInfoSave } from "@/api/customer";
import { formattedDates, loadingHide, loadingShow } from "@/utils/util";
import { useMenuStore } from "@/stores/modules/menuTabs";
const router = useRouter();
const menuStore = useMenuStore();
// router query
const routerQuery = router.currentRoute.value.query;
const status = routerQuery?.status || "";
const customerType = ref(1);
const customerTypeData = ref([
  { value: 1, text: "个人" },
  { value: 0, text: "企业" },
]);
// 所有基本信息显示(默认个人)
let customerInfoData: any = ref(customer_info_person);
// 个人联系人信息
let customerInfoContacts: any = ref(customer_info_contacts);
// 申请工单form
const customerInfoFormData: any = ref(customer_info_person_form_data);
const copycustomerInfoFormData: any = { ...customer_info_person_form_data };
// customerInfoFormData.value.mobile = routerQuery?.mobile
// 个人验证ref
const personRuleFormRef = ref<FormInstance>();
const enterpriseRuleFormRef = ref<FormInstance>();
// 公共的校验
const commonRules = {
  mobile: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    { min: 11, max: 11, message: "请输入11位手机号码", trigger: "blur" },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: "请输入正确的手机号码",
    },
  ],
  custName: [
    { required: true, message: "请输入申请人姓名", trigger: "blur" },
    {
      pattern: /^[\u4e00-\u9fa5]{2,10}$/,
      message: "请输入2-10个汉字",
    },
  ],
  certType: [{ required: true, message: "请选择证件类型", trigger: "blur" }],
  certNo: [
    { required: true, message: "请输入证件号码", trigger: "blur" },
    {
      pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
      message: "请输入正确的证件号码",
    },
  ],
  workYears: [
    { required: false, message: "请输入工作年限", trigger: "blur" },
    {
      pattern: /^\d{1,4}$/,
      message: "只能输入1-4位数字",
    },
  ],
  liveTime: [
    { required: false, message: "请输入居住年限", trigger: "blur" },
    {
      pattern: /^\d{1,4}$/,
      message: "只能输入1-4位数字",
    },
  ],
  birthday: [
    { required: true, message: "请输入出生日期", trigger: "blur" },
    {
      pattern: /^\d*$/,
      message: "只能输入数字",
    },
  ],
  sex: [{ required: true, message: "请选择性别", trigger: "change" }],
  eduLevel: [{ required: true, message: "请选择学历", trigger: "change" }],
  liveAddressDetail: [
    { required: true, message: "请输入居住地址", trigger: "blur" },
  ],
  familyAddressDetail: [
    { required: true, message: "请输入家庭详细地址", trigger: "blur" },
  ],
  workUnitName: [
    { required: true, message: "请输入单位名称", trigger: "blur" },
  ],
  monthIncome: [
    { required: true, message: "请输入月收入", trigger: "blur" },
    {
      pattern: /^\d*$/,
      message: "只能输入数字",
    },
  ],
  vocation: [{ required: true, message: "请选择职务", trigger: "change" }],
  loanUse: [{ required: true, message: "请选择借款用途", trigger: "change" }],
  loanAmt: [
    { required: true, message: "请输入借款金额", trigger: "blur" },
    {
      pattern: /^\d*$/,
      message: "只能输入数字",
    },
  ],
  loanPeriod: [
    { required: true, message: "请输入借款期限", trigger: "blur" },
    {
      pattern: /^\d{1,4}$/,
      message: "只能输入1-4位数字",
    },
  ],
};
const personRules = reactive<FormRules>({
  ...commonRules,
  // vocation: [{ required: true, message: "请输入职务", trigger: "change" }],
});
const dynamicRules = reactive<FormRules>({
  ...commonRules,
});
// 联系人 验证
const customerInfoContactsRules: any = (contact: any, index: any) => {
  return {
    mobile: [
      {
        required: true,
        message: `${contact.type === "input" ? "请输入" : "请选择"}${
          contact.label
        }`,
        trigger: "blur",
      },
      { min: 11, max: 11, message: "请输入11位手机号码", trigger: "blur" },
      {
        pattern: /^1[3-9]\d{9}$/,
        message: "请输入正确的手机号码",
      },
    ],
    name: [
      {
        required: true,
        message: `${contact.type === "input" ? "请输入" : "请选择"}${
          contact.label
        }`,
        trigger: "blur",
      },
      {
        pattern: /^[\u4e00-\u9fa5]{2,10}$/,
        message: "请输入2-10个汉字",
      },
    ],
    relation: [
      {
        required: true,
        message: `${contact.type === "input" ? "请输入" : "请选择"}${
          contact.label
        }`,
        trigger: "change",
      },
    ],
  };
};

const init = async () => {
  if (status === "") {
    // 场景：新建清空表单数据
    customerInfoFormData.value = copycustomerInfoFormData;
    for (let obj of customerInfoFormData.value.customerInfoContacts) {
      for (let key in obj) {
        obj[key] = "";
      }
    }
  }
  // 用户详情
  if (status === "edit") {
    let params = {
      applyNo: routerQuery?.applyNo,
    };
    await applyNoInfoDetail(params)
      .then(async (res: any) => {
        console.log(res);
        if (res.code === 200) {
          let data = res.data;
          // 回显数据
          customerInfoFormData.value = data;
          Object.keys(data).map((ele: any) => {
            // if (data[ele]?.code) customerInfoFormData.value[ele] = data[ele]?.code;
          });
          // 类型字段处理
          customerType.value = customerInfoFormData.value.personal;
          // 类型（个人/企业）显示字段
          customerInfoData.value =
            customerType.value === 1
              ? customer_info_person
              : [...customer_info_person, ...customer_info_enterprise];
          // 联系人手机号信息回显处理
          // customerInfoFormData.value.customerInfoContacts.map((ele: any) => {
          //   ele.contactsMobile = ele.mobile;
          // });
          // 证件有效期 回显
          customerInfoFormData.value.certDate = [
            customerInfoFormData.value.certBeginDate,
            customerInfoFormData.value.certEndDate,
          ];
          console.log(customerInfoFormData.value);
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

// 类型改变
const customerTypeChange = () => {
  // 1 个人;0 企业
  // info data
  customerInfoData.value =
    customerType.value === 1
      ? customer_info_person
      : [...customer_info_person, ...customer_info_enterprise];
  customerInfoFormData.value = {};
  // info form data
  customerInfoFormData.value = customer_info_person_form_data;
};
// 用户信息保存
const customerInfosave = async () => {
  console.log(customerInfoFormData.value);
  loadingShow();
  // personal 类型字段
  customerInfoFormData.value.personal = customerType.value;
  // 联系人手机号绑定的contactsMobile字段
  // customerInfoFormData.value.customerInfoContacts.map((ele: any) => {
  //   ele.mobile = ele.contactsMobile;
  // });
  customerInfoFormData.value.workYears = Number(
    customerInfoFormData.value.workYears
  );
  // customerInfoFormData.value.applyNo = routerQuery.applyNo
  // customerInfoFormData.value.customerCode = routerQuery.customerCode
  await customerInfoSave(customerInfoFormData.value).then((res) => {
    console.log(res);
    if (res.code === 200) {
      let customer_info = {
        loanUse: customerInfoFormData.value.loanUse,
        loanAmt: customerInfoFormData.value.loanAmt,
        loanPeriod: customerInfoFormData.value.loanPeriod,
        custType: customerType.value === 1 ? "个人" : "企业",
      };
      localStorage.setItem("customer_info", JSON.stringify(customer_info));
      // 移除当前menu
      menuStore.removeMenuItem("/applyManage/customer_info");
      router.push({
        path: "/applyManage/applyForOrder",
        query: {
          applyId: res.data,
          mobile: customerInfoFormData.value.mobile,
        },
      });
      // 清空弹框信息
      clearFrom();
      loadingHide();
    } else {
      loadingHide();
    }
  });
};
// 更新用户信息
const customerInfoEditsave = async () => {
  console.log(customerInfoFormData.value);
  loadingShow();
  // personal 类型字段
  customerInfoFormData.value.personal = customerType.value;
  // customerInfoFormData.value.customerInfoContacts.map((ele: any) => {
  //   ele.mobile = ele.contactsMobile;
  // });
  customerInfoFormData.value.workYears = Number(
    customerInfoFormData.value.workYears
  );
  await updateApplyInfo(customerInfoFormData.value).then((res) => {
    console.log(res);
    if (res.code === 200) {
      ElMessage({
        message: "更新成功",
        type: "success",
        duration: 3000, // 显示3秒后消失
      });
      let customer_info = {
        loanUse: customerInfoFormData.value.loanUse,
        loanAmt: customerInfoFormData.value.loanAmt,
        loanPeriod: customerInfoFormData.value.loanPeriod,
        custType: customerType.value === 1 ? "个人" : "企业",
      };
      localStorage.setItem("customer_info", JSON.stringify(customer_info));
      // setTimeout(()=>{
      // 移除当前menu
      menuStore.removeMenuItem("/applyManage/customer_info");
      router.push({
        path: "/applyManage/applyForOrder",
        query: {
          applyNo: routerQuery?.applyNo,
          customerCode: routerQuery?.customerCode,
          status: "edit",
          mobile: customerInfoFormData.value.mobile,
        },
      });
      // 清空弹框信息
      clearFrom();
      // },100)
      loadingHide();
    } else {
      loadingHide();
    }
  });
};
// 提交
const submit = async () => {
  if (customerType.value === 1) {
    if (!personRuleFormRef.value) return;
    await personRuleFormRef.value?.validate(async (valid, fields) => {
      if (valid) {
        try {
          if (status === "edit") {
            await customerInfoEditsave();
          } else {
            await customerInfosave();
          }
        } catch (error) {
          console.error("Failed to data:", error);
        }
      } else {
        console.log("error submit!", fields);
      }
    });
  } else if (customerType.value === 0) {
    if (!enterpriseRuleFormRef.value) return;
    await enterpriseRuleFormRef.value?.validate(async (valid, fields) => {
      if (valid) {
        try {
          if (status === "edit") {
            await customerInfoEditsave();
          } else {
            await customerInfosave();
          }
        } catch (error) {
          console.error("Failed to data:", error);
        }
      } else {
        console.log("error submit!", fields);
      }
    });
  }
};

// 清空form
const clearFrom = () => {
  // Object.keys(customerInfoFormData.value).map((ele: any) => {
  customerInfoFormData.value = copycustomerInfoFormData;
  for (let obj of customerInfoFormData.value.customerInfoContacts) {
    for (let key in obj) {
      obj[key] = "";
    }
  }
  // });
};

const dateChange = () => {
  let date = customerInfoFormData.value.certDate;
  customerInfoFormData.value.certBeginDate = (date && date[0]) || "";
  customerInfoFormData.value.certEndDate = (date && date[1]) || "";
};
// 长期
const dateLongTerm = () => {
  if (customerInfoFormData.value.certDate.length) {
    customerInfoFormData.value.certDate[1] = "9999-12-31";
    customerInfoFormData.value.certEndDate = "9999-12-31";
  } else {
    ElMessage({
      message: `请先选择证件有效期`,
      type: "error",
      duration: 3000, // 显示3秒后消失
    });
  }
};
// 添加联系人信息
const addContactsInfo = () => {
  customerInfoFormData.value.customerInfoContacts.push({
    relation: "",
    name: "",
    mobile: "",
    // contactsMobile: "",
  });
  let length = customerInfoFormData.value.customerInfoContacts.length;
  customerInfoContacts.value[length - 1] = [
    {
      key: "name",
      label: `联系人${length - 1}姓名`,
      require: false,
      placeholder: "请输入",
      type: "input",
    },
    {
      key: "relation",
      label: `联系人${length - 1}关系`,
      require: false,
      placeholder: "请输入",
      type: "select",
      selectData: [
        { value: "R00", text: "紧急联系人" },
        { value: "R01", text: "父母" },
        { value: "R02", text: "配偶" },
        { value: "R03", text: "亲戚" },
        { value: "R04", text: "家人" },
        { value: "R05", text: "子女" },
        { value: "R06", text: "朋友" },
        { value: "R07", text: "同事" },
        { value: "R08", text: "兄弟姐妹" },
        { value: "R09", text: "同学" },
        { value: "R99", text: "其他" },
      ],
    },
    {
      key: "contactsMobile",
      label: `联系人${length - 1}手机号`,
      require: false,
      placeholder: "请输入",
      type: "input",
    },
  ];
};
// 回显时-联系人处理
const HandlecustomerInfoContacts = async () => {
  // 如果可以添加联系人，回显自动获取联系人信息
  await customerInfoFormData.value.customerInfoContacts.map(
    (ele: any, index: any) => {
      ele.contactsMobile = ele.mobile;
      customerInfoContacts.value[index] = [
        {
          key: "name",
          label: `${index == 0 ? "紧急" : ""}联系人${
            index !== 0 ? index : ""
          }姓名`,
          require: false,
          placeholder: "请输入紧急联系人姓名",
          type: "input",
        },
        {
          key: "relation",
          label: `${index == 0 ? "紧急" : ""}联系人${
            index !== 0 ? index : ""
          }关系`,
          require: false,
          placeholder: "请选择紧急联系人关系",
          type: "select",
          selectData: [
            { value: "R00", text: "紧急联系人" },
            { value: "R01", text: "父母" },
            { value: "R02", text: "配偶" },
            { value: "R03", text: "亲戚" },
            { value: "R04", text: "家人" },
            { value: "R05", text: "子女" },
            { value: "R06", text: "朋友" },
            { value: "R07", text: "同事" },
            { value: "R08", text: "兄弟姐妹" },
            { value: "R09", text: "同学" },
            { value: "R99", text: "其他" },
          ],
        },
        {
          key: "contactsMobile",
          label: `${index == 0 ? "紧急" : ""}联系人${
            index !== 0 ? index : ""
          }手机号`,
          require: false,
          placeholder: "请输入紧急联系人手机号",
          type: "input",
        },
      ];
      customerInfoFormData.value.customerInfoContacts[index] = {
        relation: ele.relation,
        name: ele.name,
        mobile: ele.mobile,
        contactsMobile: ele.mobile,
      };
    }
  );
  console.log(customerInfoContacts.value);
  console.log(customerInfoFormData.value);
};

// steps用到
// const active = ref(0)
// const stepSubmitHandle = () => {
//   if (++active.value > 2) active.value = 0;
//   // ++active.value;
// }
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
        margin-left: 128px;
      }
    }

    .contacts_info {
      width: 100%;

      .contacts_info_con {
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
}
</style>
