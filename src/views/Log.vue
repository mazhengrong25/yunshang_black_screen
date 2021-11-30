<!--
 * @Description: 日志查询
 * @Author: mzr
 * @Date: 2021-11-04 16:52:11
 * @LastEditTime: 2021-11-30 13:59:11
 * @LastEditors: mzr
-->
<template>
    <div class="content">
        <Header />
        <div class="log">
            <!-- 表格操作 -->
            <div class="table_action">

                <div class="table_action_item">
                    <p>App用户：</p>
                    <div class="item_select">
                        <v-text-field label="用户名" clearable v-model="searchItem.User"></v-text-field>
                    </div>
                </div>

                <div class="table_action_item">
                    <p>数据类型：</p>
                    <div class="item_select">
                        <v-select label="所有" :items="selectDataType" v-model="searchItem.DataType" clearable>

                        </v-select>
                    </div>
                </div>

                <div class="table_action_item">
                    <p>数据值：</p>
                    <div class="item_select">
                        <v-text-field label="数据值" clearable v-model="searchItem.DataKey"></v-text-field>
                    </div>
                </div>

                <div class="table_action_item">
                    <p>日志状态：</p>
                    <div class="item_select">
                        <v-select label="所有" :items="selectLogStatus" v-model="searchItem.LogStatus" clearable></v-select>
                    </div>
                </div>

                <div class="table_action_item">
                    <p>接口名称：</p>
                    <div class="item_select">
                        <v-text-field label="接口名称" clearable v-model="searchItem.ApiName"></v-text-field>
                    </div>
                </div>

                <div class="table_action_item">
                    <p>开始时间：</p>
                    <div class="item_select">
                        <!-- <v-menu :close-on-content-click="false" nudge-top="25" transition="scale-transition" offset-y min-width="auto" v-model="dateMenu">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field label="开始时间" solo v-model="searchItem.StartTime" v-bind="attrs" v-on="on" clearable></v-text-field>
                            </template>
                        </v-menu> -->
                        <v-datetime-picker v-model="searchItem.StartTime" label="开始时间"></v-datetime-picker>

                    </div>
                </div>

                <div class="table_action_item">
                    <p>结束时间：</p>
                    <div class="item_select">
                        <!-- <v-menu :close-on-content-click="true" nudge-top="25" transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field label="结束时间" solo v-model="searchItem.EndTime" v-bind="attrs" v-on="on" clearable></v-text-field>
                            </template>
                        </v-menu> -->
                        <v-datetime-picker v-model="searchItem.EndTime" label="结束时间"></v-datetime-picker>

                    </div>
                </div>
                <div class="table_action_item">
                    <v-btn @click="goSearch()" color="primary" depressed class="searchBtn">搜索</v-btn>
                </div>
            </div>
            <v-data-table height="600" :headers="headers" item-key="id" fixed-header :items-per-page="-1" :items="logList" hide-default-footer :loading="tableLoading" loading-text="加载中..." class="table_class" :disable-sort="true">
                <template v-slot:item.category="{ item }">{{ item.category === 1 ?'IBE':'ETerm' }}</template>
                <template v-slot:item.process="{ item }">
                    <v-btn @click="openJSON(item)" color="primary" depressed>打开日志详情</v-btn>
                </template>
                <template v-slot:item.startTime="{ item }">{{ $moment(item.startTime).format('YYYY-MM-DD HH:mm:ss') }}</template>
                <template v-slot:item.endTime="{ item }">{{ $moment(item.endTime).format('YYYY-MM-DD HH:mm:ss') }}</template>
                <template v-slot:item.dataType="{ item }">{{ item.dataType ? item.dataType:'-' }}</template>
                <template v-slot:item.dataKey="{ item }">{{ item.dataKey ? item.dataKey:'-' }}</template>
                <template v-slot:item.logState="{ item }">
                    <v-chip :color="getColor(item.logState)" dark>
                        {{ item.logState }}
                    </v-chip>
                </template>

            </v-data-table>
            <!-- 表格加载 -->
            <v-btn class="table_loading" @click="nextBtn" :loading="tableLoading" v-if="logList.length > 0">载入更多</v-btn>
            <!-- 日志详情 -->
            <v-dialog v-model="dialog" width="1000" transition="dialog-bottom-transition">
                <json-view :data="jsonData" />
            </v-dialog>

        </div>
    </div>
</template>

