<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules, type TableInstance } from 'element-plus';
import { menuList, menuSave, menuUpdate } from '@/api/menu';
import commonDialog from "@/components/dialog/index.vue";

interface User {
  id: string
  pid?: string
  date: string
  name: string
  type: string
  sort: string
  state: string
  zip: string
  hasChildren?: boolean
  children?: User[]
}

// 指定表格中单元格、行和列的布局方式
const tableLayout = ref<TableInstance['tableLayout']>('auto')
let tableData = ref([])
// 调用接口
const init = async () => {
  try {
    await menuList().then((data) => {
      if (data.code === 200) {
        tableData.value = data.data;
      }
    });
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}

onMounted(() => {
  init()
})

const load = (
  row: User,
  treeNode: unknown,
  resolve: (date: User[]) => void
) => {
  setTimeout(() => {
    resolve([
      {
        id: '111',
        pid: '1',
        date: '2024-03-15 11:07:53',
        name: '菜单',
        state: 'California',
        sort: 'Los Angeles',
        type: '目录',
        zip: 'CA 90036',
      },
      {
        id: '11111',
        pid: '1',
        date: '2024-03-15 11:07:5',
        name: '角色',
        state: 'California',
        sort: 'Los Angeles',
        type: '目录',
        zip: 'CA 90036',
      },
      {
        id: '11111',
        pid: '1',
        date: '2024-03-15 11:07:5',
        name: '管理员',
        state: 'California',
        sort: 'Los Angeles',
        type: '目录',
        zip: 'CA 90036',
      },
      {
        id: '22',
        pid: '2',
        date: '2024-03-15 11:07:5',
        name: '用户列表',
        state: 'California',
        sort: 'Los Angeles',
        type: '目录',
        zip: 'CA 90036',
      }
    ])
  }, 1000)
}

const headerTitle = ref("")
const status = ref("")
const dialogRef = ref()
const currentRow = ref()

interface ruleForm {
  name: string
  path: string
  level: number
  sort: number
  component: string
  description: string
  icon: string
  isShow: number
}
const columns = ref([
  { width: 100, label: '菜单名称', key: 'name' },
  { width: 100, label: '菜单链接', key: 'path' },
  { width: 100, label: '层级', key: 'level' },
  { width: 100, label: '排序', key: 'sort' },
  { width: 100, label: '图标', key: 'icon' },
  { width: 100, label: '组件', key: 'component' },
  { width: 100, label: '菜单描述', key: 'description' },
  { width: 100, label: '是否显示', key: 'isShow' },
]);
const ruleFormRef = ref<FormInstance>()
const form: any = ref<ruleForm>({
  name: '',
  path: '',
  level: 0,
  sort: 0,
  component: '',
  description: '',
  icon: '',
  isShow: 1,
})
const rules = reactive<FormRules<ruleForm>>({
  name: [
    { required: true, message: '请输入菜单名称', trigger: 'blur', type: 'string' },
  ],
  path: [
    { required: true, message: '请输入菜单链接', trigger: 'blur' },
  ],
  level: [
    { required: true, message: '请输入层级', trigger: 'blur' },
  ],
  sort: [
    { required: true, message: '请输入排序', trigger: 'blur' },
  ],
  icon: [
    { required: true, message: '请输入图标', trigger: 'blur' },
  ],
  component: [
    { required: true, message: '请输入组件', trigger: 'blur' },
  ],
  description: [
    { required: true, message: '请输入菜单描述', trigger: 'blur' },
  ],
  isShow: [
    { required: true, message: '请输入', trigger: 'blur' },
  ],
})

// 添加
const add = async (row?: {}) => {
  headerTitle.value = '新增菜单'
  status.value = 'add'
  dialogRef.value.show()
  currentRow.value = row;
}

// 编辑
const edit = (row?: {}) => {
  headerTitle.value = '编辑菜单'
  status.value = 'edit'
  // 复制row对象
  form.value = Object.assign({}, row);
  dialogRef.value.show()
}

// 确认
const handleConfirm = async (type: any) => {
  if (type !== 'cancel') {
    if (!ruleFormRef.value) return
    await ruleFormRef.value?.validate(async (valid, fields) => {
      if (valid) {
        try {
          // 新增保存
          if (status.value !== 'edit') {
            // 保存逻辑
            const addData = {
              "name": form.value.name,
              "path": form.value.path,
              "description": form.value.description,
              "level": form.value.level,
              "sort": form.value.sort,
              "parentId": currentRow.value.id || 0,
              "component": form.value.component,
              "icon": form.value.icon,
              "isShow": form.value.isShow
            }
            await menuSave(addData).then((data) => {
              if (data.code === 200) {
                dialogRef.value.close()
                init()
                currentRow.value = {}
              } else {
                // 接口status不管是200还是500 && response.code不为200
                handleCancel()
              }
            });
          } else {
            // 保存逻辑
            const addData = {
              "id": form.value.id,
              "name": form.value.name,
              "path": form.value.path,
              "description": form.value.description,
              "level": form.value.level,
              "sort": form.value.sort,
              "parentId": form.value.parentId || 0,
              "component": form.value.component,
              "icon": form.value.icon,
              "isShow": form.value.isShow
            }
            // 编辑保存
            await menuUpdate(addData).then((data) => {
              if (data.code === 200) {
                dialogRef.value.close()
                init()
                form.value = {}
              } else {
                // 接口status不管是200还是500 && response.code不为200
                handleCancel()
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
  } else {
    handleCancel()
  }
}
const handleCancel = () => {
  dialogRef.value.close()
  // 重置验证
  ruleFormRef.value?.resetFields()
  currentRow.value = {}
  form.value = {}
}
const Delete = () => {

}

</script>

<template>
  <!-- <el-scrollbar> -->
  <div style="width: 100%;height: 50px;background: #fff;margin-bottom: 10px">
    <el-button type="danger" size="small" @click="add" style="margin: 10px 8px;padding: 14px 10px;">
      <el-icon>
        <Plus />
      </el-icon>新增菜单
    </el-button>
  </div>
  <el-table :data="tableData" style="width:var(--table-width);" row-key="id"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" :table-layout="tableLayout">
    <el-table-column fixed prop="name" label="菜单名称" min-width="120" show-overflow-tooltip />
    <el-table-column prop="menuIcon" label="图标" min-width="100">
      <template #default="{ row }">
        <el-icon v-if="row?.icon">
          <component :is="row.icon"></component>
        </el-icon>
      </template>
    </el-table-column>
    <el-table-column prop="path" label="链接" min-width="140" />
    <el-table-column prop="level" label="层级" min-width="140" />
    <el-table-column prop="sort" label="排序" min-width="100" />
    <el-table-column prop="description" label="菜单描述" min-width="100" />
    <el-table-column prop="component" label="组件" min-width="140" />
    <el-table-column prop="status" label="状态" min-width="140" />
    <el-table-column prop="isShow" label="是否显示" min-width="140" >
      <template #default="{ row }">
        {{ row.isShow === 1 ? '显示' : '隐藏' }}
      </template>
    </el-table-column>
    <el-table-column prop="remark" label="备注" min-width="140" />
    <el-table-column fixed="right" label="操作" min-width="100">
      <template #default="{ row }">
        <template v-if="row.level == 0">
          <el-button size="small" @click="add(row)">
            <el-icon>
              <Plus />
            </el-icon>
            新增
          </el-button>
        </template>
        <el-button size="small" @click="edit(row)">
          编辑
        </el-button>
        <!-- <el-button type="danger" size="small" @click="Delete">删除</el-button> -->
      </template>
    </el-table-column>
  </el-table>
  <!-- </el-scrollbar> -->

  <!-- 弹框 -->
  <common-dialog ref="dialogRef" :headerTitle="headerTitle" @confirm="handleConfirm('confirm')"
    @cancel="handleConfirm('cancel')">
    <el-form ref="ruleFormRef" :model="form" :rules="rules">
      <el-form-item v-for="(item, index) in columns" :label="item.label" :prop="item.key" :label-width="item.width">
        <el-input v-model="form[item.key]" autocomplete="off" style="width:360px;" />
      </el-form-item>
    </el-form>
  </common-dialog>
</template>
