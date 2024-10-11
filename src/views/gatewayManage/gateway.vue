<script setup lang="ts">
import { ElMessage, type FormInstance, type FormRules, type TableInstance } from 'element-plus';
import { computed, onMounted, reactive, ref, type CSSProperties } from 'vue';
import { storeList, storeDelete, allCity, getAreas, storeSave, storelistByType, storerechargeAmount, storegetAmountInfo } from '@/api/store'
import { Search } from '@element-plus/icons-vue'
import commonDialog from "@/components/dialog/index.vue";

const typeEnum: any = ref([
  {
    "label": "旗舰店",
    "value": "flagship"
  },
  {
    "label": "直营门店",
    "value": "direct_sale"
  },
  {
    "label": "加盟门店",
    "value": "franchiser"
  },
  {
    "label": "加盟大区",
    "value": "franchise_region"
  },
])
let typeEchoEnum: any = {
  "flagship": "旗舰店",
  "direct_sale": "直营门店",
  "franchiser": "加盟门店",
  "franchise_region": "加盟大区"
}

enum statusEnum {
  "正常" = 0,
  "禁用" = 1,
}
// 是否显示弹框
const visible = ref(false)
const isShowParentName = ref(false);
const storeListByType: any = ref([])
// 弹框是否显示
const dialogFormVisible = ref(false)
// 弹框状态
const status: any = ref('add')
let tableData = ref();
const currentPage = ref(1); // 当前页
const pageSize = ref(10); // 每页显示条数
const total = ref(0); // 总条目数
const columns = ref([
  { width: 140, label: '门店名称', key: 'name' },
  { width: 140, label: '所属门店', key: 'parentName' },
  { width: 230, label: '门店地址', key: 'address' },
  { width: 120, label: '联系方式', key: 'contactPhone' },
  { width: 120, label: '类型', key: 'type' },
  { width: 120, label: '门店主管', key: 'supervisor' },
  { width: 120, label: '保证金', key: 'storeCautionMoney' },
  { width: 120, label: '保证金比例', key: 'cautionRatio' },
  { width: 120, label: '代偿金', key: 'storeCompensationMoney' },
  { width: 150, label: '门店保证金占用额度', key: 'storeUseCautionMoney' },
  { width: 130, label: '应补剩余代偿金', key: 'storeSupplementCompensationMoney' },
  { width: 130, label: '门店保证金圈存', key: 'storeCaptivityCautionMoney' },
  // { width: 130, label: '门店额度', key: 'storeDepositLimit' },
  // { width: 130, label: '门店使用额度', key: 'storeUsedDepositLimit' },
  { width: 120, label: '省', key: 'province' },
  { width: 120, label: '市', key: 'city' },
  { width: 100, label: '区', key: 'area' },
  { width: 230, label: '大区', key: 'region' },
  { width: 120, label: '状态', key: 'status' },
  { width: 120, label: '备注', key: 'remark' },
]);
const funColumns = ref([
  {
    "width": "100px",
    "label": "门店名称",
    "key": "name",
    "isShow": true
  },
  {
    "width": "100px",
    "label": "门店地址",
    "key": "address",
    "isShow": true
  },
  {
    "width": "100px",
    "label": "联系方式",
    "key": "contactPhone",
    "isShow": true
  },
  {
    "width": "100px",
    "label": "类型",
    "key": "type",
    "isShow": true
  },
  {
    "width": 100,
    "label": "所属门店",
    "key": "parentId",
    "isShow": false
  },
  {
    "width": 100,
    "label": "门店主管",
    "key": "supervisor",
    "isShow": true
  },
  {
    "width": 100,
    "label": "省",
    "key": "province",
    "isShow": true
  },
  {
    "width": 100,
    "label": "市",
    "key": "city",
    "isShow": true
  },
  {
    "width": 100,
    "label": "区",
    "key": "area",
    "isShow": true
  },
  {
    "width": 100,
    "label": "大区",
    "key": "region",
    "isShow": true
  },
  {
    "width": 100,
    "label": "备注",
    "key": "remark",
    "isShow": true
  }
]);

