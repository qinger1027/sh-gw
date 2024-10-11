<template>
  <!--  table -->
  <el-scrollbar style="width: var(--table-width)">
    <el-table :data="tableData" row-key="id" style="width: 100%;">
      <el-table-column v-for="(item, index) in columns" :key="index" :prop="item.key" :label="item.label" :width="180">
        <template #default="{ row }">
          <!-- item.prop每个字段   row每条数据 -->
          {{ row[item.key]?.code ? row[item.key].name : row[item.key] }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="160" min-width="160">
        <template #default="scope">
          <el-button size="small" @click="downAccountBtn(scope.row)">
            下户
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

</template>

<script setup lang="ts">
import { downAccountOperate, downAccountlist } from '@/api/downAccount';
import apply_order_list_info from '@/assets/order/apply_order_list_info';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const tableData = ref([]);
const currentPage = ref(1); // 当前页
const pageSize = ref(10); // 每页显示条数
const total = ref(0); // 总条目数
const columns = ref(apply_order_list_info);;
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
// 调用列表接口
const init = async () => {
  try {
    let params = {
      //   "pageNum": currentPage.value,
      //   "pageSize": pageSize.value
    }
    await downAccountlist(params).then((data) => {
      if (data.code === 200) {
        tableData.value = data.data.list;
        total.value = data.data.count;
      }
    });
  } catch (error) {
    console.error('Failed to data:', error);
  }
}

// 下户按钮
const downAccountBtn = async (row: any) => {
  router.push({
    path: '/applyManage/downAccountDetail',
    query: {
      applyNo: row.applyNo,
      customerCode: row.customerCode,
      status: 'detail'
    }
  })
  // let params = {
  // //   "pageNum": currentPage.value,
  // //   "pageSize": pageSize.value
  // }
  // await downAccountOperate(params).then((data:any) => {
  //   if (data.code === 200) {
  //   }
  // });
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

</script>

<style lang="scss" scoped></style>