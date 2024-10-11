<template>
    <div class="apply_header">
        <div style="display: flex;flex-wrap: wrap;">
            <div class="apply_header_search">
                <label for="">文章Id:</label>
                <el-input v-model="searchField.cmsId" style="" placeholder="请输入文章Id" :prefix-icon="Search" />
            </div>
            <!-- <div class="apply_header_search">
                <label for="">平台:</label>
                <el-input v-model="searchField.platform" style="" placeholder="请输入客户号" :prefix-icon="Search" />
            </div> -->
            <div class="apply_header_search">
                <label for="">位置:</label>
                <el-select v-model="searchField.position" placeholder="请选择位置" class="w-240" clearable>
                    <el-option v-for="(select, index) in searchField.positionSelectData" :label="select?.label"
                        :value="select?.value" />
                </el-select>
            </div>
            <div class="apply_header_search">
                <label for="">类型:</label>
                <el-select v-model="searchField.type" placeholder="请选择类型" class="w-240" clearable>
                    <el-option v-for="(select, index) in searchField.typeSelectData" :label="select?.label"
                        :value="select?.value" />
                </el-select>
            </div>
            <div class="apply_header_search">
                <label for="">状态:</label>
                <el-select v-model="searchField.openupState" placeholder="请选择状态" class="w-240" clearable>
                    <el-option v-for="(select, index) in searchField.openupStateSelectData" :label="select?.label"
                        :value="select?.value" />
                </el-select>
            </div>
        </div>
        <div style="text-align: right;">
            <el-button type="primary" @click="init" style="text-align: right;">
                查询
            </el-button>
            <el-button type="primary" @click="create">
                创建文章
            </el-button>
        </div>
    </div>
    <!-- {{ handleGetLabel(searchField.openupStateSelectData,'DISABLED') }} -->
    <!--  table -->
    <el-scrollbar style="width: var(--table-width);">
        <el-table :data="tableData" row-key="id" :table-layout="tableLayout">
            <el-table-column v-for="item in columns" :key="item.key" :prop="item.key" :label="item.label"
                :min-width="item.width">
                <template #default="{ row }">
                    <!-- item.prop每个字段   row每条数据 -->
                    {{ item.key === 'position' ? positionSelectData[row[item.key]] : 
                    item.key === 'type' ? typeSelectData[row[item.key]] :
                    item.key === 'openupState'? openupStateSelectData[row[item.key]]: 
                        row[item.key] }}
                </template>
            </el-table-column>
            <!-- guestStatus A01审核中 A02审核通过 'A03' 审核拒绝 ---- 编辑 -->
            <el-table-column fixed="right" label="操作" width="160">
                <template #default="{ row }">
                    <el-button size="small" @click="edit(row)">
                        编辑
                    </el-button>
                    <el-popconfirm width="220" confirm-button-text="确认" cancel-button-text="取消"
                        @confirm="confirmDelete(row)" title="确认要删除吗？">
                        <template #reference>
                            <el-button type="danger" size="small" @click="deleteBtn(row)">删除</el-button>
                        </template>
                    </el-popconfirm>
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
import { onMounted, ref, toRaw } from 'vue';
import { Search } from '@element-plus/icons-vue'
import router from '@/router';
import apply_order_list_info from '@/assets/order/apply_order_list_info';
import { storeFiltration } from '@/api/store';
import { cmsDelete, cmsDetail, cmsList } from "@/api/officialSite";
import { handleGetLabel } from '@/utils/util';
const columns = ref([
    { width: '120', key: "cmsId", label: '文章Id' },
    { width: '120', key: "position", label: '位置' },
    { width: '120', key: "title", label: '标题' },
    { width: '120', key: "type", label: '类型' },
    { width: '120', key: "weight", label: '排序' },
    { width: '120', key: "openupState", label: '状态' },
]);
const searchField = ref({
    cmsId: "",
    platform: "",
    position: "",
    positionSelectData: [
        {
            label: "首页轮播",
            value: "FIRST_PAGE_SLIDE"
        },
        {
            label: "企业简介",
            value: "COMPANY_PROFILE_SLIDE"
        },
        {
            label: "主页 文章",
            value: "HOME_ARTICLE"
        },
        {
            label: "友情链接轮播",
            value: "FRIENDLY_LINK_SLIDE"
        },
        {
            label: "商务合作轮播",
            value: "COOPERATION_SLIDE"
        },
        {
            label: "行业新闻轮播",
            value: "NEWS_LIST_SLIDE"
        },
        {
            label: "其他",
            value: "OTHER"
        },
    ],
    type: "",
    typeSelectData: [{
        label: "轮播",
        value: "SLIDE"
    },
    {
        label: "文章",
        value: "ARTICLE"
    },],
    openupState: "",
    openupStateSelectData: [
        {
            label: "启用",
            value: "ENABLED"
        },
        {
            label: "禁用",
            value: "DISABLED"
        },
    ],
});
const currentPage = ref(1); // 当前页
const pageSize = ref(10); // 每页显示条数
const total = ref(0); // 总条目数
const tableData = ref([])
const categoryListData = ref([])
// 指定表格中单元格、行和列的布局方式
const tableLayout = ref<TableInstance['tableLayout']>('fixed')
const positionSelectData: any = ref(
    {
        "FIRST_PAGE_SLIDE": "首页轮播",
        "COMPANY_PROFILE_SLIDE": "企业简介",
        "HOME_ARTICLE": "主页 文章",
        "FRIENDLY_LINK_SLIDE": "友情链接轮播",
        "COOPERATION_SLIDE": "商务合作轮播",
        "NEWS_LIST_SLIDE": "行业新闻轮播",
        "OTHER": "其他",
    }
)
const typeSelectData: any = ref(
    {
        "ARTICLE": "文章",
        "SLIDE": "轮播",
    }
)
const openupStateSelectData: any = ref(
    {
        "ENABLED": "启用",
        "DISABLED": "禁用",
    }
)
// 初始化
const init = async () => {
    let params = {
        // "pageNum": currentPage.value,
        // "pageSize": pageSize.value,
        cmsId: searchField.value.cmsId || null,
        // platform: searchField.value.platform,
        position: searchField.value.position,
        type: searchField.value.type,
        openupState: searchField.value.openupState || 'ALL',
    }
    await cmsList(currentPage.value, pageSize.value, params).then((data) => {
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
    console.log(row);
    router.push({
        path: '/officialSite/create',
        query: {
            cmsId: row.cmsId,
            type: row.type,
            status: "edit"
        }
    })
}
const deleteBtn=(row:any)=>{

}
const confirmDelete=async (row:any)=>{
    console.log(row)
    let params = {
        cmsId: row.cmsId || null,
        type: row.type,
    }
    await cmsDelete(params).then((data) => {
        console.log(data);
        if (data.code === 200) {
            ElMessage({
              message: "删除成功",
              type: 'success',
              duration: 3000 // 显示3秒后消失
            });
            init()
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
// 创建
const create = async (row: any) => {
    console.log(row);
    router.push({
        path: '/officialSite/create'
    })
}

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