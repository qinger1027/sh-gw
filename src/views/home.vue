<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(()=>{
})
</script>

<template>
    <div>
        <div class="list_top">
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="grid-content ep-bg-purple">
                        <div class="grid-tit">
                            <el-icon>
                                <MessageBox />
                            </el-icon>
                            今日放款人数 / 放款总额（万）
                        </div>
                        <div class="grid-number">1人 / 9万</div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content ep-bg-purple">
                        <div class="grid-tit">
                            <el-icon>
                                <Timer />
                            </el-icon>
                            累计放款金额（万）
                        </div>
                        <div class="grid-number">3467,00</div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content ep-bg-purple">
                        <div class="grid-tit">
                            <el-icon>
                                <User />
                            </el-icon>
                            累计进件（人）
                        </div>
                        <div class="grid-number">50300</div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content ep-bg-purple">
                        <div class="grid-tit">
                            <el-icon>
                                <Collection />
                            </el-icon>
                            累计放款客户(人)
                        </div>
                        <div class="grid-number">12000</div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="list_content">
            <el-row :gutter="20" class="list_content_row">
                <el-col :span="12" class="list_content_col">
                    <div class="list_content_info">
                        <p class="list_content_info_title">进件统计</p>
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <div>今日新增人数</div>
                                <div class="list_content_info_num">60</div>
                            </el-col>
                            <el-col :span="8">
                                <div>最近7天新增人数</div>
                                <div class="list_content_info_num">17</div>
                            </el-col>
                            <el-col :span="8">
                                <div>最近30天新增人数</div>
                                <div class="list_content_info_num">233</div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
                <el-col :span="12" class="list_content_col">
                    <div class="list_content_info">
                        <p class="list_content_info_title">授信统计</p>
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <div>今日授信人数</div>
                                <div class="list_content_info_num">20</div>
                            </el-col>
                            <el-col :span="8">
                                <div>最近7天授信人数</div>
                                <div class="list_content_info_num">50</div>
                            </el-col>
                            <el-col :span="8">
                                <div>最近30天授信人数</div>
                                <div class="list_content_info_num">80</div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
                <el-col :span="12" class="list_content_col">
                    <div class="list_content_info">
                        <p class="list_content_info_title">银行类进件统计</p>
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <div>今日授信人数</div>
                                <div class="list_content_info_num">560</div>
                            </el-col>
                            <el-col :span="8">
                                <div>最近7天授信人数</div>
                                <div class="list_content_info_num">580</div>
                            </el-col>
                            <el-col :span="8">
                                <div>最近30天授信人数</div>
                                <div class="list_content_info_num">890</div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
                <el-col :span="12" class="list_content_col">
                    <div class="list_content_info">
                        <p class="list_content_info_title">银行类进件统计</p>
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <div>今日授信人数</div>
                                <div class="list_content_info_num">10</div>
                            </el-col>
                            <el-col :span="8">
                                <div>最近7天授信人数</div>
                                <div class="list_content_info_num">60</div>
                            </el-col>
                            <el-col :span="8">
                                <div>最近30天授信人数</div>
                                <div class="list_content_info_num">400</div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.list_top {
    .el-row {
        margin-bottom: 20px;
    }

    .el-row:last-child {
        margin-bottom: 0;
    }

    .el-col {
        border-radius: 4px;

        &:nth-child(1) {
            .grid-content {
                background: url("@/assets/home/item1.png") no-repeat;
                background-size: cover;
            }
        }

        &:nth-child(2) {
            .grid-content {
                background: url("@/assets/home/item4.png") no-repeat;
                background-size: cover;
            }
        }

        &:nth-child(3) {
            .grid-content {
                background: url("@/assets/home/item2.png") no-repeat;
                background-size: cover;
            }
        }

        &:nth-child(4) {
            .grid-content {
                background: url("@/assets/home/item3.png") no-repeat;
                background-size: cover;
            }
        }

        .grid-content {
            border-radius: 15px;
            min-height: 120px;
            padding: 0 31px;

            .grid-tit {
                font-size: 15px;
                padding-top: 20px;
                display: flex;
                align-items: center;

                .el-icon {
                    font-size: 30px;
                    padding-right: 4px;
                }
            }

            .grid-number {
                font-size: 26px;
                padding-top: 8px;
                padding-left: 30px;
            }
        }
    }
}

.list_content {
    .list_content_row {
        .list_content_col {
            .list_content_info {
                height: 200px;
                background: #fff;
                border-radius: 8px;

                .list_content_info_title {
                    padding: 20px 0 0 42px;
                    font-size: 18px;
                }

                .el-row {
                    padding-top: 10px;

                    .el-col {
                        text-align: center;
                        border-right: 1px solid #eaeaea;
                        color: #666;

                        &:last-child {
                            border-right: none;
                        }

                        .list_content_info_num {
                            font-size: 30px;
                            color: var(--el-menu-bg-color-active);
                        }
                    }
                }
            }
        }
    }
}
</style>