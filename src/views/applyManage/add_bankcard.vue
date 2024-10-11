<template>
    <div class="card">
        <div v-if="addBankCardStatus.status === 'add'">
            <!-- 绑卡协议 -->
            <el-drawer v-model="creditAgreementDrawerShow" :title="''" :direction="'btt'">
                <credit-agreement :busiType="'BIND'" :applyNo="applyNo"
                    @isCheckAgreement="isCheckAgreement"></credit-agreement>
            </el-drawer>
            <el-form ref="ruleFormRef" :rules="dynamicRules" :model="cardInfo">
                <el-form-item label="银行卡号">
                    <el-input v-model="cardInfo.bankCardNum" placeholder="请输入银行卡号" type="number" maxlength="19" />
                </el-form-item>
                <el-form-item label="所属银行">
                    <el-select v-model="cardInfo.affiliatedBank" placeholder="请选择">
                        <el-option v-for="(select, index) in supportBankCardList" :label="select?.bankName"
                            :value="select?.bankName" @click="selectbankName(select)" />
                    </el-select>
                </el-form-item>
                <el-form-item label="卡类型">
                    <el-select v-model="cardInfo.cardType" placeholder="请选择">
                        <el-option v-for="(select, index) in cardTypeList" :label="select?.text"
                            :value="select?.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="持卡人">
                    <el-input v-model="cardInfo.cardHolder" placeholder="请输入持卡人真实姓名" />
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input v-model="cardInfo.idNo" placeholder="请输入持卡人身份证号" maxlength="18" />
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="cardInfo.mobile" placeholder="请输入手机号" type="number" maxlength="11" />
                </el-form-item>
                <div class="card_agree">
                    <div @click="agreementStatus = !agreementStatus">
                        <input type="checkbox" :checked="agreementStatus" />
                        <label for="">已阅读并同意</label>
                    </div>
                    <span v-for="(item, index) in agreementList" :key="index">
                        <span style="color: var(--el-color-primary);cursor: pointer;" @click="agreementShow">&lt;&lt;{{
                            item.contractName }}&gt;&gt;</span>
                    </span>
                </div>
            </el-form>
            <el-button @click="agreeAndBindCard" :disabled="!agreementStatus">同意协议并绑定</el-button>
        </div>
        <div v-else-if="addBankCardStatus.status === 'smsVerify'">
            <el-form ref="ruleFormRef" :rules="dynamicRules" :model="cardInfo">
                <el-form-item label="手机号">
                    <el-input v-model="cardInfo.mobile" placeholder="请输入手机号" type="number" maxlength="11" />
                </el-form-item>
                <el-form-item label="验证码">
                    <el-input v-model="cardInfo.code" placeholder="请输入验证码" type="number" />
                </el-form-item>
            </el-form>
            <el-button @click="bindCardsmsVerify">确认</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { bankCardsmsVerify, bindbankCard, selectSupportBankCardList } from '@/api/bankcard';
import { onMounted, ref } from 'vue';
import commonDialog from "@/components/dialog/index.vue";
import creditAgreement from "@/components/agreement/agreement.vue";
import { selectAgreenmentList } from '@/api/agreenment';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
const ruleFormRef = ref();
const dynamicRules = ref();
const cardInfo: any = ref({
    bankCardNum: "",
    cardHolder: "",
    idNo: "",
    mobile: "",
    affiliatedBank: "",
    code: "",
    cardType: "",
    bankCode: "",
})
const addBankCardStatus = ref({
    status: 'add'
})
// 支持那些银行列表
const supportBankCardList: any = ref([]);
const cardTypeList: any = ref([
    { value: "101", text: "借记卡", },
    // { value: "102", text: "信用卡", },
]);
const agreementStatus = ref(false);
const creditAgreementDrawerShow = ref();
const router = useRouter();
// router query
const routerQuery: any = router.currentRoute.value.query;
const applyNo = routerQuery?.applyNo || '';
// const props = defineProps({
//     applyNo: String,
// });
const agreementList: any = ref([])
const accId: any = ref()
import { useMenuStore } from "@/stores/modules/menuTabs";
const menuStore = useMenuStore();
onMounted(() => {
    init();
})
const init = async () => {
    // 协议列表-授信
    let params: object = {}
    await selectAgreenmentList('BIND', applyNo).then(async (res: any) => {
        console.log(res);
        if (res.code === 200) {
            agreementList.value = res.data;
            // await fetchUrlContent()
        } else {

        }
    });
    // 获取所属银行的列表
    await selectSupportBankCardList(applyNo).then((res: any) => {
        console.log(res);
        if (res.code === 200) {
            supportBankCardList.value = res.data;
        } else {

        }
    });
}
// 选择银行卡
const selectbankName = async (item: any) => {
    cardInfo.value.bankCode = item.bankCode
}
// 申请绑定银行卡
const agreeAndBindCard = async () => {
    if (agreementStatus.value) {
        let params = {
            "accBankCard": cardInfo.value.bankCardNum,
            "accBankCardType": cardInfo.value.cardType,
            "accBankCode": cardInfo.value.bankCode,
            "accBankName": cardInfo.value.affiliatedBank,
            "accOwnIdCard": cardInfo.value.idNo,
            "accOwnName": cardInfo.value.cardHolder,
            "accOwnPhone": cardInfo.value.mobile,
            // 开户类型 B6807:放款&还款账户 【默认】
            "accType": 'B6807'
        }
        await bindbankCard(applyNo, params).then((res: any) => {
            console.log(res);
            if (res.code === 200) {
                console.log(res.data);
                accId.value = res.data.accId;
                addBankCardStatus.value.status = 'smsVerify';
                ruleFormRef.value?.resetFields()
            } else {

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
// 是否阅读协议-状态
const isCheckAgreement = (e?: any) => {
    agreementStatus.value = e;
    if(agreementStatus.value){
        creditAgreementDrawerShow.value = false;
    }
}
// 协议显示
const agreementShow = () => {
    creditAgreementDrawerShow.value = true;
}
// 绑卡短信验证
const bindCardsmsVerify = async () => {
    let params = {
        "accId": accId.value,
        "smsCode": cardInfo.value.code
    }
    await bankCardsmsVerify(applyNo, params).then((res: any) => {
        console.log(res);
        if (res.code === 200) {
            console.log(res.data);
            ElMessage({
                message: "绑卡验证成功",
                type: 'success',
                duration: 3000 // 显示3秒后消失
            });
            // 移除当前menu
            menuStore.removeMenuItem("/applyManage/add_bankcard");
            router.push('/applyManage/applyList')
        } else {

        }
    });
}
</script>

<style lang="scss" scoped>
.card {
    padding: 16px 0;
    position: relative;

    .el-form-item {
        height: 40px;
        margin-bottom: 2px;
        background: #fff;
        padding: 0 16px;
        align-items: center;

        :deep(.el-form-item__label) {
            width: 80px;
        }

        :deep(.el-input__wrapper) {
            font-size: 14px;
            color: gray;
        }

        :deep(.el-form-item__content) {
            display: flex;
            justify-content: space-between;
        }
    }

    .card_agree {
        margin: 16px;
        text-align: center;
        display: flex;
    }
}
</style>