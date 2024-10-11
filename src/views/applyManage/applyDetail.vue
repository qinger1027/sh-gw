<template>
    <div class="apply_order">
        <div class="customer_info">
            <div class="header_title">用户信息</div>
            <customer-info></customer-info>
        </div>
        <div class="">
            <div class="header_title">工单信息</div>
            <el-form ref="ruleFormRef" :model="applyInfoFormData" :rules="rules">
                <!-- 工单申请 -->
                <el-form-item v-for="(item, index) in applyOrder" :prop="item.key">
                    <div class="apply_order_form_item" slot="label">
                        <label :class="{ label_width: true }">
                            <span v-if="item.key !== 'remark'">*</span>
                            {{ item.label }}:
                        </label>
                        <!-- 下拉框  -->
                        <template v-if="item.type == 'select'">
                            <el-select v-model="applyInfoFormData[item.key]" placeholder="请选择" style="width:300px;"
                                :disabled="status == 'detail' ? true : false">
                                <el-option v-for="(select, index) in item?.selectData" :label="select.text"
                                    :value="select.value" />
                            </el-select>
                        </template>
                        <!-- 输入框 -->
                        <template v-else>
                            <el-input v-model="applyInfoFormData[item.key]" autocomplete="off" style="width:300px;"
                                :disabled="status == 'detail' ? true : false" />
                        </template>
                    </div>
                </el-form-item>
            </el-form>
            <!-- 上传文件 -->
            <div style="padding: 26px 26px 26px 16px;">
                <label for="上传文件" style="margin-bottom: 10px;display: inline-block;">
                    <span style="color: red;">*</span>
                    上传材料<!-- (支持jpg,png,mp4) -->
                </label>
                <div>
                    <!-- 必填： -->
                    <div style="display: flex;">
                        <label for=""><span class="required">*</span>必填：</label>
                        <template v-for="(item, index) in applyGetMaterialData" :key="index">
                            <div v-if="item.required">
                                <el-upload list-type="picture-card" :action="uploadUrl" :show-file-list="false"
                                    :on-change="onUpload.bind(null, { 'index': index, 'data': item })"
                                    :on-success="uploadSuccess.bind(null, { 'index': index, 'data': item })"
                                    :before-upload="beforeAvatarUpload" :disabled="item?.src ? true : false"
                                    :multiple="item?.bizCode === 'other' ? true : false">
                                    <template v-if="!item?.src && status !== 'detail'">
                                        <div>
                                            <el-icon>
                                                <Plus />
                                            </el-icon>
                                            {{ item?.bizType ? item?.bizType : '其他' }}
                                        </div>
                                    </template>
                                    <template v-else>
                                        <template v-if="item?.fileType === 'mp4'">
                                            <video :src="item?.src" style="width: 100%;height: 100%;" />
                                        </template>
                                        <template v-else>
                                            <img style="width: 100%;height: 100%;" :src="item?.src"
                                                alt="Preview Image" />
                                        </template>
                                        <!-- <div class="" style="    position: absolute;
                              top: 0;
                              left: 0;
                              right: 0;
                              bottom: 0;
                              background-color: rgba(0, 0, 0, 0.3);color: #fff;    align-items: center;opacity: 0;
                              display: flex;
                              justify-content: center;">
                            <el-icon><Delete /></el-icon>
                          </div> -->
                                        <span v-if="status !== 'detail'" @click="delImg(item, index)">x</span>
                                    </template>
                                </el-upload>
                            </div>
                        </template>
                    </div>
                    <!-- 必填：end -->
                    <!-- 非必填： -->
                    <div style="display: flex;margin-top: 16px;flex-wrap: wrap;">
                        非必填：
                        <template v-for="(item, index) in applyGetMaterialData" :key="index">
                            <div v-if="!item.required">
                                <!-- *非必填： -->
                                <template v-if="status !== 'detail'">
                                    <el-upload list-type="picture-card" :action="uploadUrl" :file-list="fileList"
                                        :show-file-list="false"
                                        :on-change="onUpload.bind(null, { 'index': index, 'data': item })"
                                        :on-success="uploadSuccess.bind(null, { 'index': index, 'data': item })"
                                        :before-upload="beforeAvatarUpload" :disabled="item?.src ? true : false"
                                        :multiple="item?.bizCode === 'other' ? true : false">
                                        <template v-if="!item?.src">
                                            <div>
                                                <el-icon>
                                                    <Plus />
                                                </el-icon>
                                                {{ item?.bizType ? item?.bizType : '其他' }}
                                            </div>
                                        </template>
                                        <template v-else>
                                            <template v-if="item?.fileType === 'mp4'">
                                                <video :src="item?.src" style="width: 100%;height: 100%;" />
                                            </template>
                                            <template v-else>
                                                <img style="width: 100%;height: 100%;" :src="item?.src" alt="" />
                                            </template>
                                            <span v-if="status !== 'detail'" @click="delImg(item, index)">x</span>
                                        </template>
                                    </el-upload>
                                </template>
                                <template v-else>
                                    <template v-if="item?.fileType === 'mp4'">
                                        <video :src="item?.src" style="width: 146px;height: 146px;" />
                                    </template>
                                    <template v-else>
                                        <template v-if="item?.src">
                                            <img style="width: 146px;height: 146px;" :src="item?.src" alt="" />
                                        </template>
                                        <template v-else>
                                            <span></span>
                                        </template>
                                    </template>
                                </template>
                            </div>
                        </template>
                    </div>
                    <!-- 非必填：end -->
                </div>

            </div>
            <el-button type="primary" @click="submit" v-if="status !== 'detail'">
                提交
            </el-button>
        </div>
        <div class="a" v-if="applyInfoFormData.allowApply === 0">
            <div class="header_title" style="">
                准入结果
            </div>
            <div style="margin-bottom: 16px;">
                <el-button type="primary" @click="applyResult">
                    准入结果
                </el-button>
            </div>
        </div>
        <div v-if="status === 'detail'">
            <div class="header_title" style="">
                资料审核
            </div>
            <!-- 工单状态 A10资料审核中 A11 授信审核中 A12下户审核中 A13店长复核中 A14资产端审核通过 -->
            <div style="margin-bottom: 16px;" v-if="applyInfoFormData.applyStatus === 'A10'">
                <el-button type="primary" @click="editGuestStatus('pass')">
                    资料审核通过
                </el-button>
                <el-button type="primary" @click="guestStatusdialogRef.show()">
                    资料审核拒绝
                </el-button>
            </div>
            <div style="margin-bottom: 16px;">
                <el-button type="primary" @click="limitQueryBtn"
                    v-if="applyInfoFormData.applyStatus === 'A12' || applyInfoFormData.applyStatus === 'A13' || applyInfoFormData.applyStatus === 'A14'">
                    额度查询
                </el-button>
                <el-button type="primary" @click="creditResultBtn"
                    v-if="applyInfoFormData.applyStatus === 'A11' && creditStatus === 1">
                    授信查询
                </el-button>
                <!-- <el-button type="primary" @click="creditApplyBtn"
                    v-if="applyInfoFormData.applyStatus === 'A11' && creditStatus === 1">
                    授信申请
                </el-button> -->
                <common-dialog ref="creditAgreementdialogRef" :headerTitle="''">
                    <input type="checkbox" v-model="creditAgreementStatus">请阅读并同意
                    <span v-for="(item, index) in agreementList" :key="index">
                        <span style="color: var(--el-color-primary);cursor: pointer;" @click="readCreditAgreement">
                            &lt;&lt;{{
                                item.contractName }}&gt;&gt;</span>
                    </span>
                    <div>
                        <el-button type="primary" @click="creditApplyBtn" v-if="creditAgreementStatus">
                            授信申请
                        </el-button>
                    </div>
                    <el-drawer v-model="creditAgreementDrawerShow" :title="''" :direction="'btt'">
                        <!-- 授信协议 -->
                        <credit-agreement :busiType="'CREDIT'" :applyNo="applyNo"
                            @isCheckAgreement="isCheckAgreement"></credit-agreement>
                    </el-drawer>
                </common-dialog>
                <!-- 授信协议 end -->
                <!-- A14资产端审核通过 绑定银行卡 -->
                <el-button type="primary" class="ml-16" @click="addBankCardBtn"
                    v-if="applyInfoFormData.applyStatus === 'A14'">
                    绑定银行卡
                </el-button>
            </div>
        </div>
        <div class="a">
            <div class="header_title" style="">
                审核日志
            </div>
            <div class="apply_logs">
                <!--  table -->
                <el-scrollbar style="width: calc(100vw - 200px - 32px - 50px)">
                    <el-table :data="applyLogsTableData" row-key="id" style="width: 100%;">
                        <el-table-column v-for="(item, index) in applyLogsColumns" :key="index" :prop="item.key"
                            :label="item.label" :width="200">
                            <template #default="{ row }">
                                {{ row[item.key]?.code ? row[item.key].name : row[item.key] }}
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                            :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
                            layout="prev, pager, next" :total="applyLogsTotal" small background hide-on-single-page>
                        </el-pagination>
                    </div>
                </el-scrollbar>
            </div>
        </div>
        <div class="a"
            v-if="applyInfoFormData.applyStatus === 'A14' || applyInfoFormData.applyStatus === 'LOAN_SUCCESS'">
            <div class="header_title" style="">
                银行卡列表
            </div>
            <div class="apply_logs">
                <!--  table -->
                <el-scrollbar style="width: calc(100vw - 200px - 32px - 50px)">
                    <el-table :data="bardCardTableData" row-key="id" style="width: 100%;">
                        <el-table-column v-for="(item, index) in bardCardColumns" :key="index" :prop="item.key"
                            :label="item.label" :min-width="200">
                            <template #default="{ row }">
                                {{ row[item.key] === '101' && item.key === 'accBankCardType' ? '借记卡' : row[item.key] }}
                            </template>
                        </el-table-column>
                    </el-table>
                </el-scrollbar>
            </div>
        </div>
        <div class="a">
            <div class="header_title" style="">
                借款
            </div>
            <div>
                <!-- A14资产端审核通过 借款申请 -->
                <el-button type="primary" class="mb-16" @click="loanApplyBtn"
                    v-if="applyInfoFormData.applyStatus === 'A14' && bardCardTableData.length">
                    借款申请
                </el-button>
                <common-dialog ref="loanApplydialogRef" :headerTitle="''" @confirm="loanApplyConfirm">
                    <!-- 借款申请 可以看到的字段 -->
                    <div v-for="(item, index) in loanApplyColumns">
                        <label for="" class="mr-16">{{ item.label }}:</label>
                        <span>{{ loanApplyField[item.key]?.code ? loanApplyField[item.key].name :
                            loanApplyField[item.key] }}{{
                                item.key === 'yearRate' ? '%' : '' }}</span>
                    </div>
                    <input type="checkbox" v-model="loanApplyAgreementStatus">请阅读并同意
                    <span v-for="(item, index) in agreementList" :key="index">
                        <span style="color: var(--el-color-primary);cursor: pointer;" @click="readloanApplyAgreement">
                            &lt;&lt;{{
                                item.contractName }}&gt;&gt;</span>
                    </span>
                    <el-drawer v-model="loanApplyAgreementDrawerShow" :title="''" :direction="'btt'">
                        <credit-agreement :busiType="'LOAN'" :applyNo="applyNo" :loanApplyField="loanApplyFieldData"
                            @isCheckAgreement="isCheckloanApplyAgreement"></credit-agreement>
                    </el-drawer>
                </common-dialog>
            </div>
        </div>
        <div class="a" v-if="applyInfoFormData.applyStatus === 'LOAN_SUCCESS'">
            <div class="header_title" style="">
                还款计划
            </div>
            <!--  table -->
            <el-scrollbar style="width: calc(100vw - 200px - 32px - 50px)">
                <el-table :data="repaymentPlanList" row-key="id" style="width: 100%;">
                    <el-table-column v-for="(item, index) in repaymentPlanColumns" :key="index" :prop="item.key"
                        :label="item.label" :min-width="item.width">
                        <template #default="{ row }">
                            {{ item?.selectData ? item?.selectData[row[item.key]] : row[item.key] }}
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="160">
                        <template #default="{ row }">
                            <el-button size="small" v-if="row.repayStatus === 'F3202'" @click="repayment(row)">
                                还款
                            </el-button>
                            <el-button size="small" v-if="row.repayStatus === 'F3202'"
                                @click="lookRepaymentReason(row)">
                                查看
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- <div class="pagination">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        :current-page="repaymentPlancurrentPage" :page-sizes="[10, 20, 30, 40]" :page-size="repaymentPlanPageSize"
                        layout="prev, pager, next" :total="repaymentPlanTotal" small background hide-on-single-page>
                    </el-pagination>
                </div> -->
            </el-scrollbar>

            <el-button type="primary" @click="repaymentTrialBtn">
                提前结清
            </el-button>
            <!-- 提前结清-还款试算 弹框 -->
            <common-dialog ref="repaymentTrialdialogRef" :headerTitle="''" @confirm="repaymentTrialConfirm()">
                <div>
                    <label for="" class="mr-16">还款金额(元):</label>
                    <el-input type="number" v-model="repaymentTrialField.money" autocomplete="off" class="w-300"
                        disabled />
                </div>
            </common-dialog>
            <!-- 提前结清-还款试算 弹框end -->
            <!-- 主动还款失败原因弹框 start -->
            <common-dialog ref="repaymentReasonMsgdialogRef" :headerTitle="'失败原因'">
                <div>{{ repaymentReasonMsg }}</div>
            </common-dialog>
            <!-- 主动还款失败原因弹框 end -->
        </div>
        <!-- 资料审核拒绝 弹框 -->
        <common-dialog ref="guestStatusdialogRef" :headerTitle="''" @confirm="editGuestStatus('reject')">
            <el-form ref="guestStatusRuleFormRef" :model="guestStatus" :rules="guestStatusRules">
                <el-form-item v-for="(item, index) in guestStatusColumns" :label="item.label" :prop="item.key"
                    :label-width="item.width">
                    <el-input v-model="guestStatus[item.key]" autocomplete="off" style="width:360px;" />
                </el-form-item>
            </el-form>
        </common-dialog>
        <!-- 资料审核拒绝 弹框end -->
        <!-- 额度查询 弹框 -->
        <common-dialog ref="limitQuerydialogRef" :headerTitle="''">
            <div>
                <label for="" class="mr-16">授信金额:</label>
                <el-input type="number" v-model="limitQueryField.creditLimit" autocomplete="off" class="w-300"
                    disabled />
            </div>
            <div class="mt-16">
                <label for="" class="mr-16">金额:</label>
                <el-input type="number" v-model="limitQueryField.money" autocomplete="off" class="w-300" disabled />
            </div>
            <div class="mt-16">
                <label for="" class="mr-16">期数:</label>
                <el-select v-model="limitQueryField.term" placeholder="请选择" class="w-300">
                    <el-option v-for="(select, index) in limitQueryField.termSelectData" :label="select"
                        :value="select" />
                </el-select>
            </div>
            <el-button type="primary" class="mt-16" @click="loanTrialBtn">
                借款试算
            </el-button>
            <!-- 借款试算列表 （给子组件动态绑定唯一标识key，如果数据发生变化时，同时更改下key值，这样就会重新渲染下子组件） -->
            <loan-trial v-if="isShowloanTrial" :key="Math.random()" :loanTrialData="loanTrialListData"></loan-trial>
        </common-dialog>
        <!-- 额度查询 弹框end -->
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import apply_order from "@/assets/order/apply_order";
import apply_info_form_data from "@/assets/order/apply_order_form_data";
import { ElLoading, ElMessage, ElMessageBox, type FormInstance, type FormRules, type UploadProps, type UploadUserFile } from "element-plus";
import { applyGetMaterial, applyOrderSave, getApplyResult, queryApplyChangeLog, queryApplyListSearch, updateApplyPassStatus, updateApplyRejectStatus, uploadFile } from "@/api/apply";
import { useRouter } from "vue-router";
import { updateApply } from "@/api/customer";
import customerInfo from "@/components/customer_info/index.vue";
import commonDialog from "@/components/dialog/index.vue";
import loanTrial from "@/components/loanTrial/index.vue";
import creditAgreement from "@/components/agreement/agreement.vue";
import { creditApply, creditResult, getlimitQuery, getloanTrial } from "@/api/credit";
import { loanApply, preloanApply } from "@/api/loan";
import { bankCardList } from "@/api/bankcard";
import { selectAgreenmentList } from "@/api/agreenment";
import { proactiveRepayment, repaymentCalculater, repaymentPlan, repaymentReason } from "@/api/repayment";
import { loadingHide, loadingShow } from "@/utils/util";
const router = useRouter();
// router query
const routerQuery: any = router.currentRoute.value.query;
const status = routerQuery?.status || '';
const applyNo = routerQuery?.applyNo || '';
// 申请工单字段
const applyOrder = ref(apply_order);
// 申请工单form
const applyInfoFormData: any = ref(apply_info_form_data);
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
})
// const customer_info: any = localStorage.getItem("customer_info")
// console.log(customer_info, JSON.parse(customer_info));
// applyInfoFormData.value.mobile = JSON.parse(customer_info)?.mobile
applyInfoFormData.value.mobile = routerQuery?.mobile

