<template>
    <div class="apply_header">
        <!-- <div style="display: flex;flex-wrap: wrap;">
            <div class="apply_header_search">
                <label for="">客户号:</label>
                <el-input v-model="customerCode" style="" placeholder="请输入客户号" :prefix-icon="Search" />
            </div>
            <div class="apply_header_search">
                <label for="">工单号:</label>
                <el-input v-model="applyNo" style="" placeholder="请输入工单号" :prefix-icon="Search" />
            </div>
            <div class="apply_header_search">
                <label for="">手机号:</label>
                <el-input v-model="searchField.mobile" style="" placeholder="请输入手机号" :prefix-icon="Search" />
            </div>
            <div class="apply_header_search">
                <label for="">门店:</label>
                <el-select v-model="searchField.uumCustNo" placeholder="请选择门店" class="w-240" clearable>
                    <el-option v-for="(select, index) in searchField.uumCustNoList" :label="select?.name"
                        :value="select?.id" />
                </el-select>
            </div>
            <div class="apply_header_search">
                <label for="">工单来源:</label>
                <el-select v-model="searchField.applySource" placeholder="请选择工单来源" class="w-240" clearable>
                    <el-option v-for="(select, index) in searchField.applySourceList" :label="select.text"
                        :value="select.value" />
                </el-select>
            </div>
            <div class="apply_header_search">
                <label for="">工单状态:</label>
                <el-select v-model="searchField.applyStatus" placeholder="请选择工单状态" class="w-240" clearable>
                    <el-option v-for="(select, index) in searchField.applyStatusList" :label="select.text"
                        :value="select.value" />
                </el-select>
            </div>
            <div class="apply_header_search">
                <label for="">创建时间:</label>
                <el-date-picker
                    v-model="searchField.createTime"
                    type="daterange"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    range-separator="~"
                    start-placeholder="起始日期"
                    end-placeholder="截至日期"
                    :size="'default'"
                    style="width: 220px"
                    />
            </div>
        </div> -->
        <div style="text-align: right;">
            <!-- <el-button type="primary" @click="init" style="text-align: right;">
                查询
            </el-button> -->
            <el-button type="primary" @click="create">
                创建分类
            </el-button>
        </div>
    </div>
    <!--  table -->
    <el-scrollbar style="width: var(--table-width);">
        <el-table :data="categoryListData" row-key="id" :table-layout="tableLayout">
            <el-table-column v-for="item in categoryListcolumns" :key="item.key" :prop="item.key" :label="item.label"
                :min-width="item.width">
                <template #default="{ row }">
                    {{ item.key ==='bizType' ? typeMap[row[item.key]] : 
                    item.key === 'position' ? positionMap[row[item.key]] :
                     row[item.key] }}
                </template>
            </el-table-column>
            <!-- guestStatus A01审核中 A02审核通过 'A03' 审核拒绝 ---- 编辑 -->
            <el-table-column fixed="right" label="操作" width="160">
                <template #default="{ row }">
                    <el-button size="small" @click="edit(row)">
                        编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
                layout="prev, pager, next" :total="total" small background hide-on-single-page>
            </el-pagination>
        </div>
    </el-scrollbar>    
</template>

<script setup lang="ts">
import { queryApplyListSearch, queryApplylist } from '@/api/apply';
import { ElMessage, type TableInstance } from 'element-plus';
import { onMounted, ref } from 'vue';
import { Search } from '@element-plus/icons-vue'
import router from '@/router';
import apply_order_list_info from '@/assets/order/apply_order_list_info';
import { storeFiltration } from '@/api/store';
import { cmsDetail, cmsList, cmscategoryList } from "@/api/officialSite";
import { typeMap ,positionMap } from '@/enums/enums';
const columns = ref([
    { width: '120', key: "position", label: '位置' },
    { width: '120', key: "title", label: '标题' },
    { width: '120', key: "type", label: '类型' },
    { width: '120', key: "weight", label: '排序' },
]);
const categoryListcolumns = ref([
    { width: '120', key: "bizType", label: '分类数据类型' },
    { width: '120', key: "position", label: '位置' },
    { width: '120', key: "title", label: '标题' },
    { width: '120', key: "weight", label: '排序' },
]);
const currentPage = ref(1); // 当前页
const pageSize = ref(10); // 每页显示条数
const total = ref(0); // 总条目数
const tableData = ref([])
const categoryListData = ref([])
// 指定表格中单元格、行和列的布局方式
const tableLayout = ref<TableInstance['tableLayout']>('fixed')

// 初始化
const init = async () => {
    let params = {
        "pageNum": currentPage.value,
        "pageSize": pageSize.value
    }
    await cmscategoryList(params).then((data) => {
        console.log(data);
        if (data.code === 200) {
            categoryListData.value = data.data.list;
            total.value = data.data.count;
        } else {

        }
    });
}
// 编辑
const edit = async (row: any) => {
    console.log(row);
    router.push({
        path: '/officialSite/createCategory',
        query: {
            id: row.id,
            // type: row.type,
            status: "edit"
        }
    })
}
// 创建
const create = async (row: any) => {
    console.log(row);
    router.push({
        path: '/officialSite/createCategory'
    })
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

<style lang="scss" scoped>
.apply_header {
    height: auto;
    background: #fff;
    margin-bottom: 10px;
    padding: 10px;

    .apply_header_search {
        font-size: 14px;
        margin-bottom: 16px;
        margin-right: 16px;

        label {
            display: inline-block;
            width: 70px;
            letter-spacing: .5px;
            text-align: right;
            margin-right: 4px;
        }

        .el-input {
            width: 240px;
            height: 30px;
        }
    }
}

.pagination {
    justify-content: flex-end;
    padding: 10px;
    background: #fff;
    display: flex;
}
</style>