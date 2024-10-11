<template>
    <div class="apply_header">
        <div style="display: flex;flex-wrap: wrap;">
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
        </div>
        <div style="text-align: right;">
            <el-button type="primary" @click="init" style="text-align: right;">
                查询
            </el-button>
            <el-button type="primary" @click="add">
                新建工单
            </el-button>
        </div>
    </div>
    <!--  table -->
    <el-scrollbar style="width: var(--table-width);">
        <el-table :data="tableData" row-key="id" :table-layout="tableLayout">
            <el-table-column v-for="item in columns" :key="item.key" :prop="item.key" :label="item.label"
                :min-width="item.width">
                <template #default="{ row }">
                    <!-- item.prop每个字段   row每条数据 -->
                    {{ row[item.key]?.code ? row[item.key].name : row[item.key] }}
                </template>
            </el-table-column>
            <!-- guestStatus A01审核中 A02审核通过 'A03' 审核拒绝 ---- 编辑 -->
            <el-table-column fixed="right" label="操作" width="160">
                <template #default="{ row }">
                    <el-button size="small" v-if="row?.applyStatus?.code === 'A10' && row?.allowApply === 0"
                        @click="edit(row)">
                        编辑
                    </el-button>
                    <el-button size="small" @click="detail(row)">
                        详情
                    </el-button>
                    <!-- replenishStatus=0不需要；1需要-->
                    <el-button size="small" v-if="row?.replenishStatus === 1" @click="replenishStatus(row)">
                        补录
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
const customerCode = ref();
const applyNo = ref();
const searchField = ref({
    applySource: '',
    applySourceList: [
        { text: 'h5', value: 'h5' },
        { text: 'manage', value: 'manage' },
    ],
    mobile: '',
    applyStatus: '',
    applyStatusList: [
        { text: '资料审核中', value: 'A10' },
        { text: '授信审核中', value: 'A11' },
        { text: '下户审核中', value: 'A12' },
        { text: '店长复核中', value: 'A13' },
        { text: '资产端审核通过', value: 'A14' },
        { text: '渠道申请工单成功', value: 'APPLY_SUCCESS' },
        { text: '外部渠道处理中', value: 'CHANNEL_PROCESSING' },
        { text: '放款成功', value: 'LOAN_SUCCESS' },
        { text: '放款失败', value: 'LOAN_FAIL' },
    ],
    createTime:'',
    uumCustNo:'',
    uumCustNoList:<any>[]
})
const currentPage = ref(1); // 当前页
const pageSize = ref(10); // 每页显示条数
const total = ref(0); // 总条目数
const columns = ref(apply_order_list_info);
const tableData = ref([])
// 指定表格中单元格、行和列的布局方式
const tableLayout = ref<TableInstance['tableLayout']>('fixed')
// 初始化
const init = async () => {
    let params = {
        "customerCode": customerCode.value || null,
        "applyNo": applyNo.value || null,
        "applySource": searchField.value.applySource || null,
        "applyStatus": searchField.value.applyStatus || null,
        "mobile": searchField.value.mobile || null,
        "uumCustNo": searchField.value.uumCustNo || null,
        "startCreateTime": searchField.value.createTime && searchField.value.createTime[0] || null,
        "endCreateTime": searchField.value.createTime && searchField.value.createTime[1] || null,
    }
    await queryApplylist(currentPage.value, pageSize.value, params).then((data) => {
        console.log(data);
        if (data.code === 200) {
            tableData.value = data.data.list;
            total.value = data.data.count;
        } else {

        }
    });
}
// 编辑
const edit = async (row: any) => {
    if (row.applySource === 'h5') {
        router.push({
            path: "/applyManage/applyForOrder",
            query: {
                applyNo: row.applyNo,
                customerCode: row.customerCode,
                status: "h5_edit",
                mobile: row.mobile,
            },
        });
    } else {
        router.push({
            path: '/applyManage/customer_info',
            query: {
                applyNo: row.applyNo,
                customerCode: row.customerCode,
                status: 'edit'
            }
        })
    }
}
// 工单详情
const detail = async (row: any) => {
    if (row.applyStatus?.code === 'A13') {
        router.push({
            path: '/applyManage/storeManagerReviewDetail',
            query: {
                applyNo: row.applyNo,
                customerCode: row.customerCode,
                status: 'detail'
            }
        })
        return;
    }
    router.push({
        path: '/applyManage/applyDetail',
        query: {
            applyNo: row.applyNo,
            customerCode: row.customerCode,
            status: 'detail'
        }
    })
}

onMounted(() => {
    storeFiltration().then((res) => {
        if (res.code === 200) {
            searchField.value.uumCustNoList = res.data;
        } else {
            ElMessage({
                message: `获取门店列表有误`,
                type: "error",
                duration: 3000, // 显示3秒后消失
            });
        }
    });
    init()
})

// 填用户信息 - 申请工单
const add = () => {
    router.push({
        path: '/applyManage/customer_info',
        query: {
        }
    })
};

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
// 补录
const replenishStatus = async (row: any) => {
    router.push({
        path: '/applyManage/replenish',
        query: {
            applyNo: row.applyNo
        }
    })
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