<template>
    <div>
        <!-- total数据总条数 :page-size="20"每页20条数据(不写默认10条) :pager-count设置最大页码按钮数 
            background给按钮添加背景色 small小型分页 -->
        <el-pagination :total="1000" :page-size="10" :pager-count="11" layout="total,sizes,prev,pager,next,jumper"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[10, 15, 20, 50,100,200]" :hide-on-single-page="value">
        </el-pagination>
        <!-- 带分页的表格 -->
        <ex-table :data="data" show-pagination :search-method="handleSearch" ref="table">
            <el-table-column label="日期" prop="date" />
        </ex-table>
        <el-button @click="$refs.table.setCurrentPage(1)">回到首页</el-button>
    </div>
</template>
<script>
    import ExTable from './extable.js';
    import { getData, getPageList } from "./tableData.js"
    export default {
        components: { ExTable },
        data() {
            return {
                currentPage: 4,
                value: false,
                data: []
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            handleSearch(pagination, { currentPage, pageSize }) {
                this.fetchRemoteData(currentPage, pageSize)
            },
            fetchRemoteData(currentPage, pageSize) {
                //currentPage：当前页， pageSize: 每页最大条目数， 用于服务端分页
                //假设http请求数据，结果返回｛data_list: [...], total: ..｝
                //设置表格数据
                this.data = getData();//request.data_list;
                //设置分页总数
                const pagination = this.$refs.table.pagination;
                // 这里可以设置分页的一些属性
                pagination.total = this.data.length;
                pagination.pageSizes = [10, 15, 20, 50, 100, 200]
            },
        },
        mounted() {
            this.$refs.table.fetchData();
        }
    }
</script>