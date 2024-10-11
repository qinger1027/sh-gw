<script setup lang="ts">
import { roleDelete, roleList, roleSave } from '@/api/role';
import { ElMessage, type FormInstance, type FormRules, type TableInstance } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import commonDialog from "@/components/dialog/index.vue";
import roleAuth from "@/views/permission/role/auth.vue";
// 指定表格中单元格、行和列的布局方式
const tableLayout = ref<TableInstance['tableLayout']>('auto')

let tableData = ref([])
const headerTitle = ref("")
const dialogRef = ref()
const authRef = ref()
const showroleAuth = ref(false)
// 调用接口
const init = async () => {
    try {
        let params = {
            "offset": 0,
            "pageSize": 10
        }
        await roleList(params).then((data) => {
            if (data.code === 200) {
                tableData.value = data.data.list;
            }
        });
    } catch (error) {
        console.error('Failed to data:', error);
    }
}

onMounted(() => {
    init()
})

const add = () => {
    headerTitle.value = '新增角色'
    dialogRef.value.show()
}
const edit = () => {

}

const perm = (row: any) => {
    authRef.value.getCurrentRow(row)
    authRef.value.roleAuthshow()
}
const Delete = async (row: any) => {
    let params = {
        id: row.id
    }
    await roleDelete(params).then((data) => {
        if (data.code === 200) {
            init();
            ElMessage({
                message: "删除成功",
                type: 'success',
                duration: 3000 // 显示3秒后消失
            });
        } else {
            // 接口status不管是200还是500 && response.code不为200
        }
    });
}

interface ruleForm {
    name: string
    description: string
    remark: string
}
const columns = ref([
    { width: 100, label: '角色名称', key: 'name' },
    { width: 100, label: '角色描述', key: 'description' },
    { width: 100, label: '备注', key: 'remark' },
]);
const ruleFormRef = ref<FormInstance>()
const form: any = ref<ruleForm>({
    name: '',
    description: '',
    remark: '',
})
const rules = reactive<FormRules<ruleForm>>({
    name: [
        { required: true, message: '请输入角色名称', trigger: 'blur', type: 'string' },
    ]
})


// 确认
const handleConfirm = async (type?: any) => {
    if (!ruleFormRef.value) return
    console.log(type);
    await ruleFormRef.value?.validate(async (valid, fields) => {
        if (valid) {
            try {
                let params = {
                    roleName: form.value.name,
                    description: form.value.description,
                    remark: form.value.remark
                }
                await roleSave(params).then((data) => {
                    if (data.code === 200) {
                        dialogRef.value.close()
                        init()
                        form.value = {
                            name: '',
                            description: '',
                            remark: '',
                        }
                    } else {
                        // 接口status不管是200还是500 && response.code不为200
                    }
                });
            } catch (error) {
                console.error('Failed to data:', error);
            }
        } else {
            console.log('error submit!', fields)
        }
    })
}

const handleCancel = () => {
    form.value = {
        name: '',
        description: '',
        remark: '',
    }
}
</script>

<template>
    <div style="width: 100%;height: 50px;background: #fff;margin-bottom: 10px">
        <el-button type="danger" size="small" @click="add" style="margin: 10px 8px;padding: 14px 10px;">
            <el-icon>
                <Plus />
            </el-icon>新增角色
        </el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" :table-layout="tableLayout">
        <el-table-column prop="id" label="角色id" min-width="180" />
        <el-table-column prop="roleName" label="角色名称" min-width="180" />
        <el-table-column prop="description" label="描述" min-width="180" />
        <el-table-column prop="remark" label="备注" min-width="220" />
        <el-table-column fixed="right" label="操作" min-width="120">
            <template #default="{ row }">
                <!-- <el-button size="small" @click="edit">
                    编辑wu
                </el-button> -->
                <el-button size="small" @click="perm(row)">
                    分配权限
                </el-button>
                <el-button type="danger" size="small" @click="Delete(row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 弹框 -->
    <common-dialog ref="dialogRef" :headerTitle="headerTitle" @confirm="handleConfirm($event)" @cancel="handleCancel">
        <el-form ref="ruleFormRef" :model="form" :rules="rules">
            <el-form-item v-for="(item, index) in columns" :label="item.label" :prop="item.key"
                :label-width="item.width">
                <el-input v-model="form[item.key]" autocomplete="off" style="width:360px;" />
            </el-form-item>
        </el-form>
    </common-dialog>
    <role-auth ref="authRef"></role-auth>
</template>
<style lang="scss" scoped></style>