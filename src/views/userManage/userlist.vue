<script setup lang="ts">
import request from '@/utils/request';
import type { FormInstance, FormRules, TableInstance } from 'element-plus';
import { onMounted, reactive, ref, toRaw } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import { createUser, userDelete, userDetail, userEditSave, userList, userRoleList } from '@/api/user';
import commonDialog from "@/components/dialog/index.vue";
import { userStorelist } from '@/api/store';

// 为了测试跳转
// const router = useRouter()
// const gotoDetail = () => {
//    // router.push('/userManage/userdetail')
//    router.push({
//       path: '/userManage/userdetail',
//       query: {
//          plan: 'private'
//       }
//    })
// }
const headerTitle = ref("")
const dialogRef = ref()
const editdialogRef = ref()
let tableData = ref([])
const currentPage = ref(1); // 当前页
const pageSize = ref(10); // 每页显示条数
const total = ref(0); // 总条目数

// 调用接口
const init = async () => {
   try {
      let params = {
         "pageNum": currentPage.value,
         "pageSize": pageSize.value
      }
      await userList(params).then((data) => {
         if (data.code === 200) {
            tableData.value = data.data?.list;
            total.value = data.data?.count;
         } else {

         }
      });
   } catch (error) {
      console.error('Failed to fetch data:', error);
   }
}

onMounted(() => {
   init()
})


interface ruleForm {
   id?: string
   username?: string
   password?: string
   mobile: string
   idNumber: string
   realName: string
   storeId: string
   isSuper: number
   address: string
   remark: string
   roleIds: Array<any>
}
const ruleFormRef = ref<FormInstance>()
const columns = ref([
   { width: 110, label: '用户名', key: 'username' },
   { width: 110, label: '密码', key: 'password' },
   { width: 110, label: '手机号', key: 'mobile' },
   { width: 110, label: '身份证号', key: 'idNumber' },
   { width: 110, label: '真实姓名', key: 'realName' },
   { width: 110, label: '门店id', key: 'storeId' },
   { width: 110, label: '是否门店超管', key: 'isSuper' },
   { width: 110, label: '地址', key: 'address' },
   { width: 110, label: '角色', key: 'roleIds' },
   { width: 110, label: '备注', key: 'remark' },
]);
let form: any = ref<ruleForm>({
   "id": "",
   "username": "",
   "password": "",
   "mobile": "",
   "idNumber": "",
   "realName": "",
   "storeId": "",
   "isSuper": 0,
   "address": "",
   "remark": "",
   "roleIds": []
})
const rules = reactive<FormRules<ruleForm>>({
   username: [
      { required: true, message: '请输入用户名', trigger: 'blur', type: 'string' },
   ],
   password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
   ],
   mobile: [
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur' },
      {
         pattern: /^1[3456789]\d{9}$/,
         message: '请输入正确的手机号码'
      }
   ],
   idNumber: [
      { required: true, message: '请输入身份证号', trigger: 'blur' },
      {
         pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
         message: '格式错误,请输入正确的身份证号'
      }
   ],
   realName: [
      { required: true, message: '请输入真实姓名', trigger: 'blur' },
   ],
   storeId: [
      { required: true, message: '请选择门店id', trigger: 'change' },
   ],
   isSuper: [
      { required: true, message: '请选择是否是超管', trigger: 'blur' },
   ],
   address: [
      { required: true, message: '请输入地址', trigger: 'blur' },
   ],
   roleIds: [
      { type: 'array', required: true, message: '请选择角色', trigger: 'change' },
   ],
})

// 当前编辑时的roleid
const currentRoleIds = ref([])
const editColumns = ref([
   { width: 110, label: '手机号', key: 'mobile' },
   { width: 110, label: '身份证号', key: 'idNumber' },
   { width: 110, label: '真实姓名', key: 'realName' },
   { width: 110, label: '门店id', key: 'storeId' },
   { width: 110, label: '是否门店超管', key: 'isSuper' },
   { width: 110, label: '地址', key: 'address' },
   { width: 110, label: '角色', key: 'roleIds' },
   { width: 110, label: '备注', key: 'remark' },
]);
let editForm: any = ref<ruleForm>({
   "mobile": "",
   "idNumber": "",
   "realName": "",
   "storeId": "",
   "isSuper": 0,
   "address": "",
   "remark": "",
   "roleIds": []
})
const editRules = reactive<FormRules<ruleForm>>({
   mobile: [
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur' },
      {
         pattern: /^1[3456789]\d{9}$/,
         message: '请输入正确的手机号码'
      }
   ],
   idNumber: [
      { required: true, message: '请输入身份证号', trigger: 'blur' },
      {
         pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
         message: '格式错误,请输入正确的身份证号'
      }
   ],
   realName: [
      { required: true, message: '请输入真实姓名', trigger: 'blur' },
   ],
   storeId: [
      { required: true, message: '请输入门店id', trigger: 'change' },
   ],
   isSuper: [
      { required: true, message: '请选择是否是超管', trigger: 'blur' },
   ],
   address: [
      { required: true, message: '请输入地址', trigger: 'blur' },
   ],
   roleIds: [
      { type: 'array', required: true, message: '请选择角色', trigger: 'change' },
   ],
})