<script>
import jsonView from 'vue-json-views'
import Header from '@/components/header' // 头部
export default {
    components: {
        jsonView,
        Header
    },
    data: () => ({
        headers: [
            { text: '用户名', value: 'user' },
            { text: '数据类型', value: 'dataType' },
            { text: '数据值', value: 'dataKey' },
            { text: 'API类别', value: 'category' },
            { text: 'IP地址', value: 'ip' },
            { text: '日志状态', value: 'logState' },
            { text: '接口名称', value: 'apiName' },
            { text: '开始时间', value: 'startTime' },
            { text: '截止时间', value: 'endTime' },
            { text: '日志详情', value: 'process', },
        ],
        logList: [],
        logPageMessage: {},

        dialog: false,
        tableLoading: true,
        jsonData: {}, // 日志详情

        nextStatus: false, // 下一页按钮
        // 翻页查找
        nextMessage: {
            id: '',
            dateFlag: 0
        },
        // 筛选条件
        searchItem: {
            User: "",
            ApiName: "",
            DataKey: "",
            DataType: "",
            StartTime: "",
            EndTime: "",
            EndTime: "",
            LogStatus: ""
        },

        selectDataType: [], // 筛选条件 数据类型
        selectLogStatus: [], // 筛选条件  日志状态

        // 时间选择器
        // timePicker: {
        //     startTime: "",
        //     endTime: ""
        // },

    }),
    methods: {
        // 列表数据
        getQuery() {
            this.tableLoading = true
            let data = {
                Id: this.nextMessage.id,                //类型：String  可有字段  备注：起始ID(用于翻页查询)
                DateFlag: this.nextMessage.dateFlag,                //类型：Number  可有字段  备注：起始时间标签(用于翻页查询)
                Limit: 10,                //类型：Number  必有字段  备注：每页显示条数
                StartTime: this.searchItem.StartTime,
                EndTime: this.searchItem.EndTime,
                User: this.searchItem.User,                //类型：String  可有字段  备注：App用户
                ApiName: this.searchItem.ApiName,                //类型：String  可有字段  备注：接口名称
                DataType: this.searchItem.DataType || '',                //类型：String  可有字段  备注：数据类型
                DataKey: this.searchItem.DataKey,            //类型：String  可有字段  备注：数据值
                LogState: this.searchItem.LogStatus || '' // 日志状态
            }
            this.$axios.post("webApi/logProcess/query", data).then((res) => {
                if (res.status === 0) {

                    this.logPageMessage = res.data
                    if (this.logList.length > 0) {
                        this.logList = [...this.logList, ...res.data.datas]
                    } else {
                        this.logList = res.data.datas
                    }
                    console.log('this.logList', this.logList)
                    this.nextStatus = res.data.datas.length > 0
                    this.tableLoading = false

                } else {

                }

            })
                .catch((e) => {
                    window.location.href = '/'
                })
        },

        // 获取数据类型
        getLogType() {
            let data = {
                src: "LogDataType"
            }
            this.$axios.get("webapi/page/GetDataMappings", { params: data }).then((res) => {
                if (res.status === 0) {
                    res.data.forEach((item) => {
                        this.selectDataType.push(item.data_code)
                    })
                } else {

                }
            })
        },

        // 获取日志状态
        getLogStatus() {
            let data = {
                src: "LogState"
            }
            this.$axios.get("webapi/page/GetDataMappings", { params: data }).then((res) => {
                if (res.status === 0) {
                    res.data.forEach((item) => {
                        this.selectLogStatus.push(item.data_code)
                    })
                } else {

                }

            })
        },

        // 加载下一页
        nextBtn() {
            this.nextMessage = {
                id: this.logPageMessage.id,
                dateFlag: this.logPageMessage.dateFlag
            }
            this.getQuery()
        },


        // 打开Json对话框
        openJSON(val) {
            this.dialog = true
            this.jsonData = {
                process: val.process,
                request: val.request,
                response: val.response,
            }
        },

        // 搜索筛选
        goSearch() {
            this.logList = []
            this.nextMessage.id = ''
            this.nextMessage.dateFlag = 0

            this.searchItem.StartTime = this.searchItem.StartTime ? this.$moment(this.searchItem.StartTime).format('YYYY-MM-DD HH:mm:ss') : this.searchItem.StartTime
            this.searchItem.EndTime = this.searchItem.EndTime ? this.$moment(this.searchItem.EndTime).format('YYYY-MM-DD HH:mm:ss') : this.searchItem.EndTime

            this.getQuery();
        },

        // 表格 日志状态处理
        getColor(calories) {
            if (calories === "fail") return 'red'
            else if (calories === "success") return 'green'
            else return 'orange'
        },

    },
    created() {
        this.searchItem.StartTime = this.$moment().format("YYYY-MM-DD")
        // 查询列表
        this.getQuery();
        // 获取数据类型
        this.getLogType();
        // 获取日志状态
        this.getLogStatus();
    }
}
</script>

<style lang="less" scoped>
.content {
    height: 100vh;
    .log {
        margin: 0px 20px;
        .table_action {
            display: flex;
            align-items: baseline;
            justify-content: flex-start;
            flex-wrap: wrap;
            margin: 28px 0px 18px;
            .table_action_item {
                display: flex;
                align-items: baseline;
                justify-content: center;
                p {
                    font-size: 14px;
                    font-weight: 500;
                }
                .item_select {
                    width: 200px;
                }
                &:not(:last-child) {
                    margin-right: 10px;
                    margin-left: 10px;
                }
                .searchBtn {
                    width: 120px;
                    height: 40px;
                }
            }
        }
        .table_class {
            .table_special {
                width: 550px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
        .table_loading {
            width: 100%;
        }
    }
}
</style>