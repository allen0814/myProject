<template>
    <div style="padding: 20px;">
        <!-- 查询form -->
        <el-form ref="searchForm" :model="searchForm" label-width="80px">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="searchForm.name" prefix-icon="el-icon-user"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="生日" prop="birthday">
                        <el-date-picker v-model="searchForm.birthday" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" style="width: 100%">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="性别" prop="sex">
                        <el-select v-model="searchForm.sex">
                            <el-option label="男" value="man"></el-option>
                            <el-option label="女" value="woman"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="所在城市" prop="place">
                        <myDistrict :province.sync="searchForm.place.province" :city.sync="searchForm.place.city" :layoutLevels="level" class="searchFormPlace">
                        </myDistrict>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="手机号码" prop="phone">
                        <el-input v-model="searchForm.phone" prefix-icon="el-icon-mobile-phone"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="电子邮箱" prop="email">
                        <el-input v-model="searchForm.email" prefix-icon="el-icon-message"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="当前身份" prop="identity">
                        <el-select v-model="searchForm.identity">
                            <el-option label="学生" value="student"></el-option>
                            <el-option label="非学生" value="worker"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="婚姻状况" prop="marital">
                        <el-select v-model="searchForm.marital">
                            <el-option label="已婚" value="married"></el-option>
                            <el-option label="未婚" value="unmarried"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :col="24">
                    <el-button size="small" type="primary" round plain icon="el-icon-search" @click="handleSearchForm">
                        查询</el-button>
                    <el-button size="small" round plain icon="el-icon-refresh-left" @click="handleResetForm">重置
                    </el-button>
                </el-col>
            </el-row>
        </el-form>
        <!-- 表格 -->
        <el-row style="text-align: left;">
            <el-button type="primary" size="small" icon="el-icon-delete" @click="deleteRows">删除
            </el-button>
            <el-button type="primary" size="small" icon="el-icon-plus" @click="addRow">新增
            </el-button>
            <import-excel @getResult="getMyExcelData" />
            <el-button size="small" type="primary" @click="exportTableData()" icon="el-icon-download">下载Excel
            </el-button>
        </el-row>
        <ex-table :data="data" show-pagination :search-method="handleSearch" ref="table" height="348" cell-class-name="cellClass" header-cell-class-name="headerCellClass" v-loading="loading" element-loading-text="loading..." @selection-change="selectRow">
            <!-- 表格加上复选框 -->
            <el-table-column type="selection"></el-table-column>
            <!-- 索引列 type="index" -->
            <el-table-column type="index" :index="rowIndex" width="50"></el-table-column>
            <el-table-column label="姓名" prop="name" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span v-if="scope.row.isAdd">
                        <el-input size="mini" v-model="scope.row.name">
                        </el-input>
                    </span>
                    <span v-else>
                        {{scope.row.name}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="生日" prop="birthday" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span v-if="scope.row.isAdd">
                        <el-date-picker size="mini" v-model="scope.row.birthday" type="date" value-format="yyyy-MM-dd" style="width: 100%">
                        </el-date-picker>
                    </span>
                    <span v-else>
                        {{scope.row.birthday}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="性别" prop="sex" width="70">
                <template slot-scope="scope">
                    <span v-if="scope.row.isAdd">
                        <el-select v-model="scope.row.sex" size="mini" placeholder="">
                            <el-option label="男" value="man"></el-option>
                            <el-option label="女" value="woman"></el-option>
                        </el-select>
                    </span>
                    <span v-else>
                        <el-tag :type="scope.row.sex === 'man' ? 'primary' : 'success'" size="mini" disable-transitions>
                            {{scope.row.sex === 'man'? '男':'女'}}
                        </el-tag>
                    </span>
                </template>
            </el-table-column>

            <el-table-column label="地址" prop="placeProvince" width="210">
                <template slot-scope="scope">
                    <span v-if="scope.row.isAdd">
                        <myDistrict :province.sync="scope.row.place.province" :city.sync="scope.row.place.city" :layoutLevels="level" size="mini">
                        </myDistrict>
                    </span>
                    <span v-else>
                        <el-tag type="primary" size="mini" disable-transitions>{{scope.row.placeProvince }}</el-tag>
                        <el-tag type="warning" size="mini" disable-transitions>{{scope.row.placeCity }}</el-tag>
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="手机号" prop="phone" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span v-if="scope.row.isAdd">
                        <el-input size="mini" v-model="scope.row.phone">
                        </el-input>
                    </span>
                    <span v-else>
                        {{scope.row.phone}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="邮箱" prop="email" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span v-if="scope.row.isAdd">
                        <el-input size="mini" v-model="scope.row.email">
                        </el-input>
                    </span>
                    <span v-else>
                        {{scope.row.email}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="是否学生" prop="identity" width="80">
                <template slot-scope="scope">
                    <span v-if="scope.row.isAdd">
                        <el-select v-model="scope.row.identity" size="mini" placeholder="">
                            <el-option label="学生" value="student"></el-option>
                            <el-option label="非学生" value="worker"></el-option>
                        </el-select>
                    </span>
                    <span v-else>
                        <el-tag :type="scope.row.identity === 'student' ? 'primary' : 'success'" size="mini" disable-transitions>
                            {{scope.row.identity === 'student'? '学生':'非学生'}}
                        </el-tag>
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="婚姻状况" prop="marital" width="80">
                <template slot-scope="scope">
                    <span v-if="scope.row.isAdd">
                        <el-select v-model="scope.row.marital" size="mini" placeholder="">
                            <el-option label="已婚" value="married"></el-option>
                            <el-option label="未婚" value="unmarried"></el-option>
                        </el-select>
                    </span>
                    <span v-else>
                        <el-tag :type="scope.row.marital === 'married' ? 'primary' : 'success'" size="mini" disable-transitions>
                            {{scope.row.marital === 'married'? '已婚':'未婚'}}
                        </el-tag>
                    </span>
                </template>
            </el-table-column>
            <!-- 操作列 -->
            <!-- 自定义模版：slot-scope其值scope可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据 -->
            <el-table-column fixed="right" label="操作" width="130">
                <template slot-scope="scope">
                    <span v-if="scope.row.isAdd">
                        <!-- scope.row当前行data，scope.$index当前行索引，tableData整个表格数据 -->
                        <el-button type="text" size="small" @click="handleSave(scope.row)">保存</el-button>
                        <!-- 使用组件, 并传值到子组件中 -->
                        <el-button type="text" size="small" style="margin-left: 0;color:#909399" @click="handleCancel(scope.$index)">
                            取消</el-button>
                    </span>
                    <span v-else>
                        <!-- scope.row当前行data，scope.$index当前行索引，tableData整个表格数据 -->
                        <el-button type="text" size="small" @click="handleView(scope.row)">修改</el-button>
                        <!-- 使用组件, 并传值到子组件中 -->
                        <delete-confirm-popover content="确定要删除?" styleColor="color:#f56c6c" @confirmDelete="deleteRow(scope.$index, scope.row,data)">
                        </delete-confirm-popover>
                    </span>
                </template>
            </el-table-column>
        </ex-table>
        <!-- 弹出框 -->
        <el-dialog title="编辑" :visible.sync="formVisible" width="30%" center top="10vh">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="姓名" prop="name" required>
                    <el-input v-model="form.name" prefix-icon="el-icon-user" placeholder="填写姓名"></el-input>
                </el-form-item>
                <el-form-item label="生日" prop="birthday">
                    <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" style="width: 100%">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio v-model="form.sex" label="man" border>男</el-radio>
                    <el-radio v-model="form.sex" label="woman" border style="margin-left: 0">女</el-radio>
                </el-form-item>
                <el-form-item label="所在城市" prop="place" required>
                    <myDistrict :province.sync="form.place.province" :city.sync="form.place.city" :layoutLevels="level">
                    </myDistrict>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone" required>
                    <el-input v-model="form.phone" prefix-icon="el-icon-mobile-phone"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱" prop="email" required>
                    <el-input v-model="form.email" prefix-icon="el-icon-message"></el-input>
                </el-form-item>
                <el-form-item label="当前身份" prop="identity">
                    <el-radio v-model="form.identity" label="student" border>学生</el-radio>
                    <el-radio v-model="form.identity" label="worker" border style="margin-left: 0">非学生
                    </el-radio>
                </el-form-item>
                <el-form-item label="婚姻状况" prop="marital">
                    <el-radio v-model="form.marital" label="married" border>已婚</el-radio>
                    <el-radio v-model="form.marital" label="unmarried" border style="margin-left: 0">未婚
                    </el-radio>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="formVisible=false" size="medium">取消</el-button>
                <el-button type="primary" @click="handleFormClose" size="medium">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    // 引入组件
    import ExTable from '../components/extable.js'; //分页table
    import DeleteConfirmPopover from "../components/DeleteConfirmProp.vue"; // 轻量确认弹框
    import importExcel from "@/components/importExcel"; //导入

    // 英文，数字，下划线，中文 (用户名)
    const regName = /^[a-zA-Z0-9_\u4E00-\u9FA5]{2,8}$/;
    // 校验手机号
    const regPhone = /^[1][3,4,5,7,8][0-9]{9}$/;
    // 校验邮箱
    const regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    export default {
        components: {
            ExTable,
            DeleteConfirmPopover,
            importExcel
        },
        data() {
            var validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入姓名'));
                } else if (!regName.test(value.trim())) {
                    callback(new Error('用户名必须是2-8位字符：英文，数字，下划线，中文'))
                } else {
                    callback();
                }
            }
            var validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } else if (!regPhone.test(value.trim())) {
                    callback(new Error('请输入正确的手机号'));
                } else {
                    callback();
                }
            }
            var checkDistrict = (rule, {
                province,
                city
            }, callback) => {
                if (!province) {
                    callback(new Error('请选择省'))
                } else if (!city) {
                    callback(new Error('请选择市'))
                } else {
                    callback()
                }
            }
            var validateEmail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写邮箱'))
                } else if (!regEmail.test(value.trim())) {
                    callback(new Error('请输入正确的邮箱'))
                } else {
                    callback();
                }
            }
            return {
                selectedRows: [],
                loading: true,
                exportBtnLoading: false,
                visible: false,
                level: [1, 2],
                data: [],
                currentRow: null,
                rowIndex: 1,
                formVisible: false,
                form: {
                    name: '',
                    birthday: '',
                    sex: '',
                    place: {
                        province: '',
                        city: ''
                    },
                    phone: '',
                    email: '',
                    identity: '',
                    marital: ''
                },
                searchForm: {
                    name: '',
                    birthday: '',
                    sex: '',
                    place: {
                        province: '',
                        city: ''
                    },
                    phone: '',
                    email: '',
                    identity: '',
                    marital: ''
                },
                rules: {
                    name: [{
                        validator: validateName,
                        trigger: 'blur'
                    }],
                    birthday: [{
                        required: true,
                        message: '请填写生日',
                        trigger: 'blur'
                    }],
                    sex: [{
                        required: true,
                        message: '请填写性别',
                        trigger: 'change'
                    }],
                    place: [{
                        validator: checkDistrict,
                        trigger: 'change'
                    }, ],
                    phone: [{
                        validator: validatePhone,
                        trigger: 'blur'
                    }],
                    email: [{
                        validator: validateEmail,
                        trigger: 'blur'
                    }],
                    identity: [{
                        required: true,
                        message: '请填写身份',
                        trigger: 'change'
                    }],
                    marital: [{
                        required: true,
                        message: '请填写婚姻状况',
                        trigger: 'change'
                    }]
                }
            }
        },
        methods: {
            exportTableData() {
                this.exportBtnLoading = true
                let param = JSON.parse(JSON.stringify(this.searchForm));
                this.$set(param, "placeProvince", this.searchForm.place.province);
                this.$set(param, "placeCity", this.searchForm.place.city);
                delete param.place;
                let url = 'baseinfo/export';
                this.$api.post(url, param, null, r => {
                    if (r.success) {
                        if (r.data && r.data.length > 0) {
                            require.ensure([], () => {
                                const {
                                    export_json_to_excel
                                } = require('@/vendor/Export2Excel')
                                const tHeader = ['姓名', '生日', '性别', '省', '市', '手机号', '邮箱', '是否学生',
                                    '是否已婚'
                                ];
                                const filterVal = ['name', 'birthday', 'sex', 'placeProvince',
                                    'placeCity', 'phone', 'email', 'identity', 'marital'
                                ];
                                const list = r.data;
                                const exportData = this.formatExportJson(filterVal, list)
                                export_json_to_excel(tHeader, exportData, '基本信息统计')
                                this.exportBtnLoading = false
                            })
                        } else {
                            this.$message({
                                message: '导出数据不能为空!',
                                type: 'warning'
                            });
                        }
                    } else {
                        this.$message({
                            message: '获取数据失败!',
                            type: 'error'
                        });
                    }
                })
            },
            formatExportJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            getMyExcelData(list) {
                const tableColumn = ['name', 'birthday', 'sex', 'placeProvince', 'placeCity', 'phone', 'email',
                    'identity', 'marital'
                ];
                const data = this.formatImportJson(tableColumn, list)
                // data 为读取的excel数据，在这里进行处理该数据
                let url = 'baseinfo/import';
                this.$api.post(url, data, null, r => {
                    if (r.success) {
                        this.$message({
                            message: '导入成功!',
                            type: 'success'
                        });
                        this.$refs.table.fetchData();
                    } else {
                        this.$message({
                            message: '导入失败!',
                            type: 'error'
                        });
                        return false;
                    }
                })
            },
            formatImportJson(tableColumn, list) {
                let newArr = [];
                list.forEach((item) => {
                    let newObj = {};
                    for (var i = 0; i < tableColumn.length; i++) {
                        newObj[tableColumn[i]] = item[Object.keys(item)[i]]
                    }
                    newArr.push(newObj);
                })
                return newArr;
            },
            handleSave(row) {
                let rowData = JSON.parse(JSON.stringify(row));
                this.$set(rowData, "placeProvince", row.place.province);
                this.$set(rowData, "placeCity", row.place.city);
                delete rowData.place;
                delete rowData.isAdd;
                let url = 'baseinfo/save';
                this.$api.post(url, rowData, null, r => {
                    if (r.success) {
                        this.$message({
                            message: '保存成功!',
                            type: 'success'
                        });
                        row.id = r.data;
                        this.$set(row, "placeProvince", row.place.province);
                        this.$set(row, "placeCity", row.place.city);
                        delete row.place;
                        row.isAdd = false;
                    } else {
                        this.$message({
                            message: '保存失败!',
                            type: 'error'
                        });
                        return false;
                    }
                })
            },
            handleCancel(index) {
                this.data.splice(index, 1)
            },
            addRow() {
                this.data.push({
                    name: '',
                    birthday: '',
                    sex: '',
                    place: {
                        province: '',
                        city: ''
                    },
                    phone: '',
                    email: '',
                    identity: '',
                    marital: '',
                    isAdd: true
                });
                var addRowData = this.data.splice(this.data.length - 1, 1);
                this.data.unshift(addRowData[0]);
            },
            deleteRows() {
                if (this.selectedRows.length < 1) {
                    this.$message({
                        message: "至少选择一条数据!",
                        type: "warning"
                    });
                } else {
                    this.$confirm('确认删除选择的所有数据吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let param = [];
                        this.selectedRows.forEach(function(item, index, arr) {
                            param.push(item.id);
                        })
                        let url = 'baseinfo/delete';
                        this.$api.post(url, param, null, r => {
                            if (r.success) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                this.$refs.table.fetchData();
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '删除失败!'
                                });
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
            },
            selectRow(val) {
                this.selectedRows = val;
            },
            handleSearchForm() {
                this.$refs.table.fetchData();
            },
            handleResetForm() {
                this.$refs['searchForm'].resetFields();
                this.searchForm.place = {
                    province: '',
                    city: ''
                }
            },
            // 编辑行数据
            handleView(row) {
                // row行数据
                console.log(row);
                //   给对象添加属性
                let rowData = JSON.parse(JSON.stringify(row));
                this.$set(rowData, "place", {
                    province: row.placeProvince,
                    city: row.placeCity
                });
                delete rowData.placeProvince;
                delete rowData.placeCity;

                this.formVisible = true;
                this.form = Object.assign({}, rowData);
            },
            deleteRow(index, row, rows) {
                let param = [];
                param.push(row.id);
                let url = 'baseinfo/delete';
                this.$api.post(url, param, null, r => {
                    if (r.success) {
                        this.$message({
                            message: "删除成功!",
                            type: "success"
                        });
                        // this.$refs.table.fetchData();
                        this.data.splice(index, 1);
                    } else {

                    }
                })
                // index行索引 rows整个表格data  row点击行数据
                // rows.splice(index, 1); DOM删除，实际数据未删
            },
            handleFormClose() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        //   给对象添加属性
                        let param = JSON.parse(JSON.stringify(this.form));
                        this.$set(param, "placeProvince", this.form.place.province);
                        this.$set(param, "placeCity", this.form.place.city);
                        // 删除对象属性
                        // Vue.delete(param, 'place');
                        delete param.place;
                        let url = 'baseinfo/update';
                        this.$api.post(url, param, null, r => {
                            if (r.success) {
                                this.$message({
                                    message: '更新成功!',
                                    type: 'success'
                                });
                                this.formVisible = false;
                                this.$refs['form'].resetFields();
                                this.form.place = {
                                    province: '',
                                    city: ''
                                }
                                this.$refs.table.fetchData();
                            } else {
                                this.$message({
                                    message: '更新失败!',
                                    type: 'error'
                                });
                                return false;
                            }
                        })
                    } else {
                        return false;
                    }
                })
            },
            handleSearch(pagination, { currentPage, pageSize }) {
                this.fetchRemoteData(currentPage, pageSize)
            },
            fetchRemoteData(currentPage, pageSize) {
                this.loading = true;
                let param = JSON.parse(JSON.stringify(this.searchForm));
                this.$set(param, "placeProvince", this.searchForm.place.province);
                this.$set(param, "placeCity", this.searchForm.place.city);
                // 删除对象属性
                // Vue.delete(param, 'place');
                delete param.place;
                let url = 'baseinfo/query?currentPage=' + currentPage + '&pageSize=' + pageSize;
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
        created() {

        },
        mounted() {
            this.$refs.table.fetchData();
        }
    }
</script>

<style>
    @import "./scss/baseData.scss"
</style>