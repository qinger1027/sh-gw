<template>
  <div class="read_agreement">
    <div class="read_agreement_header">
      <div v-for="(item, index) in agreementList" :key="index" class="read_agreement_header_con">
        <div @click="fetchUrlContent(item, index)">{{
          item.contractName
        }}</div>
      </div>
    </div>
    <div class="read_agreement_con" v-html="currentAgreement.safeHtmlContent">
    </div>
    <div class="agree_agreement" v-if="currentAgreement.index === agreementList.length - 1"
      @click="handleEvent('isCheckAgreement')">
      <input type="checkbox" v-model="isCheckAgreement">
      <label for="">已阅读并同意</label>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import { selectAgreenmentList } from "@/api/agreenment";
import { replenishAgreementList } from "@/api/replenish";
import { loadingHide, loadingShow } from "@/utils/util";

const isCheckAgreement = ref(false);
const currentAgreement = ref({
  safeHtmlContent: "",
  index: 0,
});
const agreementList: any = ref([]);
// 父传子
const props:any = defineProps({
  applyNo: String,
  busiType: String,
  loanApplyField: Object,
  replenishData: Object,
});
onMounted(() => {
  init()
})
// 协议列表
const init = async () => {
  let params: any = {}
  // 补录协议
  if (props.busiType === 'REPLENISH_COMMON' || props.busiType === 'REPLENISH_LOAN') {
    loadingShow();
    params = props.replenishData;
    await replenishAgreementList(props.busiType, props.applyNo, params).then(async (res: any) => {
      if (res.code === 200) {
        agreementList.value = res.data;
        loadingHide();
        await fetchUrlContent()
      } else {
      }
    });
  } else {
    loadingShow();
    // 借款协议
    if (props.busiType === 'LOAN') params = props.loanApplyField
    // 公共
    await selectAgreenmentList(props.busiType, props.applyNo, params).then(async (res: any) => {
      console.log(res);
      if (res.code === 200) {
        agreementList.value = res.data;
        loadingHide();
        await fetchUrlContent()
      } else {
  
      }
    });
  }
}
// 获取内容
const fetchUrlContent = async (
  item: any = agreementList.value[0],
  index: number = 0
) => {
  // 如果有contractContent内容取contractContent，无则取contractUrl地址内容
  if (item?.contractContent) {
    currentAgreement.value.safeHtmlContent = item.contractContent;
    currentAgreement.value.index = index;
  } else {
    // 代理服务器
    let contractUrl = item.contractUrl.replace(/https:\/\/test-icash[1-9].duxiaoman.com/g, '/testapi');
    axios
      .get(contractUrl)
      .then((response) => {
        currentAgreement.value.safeHtmlContent = response.data;
        currentAgreement.value.index = index;
        console.log(currentAgreement.value);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
};

const emit = defineEmits(['isCheckAgreement'])
const handleEvent = (type: any) => {
  isCheckAgreement.value = !isCheckAgreement.value;
  emit(type, isCheckAgreement.value)
}

</script>

<style lang="scss" scoped>
.read_agreement {
  // max-height: 600px;
  // overflow-y: scroll;

  .read_agreement_header {
    overflow-x: auto;
    white-space: nowrap;

    .read_agreement_header_con {
      display: inline-block;
      padding: 2px 26px;
      margin-right: 10px;
      background-color: #f0f0f0;
      text-align: center;
      line-height: 30px;
    }
  }

  .read_agreement_con {
    padding: 16px;
  }

  .agree_agreement {
    text-align: center;

    uni-checkbox {
      margin-bottom: 16px;
    }
  }
}
</style>
