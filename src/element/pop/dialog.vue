<template>
    <div class='compnentContainer'>
        <!-- 弹出框基础用法 -->
        <el-button type="success" @click="dialogVisible=true">打开基础弹出框</el-button>
        <el-dialog title="自定义title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <span>这是一段信息（body）</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible=false">取消</el-button>
                <el-button type="primary" @click="handleDone">确定</el-button>
            </span>
        </el-dialog>
        <!-- 弹出框嵌套表格 -->
        <el-button type="primary" @click="tableVisible=true">打开嵌套表格弹出框</el-button>
        <el-dialog title="这是一个表格" :visible.sync="tableVisible" width="40%">
            <el-table :data="tableData" max-height="300px">
                <el-table-column prop="date" label="日期"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
            </el-table>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="tableVisible=false">取消</el-button>
                <el-button type="primary" @click="tableVisible=false">确定</el-button>
            </span> -->
        </el-dialog>
        <!-- 弹出框嵌套表单 -->
        <el-button type="primary" @click="formVisible=true">打开嵌套form的弹出框</el-button>
        <el-dialog title="这是一个form" :visible.sync="formVisible" width="40%">
            <el-form ref="form" :model="form" :rules="rules" label-width="60px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio v-model="form.sex" label="man" border>男</el-radio>
                    <el-radio v-model="form.sex" label="woman" border>女</el-radio>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="formVisible=false">取消</el-button>
                <el-button type="primary" @click="handleFormClose">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    // 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    // 例如：import 《组件名称》 from '《组件路径》';
    import { getData } from "../table/tableData.js"
    export default {
        // import引入的组件需要注入到对象中才能使用
        components: {},
        data() {
            // 这里存放数据
            return {
                dialogVisible: false,
                tableVisible: false,
                formVisible: false,
                tableData: [],
                form: {
                    name: '',
                    sex: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请填写姓名', trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ]
                }
            };
        },
        // 监听属性 类似于data概念
        computed: {},
        // 监控data中的数据变化
        watch: {},
        // 方法集合
        methods: {
            handleDone() {
                this.dialogVisible = false
            },
            handleClose(done) {
                this.$confirm('确定关闭')
                    .then(
                        () => {
                            done();
                        }
                    ).catch(
                        () => {

                        }
                    )
            },
            handleFormClose() {
                this.$confirm('确定保存')
                    .then(
                        () => {
                            debugger
                            this.$refs['form'].validate((valid) => {
                                debugger
                                if (valid) {
                                    // do save
                                    this.formVisible = false
                                    this.$message({
                                        message: '信息保存成功',
                                        type: 'success'
                                    });

                                } else {
                                    return false;
                                }
                            });
                        }
                    ).catch(
                        () => {

                        }
                    )
            }
        },
        // 生命周期 - 创建完成（可以访问当前this实例）
        created() {
            this.tableData = getData();
        },
        // 生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {

        },
        beforeCreate() { }, // 生命周期 - 创建之前
        beforeMount() { },  // 生命周期 - 挂载之前
        beforeUpdate() { }, // 生命周期 - 更新之前
        updated() { }, // 生命周期 - 更新之后
        beforeDestroy() { }, // 生命周期 - 销毁之前
        destroyed() { }, // 生命周期 - 销毁完成
        activated() { }, // 如果页面有keep-alive缓存功能，这个函数会触发
    };
</script>
<style lang='scss' scoped>
    /*  @import url(); 引入公共css类 */
</style>