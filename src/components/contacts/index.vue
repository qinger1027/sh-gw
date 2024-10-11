<template>
  <!-- 联系人 -->
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
              customerInfoFormData.customerInfoContacts[index][contact.key]
            "
            placeholder="请选择"
            style="width: 300px"
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
              customerInfoFormData.customerInfoContacts[index][contact.key]
            "
            autocomplete="off"
            style="width: 300px"
            disabled
          />
        </template>
      </div>
    </el-form-item>
  </template>
</template>

<script setup lang="ts">
// 个人联系人信息
let customerInfoContacts: any = ref(customer_info_contacts);
// 申请工单form
const customerInfoFormData: any = ref(customer_info_person_form_data);
</script>

<style lang="scss" scoped></style>