const applyGetMaterialData: any = ref([]);
const guestStatusColumns = ref([
    { width: 100, label: '拒绝原因', key: 'remark' },
]);

interface ruleForm {
    remark: string
}
const guestStatusdialogRef = ref()
const guestStatus: any = ref({
    status: "",
    remark: "",
});
const guestStatusRuleFormRef = ref<FormInstance>()
const guestStatusRules = reactive<FormRules<ruleForm>>({
    remark: [
        { required: true, message: '请输入拒绝原因', trigger: 'blur', type: 'string' },
    ]
})
const applyLogsTableData = ref([]);
const currentPage = ref(1); // 当前页
const pageSize = ref(10); // 每页显示条数
const applyLogsTotal = ref(0); // 总条目数
const applyLogsColumns = ref([
    { key: "applyNo", label: "流水号" },
    { key: "customerCode", label: "客户号", },
    { key: "nowApplyStatus", label: "现工单状态", },
    { key: "oldApplyStatus", label: "原工单状态", },
    { key: "nowBankCreditStatus", label: "现资方授信申请状态", },
    { key: "oldBankCreditStatus", label: "原资方授信申请状态", },
    { key: "nowGuestStatus", label: "现对客状态", },
    { key: "oldGuestStatus", label: "原对客状态", },
    { key: "remark", label: "备注", },
    { key: "createTime", label: "创建时间", },
    { key: "updateTime", label: "更新时间", },
]);
const limitQueryField: any = ref({
    money: "",
    creditLimit: "", //授信金额
    term: "",
    termSelectData: []
})
const limitQuerydialogRef = ref()
const isShowloanTrial = ref(false)
const loanTrialListData: any = ref({})
const creditAgreementdialogRef = ref()
const creditAgreementDrawerShow = ref(false)
const agreementList: any = ref([])
// 授信阅读协议状态
const creditAgreementStatus = ref(false)
const creditStatus = ref()
// 借款申请 - 协议状态
const loanApplyAgreementStatus = ref(false)
const loanApplyAgreementDrawerShow = ref(false)
const loanApplyField: any = ref({
    loanAmount: "",
    repayMethod: "",
    totalTerm: "",
    yearRate: ""
})
const loanApplyFieldData: any = ref({
    loanAmount: "",
    repayMethod: "",
    totalTerm: "",
    yearRate: ""
})
const loanApplydialogRef = ref();
const loanApplyColumns = ref([
    { key: "loanAmount", label: "借款金额" },
    { key: "repayMethod", label: "还款方式", },
    { key: "totalTerm", label: "期数", },
    { key: "yearRate", label: "年利率", }
]);
// 银行卡列表
const bardCardColumns: any = ref([
    { key: "accBankCard", label: "银行卡号" },
    { key: "accBankCardType", label: "卡类型", },
    // { key: "accBankCode", label: "银行编码", },
    { key: "accBankName", label: "开户行名称", },
    { key: "accOwnIdCard", label: "开户行身份证号", },
    { key: "accOwnName", label: "开户人名称", },
    { key: "accOwnPhone", label: "开户人电话", },
    // { key: "accType", label: "开户类型", }
]);
const bardCardTableData = ref([]);
// 还款计划-列表
const repaymentPlanColumns: any = ref([
    { key: "stage", label: "期次", width: "80" },
    { key: "planRepayAmt", label: "计划还款金额", width: "110" },
    { key: "principal", label: "计划还款本金", width: "110" },
    { key: "interest", label: "计划还款利息", width: "110" },
    { key: "punishAmt", label: "计划应还罚息", width: "110" },
    // { key: "overdueFee", label: "计划应还滞纳金", width: "160" },
    // { key: "pettyCashFee", label: "计划应还风险备用金", width: "160" },
    { key: "planRepayDate", label: "计划还款时间", width: "110" },
    { key: "repayRelAmt", label: "实际还款金额", width: "110" },
    { key: "repayPrincipal", label: "实际还款本金", width: "110" },
    { key: "repayInterest", label: "实际还款利息", width: "110" },
    { key: "repayPunish", label: "实际还款罚息", width: "110" },
    { key: "repayDate", label: "实际还款日期", width: "110" },
    // { key: "violateAmt", label: "违约金", width: "110" },
    { key: "repayStatus", label: "还款状态", width: "110",selectData:{
        'F3201':"已结清",
        'F3202':"未结清",
    } },
]);
const repaymentPlanList: any = ref([]);
const repaymentPlanPageSize = ref(10);// 每页显示条数
const repaymentPlancurrentPage = ref(1); // 当前页
const repaymentPlanTotal = ref();
const repaymentTrialdialogRef = ref();
const repaymentTrialField = ref({
    money: ''
});
const repaymentReasonMsgdialogRef = ref()
const repaymentReasonMsg = ref("")

