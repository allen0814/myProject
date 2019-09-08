<template>
    <div style="padding: 20px;">
        <ex-table :data="data" show-pagination :search-method="handleSearch" ref="table" :show-header="false">
            <el-table-column prop="likeCount" width="200">
                <template slot-scope="scope">
                    <div class="qa-rank">
                        <div class="vote">
                            {{scope.row.likeCount}}<br>
                            <small>得票</small>
                        </div>
                        <!-- answered solved -->
                        <div class="answer answered">
                            {{scope.row.answerCount}}<br>
                            <small>回答</small>
                        </div>
                        <!-- viewsword100to999 viewsword999to9999 -->
                        <div class="view ">
                            {{scope.row.browseCount}}<br>
                            <small>浏览</small>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="title" width="600">
                <template slot-scope="scope">
                    <div class="author">
                        <span> {{scope.row.createUserName}}</span>
                        <span>·</span>
                        <span> {{goodTime(scope.row.createDate)}}</span>
                    </div>
                    <h2 class="title" @click="toQuestion(scope.row)">
                        {{scope.row.title}}
                    </h2>
                    <el-tag type="success" size="small" v-for="tag in scope.row.tag.split(',')" :key="tag" @click="selectTag(tag)" style="margin-right: 6px;padding:0 10px;cursor: pointer;">
                        {{tag}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="lastRespondBy" width="46"></el-table-column>
            <el-table-column prop="lastRespondDate" width="46"></el-table-column>
        </ex-table>
        <div></div>
    </div>
</template>

<script>
    import ExTable from '../components/extable.js'; //分页table
    export default {
        components: { ExTable },
        data() {
            return {
                data: []
            };
        },

        //方法集合
        methods: {
            toQuestion(row) {
                this.$emit('goToQuestion', row.id)
            },
            goodTime(str) {
                let now = new Date().getTime()
                let oldTime = new Date(str).getTime()
                let difference = now - oldTime
                let result = ''
                let minute = 1000 * 60
                let hour = minute * 60
                let day = hour * 24
                let month = day * 30
                let year = month * 12
                let _year = difference / year
                let _month = difference / month
                let _week = difference / (7 * day)
                let _day = difference / day
                let _hour = difference / hour
                let _min = difference / minute

                if (_year >= 1) {
                    result = ~~(_year) + ' 年前'
                } else if (_month >= 1) {
                    result = ~~(_month) + ' 个月前'
                } else if (_week >= 1) {
                    result = ~~(_week) + ' 周前'
                } else if (_day >= 1) {
                    result = ~~(_day) + ' 天前'
                } else if (_hour >= 1) {
                    result = +~~(_hour) + ' 个小时前'
                } else if (_min >= 1) {
                    result = +~~(_min) + ' 分钟前'
                } else {
                    result = '刚刚'
                }
                return result + '提问' //回答
            },
            dateFormat(row, column) {
                debugger
            },
            selectTag(tag) {},
            handleSearch(pagination, { currentPage, pageSize }) {
                this.fetchRemoteData(currentPage, pageSize)
            },
            fetchRemoteData(currentPage, pageSize) {
                // this.loading = true;
                let param = {};
                let url = 'question/query?currentPage=' + currentPage + '&pageSize=' + pageSize;
                this.$api.post(url, param, null, r => {
                    if (r.success) {
                        this.data = r.data.list
                        //设置分页总数
                        const pagination = this.$refs.table.pagination;
                        // 这里可以设置分页的一些属性
                        pagination.total = r.data.total;
                        pagination.pageSizes = [10, 15, 20, 50, 100, 200]
                        pagination.background = false;
                        this.rowIndex = r.data.startRow;
                    } else {
                        this.data = []
                        //设置分页总数
                        const pagination = this.$refs.table.pagination;
                        // 这里可以设置分页的一些属性
                        pagination.total = 0;
                        pagination.pageSizes = [10, 15, 20, 50, 100, 200]
                    }
                })

                setTimeout(() => {
                    this.loading = false;
                }, 500);
            },
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {

        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            this.$refs.table.fetchData();
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
    }
</script>
<style lang='scss' scoped>
    @import "./scss/questionList.scss";
</style>