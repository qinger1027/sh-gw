<template>
  <common-dialog ref="dialogRef" @confirm="handleConfirm('confirm')" @cancel="handleConfirm('cancel')">
    <el-tree style="max-width: 600px" ref="treeRef" :data="data" show-checkbox node-key="id"
      :default-expanded-keys="[2]" :default-checked-keys="defaultChecked" :props="defaultProps" />
    <!-- <div class="authRemark">
      <label for="备注">备注</label>
      <el-input v-model="form.remark" autocomplete="off" class="authInput" type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }" />
    </div> -->
  </common-dialog>
</template>

<script setup lang="ts">
import { menuAuthSave, roleMenulist } from "@/api/role";
import commonDialog from "@/components/dialog/index.vue";
import { ElMessage } from "element-plus";
import { onMounted, ref, watch } from 'vue';
const dialogRef: any = ref()
onMounted(() => {
})
const defaultProps = {
  children: 'children',
  label: 'name',
}
const treeRef: any = ref(null)
// 默认选中的节点
const defaultChecked: any = ref([])
const data = ref([])
const form = ref({
  remark: ""
})
const currentItem: any = ref({})
// 打开
const roleAuthshow = (data?: any) => {
  // 弹框ref
  dialogRef.value.show()
}
// 打开
const roleAuthClose = (data?: any) => {
  dialogRef.value.close()
}
const getCurrentRow = (row?: any) => {
  currentItem.value = row.id;
  init()
}
// 暴露
defineExpose({
  roleAuthshow, roleAuthClose, getCurrentRow
})

/**
 * @description 默认选中选项处理 
 * @return [1,5,6]
 */
const defaultCheckedFun = async (data: any) => {
  let checked: any = []
  data.map((ele: any) => {
    if (ele.checked && ele.children==null) checked.push(ele.id)
    if (ele.children) {
      ele.children.map((item: any) => {
        if (item.checked) checked.push(item.id)
      })
    }
  })
  console.log(checked);
  return checked;
}

// 所有角色菜单列表
const init = async () => {
  let params = {
    roleId: currentItem.value
  }
  await roleMenulist(params).then(async (res) => {
    if (res.code === 200) {
      data.value = res.data;
      // 默认选中的选项
      defaultChecked.value = await defaultCheckedFun(res.data);
    } else {
      // 接口status不管是200还是500 && response.code不为200
    }
  });
}

// 获取所有选择的节点包括半选中节点
const getDeptAllCheckedKeys = () => {
  const checkedKeys = treeRef.value?.getCheckedKeys()
  const halfCheckedKeys = treeRef.value?.getHalfCheckedKeys()!
  checkedKeys?.unshift.apply(checkedKeys, halfCheckedKeys)
  console.log(checkedKeys);
  return checkedKeys
}

// 取消/确认
const handleConfirm = async (type?: any) => {
  if (type !== 'cancel') {
    try {
      let checkedKeys = getDeptAllCheckedKeys();
      let params = {
        "roleId": currentItem.value,
        "menuIds": checkedKeys,
        "remark": form.value.remark
      }
      await menuAuthSave(params).then((data) => {
        if (data.code === 200) {
          dialogRef.value.close()
          ElMessage({
            message: "保存成功",
            type: 'success',
            duration: 3000 // 显示3秒后消失
          });
          defaultChecked.value = []
        } else {
          // 接口status不管是200还是500 && response.code不为200
        }
      });
    } catch (error) {
      console.error('Failed to data:', error);
    }
  } else {
    dialogRef.value.close()
    defaultChecked.value = []
  }
}
</script>

<style lang="scss" scoped>
.authRemark {
  label {
    line-height: 50px;
  }

  .authInput {
    width: calc(100% - 60px);
    margin-left: 16px;
  }
}
</style>