const init = async () => {
    await applyGetMaterial().then((res: any) => {
        if (res.code === 200) {
            let data = res.data;
            applyGetMaterialData.value = data;
        }
    });

    // 工单详情
    if (status === 'detail' || status === 'edit') {
        let params = {
            "customerCode": routerQuery?.customerCode,
            "applyNo": routerQuery?.applyNo
        }
        await queryApplyListSearch(params).then(async (res: any) => {
            if (res.code === 200) {
                console.log(res.data);
                let data = res.data;
                Object.keys(data).map((ele: any) => {
                    applyInfoFormData.value = data;
                    if (data[ele]?.code) applyInfoFormData.value[ele] = data[ele]?.code;
                })
                console.log(applyInfoFormData.value);
                applyGetMaterialData.value.map((ele: any) => {
                    data.files.map((file: any) => {
                        if (file.bizType === ele.bizCode) {
                            ele.src = file.fileUrl;
                            ele.fileName = file.fileName;
                            ele.fileType = file.fileType;
                        }
                    })
                })
                console.log(applyGetMaterialData.value);
                /**
                 * applyStatus工单状态 A11-授信审核中
                 * signRecord签署协议  状态:0-未签署；1签署
                 * allowApply是否准入 0不准入，1准入成功
                 */
                creditStatus.value = data?.signRecord?.creditStatus;
                if (data?.applyStatus === 'A11' && data?.signRecord?.creditStatus === 0 && data?.allowApply === 1) {
                    const loading = ElLoading.service({
                        lock: true,
                        text: '加载中',
                        background: 'rgba(0, 0, 0, 0.7)',
                    })
                    await selectAgreenmentList('CREDIT', applyNo).then(async (res: any) => {
                        if (res.code === 200 && res.data.length > 0) {
                            agreementList.value = res.data;
                            creditAgreementdialogRef.value.show()
                            creditAgreementdialogRef.value.isShowFooter(false)
                            loading.close()
                        } else {
                            ElMessage({
                                message: `没获取到授信协议，请联系管理员！`,
                                type: 'warning',
                                duration: 3000 // 显示3秒后消失
                            });
                            loading.close()
                        }
                    });
                } else {
                    creditAgreementdialogRef.value.close()
                }
                /**
                 * 还款计划 ----  LOAN_SUCCESS - 放款成功
                 */
                handleRepaymentPlan()

            } else {
                // 接口status不管是200还是500 && response.code不为200
            }
        }).catch(error => {
            console.log(error);
        });
    }
    // 调用工单日志
    await handleApplyLogs();
    // 银行卡列表
    await getBankCardList();
}
onMounted(() => {
    init()
})

