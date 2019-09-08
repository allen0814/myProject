<template>
    <div>
        <el-row>
            <el-col :span="8" :offset="8">
                <el-form ref="baseForm" :model="baseForm" :rules="baseRules" label-width="80px" label-position="left">
                    <div :span="8" style="text-align: left">
                        <h3>基本信息</h3>
                    </div>
                    <el-form-item label="姓名" prop="name" required>
                        <el-input v-model="baseForm.name" prefix-icon="el-icon-user" placeholder="填写姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="生日" prop="birthday">
                        <el-date-picker v-model="baseForm.birthday" type="date" placeholder="选择日期"
                            value-format="yyyy-MM-dd" style="width: 100%">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-radio v-model="baseForm.sex" label="man" border>男</el-radio>
                        <el-radio v-model="baseForm.sex" label="woman" border style="margin-left: 0">女</el-radio>
                    </el-form-item>
                    <el-form-item label="所在城市" prop="place" required>
                        <myDistrict :province.sync="baseForm.place.province" :city.sync="baseForm.place.city"
                            :layoutLevels="level">
                        </myDistrict>
                        </myDistrict>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="phone" required>
                        <el-input v-model="baseForm.phone" prefix-icon="el-icon-mobile-phone"></el-input>
                    </el-form-item>
                    <el-form-item label="电子邮箱" prop="email" required>
                        <el-input v-model="baseForm.email" prefix-icon="el-icon-message"></el-input>
                    </el-form-item>
                    <el-form-item label="当前身份" prop="identity">
                        <el-radio v-model="baseForm.identity" label="student" border>学生</el-radio>
                        <el-radio v-model="baseForm.identity" label="worker" border style="margin-left: 0">非学生
                        </el-radio>
                    </el-form-item>
                    <el-form-item label="婚姻状况" prop="marital">
                        <el-radio v-model="baseForm.marital" label="married" border>已婚</el-radio>
                        <el-radio v-model="baseForm.marital" label="unmarried" border style="margin-left: 0">未婚
                        </el-radio>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="saveBaseinfo('baseForm')">保存</el-button>
                        <el-button @click="resetForm('baseForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    // 英文，数字，下划线，中文 (用户名)
    const regName = /^[a-zA-Z0-9_\u4E00-\u9FA5]{2,8}$/;
    // 校验手机号
    const regPhone = /^[1][3,4,5,7,8][0-9]{9}$/;
    // 校验邮箱
    const regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    export default {
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
                level: [1, 2],
                selectWidth: '',
                baseForm: {
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
                baseRules: {
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
                        message: '请选择性别',
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
            saveBaseinfo(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //do Save
                        //   给对象添加属性
                        let param = JSON.parse(JSON.stringify(this.baseForm));
                        this.$set(param, "placeProvince", this.baseForm.place.province);
                        this.$set(param, "placeCity", this.baseForm.place.city);
                        // 删除对象属性
                        // Vue.delete(param, 'place');
                        delete param.place;
                        let url = 'baseinfo/save';
                        this.$api.post(url, param, null, r => {
                            if (r.success) {
                                // TODO:
                                //do 跳转
                                // this.$router.push({
                                //     path: '/item/home',
                                //     query: {
                                //         id: r.data.id,
                                //         userName: r.data.userName
                                //     }
                                // });
                            } else {
                                // this.$message({
                                //     message: '用户名或密码错误!',
                                //     type: 'error'
                                // });
                                return false;
                            }
                        })
                        //this.$refs[formName].resetFields();
                    } else {
                        return false;
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }

</script>
<style>
    .el-radio.is-bordered {
        border: 1px solid #969aa294;
        width: 49%;
        margin-right: 0;
    }

    .distinct-component-ct .el-select {
        width: 49%;
    }

    .el-radio .el-radio__input {
        float: right;
    }

</style>
