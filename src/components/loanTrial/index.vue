<template>
    <div>
        <div style="width:100%;height: 200px;background: var(--bg_color);padding: 16px;">
            <div>
                共需还款:
                <div style="font-size: 30px;">{{ numberWithCommas(loanTrialData.shouldRepayAmount) || 0 }}元</div>
            </div>
            <div class="loan_trial_amount_con">
                <div class="loan_trial_amount">
                    <div>应还本金总额:</div>
                    <div>
                        {{ numberWithCommas(loanTrialData.shouldRepayPrinAmount) || 0 }}元
                    </div>
                </div>
                <div class="loan_trial_amount">
                    <div>应还利息总额:</div>
                    <div>
                        {{ numberWithCommas(loanTrialData.shouldRepayInterAmount) || 0 }}元
                    </div>
                </div>
                <div class="loan_trial_amount">
                    <div>应还服务费总额:</div>
                    <div>
                        {{ numberWithCommas(loanTrialData.shouldRepayFeeAmount) || 0 }}元
                    </div>
                </div>
                <div class="loan_trial_amount">
                    <div>应还其他费用总额:</div>
                    <div>
                        {{ numberWithCommas(loanTrialData.shouldRepayMgmAmount) || 0 }}元
                    </div>
                </div>
            </div>
        </div>
        <el-table :data="loanTrialData.repayPlanItems" row-key="id" style="width: 100%;">
            <el-table-column v-for="(item, index) in columns" :key="index" :prop="item.key" :label="item.label"
                :width="item.width">
                <template #default="{ row }">
                    {{ numberWithCommas(row[item.key]) }}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { numberWithCommas } from "@/utils/util";
const props = defineProps({
    loanTrialData: Object,
});
const loanTrialData: any = props.loanTrialData;
const columns = ref([
    { width: 80, label: '期数', key: 'termNo' },
    { width: 130, label: '应还总额(元)', key: 'termAmount' },
    { width: 130, label: '应还本金(元)', key: 'termPrincipal' },
    { width: 120, label: '应还利息(元)', key: 'termInterest' },
]);
</script>

<style lang="scss" scoped>
.loan_trial_amount_con {
    display: flex;
    flex-wrap: wrap;

    .loan_trial_amount {
        width: 50%;
        margin-top: 16px;
    }
}
</style>