const roleIds: any = ref([])
const supers: any = ref([
   {
      key: 0, value: "否"
   },
   {
      key: 1, value: "是"
   }
])
const status: any = ref('')
const storerIds: any = ref([])
// 角色列表
const userroleList = async () => {
   await userRoleList().then((data) => {
      if (data.code === 200) {
         roleIds.value = data.data;
      } else {
         // 接口status不管是200还是500 && response.code不为200
      }
   });
}
// 门店列表
const userstorelist = async () => {
   await userStorelist().then((data: any) => {
      if (data.code === 200) {
         storerIds.value = data.data;
      } else {
         // 接口status不管是200还是500 && response.code不为200
      }
   });
}
const add = async () => {
   status.value = 'add'
   await userroleList()
   await userstorelist()

   headerTitle.value = '新增用户'
   dialogRef.value.show()
   ruleFormRef.value?.resetFields()
}

const edit = async (row: any) => {
   headerTitle.value = '编辑用户'
   status.value = 'edit'
   let params = {
      id: row.id
   }
   await userDetail(params).then(async (data) => {
      if (data.code === 200) {
         // 表单数据
         editForm.value = data.data
         currentRoleIds.value = data.data.roleIds;
         await userroleList()
         await userstorelist()
         editdialogRef.value.show()
      } else {
         // 接口status不管是200还是500 && response.code不为200
      }
   });
}

const Delete = async (row: any) => {
   let params = {
      id: row.id
   }
   await userDelete(params).then((data) => {
      if (data.code === 200) {
         ElMessage({
            message: "删除成功",
            type: 'success',
            duration: 3000 // 显示3秒后消失
         });
         init()
      } else {
         // 接口status不管是200还是500 && response.code不为200
      }
   });
}

// 确认
const handleConfirm = async (status: any) => {
   if (!ruleFormRef.value) return
   await ruleFormRef.value?.validate(async (valid, fields) => {
      if (valid) {
         try {
            if (status == 'add') {
               let params = {
                  "username": form.value.username,
                  "password": form.value.password,
                  "mobile": form.value.mobile,
                  "idNumber": form.value.idNumber,
                  "realName": form.value.realName,
                  "storeId": form.value.storeId,
                  "isSuper": form.value.isSuper,
                  "address": form.value.address,
                  "remark": form.value.remark,
                  "roleIds": form.value.roleIds
               }
               console.log(params);
               await createUser(params).then((data) => {
                  if (data.code === 200) {
                     ElMessage({
                        message: "保存成功",
                        type: 'success',
                        duration: 3000 // 显示3秒后消失
                     });
                     dialogRef.value.close()
                     init()
                     handleCancel();
                  } else {
                     // 接口status不管是200还是500 && response.code不为200
                  }
               });
            } else {
               let params = {
                  "id": editForm.value.id,
                  "username": editForm.value.username,
                  "mobile": editForm.value.mobile,
                  "idNumber": editForm.value.idNumber,
                  "realName": editForm.value.realName,
                  "storeId": editForm.value.storeId,
                  "isSuper": editForm.value.isSuper,
                  "address": editForm.value.address,
                  "remark": editForm.value.remark,
                  // 如果无改动，则传空。如果有改动，传所有值
                  "roleIds": editForm.value.roleIds === currentRoleIds.value ? [] : editForm.value.roleIds
               }
               console.log(params);
               await userEditSave(params).then((data) => {
                  if (data.code === 200) {
                     ElMessage({
                        message: "保存成功",
                        type: 'success',
                        duration: 3000 // 显示3秒后消失
                     });
                     editdialogRef.value.close()
                     init()
                     handleCancel();
                  } else {
                     // 接口status不管是200还是500 && response.code不为200
                  }
               });
            }
         } catch (error) {
            console.error('Failed to data:', error);
         }
      } else {
         console.log('error submit!', fields)
      }
   })
}
// 取消
const handleCancel = (type?: any) => {
   form.value = {}
   ruleFormRef.value?.resetFields()
}
// 分页大小改变时触发
const handleSizeChange = (val: any) => {
   pageSize.value = val;
   init();
};

