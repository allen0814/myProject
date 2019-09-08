<template>
    <div style="text-align: center">
        <!-- 基础：table中放数据data，column中放prop(对应数据字段),label(列头名),width(列宽) -->
        <!-- 带边框(表格内部竖向边框)，table中加border -->
        <!-- row-class-name为某些行添加class样式 -->
        <!-- 定义表格高度就可以固定列头，fixed（Boolean 或left,right）固定列 -->
        <!-- max-height 若表格所需的高度大于最大高度，则会显示一个滚动条 -->
        <!-- el-table-column 里面嵌套 el-table-column 可实现多级表头 -->
        <!-- highlight-current-row 即可实现行单选；@current-change="···"可触发选中行的事件  -->
        <!-- @selection-change="···"复选框选中行时的事件 -->
        <!-- 在table中添加default-sort属性，给指定列默认排序： ascending, descending -->
        <el-table ref="testTable" :data="tableData" border :row-class-name="tableRowClassName" height="350"
            style="width: 850px;" highlight-current-row @current-change="handleCurrentChange"
            @selection-change="checkCurrenRow" :default-sort="{prop: 'date', order: 'ascending'}">
            <!-- 表格加上复选框 -->
            <el-table-column type="selection"></el-table-column>
            <!-- 索引列 type="index" -->
            <el-table-column type="index" width="50" fixed></el-table-column>
            <el-table-column prop="date" label="日期" width="140px" sortable>
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column>
            <!-- 在列中添加属性sortable 实现列可基准排序 -->
            <el-table-column prop="name" label="姓名" width="100px" sortable>
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>姓名：{{scope.row.name}}</p>
                        <p>地址：{{scope.row.address}}</p>
                        <div slot="reference">
                            <el-tag size="medium">{{scope.row.name}}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <!-- :filters数组 :filter-method方法 给列添加过滤器，若需要使用方法给指定列清楚过滤，需加上column-key="tag"  -->
            <el-table-column prop="tag" label="标签" width="100px" column-key="tag"
                :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]" :filter-method="filterTag">
                <!-- 自定义模版：slot-scope其值scope可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据 -->
                <template slot-scope="scope">
                    <el-tag :type="scope.row.tag === '家' ? 'primary' : 'success'" disable-transitions>{{scope.row.tag}}
                    </el-tag>
                </template>
            </el-table-column>
            <!-- 内容过多会默认折行显示，show-overflow-tooltip可以不折行，并且有tip提示 -->
            <!-- :formatter="···"用于格式化指定列 function(row,column) -->
            <el-table-column prop="address" label="地址" width="150px" show-overflow-tooltip :formatter="formatter">
            </el-table-column>
            <el-table-column prop="province" label="省" width="100px"></el-table-column>
            <el-table-column prop="city" label="市" width="100px"></el-table-column>
            <el-table-column prop="zip" label="邮编" width="100px"></el-table-column>
            <!-- 操作列 -->
            <el-table-column fixed="right" label="操作" width="130">
                <template slot-scope="scope">
                    <!-- scope.row当前行data，scope.$index当前行索引，tableData整个表格数据 -->
                    <el-button type="text" size="small" @click="handleView(scope.row)">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, tableData)">
                        移除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
            <el-button @click="setCurrent(tableData[6])">选中第七行（非复选框）</el-button>
            <el-button @click="resetTagFilter">清除标签过滤器</el-button>
            <el-button @click="clearFilter">清除所有过滤器</el-button>
        </div>
        <div style="margin-top: 20px">
            <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
            <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
    </div>
</template>
<script>
    import { getData, getPageList } from "./tableData.js"
    export default {
        data() {
            return {
                tableData: '',
                currentRow: null,
                selectedRows: []
            }
        },
        created() {
            this.tableData = getData()
        },
        methods: {
            tableRowClassName({ row, rowIndex }) {
                // row是行数据，rowIndex是索引
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            },
            handleView(row) {
                // row行数据
                console.log(row);
            },
            deleteRow(index, rows) {
                // index行索引 rows整个表格data
                rows.splice(index, 1)
            },
            handleCurrentChange(selectRow) {
                // selectRow选中行的数据
                this.currentRow = selectRow;
            },
            setCurrent(row) {
                // 需要选中的行数据
                this.$refs.testTable.setCurrentRow(row)
            },
            checkCurrenRow(val) {
                // 所有被选中的行的数据（数组）
                this.selectedRows = val
            },
            // 使用自定义方法对表格复选框进行操作，选择toggleRowSelection(row,true)，取消clearSelection()，反选toggleRowSelection(row)
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        // 如果只给一个参数row，则是给这些row反选（选中的就取消，没选中的就选上），
                        // 如果给了第二个参数Boolean值，true就是选中
                        this.$refs.testTable.toggleRowSelection(row)
                    });
                } else {
                    this.$refs.testTable.clearSelection();
                }
            },
            // 格式化指定列的值
            formatter(row, column) {
                return column.label + ":" + row.address;
            },
            // 给列过滤时的方法  value过滤器中选中的值，row行数据，column列对象
            filterTag(value, row, column) {
                return row.tag === value;
            },
            // 给指定列清除过滤器
            resetTagFilter() {
                this.$refs.testTable.clearFilter('tag');
            },
            // 清除所有过滤器
            clearFilter() {
                this.$refs.testTable.clearFilter();
            },
        }
    }
</script>

<style>
    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }
</style>