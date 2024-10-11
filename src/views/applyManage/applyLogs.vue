<template>
  <!-- 客户号 流水号 -->
  <div class="apply_header">
    <div class="apply_header_search">
      <label for="">客户号:</label>
      <el-input
        v-model="customerCode"
        style=""
        placeholder="请输入客户号"
        :prefix-icon="Search"
      />
    </div>
    <div style="margin-top: 16px">
      <el-button type="primary" @click="init" style="text-align: right">
        查询
      </el-button>
    </div>
  </div>
  <el-scrollbar style="width: var(--table-width)">
    <el-table :data="tableData" row-key="id">
      <el-table-column
        v-for="item in columns"
        :key="item.key"
        :prop="item.key"
        :label="item.label"
        :width="210"
      >
        <template #default="{ row }">
          <!-- item.prop每个字段   row每条数据 -->
          {{ row[item.key]?.code ? row[item.key].name : row[item.key] }}
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="total"
        small
        background
        hide-on-single-page
      >
      </el-pagination>
    </div>
  </el-scrollbar>

  <!-- <video ref="videoElement" autoplay></video>
    <button @click="startCamera">启动摄像头</button> -->
</template>

<script setup lang="ts">
import { queryApplyChangeLog } from "@/api/apply";
import { onMounted, ref } from "vue";
import { Search } from "@element-plus/icons-vue";

const customerCode = ref("");
const currentPage = ref(1); // 当前页
const pageSize = ref(10); // 每页显示条数
const total = ref(0); // 总条目数
const tableData = ref([]);
const columns = [
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
];
const init = async () => {
  let params: any = {};
  if (customerCode.value) params["customerCode"] = customerCode.value;
  await queryApplyChangeLog(currentPage.value, pageSize.value, params).then(
    (data) => {
      if (data.code === 200) {
        tableData.value = data.data.list;
        total.value = data.data.count;
      } else {
        // 接口status不管是200还是500 && response.code不为200
      }
    }
  );
};

onMounted(() => {
  init();
});

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

const videoElement: any = ref(null);
let stream = null;
const startCamera = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 },
    });
    console.log(stream);
    videoElement.value.srcObject = stream;
  } catch (error) {
    console.error("无法访问摄像头:", error);
  }
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
    margin-bottom: 4px;

    label {
      margin-right: 4px;
    }

    .el-input {
      width: 240px;
      height: 30px;
    }
  }
}
</style>