// 保存逻辑
const handleApplyInfoSave = async () => {
    console.log(applyGetMaterialData.value);
    applyInfoFormData.value['files'] = applyGetMaterialData.value.filter((item: any) => {
        return item.src
    }).map((ele: any) => {
        return {
            bizType: ele.bizCode,
            fileName: ele.fileName,
            fileType: ele.fileName?.split('.')[1]
        }
    });
    applyInfoFormData.value.applyNo = routerQuery.applyId
    // applyInfoFormData.value.applyNo = JSON.parse(customer_info).applyId
    console.log(applyInfoFormData.value);
    await applyOrderSave(applyInfoFormData.value).then((data) => {
        console.log(data);
        if (data.code === 200) {
            router.push('/applyManage/applyList')
            // 清空弹框信息
            clearFrom()
            // localStorage.removeItem("customer_info")
        } else {
            // 接口status不管是200还是500 && response.code不为200
        }
    });
}

// 修改提交保存
const handleApplyInfoEditSave = async () => {
    applyInfoFormData.value['files'] = applyGetMaterialData.value.filter((item: any) => {
        return item.src
    }).map((ele: any) => {
        return {
            bizType: ele.bizCode,
            fileName: ele.fileName,
            fileType: ele.fileName?.split('.')[1]
        }
    });
    console.log(applyInfoFormData.value);
    await updateApply(applyInfoFormData.value).then((data: any) => {
        if (data.code === 200) {
            // 跳转列表信息
            router.push('/applyManage/applyList')
            // 清空弹框信息
            clearFrom()
        } else {
            console.log(data);
        }
    });
}

