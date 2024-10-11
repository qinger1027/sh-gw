<template>
  <div class="apply_order">
    <!-- <div class="header_title">用户信息</div> -->
    <!-- 用户信息申请 -->
    <div style="margin-bottom: 16px">
      <label for="类型" style="padding-right: 10px">类型:</label>
      <el-select
        v-model="customerType"
        placeholder="请选择"
        style="width: 300px"
        @change="customerTypeChange"
        disabled
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
          <template v-if="item.type == 'select'">
            <el-select
              v-model="customerInfoFormData[item.key]"
              placeholder="请选择"
              style="width: 300px"
              disabled
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
              style="width: 300px"
              disabled
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
              disabled
              :size="'default'"
              style="width: 280px"
            />
          </template>
        </div>
      </el-form-item>
      <!-- 联系人 -->
      <div class="contacts_info">
        <div class="header_title">联系人信息</div>
        <div class="contacts_info_con">
          <template v-for="(contacts, index) in customerInfoContacts">
            <el-form-item v-for="(contact, i) in contacts" :prop="contact.key">
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
                    disabled
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
                    disabled
                  />
                </template>
              </div>
            </el-form-item>
          </template>
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
              style="width: 300px"
              disabled
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
              style="width: 300px"
              disabled
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
              disabled
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
                    disabled
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
                    disabled
                  />
                </template>
              </div>
            </el-form-item>
          </template>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import {
  applyNoInfoDetail,
  applyOrderSave,
  updateApplyInfo,
} from "@/api/apply";
import { useRouter } from "vue-router";
import {
  customer_info_contacts,
  customer_info_person,
} from "@/assets/customer/customer_info_person";
import { customer_info_enterprise } from "@/assets/customer/customer_info_enterprise";
import { customer_info_person_form_data } from "@/assets/customer/customer_info_form";
import { customerInfoSave } from "@/api/customer";
const router = useRouter();
// router query
const routerQuery = router.currentRoute.value.query;
const status = routerQuery?.status || "";
const applyNo = routerQuery?.applyNo || "";
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
// customerInfoFormData.value.mobile = routerQuery?.mobile
// 个人验证ref
const personRuleFormRef = ref<FormInstance>();
const enterpriseRuleFormRef = ref<FormInstance>();
const personRules = reactive<FormRules>({});
const dynamicRules = reactive<FormRules>({});

const emit = defineEmits(['downAccountInfoData'])
const init = async () => {
  // 用户详情
  // if (status === 'edit') {
  let params = {
    applyNo: routerQuery?.applyNo,
  };
  await applyNoInfoDetail(params)
    .then((res: any) => {
      console.log(res);
      if (res.code === 200) {
        let data = res.data;
        Object.keys(data).map((ele: any) => {
          customerInfoFormData.value = data;
          if (data[ele]?.code) customerInfoData.value[ele] = data[ele]?.code;
        });
        // 类型字段处理
        customerType.value = customerInfoFormData.value.personal;
        // 类型（个人/企业）显示字段
        customerInfoData.value =
          customerType.value === 1
            ? customer_info_person
            : [...customer_info_person, ...customer_info_enterprise];
        // customerInfoFormData.value.customerInfoContacts.map((ele: any) => {
        //   ele.contactsMobile = ele.mobile;
        // });
        // 证件有效期 回显
        customerInfoFormData.value.certDate = [
          customerInfoFormData.value.certBeginDate,
          customerInfoFormData.value.certEndDate,
        ];
        // customerInfoFormData.value.customerInfoContacts = [
        //   { relation: "", name: "", mobile: "" },
        //   { relation: "", name: "", mobile: "" },
        //   { relation: "", name: "", mobile: "" },
        // ];
        console.log(customerInfoFormData.value);
        // 传给父级downAccountInfoData
        emit('downAccountInfoData',{
          "customerCode": customerInfoFormData.value.customerCode,
          "applyNo": applyNo,
          "rowVersion": customerInfoFormData.value.rowVersion
        })
      } else {
        // 接口status不管是200还是500 && response.code不为200
      }
    })
    .catch((error) => {
      console.log(error);
    });
  // }
};
onMounted(async () => {
  if (!routerQuery?.applyNo) {
    ElMessage({
      message: `传值有误`,
      type: "error",
      duration: 3000, // 显示3秒后消失
    });
    return;
  }
  await init();
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

// 清空form
const clearFrom = () => {
  Object.keys(customerInfoFormData).map((ele: any) => {
    customerInfoFormData[ele] = "";
  });
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
        margin-left: 186px;
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
