<template>
    <div>
        <!--  table -->
        <el-scrollbar style="width: var(--table-width)">
            <el-table :data="tableData" style="width: 100%" row-key="id">
                <el-table-column v-for="item in columns" :key="item.key" :prop="item.key" :label="item.label"
                    :min-width="item.width">
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
                    layout="prev, pager, next" :total="total" small background hide-on-single-page>
                </el-pagination>
            </div>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import { customerList } from '@/api/customer';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
const tableData = ref([])
const currentPage = ref(1); // 当前页
const pageSize = ref(10); // 每页显示条数
const total = ref(0); // 总条目数
const columns = ref([
  { width: 140, label: '姓名', key: 'nickName' },
  { width: 140, label: '手机号', key: 'mobile' },
  { width: 200, label: '客户号', key: 'customerCode' },
  { width: 140, label: '邮箱', key: 'email' },
]);

// 初始化
const init = async () => {
    await customerList().then((data) => {
        console.log(data);
        if (data.code === 200) {
            tableData.value = data.data.list;
            total.value = data.data.count;
        } else {
            
        }
    });
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