// 提交
const submit = async () => {
    console.log(routerQuery);
    if (!ruleFormRef.value) return
    await ruleFormRef.value?.validate(async (valid, fields) => {
        if (valid) {
            // 判断那个没有上传 提示
            for (let i = 0; i < applyGetMaterialData.value.length; i++) {
                const ele = applyGetMaterialData.value[i];
                // 特定项的提示逻辑
                if (!ele.src && ele.required) {
                    ElMessage({
                        message: `请上传${ele.bizType}`,
                        type: 'error',
                        duration: 3000 // 显示3秒后消失
                    });
                    return;
                }
            }
            if (status === 'edit') {
                await handleApplyInfoEditSave();
            } else {
                await handleApplyInfoSave();
            }
        } else {
            console.log('error submit!', fields)
        }
    })
}

// 清空form
const clearFrom = () => {
    Object.keys(applyInfoFormData.value).map((ele: any) => {
        applyInfoFormData.value[ele] = ''
    })
}

const uploadUrl = uploadFile();
const fileList = ref<UploadUserFile[]>([])
const onUpload = async (obj: any, file: any, fileList: any) => {
    console.log(`onUpload===：${obj}`)
    console.log(obj)
    console.log(file)
    console.log(fileList, fileList.length)
    // crtindex.value = fileList.length;
    // let val = obj.index + fileList.length - 1;
    // console.log(val);
    // applyGetMaterialData.value[val] = {
    //   bizCode: obj.data.bizCode,
    //   bizType: obj.data.bizType,
    //   src: file.url,
    //   fileName: file?.response?.data.fileName,
    //   required: obj.data.required,
    // }
    // console.log(applyGetMaterialData.value);
    // fileList.value = fileList;
    // if(obj.data.bizCode == 'other'){
    //   console.log(obj.index+fileList.length);
    //     applyGetMaterialData.value[obj.index+fileList.length]={
    //       src: file.url,
    //       fileName: fileList[fileList.length-1].response.data.fileName,
    //       bizCode: obj.data.bizCode,
    //       bizType: obj.data.bizType
    //     }
    //   } 
    // applyGetMaterialData.value[obj.index]['src'] = file.url;
    // applyGetMaterialData.value[obj.index]['fileName'] = file.response.data.fileName;
}

/**
 * eg： obj = {index:0,data:{"bizType":"","bizCode":""}}
 * response upload接口响应的数据
 * file 上传的文件的信息
 */
