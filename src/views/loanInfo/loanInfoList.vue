<template>
    <div>
        <!--  table -->
        <el-scrollbar style="width: var(--table-width)">
            <el-table :data="tableData" style="width: 100%" row-key="id">
                <el-table-column v-for="item in columns" :key="item.key" :prop="item.key" :label="item.label"
                    :min-width="item.width">
                    <template #default="{ row }">
                        {{ item.value ? item.value :
                            item.selectVal ? item.selectVal[row[item.key]]
                                : (row[item.key] || '') + (item.suffix ? item.suffix : '') }}
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
    </div>
</template>

<script setup lang="ts">
import { loanInfoLIST } from '@/api/loanInfoList';
import { onMounted, ref } from 'vue';
const tableData = ref([])
const currentPage = ref(1); // 当前页
const pageSize = ref(10); // 每页显示条数
const total = ref(0); // 总条目数
const columns: any = ref([
    { width: 100, key: "name", label: "姓名", },
    { width: 120, key: "phone", label: "手机号", },
    // { width: 140, key: "accountCard", label: "证件号",},
    { width: 140, key: "accountName", label: "开户姓名", },
    { width: 200, key: "accountCardNo", label: "银行卡号", },
    // { width: 140, key: "accountPrePhone", label: "预留手机号",},
    { width: 100, key: "channelNo", label: "机构编码", },
    { width: 300, key: "customerNo", label: "客户编号", },
    // { width: 140, key: "gender", label: "性别",},
    // { width: 140, key: "idAddress", label: "身份证地址",},
    { width: 200, key: "idCard", label: "身份证号/统一社会信用代码", },
    { width: 140, key: "idCardType", label: "用户证件类型", value: "身份证" },
    // { width: 160, key: "idExpiryDate", label: "身份证失效日期", },
    { width: 140, key: "loanAmt", label: "借款金额", },
    { width: 140, key: "loanBeginDate", label: "贷款起始日", },
    { width: 140, key: "loanEndDate", label: "贷款到期日", },
    { width: 200, key: "loanNo", label: "借据编号", },
    { width: 120, key: "loanPeriod", label: "借款期限", },
    { width: 230, key: "loanSerialNo", label: "放款流水号", },
    {
        width: 140, key: "loanUse", label: "借款用途", selectVal:
            // 01-消费，02-装修，03-旅游，04-教育，05-医疗，06-经营周转，07-其他，18-小微企业经营
            { "01": "消费", "02": "装修", "03": "旅游", "04": "教育", "05": "医疗", "06": "经营周转", "07": "其他", "18": "小微企业经营" }
    },
    // { width: 140, key: "productName", label: "借款产品名称",},
    // { width: 140, key: "productNo", label: "借款产品编号",},
    { width: 140, key: "propertyNo", label: "资产编码", },
    { width: 140, key: "repayWay", label: "还款方式", value: '一次性还本付息' },
    { width: 120, key: "executePunishRate", label: "执行罚息利率", suffix: "%" },
    { width: 120, key: "punishRate", label: "罚息利率", suffix: "%" },
    { width: 140, key: "yearRate", label: "年化利率", suffix: "%" },
    { width: 140, key: "remark", label: "备注", },
]);

// 初始化
const init = async () => {
    let params = {
        "pageNum": currentPage.value,
        "pageSize": pageSize.value
    }
    await loanInfoLIST(params).then((data) => {
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