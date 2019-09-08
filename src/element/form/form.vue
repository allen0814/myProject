<template>
    <div>
        <p>form表单</p>
        一、典型表单+表单验证：(ref指的是form的id，:model指的是form对象，:rules指的是教养对象)
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" status-icon autocomplete="off">
            <el-form-item label="活动名称" prop="name">
                <el-input v-model="form.name" placeholder="请填写活动名称"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" prop="region">
                <el-select v-model="form.region" placeholder="请选择活动区域" style="width: 320px">
                    <el-option v-for="region in regions" :label="region.key" :key="region.value" :value="region.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动时间" required>
                <el-col :span="11">
                    <el-form-item prop="date1">
                        <el-date-picker type="date" v-model="form.date1" placeholder="请选择日期" style="width: 100%"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-form-item prop="date2">
                        <el-time-picker v-model="form.date2" placeholder="请选择时间" style="width: 100%"
                            value-format="hh:mm:ss"></el-time-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="即使配送">
                <el-switch v-model="form.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="活动性质" prop="type">
                <el-checkbox-group v-model="form.type">
                    <el-checkbox v-for="type in types" :label="type" name="type" :key="type">{{type}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="特殊资源" prop="resource">
                <el-radio-group v-model="form.resource">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式" prop="desc">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <!-- 自定义校验 -->
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="form.pass"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="form.checkPass"></el-input>
            </el-form-item>
            <!-- 动态增减表单项 -->
            <el-form-item v-for="(domain,index) in form.domains" :label="'域名'+index" :key="domain.key"
                :prop="'domains.'+index+'.value'" :rules="{required:true,message:'域名不能为空',trigger:'blur'}">
                <el-input v-model="domain.value" style="width: 240px"></el-input>
                <el-button @click.prevent="removeDomain(domain)">删除</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
                <el-button @click="resetForm('form')">取消</el-button>
                <el-button @click="addDomain">新增域名</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.form.checkPass !== '') {
                        this.$refs.form.validateField('checkPass');
                    }
                    callback();
                }
            }
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.pass) {
                    callback(new Error('两次输入密码不一致'));
                } else {
                    callback();
                }
            }
            return {
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        // { type: 'number', message: '必须填数字', trigger: 'blur' },
                        { min: 3, max: 6, message: '长度在3-6个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    date1: [
                        { required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    date2: [
                        { required: true, message: '请选择时间', trigger: 'change' }
                    ],
                    type: [
                        { required: true, type: 'array', message: '请至少选择一个活动日期', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请选择活动资源', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                },
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                    pass: '',
                    checkPass: '',
                    domains: [{ value: '' }]
                },
                regions: [{
                    key: '区域一',
                    value: '上海'
                }, {
                    key: '区域二',
                    value: '北京'
                }],
                types: ['美食/餐厅线上活动', '地推活动', '线下主题活动', '单纯品牌曝光']
            }
        },
        methods: {
            onSubmit(formName) {
                debugger
                this.$refs[formName].validate((valid) => {
                    debugger
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            removeDomain(item) {
                debugger
                var index = this.form.domains.indexOf(item);
                if (index !== -1) {
                    this.form.domains.splice(index, 1);
                }
            },
            addDomain() {
                debugger
                this.form.domains.push({ value: '', key: new Date().getTime() });
            }
        }
    }
</script>
<style>
    .el-form {
        width: 400px;
    }

    .line {
        text-align: center;
    }

    .el-checkbox {
        width: 160px;
        margin: 0;
        padding: 0;
    }
</style>