// 当前页改变时触发
const handleCurrentChange = (val: any) => {
   currentPage.value = val;
   init();
};
// 指定表格中单元格、行和列的布局方式
const tableLayout = ref<TableInstance['tableLayout']>('auto')
</script>
<template>
   <div style="width: 100%;height: 50px;background: #fff;margin-bottom: 10px">
      <el-button type="danger" size="small" @click="add" style="margin: 10px 8px;padding: 14px 10px;">
         <el-icon>
            <Plus />
         </el-icon>新增用户
      </el-button>
   </div>
   <!--  table -->
   <el-table :data="tableData" row-key="id" :table-layout="tableLayout">
      <el-table-column prop="username" label="用户名" width="120" min-width="120" />
      <el-table-column prop="mobile" label="电话" min-width="130" />
      <el-table-column prop="idNumber" label="身份证号" min-width="140" />
      <el-table-column prop="realName" label="真实姓名" min-width="130" width="130" />
      <el-table-column prop="isSuper" label="是否超管" width="120" min-width="120">
         <template #default="{ row }">
            {{ row.isSuper === 1 ? '是' : '否' }}
         </template>
      </el-table-column>
      <el-table-column prop="address" label="地址" min-width="120" />
      <el-table-column prop="remark" label="备注" min-width="160" />
      <el-table-column fixed="right" label="操作" min-width="170" width="170">
         <template #default="{ row }">
            <el-button size="small" @click="edit(row)">
               编辑
            </el-button>
            <el-button type="danger" size="small" @click="Delete(row)">删除</el-button>
         </template>
      </el-table-column>
   </el-table>
   <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
         :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="prev, pager, next" :total="total" small background
         hide-on-single-page>
      </el-pagination>
   </div>
   <!-- <button @click="gotoDetail">跳转到detail</button> -->
   <!-- 添加用户弹框 -->
   <common-dialog ref="dialogRef" :headerTitle="headerTitle" @confirm="handleConfirm('add')"
      @cancel="handleCancel('add')" v-if="status == 'add'">
      <el-form ref="ruleFormRef" :model="form" :rules="rules">
         <el-form-item v-for="(item, index) in columns" :label="item.label" :prop="item.key" :label-width="item.width">
            <div v-if="item.key === 'roleIds'">
               <el-select v-model="form.roleIds" placeholder="请选择角色id" style="width:360px;" multiple collapse-tags
                  collapse-tags-tooltip :max-collapse-tags="3">
                  <el-option v-for="(item, i) in roleIds" :label="item.roleName" :value="item.id" />
               </el-select>
            </div>
            <div v-else-if="item.key === 'storeId'">
               <el-select v-model="form.storeId" placeholder="请选择门店id" style="width:360px;" collapse-tags
                  collapse-tags-tooltip :max-collapse-tags="3">
                  <el-option v-for="(item, i) in storerIds" :label="item.name" :value="item.id" />
               </el-select>
            </div>
            <div v-else-if="item.key === 'isSuper'">
               <el-select v-model="form.isSuper" placeholder="请选择是否是超管" style="width:360px;" collapse-tags
                  collapse-tags-tooltip>
                  <el-option v-for="(item, i) in supers" :label="item.value" :value="item.key" />
               </el-select>
            </div>
            <div v-else>
               <el-input v-model="form[item.key]" autocomplete="off" style="width:360px;" />
            </div>
         </el-form-item>
      </el-form>
   </common-dialog>
   <!-- 编辑用户弹框信息 -->
   <common-dialog ref="editdialogRef" :headerTitle="headerTitle" @confirm="handleConfirm('edit')"
      @cancel="handleCancel('edit')" v-if="status == 'edit'">
      <el-form ref="ruleFormRef" :model="editForm" :rules="editRules">
         <el-form-item v-for="(item, index) in editColumns" :label="item.label" :prop="item.key"
            :label-width="item.width">
            <div v-if="item.key === 'roleIds'">
               <el-select v-model="editForm.roleIds" placeholder="请选择角色id" style="width:360px;" multiple collapse-tags
                  collapse-tags-tooltip :max-collapse-tags="3">
                  <el-option v-for="(item, i) in roleIds" :label="item.roleName" :value="item.id" />
               </el-select>
            </div>
            <div v-else-if="item.key === 'storeId'">
               <el-select v-model="editForm.storeId" placeholder="请选择门店id" style="width:360px;" collapse-tags
                  collapse-tags-tooltip :max-collapse-tags="3" disabled>
                  <el-option v-for="(item, i) in storerIds" :label="item.name" :value="item.id" />
               </el-select>
            </div>
            <div v-else-if="item.key === 'isSuper'">
               <el-select v-model="editForm.isSuper" placeholder="请选择是否是超管" style="width:360px;" collapse-tags
                  collapse-tags-tooltip>
                  <el-option v-for="(item, i) in supers" :label="item.value" :value="item.key" />
               </el-select>
            </div>
            <div v-else>
               <el-input v-model="editForm[item.key]" autocomplete="off" style="width:360px;" />
            </div>
         </el-form-item>
      </el-form>
   </common-dialog>
</template>
<style lang="scss" scoped></style>