const currentIndex = ref(0);
const uploadSuccess = async (obj: any, response: any, file: any, fileList: any) => {
    console.log("onsuccess==：" + obj, response, file, fileList, fileList.length);
    console.log(obj);
    console.log(file)
    // if (response.code === 200) {
    // console.log(applyGetMaterialData.value);
    if (obj.data.bizCode === 'other') {
        // obj.index=6 fileList.length总共传了几个
        // let currentIndex = obj.index + fileList.length;
        // console.log(currentIndex);
        console.log(currentIndex.value);
        if (currentIndex.value === 0) currentIndex.value = obj.index;
        applyGetMaterialData.value[currentIndex.value] = {
            src: file.url,
            fileName: file.response.data.fileName,
            bizCode: obj.data.bizCode,
            bizType: obj.data.bizType,
            required: obj.data.required,
            fileType: file.response.data.fileName.split('.')[1]
        }
        currentIndex.value++;
        // console.log(applyGetMaterialData.value);
    }
    else {
        console.log(applyGetMaterialData.value);
        applyGetMaterialData.value[obj.index]['src'] = applyGetMaterialData.value[obj.index]?.src ? applyGetMaterialData.value[obj.index]['src'] : file.url;
        applyGetMaterialData.value[obj.index]['fileName'] = file.response.data.fileName;
        applyGetMaterialData.value[obj.index]['fileType'] = file.response.data.fileName.split('.')[1];
    }
    // } else {
    //   ElMessage({ message: '上传异常', type: 'warning' })
    // }
}

// 上传前
const beforeAvatarUpload: UploadProps['beforeUpload'] = (file) => {
    console.log(file);
    let fileSize = Number(file.size / 1024 / 1024);
    if (fileSize > 5) {
        ElMessage({ message: '文件大小不能超过5MB，请重新上传。', type: 'warning' })
        return false
    }
    return true
}

// 删除图片
const delImg = async (item: any, index: any) => {
    console.log(item);
    // let params = {
    //   fileName: item.fileName
    // }
    // await applyDeleteFile(params).then((res: any) => {
    //   if (res.code === 200) {
    //     ElMessage({
    //       message: "删除成功",
    //       type: 'success',
    //       duration: 3000 // 显示3秒后消失
    //     });
    if (item.bizCode == 'other') {
        applyGetMaterialData.value[index].src = '';
        delete applyGetMaterialData.value[index].fileName;
    }
    delete item.src;
    delete item.fileName;
    // } else {
    // 接口status不管是200还是500 && response.code不为200
    //   }
    // });
}
const beforeRemove = async () => {
    console.log("remove");

}

// 修改状态
const editGuestStatus = async (status: any) => {
    guestStatus.value.status = status;
    // 拒绝
    if (status === 'reject') {
        if (!guestStatusRuleFormRef.value) return
        await guestStatusRuleFormRef.value?.validate(async (valid, fields) => {
            if (valid) {
                try {
                    await handleUpdateApplyStatus(status)
                } catch (error) {
                    console.error('Failed to data:', error);
                }
            } else {
                console.log('error submit!', fields)
            }
        })
    } else {
        await handleUpdateApplyStatus(status);
    }
}