interface ruleForm {
  name: string
  address: string
  contactPhone: string
  parentId: string
  parentName?: string
  province: string
  city: string
  area: string
  region: string
  type: string
  supervisor: string
  remark: string
}
const form: any = reactive<ruleForm>({
  name: '',
  address: '',
  contactPhone: '',
  parentId: '',
  parentName: '',
  province: '',
  city: '',
  area: '',
  region: '',
  type: '',
  supervisor: '',
  remark: '',
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules<ruleForm>>({
  name: [
    { required: true, message: '请输入门店名称', trigger: 'blur', type: 'string' },
  ],
  address: [
    { required: true, message: '请输入门店地址', trigger: 'blur' },
  ],
  contactPhone: [
    { required: true, message: '请输入联系方式', trigger: 'blur' },
  ],
  type: [
    { required: true, message: '请选择类型', trigger: 'change' },
  ],
  province: [
    { required: true, message: '请选择省', trigger: 'change' },
  ],
  city: [
    { required: true, message: '请选择市', trigger: 'change' },
  ],
  area: [
    { required: true, message: '请选择区', trigger: 'change' },
  ],
  region: [
    { required: true, message: '请输入大区', trigger: 'blur' },
  ],
  supervisor: [
    { required: true, message: '请输入门店主管', trigger: 'blur' },
  ],
  remark: [
    { required: false, message: '备注', trigger: 'blur' },
  ],
})

const headerTitle = ref("新增门店")
const search = ref("")
// 获取省
const provinceAndCity: any = ref([])
const citys: any = ref([])
const areas: any = ref([])
// 保证金弹框ref
const dialogRef = ref()
// 保证金弹框rule ref
const rechargeAmountRuleRef = ref()
// 保证金弹框rule
const rechargeAmountRule = ref()
// 保证金弹框 显示字段
const rechargeAmountColumns = ref([
  { width: 120, label: '保证金', key: 'storeCautionMoney', status: "" },
  { width: 120, label: '保证金比例', key: 'cautionRatio', status: "" },
  { width: 120, label: '代偿金', key: 'storeCompensationMoney', status: "" },
  { width: 120, label: '代偿金比例', key: 'storeCompensationRatio', status: "" }
]);
const rechargeAmountData: any = ref({});
const currentRechargeAmountData: any = ref({});

// 调用接口
const init = async () => {
  try {
    let params = {
      "pageNum": currentPage.value,
      "pageSize": pageSize.value
    }
    await storeList(params.pageNum, params.pageSize, {}).then((data) => {
      if (data.code === 200) {
        tableData.value = data.data?.list;
        total.value = data.data?.count;
      }
    });
  } catch (error) {
    console.error('Failed to data:', error);
  }
}

onMounted(() => {
  init()
})

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
// 获取所有省
const getProvinceAndCity = async () => {
  try {
    await allCity().then((data) => {
      if (data.code === 200) {
        provinceAndCity.value = data.data;
        // 如果是编辑时,回显省市区及下拉框数据
        if (status.value == 'edit') {
          provinceAndCity.value.map((ele: any) => {
            if (ele.name === form.province) {
              citys.value = ele;
              citys.value.children.map((item: any) => {
                if (item.name === form.city) {
                  cityClick(item)
                }
              })
            }
          })
        }
      }
    });
  } catch (error) {
    console.error('Failed to data:', error);
  }
}
// 点击省份时
const provinceClick = (province: any) => {
  citys.value = province;
}

// 点击市时
const cityClick = async (city: any) => {
  try {
    await getAreas(city.bizId).then((data) => {
      if (data.code === 200) {
        areas.value = data.data;
      }
    });
  } catch (error) {
    console.error('Failed to data:', error);
  }
}
// 省改变值时,清空市区
const provinceChange = () => {
  form.city = '';
  form.area = '';
}
// 市改变值时,清空区
const cityChange = () => {
  form.area = '';
}
// 确认
const confirm = async (formEl: FormInstance) => {
  if (!ruleFormRef.value) return
  await ruleFormRef.value?.validate(async (valid, fields) => {
    if (valid) {
      dialogFormVisible.value = false;
      try {
        if (status.value !== 'edit') delete form['id']
        await storeSave(form).then((data) => {
          if (data.code === 200) {
            init();
            ElMessage({
              message: `${status.value !== 'edit'?'保存':'更新'}成功`,
              type: 'success',
              duration: 3000 // 显示3秒后消失
            });
            status.value = ''
            // 清空弹框信息
            clearFrom()
          }
        });
      } catch (error) {
        status.value = ''
        console.error('Failed to data:', error);
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
// 清空form
const clearFrom = () => {
  Object.keys(form).map((ele: any) => {
    form[ele] = ''
  })
}
// 新增
const add = () => {
  dialogFormVisible.value = true;
  status.value = 'add'
  headerTitle.value = '新增'
  clearFrom()
  getProvinceAndCity();
}
// 编辑
const edit = (row: any) => {
  dialogFormVisible.value = true;
  status.value = 'edit'
  headerTitle.value = "编辑门店"
  funColumns.value.map((ele: any) => {
    form[ele.key] = row[ele.key];
    form['id'] = row.id;
    form['parentName'] = row.parentName;
  })
  if (form.type !== 'flagship') {
    isShowParentName.value = true
    funColumns.value.map((ele: any) => {
      if(ele.key === 'parentId'){
        ele.isShow = true;
      }
    })
  } else {
    isShowParentName.value = false
  }
  // 获取省数据
  getProvinceAndCity();
}
// 删除
const Delete = async (row: any) => {
  visible.value = true;
}
// 确认删除
const confirmDelete = async (row: any) => {
  const data = await storeDelete(row);
  if (data.code === 200) {
    visible.value = false;
    init();
  }
}

const cancel = () => {
  dialogFormVisible.value = false;
  status.value = ''
  // 清空弹框信息
  clearFrom()
  // 对该表单项进行重置，将其值重置为初始值并移除校验结果
  ruleFormRef.value?.resetFields()
}
// 类型改变时
const typeChange = (item: any) => {
  if (form.type !== 'flagship') {
    isShowParentName.value = true
    funColumns.value.map((ele: any) => {
      if(ele.key === 'parentId'){
        ele.isShow = true;
      }
    })
  } else {
    isShowParentName.value = false
  } 
}
// 获取门店列表
const getStorelistByType = async () => {
  await storelistByType(form.type).then((data) => {
    if (data.code === 200) {
      storeListByType.value = data.data
      // 如果已经选中所属门店，则清空
      form.parentId = ''
    }
  });
}
// 充值保证金
const rechargeAmount = async (item: any) => {
  await storegetAmountInfo(item.id).then((data) => {
    if (data.code === 200) {
      dialogRef.value.show()
      // 是否显示footer
      dialogRef.value.isShowFooter(false)
      rechargeAmountData.value = data.data;
      // 为了解决点击取消后恢复原有的值
      currentRechargeAmountData.value = JSON.parse(JSON.stringify(data.data));
    }
  });
}
// 充值保证金 确认
const handleConfirm = async (type: any,item?:any) => {
  if (type !== 'cancel') {
    if (!rechargeAmountRuleRef.value) return
    await rechargeAmountRuleRef.value?.validate(async (valid: any, fields: any) => {
      if (valid) {
        let params = {
          "id": rechargeAmountData.value.id,
          "storeCautionMoney": item.key==='storeCautionMoney' ? rechargeAmountData.value.storeCautionMoney : null,
          "cautionRatio": item.key==='cautionRatio' ? rechargeAmountData.value.cautionRatio : null,
          "storeCompensationMoney": item.key==='storeCompensationMoney' ? rechargeAmountData.value.storeCompensationMoney : null,
          "storeCompensationRatio": item.key==='storeCompensationRatio' ? rechargeAmountData.value.storeCompensationRatio : null
        }
        await storerechargeAmount(params).then((res) => {
          if (res.code === 200) {
            dialogRef.value.close()
            init()
            ElMessage({
              message: "操作成功",
              type: 'success',
              duration: 3000 // 显示3秒后消失
            });
            rechargeAmountColumns.value.map((ele) => {
              ele.status = ''
            })
          } else {
            // 接口status不管是200还是500 && response.code不为200
            rechargeAmountColumns.value.map((ele) => {
              ele.status = ''
            })
          }
        });
      } else {
        console.log('error submit!', fields)
      }
    })
  } else {
    // 取消在点击充值 初始化
    rechargeAmountColumns.value.map((ele) => {
      ele.status = ''
    })
  }
}
// 充值保证金 验证
const validateInput = (key: any) => {
  // 使用正则表达式校验输入内容是否为非负数且保留两位小数
  let reg = /^\d{1,7}(\.\d{1,2})?$/;
  let value = rechargeAmountData.value[key];
  if (!reg.test(value)) {
    // 如果输入内容不符合要求，则恢复输入框的值
    rechargeAmountData.value[key] = value.slice(0, -1);
  }
}
// 充值保证金 编辑
const rechargeAmountStatusEdit = (item: any) => {
  let status = rechargeAmountColumns.value.filter((ele) => {
    return ele.status == 'edit'
  })
  if (status.length > 0) {
    ElMessage({
      message: "请先保存或取消",
      type: 'warning',
      duration: 3000 // 显示3秒后消失
    });
    return;
  }
  item.status = 'edit';
};
</script>
<template>
  <div class="gateway_header">
    <el-button type="danger" size="small" @click="add" style="margin: 10px 8px;padding: 14px 10px;">
      <el-icon>
        <Plus />
      </el-icon>新增
    </el-button>
    <el-input v-model="search" placeholder="查询" :prefix-icon="Search" />
  </div>
  <!--  table -->
  <el-scrollbar style="width: var(--table-width)">
    <el-table :data="tableData" row-key="id" style="width: 100%;">
      <el-table-column v-for="(item, index) in columns" :key="index" :prop="item.key" :label="item.label"
        :width="item.width">
        <template #default="{ row }">
          <!-- item.prop每个字段   row每条数据 -->
          {{ item.key === 'type' ? typeEchoEnum[row.type] : item.key === 'status' ? statusEnum[row.status] :
            row[item.key] }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="260" min-width="260">
        <template #default="scope">
          <el-button size="small" @click="edit(scope.row)">
            <el-icon>
              <Plus />
            </el-icon>
            编辑
          </el-button>
          <el-popconfirm width="220" confirm-button-text="确认" cancel-button-text="取消"
            @confirm="confirmDelete(scope.row)" title="确认要删除吗？">
            <template #reference>
              <el-button type="danger" size="small" @click="Delete(scope.row)">删除</el-button>
            </template>
          </el-popconfirm>
          <!-- "flagship": "旗舰店", "direct_sale": "直营门店", ---不可以充值-->
          <el-button size="small" @click="rechargeAmount(scope.row)" v-if="scope.row.type !== 'flagship' && scope.row.type !== 'direct_sale'">
            充值保证金
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="prev, pager, next" :total="total" small background
        hide-on-single-page>
      </el-pagination>
    </div>
  </el-scrollbar>

  <!-- 新增弹框 -->
  <el-dialog v-model="dialogFormVisible" :title="headerTitle" width="500">
    <el-form ref="ruleFormRef" :model="form" :rules="rules">
      <el-form-item v-for="(item, index) in funColumns" :prop="item.key"
        :rules="form.type !== 'flagship' && item.key === 'parentId' ? { required: true, message: '请选择所属门店', trigger: 'change' } : {}">
        <template v-if="item.isShow">
          <div v-if="item.key === 'type'" slot="label">
            <label :class="{ label_width: true }">
              <span>*</span>
              {{ item.label }}
            </label>
            <el-select v-model="form.type" placeholder="请选择类型" style="width:360px;"
              :disabled="status == 'edit' ? true : false" @change="typeChange(item)">
              <el-option v-for="(child, i) in typeEnum" :label="child.label" :value="child.value"
                @click="getStorelistByType" />
            </el-select>
          </div>
          <!-- 所属门店 -->
          <div v-else-if="item.key === 'parentId'" slot="label" style="display: flex;">
            <template v-if="isShowParentName">
              <label :class="{ label_width: true }">
                <span v-if="form.type !== 'flagship'">*</span>
                {{ item.label }}
              </label>
              <div v-if="status === 'add'">
                <el-select v-model="form.parentId" placeholder="请选择所属门店" style="width:360px;">
                  <el-option v-for="(listtype, j) in storeListByType" :label="listtype.name" :value="listtype.id" />
                </el-select>
              </div>
              <div v-else>
                <el-input v-model="form.parentName" autocomplete="off" style="width:360px;" disabled />
              </div>
            </template>
          </div>
          <div v-else-if="item.key === 'province'" slot="label">
            <label :class="{ label_width: true }">
              <span>*</span>
              {{ item.label }}
            </label>
            <el-select v-model="form[item.key]" placeholder="请选择省" style="width:360px;" @change="provinceChange">
              <el-option v-for="(province, index) in provinceAndCity" :label="province.name" :value="province.name"
                @click="provinceClick(province)" />
            </el-select>
          </div>
          <div v-else-if="item.key === 'city'" slot="label">
            <label :class="{ label_width: true }">
              <span>*</span>
              {{ item.label }}
            </label>
            <el-select v-model="form[item.key]" placeholder="请选择市" style="width:360px;" @change="cityChange">
              <el-option v-for="(city, index) in citys.children" :label="city.name" :value="city.name"
                @click="cityClick(city)" />
            </el-select>
          </div>
          <div v-else-if="item.key === 'area'" slot="label">
            <label :class="{ label_width: true }">
              <span>*</span>
              {{ item.label }}
            </label>
            <el-select v-model="form[item.key]" placeholder="请选择区" style="width:360px;">
              <el-option v-for="(area, index) in areas" :label="area.name" :value="area.name" />
            </el-select>
          </div>
  
          <div v-else slot="label">
            <label :class="{ label_width: true }">
              <span v-if="item.key !== 'remark'">*</span>
              {{ item.label }}
            </label>
            <el-input v-model="form[item.key]" autocomplete="off" style="width:360px;" />
          </div>
        </template>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 新增弹框 end -->
  <!-- 保证金充值弹框 -->
  <common-dialog ref="dialogRef" :headerTitle="''" @cancel="handleConfirm('cancel')">
    <el-form ref="rechargeAmountRuleRef" :model="rechargeAmountData" :rules="rechargeAmountRule">
      <el-form-item v-for="(item, index) in rechargeAmountColumns" :label="item.label" :prop="item.key"
        :label-width="item.width">
        <template v-if="item.status === 'edit'" style="display:flex;">
          <el-input type="number" min="0" :step="0.01" v-model="rechargeAmountData[item.key]" autocomplete="off"
            style="width:200px;" placeholder="请输入非负数，保留两位小数" @input="validateInput(item.key)" />
          <el-button @click="item.status = '';rechargeAmountData[item.key] = currentRechargeAmountData[item.key]">取消</el-button>
          <el-button @click="handleConfirm('save',item)">保存</el-button>
        </template>
        <template v-else>
          <el-input v-model="rechargeAmountData[item.key]" style="width:270px;" placeholder="请输入非负数，保留两位小数" disabled />
          <el-button @click="rechargeAmountStatusEdit(item)">编辑</el-button>
        </template>
      </el-form-item>
    </el-form>
  </common-dialog>
  <!-- 保证金充值弹框 end -->
</template>
<style lang="scss" scoped>
.label_width {
  width: 95px;
  display: inline-block;
  text-align: right;
  margin-right: 10px;

  span {
    color: #f56d6d;
  }
}

.gateway_header {
  height: 50px;
  background: #fff;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  .el-input {
    width: 240px;
    height: 30px;
  }
}

:deep(.el-form-item__error) {
  left: 102px !important;
}

.pagination {
  justify-content: flex-end;
  padding: 10px;
  background: #fff;
  display: flex;
}
</style>