// 更新审核状态
const handleUpdateApplyStatus = async (status: any) => {
    let params = {
        "customerCode": applyInfoFormData.value.customerCode,
        "applyNo": applyInfoFormData.value.applyNo,
        "remark": guestStatus.value.remark,
        "rowVersion": applyInfoFormData.value.rowVersion
    }
    const loading = ElLoading.service({
        lock: true,
        text: '加载中',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    if (status === 'pass') {
        await updateApplyPassStatus(params).then((res: any) => {
            if (res.code === 200) {
                ElMessage({
                    message: "修改状态成功",
                    type: 'success',
                    duration: 3000 // 显示3秒后消失
                });
                loading.close();
                router.push('/applyManage/applyList')
            } else {
                // 接口status不管是200还是500 && response.code不为200
                loading.close();
            }
        });
    } else if (status === 'reject') {
        await updateApplyRejectStatus(params).then((res: any) => {
            if (res.code === 200) {
                ElMessage({
                    message: "修改状态成功",
                    type: 'success',
                    duration: 3000 // 显示3秒后消失
                });
                loading.close();
                router.push('/applyManage/applyList')
            } else {
                // 接口status不管是200还是500 && response.code不为200
                loading.close();
            }
        });
    }
}

// 工单日志
const handleApplyLogs = async () => {
    let params: any = {}
    if (applyInfoFormData.value.customerCode) params['customerCode'] = applyInfoFormData.value.customerCode;
    await queryApplyChangeLog(currentPage.value, pageSize.value, params).then((data) => {
        if (data.code === 200) {
            applyLogsTableData.value = data.data.list;
            applyLogsTotal.value = data.data.count;
        } else {
            // 接口status不管是200还是500 && response.code不为200
        }
    });
}
// 工单日志 分页大小改变时触发
const handleSizeChange = (val: any) => {
    pageSize.value = val;
    handleApplyLogs();
};

// 工单日志当前页改变时触发
const handleCurrentChange = (val: any) => {
    currentPage.value = val;
    handleApplyLogs();
};
// 准入接口查询
const applyResult = async () => {
    let params = {
        "applyNo": applyInfoFormData.value.applyNo
    }
    const loading = ElLoading.service({
        lock: true,
        text: '加载中',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    await getApplyResult(params).then((res: any) => {
        if (res.code === 200) {
            ElMessage({
                message: "准入成功",
                type: 'success',
                duration: 3000 // 显示3秒后消失
            });
            loading.close()
        } else {
            // 接口status不管是200还是500 && response.code不为200
            loading.close()
        }
    });
};
// 授信
const creditApplyBtn = async () => {
    if (creditAgreementStatus.value) {
        let params: object = {
            "applyNo": applyNo
        }
        const loading = ElLoading.service({
            lock: true,
            text: '加载中',
            background: 'rgba(0, 0, 0, 0.7)',
        })
        await creditApply(params).then(async (res: any) => {
            console.log(res);
            if (res.code === 200) {
                ElMessage({
                    message: "授信审核中",
                    type: 'success',
                    duration: 3000 // 显示3秒后消失
                });
                creditAgreementdialogRef.value.close()
                loading.close()
            } else {
                loading.close()
            }
        });
    } else {
        ElMessage({
            message: "请先阅读协议",
            type: 'error',
            duration: 3000 // 显示3秒后消失
        });
    }
}
// 授信查询
const creditResultBtn = async () => {
    let params: object = {
        "applyNo": applyNo
    }
    loadingShow();
    await creditResult(params).then(async (res: any) => {
        console.log(res);
        if (res.code === 200) {
            let data = res.data;
            // 结果PASS：通过 REFUSE：拒绝 AUDITING：审核中 NOORDER：无效的单号 FAIL:失败
            if (data.applyResult === 'PASS') {
                ElMessage({
                    message: `授信申请结果通过`,
                    type: 'success',
                    duration: 3000 // 显示3秒后消失
                });
            } else if (data.applyResult === 'REFUSE') {
                ElMessage({
                    message: `授信申请结果拒绝,拒绝原因：${data.responseMsg}`,
                    type: 'error',
                    duration: 3000 // 显示3秒后消失
                });
            } else {
                let apply_result: any = {
                    "AUDITING": "审核中",
                    "NOORDER": "无效的单号",
                    "FAIL": "失败",
                }
                ElMessage({
                    message: `授信申请结果${apply_result[data.applyResult]}`,
                    type: 'warning',
                    duration: 3000 // 显示3秒后消失
                });
            }
            loadingHide()
        } else {
            loadingHide()
        }
    });
}
// 额度查询
const limitQueryBtn = async () => {
    limitQuerydialogRef.value.show()
    limitQuerydialogRef.value.isShowFooter(false)
    const loading = ElLoading.service({
        lock: true,
        text: '加载中',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    let params: object = {
        "applyNo": applyNo
    }
    await getlimitQuery(params).then(async (res: any) => {
        console.log(res);
        if (res.code === 200) {
            // res.data.creditLimit 授信可用金额
            // applyInfoFormData.value.applyAmount 客户申请金额
            const money = applyInfoFormData.value.applyAmount > res.data.creditLimit ? res.data.creditLimit : applyInfoFormData.value.applyAmount;
            limitQueryField.value.money = money;
            limitQueryField.value.creditLimit = res.data.creditLimit;
            limitQueryField.value.termSelectData = res.data?.productInfo[0]?.termNum.split(';');
            loading.close();
        } else {
            loading.close();
        }
    });
}
// 借款试算
const loanTrialBtn = async () => {
    const loading = ElLoading.service({
        lock: true,
        text: '加载中',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    let params: object = {
        "loanAmount": limitQueryField.value.money,
        "repayMethod": "C1001",
        "termNum": limitQueryField.value.term
    }
    await getloanTrial(applyNo, params).then(async (res: any) => {
        console.log(res);
        if (res.code === 200) {
            loanTrialListData.value = res.data;
            console.log(loanTrialListData.value);
            isShowloanTrial.value = true;
            loading.close()
        } else {
            loading.close()
        }
    });
}
// 是否阅读授信协议-状态
const isCheckAgreement = (e?: any) => {
    creditAgreementStatus.value = e;
    if (e) {
        creditAgreementDrawerShow.value = false;
    }
}
const readCreditAgreement = (e?: any) => {
    creditAgreementDrawerShow.value = true;
}
// 是否阅读借款协议
const isCheckloanApplyAgreement = (e?: any) => {
    loanApplyAgreementStatus.value = e;
    if (e) {
        loanApplyAgreementDrawerShow.value = false;
    }
}

const readloanApplyAgreement = () => {
    loanApplyAgreementDrawerShow.value = true;
}
// 绑定银行卡
const addBankCardBtn = () => {
    router.push({
        path: '/applyManage/add_bankcard',
        query: {
            applyNo: applyNo
        }
    })
}
// 借款申请
const loanApplyBtn = async () => {
    // 预借款
    loadingShow();
    await preloanApply(applyNo).then(async (res: any) => {
        console.log(res);
        if (res.code === 200) {
            loanApplyField.value = res.data;
            const repayMethod = res.data.repayMethod?.code ? res.data?.repayMethod?.code : res.data?.repayMethod?.name;
            loanApplyFieldData.value = {
                loanAmount: loanApplyField.value.loanAmount,
                repayMethod: repayMethod,
                totalTerm: loanApplyField.value.totalTerm,
                yearRate: loanApplyField.value.yearRate
            }
            if (applyInfoFormData.value.applyStatus === 'A14') {
                await selectAgreenmentList('LOAN', applyNo, loanApplyFieldData.value).then(async (res: any) => {
                    console.log(res);
                    if (res.code === 200) {
                        agreementList.value = res.data;
                        loadingHide();
                    } else {
                        ElMessage({
                            message: `获取协议有误，请联系管理员！`,
                            type: 'warning',
                            duration: 3000 // 显示3秒后消失
                        });
                        loadingHide();
                    }
                });
            }
        } else {
            loadingHide();
        }
    });
    loanApplydialogRef.value.show()
}
// -确认
const loanApplyConfirm = async () => {
    if (loanApplyAgreementStatus.value) {
        let params: object = loanApplyFieldData.value;
        console.log(params);
        const loading = ElLoading.service({
            lock: true,
            text: '加载中',
            background: 'rgba(0, 0, 0, 0.7)',
        })
        await loanApply(applyNo, params).then(async (res: any) => {
            if (res.code === 200) {
                ElMessage({
                    message: "借款申请成功",
                    type: 'success',
                    duration: 3000 // 显示3秒后消失
                });
                loanApplydialogRef.value.close()
                loading.close()
            } else {
                loading.close()
            }
        });
    } else {
        ElMessage({
            message: "请先阅读协议",
            type: 'error',
            duration: 3000 // 显示3秒后消失
        });
    }
}
// 获取银行卡列表
const getBankCardList = async () => {
    if (applyInfoFormData.value.applyStatus === 'A14' || applyInfoFormData.value.applyStatus === 'LOAN_SUCCESS') {
        await bankCardList(applyNo).then((data) => {
            if (data.code === 200) {
                bardCardTableData.value = data.data;
            } else {
                // 接口status不管是200还是500 && response.code不为200
            }
        });
    }
}

const compareDates = (planRepayDate?: any) => {
    // 获取当前日期
    const currentDate = new Date();
    const targetDate = new Date(planRepayDate);
    // 比较当前日期和目标日期
    if (currentDate.getTime() > targetDate.getTime()) {
        // 逾期不减免还款:F4802
        return 'F4802'
    }
    return '';
}
const currentDate = () => {
    // 创建一个新的 Date 对象
    const currentDate = new Date();

    // 获取年份
    const year = currentDate.getFullYear();

    // 获取月份（注意：月份是从 0 开始计数的，所以需要加 1）
    const month = currentDate.getMonth() + 1;

    // 获取日期
    const day = currentDate.getDate();
    return `${year}-${month}-${day}`
}

const handleRepaymentPlan = async () => {
    if (applyInfoFormData.value.applyStatus === 'LOAN_SUCCESS') {
        let params = {
            "pageSize": repaymentPlanPageSize.value,
            "rowStart": repaymentPlancurrentPage.value * repaymentPlanPageSize.value
        }
        await repaymentPlan(applyNo, params).then(async (res: any) => {
            console.log(res);
            if (res.code === 200) {
                repaymentPlanList.value = res.data;
            } else {

            }
        });
    }
}
// 还款
const repayment = async (row?: any, repayment_status = '') => {
    loadingShow();
    // repayType -- 提前还款:F3101\n提前结清:F3102\n逾期减免还款:F4801\n逾期不减免还款:F4802
    let params: any = {};
    if (repayment_status === 'repayment_calculater') {
        params = {
            "planRepayDate": row.planRepayDate,
            "repayAmt": row.planRepayAmt,
            "repayType": row?.repay_type ? row?.repay_type : 'F3101',
        }
    } else {
        let repayAmt = Number(row?.planRepayAmt) + Number(row?.punishAmt || 0);
        params = {
            "planRepayDate": row.planRepayDate,
            "repayAmt": repayAmt,
            "repayType": compareDates(row?.planRepayDate) === 'F4802' ? compareDates(row?.planRepayDate) : 'F3101',
            "stage": row?.stage
        }
    }
    await proactiveRepayment(applyNo, params).then(async (res: any) => {
        console.log(res);
        if (res.code === 200) {
            if (res.data.status === "000000") {
                ElMessage({
                    message: `还款申请成功`,
                    type: "success",
                    duration: 3000, // 显示3秒后消失
                });
            }
            if (res.data.status === "999999") {
                ElMessage({
                    message: `${res.data.msg}`,
                    type: "error",
                    duration: 3000, // 显示3秒后消失
                });
            }
            loadingHide()
            repaymentTrialdialogRef?.value?.close()
        } else {
            loadingHide()
            repaymentTrialdialogRef?.value?.close()
        }
    });
}
// 提前结清
const repaymentTrialBtn = async () => {
    let beOverdueItem = repaymentPlanList.value.find((item: any) => compareDates(item.planRepayDate) === 'F4802' && item.repayStatus === 'F3202') || {};
    if (Object.keys(beOverdueItem).length) {
        ElMessage({
            message: `您有逾期还款，请先结清`,
            type: "warning",
            duration: 3000, // 显示3秒后消失
        });
        return;
    }
    let params = {
        term: '-1'
    }
    loadingShow();
    await repaymentCalculater(applyNo, params).then(async (res: any) => {
        console.log(res);
        if (res.code === 200) {
            loadingHide()
            repaymentTrialField.value.money = res.data.totalAmount
            repaymentTrialdialogRef.value.show()
        } else {
            loadingHide()
        }
    });
}
// 提前结清 - 确认
const repaymentTrialConfirm = async () => {
    repayment({
        planRepayAmt: repaymentTrialField.value.money,
        planRepayDate: '',
        repay_type: 'F3102'
    }, 'repayment_calculater')
}
// 查看主动还款失败原因
const lookRepaymentReason = async (row?: any) => {
    loadingShow();
    await repaymentReason(applyNo, row?.stage, {}).then(async (res: any) => {
        console.log(res);
        if (res.code === 200) {
            loadingHide()
            if (res.data === null || res.data.length === 0) {
                ElMessage({
                    message: `无可查看的还款信息`,
                    type: "warning",
                    duration: 3000, // 显示3秒后消失
                });
                return;
            }
            repaymentReasonMsg.value = res.data.msg;
            repaymentReasonMsgdialogRef.value.show();
            repaymentReasonMsgdialogRef.value.isShowFooter(false);
        } else {
            loadingHide()
        }
    });
}
</script>

<style lang="scss" scoped>
.apply_order {
    padding: 16px;
    background: #fff;

    .el-form {
        display: flex;
        flex-wrap: wrap;

        .el-form-item {
            width: 400px;
            margin-right: 76px;

            .apply_order_form_item {
                display: flex;

                label {
                    width: 120px;
                    text-align: right;
                    margin-right: 6px;

                    span {
                        color: red;
                    }
                }
            }

            :deep(.el-form-item__error) {
                margin-left: 126px;
            }
        }
    }

    :deep(.el-upload--picture-card) {
        position: relative;
        margin-right: 16px;

        span {
            position: absolute;
            right: 6px;
            top: 0px;
        }

        img {
            &:hover {
                background-color: rgba(0, 0, 0, 0.2);
                opacity: 1;
            }
        }
    }

    // .read_agreement {
    // max-height: 600px;
    // }
}

.required {
    color: red;
}
</style>