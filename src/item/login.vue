<template>
    <div class="login-wrap">
        <el-row>
            <el-col :span='6' v-show="isLogin" class="ms-login">
                <el-card shadow="hover">
                    <el-tabs v-model="activeName" :stretch="true" @tab-click="handleClick" style="margin-top: 60px;">
                        <el-tab-pane label="账号登陆" name="acount">
                            <el-form ref="loginForm" :model="loginForm" :rules="rules">
                                <el-form-item prop="userName">
                                    <el-input v-model="loginForm.userName" placeholder="请输入用户名" prefix-icon="el-icon-user">
                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="password">
                                    <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" prefix-icon="el-icon-lock" show-password></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-link :underline="false" style="float: right;">忘记密码</el-link>
                                </el-form-item>
                                <el-form-item style="text-align: center;">
                                    <el-button @click="doLogin">登陆</el-button>
                                    <el-button @click="doRegister">注册<i class="el-icon-right el-icon--right"></i>
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="手机号登陆" name="phone">
                            <el-form ref="phoneForm" :model="phoneForm" :rules="rules2">
                                <el-form-item prop="phoneNumber">
                                    <el-input v-model="phoneForm.phoneNumber" placeholder="手机号" prefix-icon="el-icon-mobile-phone">
                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="password">
                                    <el-input v-model="phoneForm.password" placeholder="六位数字验证码" prefix-icon="el-icon-star-off">
                                        <el-link :underline="false" style="float: right;color:#409EFF;" class="checkCode" slot="suffix" @click="getVerifyCode">
                                            获取验证码</el-link>
                                    </el-input>
                                </el-form-item>
                                <el-form-item style="text-align: center;">
                                    <el-button @click="doLogin">登陆</el-button>
                                    <el-button @click="doRegister">注册<i class="el-icon-right el-icon--right"></i>
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-col>
            <el-col :span='6' v-show="!isLogin" class="ms-login">
                <el-card shadow="hover">
                    <p style="margin-top: 10px;">账号注册</p>
                    <el-form ref="registerForm" :model="registerForm" :rules="rules1" status-icon style="margin-top: 20px;">
                        <el-form-item prop="userName">
                            <el-input v-model="registerForm.userName" placeholder="请输入用户名" prefix-icon="el-icon-user">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" v-model="registerForm.password" placeholder="请输入密码" prefix-icon="el-icon-lock" show-password></el-input>
                        </el-form-item>
                        <el-form-item prop="checkPassword">
                            <el-input type="password" v-model="registerForm.checkPassword" placeholder="请输入密码" prefix-icon="el-icon-lock" show-password></el-input>
                        </el-form-item>
                        <el-form-item prop="seccode">
                            <el-input v-model="registerForm.seccode" prefix-icon="el-icon-star-off" placeholder="验证码">
                                <span class="checkCode" slot="suffix" @click="createCode">{{ checkCode}}</span>
                            </el-input>
                        </el-form-item>
                        <el-form-item style="text-align: center;">
                            <el-button @click="doLogin" icon="el-icon-back">登陆</el-button>
                            <el-button @click="doRegister">注册</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    // 英文，数字，下划线，中文 (用户名)
    const regUsername = /^[a-zA-Z0-9_\u4E00-\u9FA5]{2,8}$/;
    // 4-16位字符，英文、数字、下划线的组合 （密码）
    const regPassword = /^[a-zA-Z0-9_]{4,16}$/;
    // 校验手机号
    var regPhone = /^[1][3,4,5,7,8][0-9]{9}$/;
    export default {
        data() {
            var validateUsername = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else if (!regUsername.test(value.trim())) {
                    callback(new Error('用户名必须是2-8位字符：英文，数字，下划线，中文'))
                } else {
                    callback();
                }
            }
            var validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (!regPassword.test(value.trim())) {
                    callback(new Error('密码必须是4-16位字符：英文、数字、下划线'))
                } else {
                    if (this.registerForm.checkPassword !== '') {
                        this.$refs.registerForm.validateField('checkPassword');
                    }
                    callback();
                }
            }
            var validatePassword2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerForm.password) {
                    callback(new Error('两次输入密码不一致'));
                } else {
                    callback();
                }
            }
            var validatePhone = (rule, value, callback) => {
                if (value === '') {
                    this.validatePhone = false;
                    callback(new Error('请输入手机号'));
                } else if (!regPhone.test(value.trim())) {
                    this.validatePhone = false;
                    callback(new Error('请输入正确的手机号'));
                } else {
                    this.validatePhone = true;
                    callback();
                }
            }
            return {
                isLogin: true,
                activeName: 'acount',
                validatePhone: false,
                loginForm: {
                    userName: '',
                    password: ''
                },
                phoneForm: {
                    phoneNumber: '',
                    password: ''
                },
                registerForm: {
                    userName: '',
                    password: '',
                    checkPassword: '',
                    seccode: ''
                },
                rules: {
                    userName: [{
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }],
                },
                rules2: {
                    phoneNumber: [{
                        validator: validatePhone,
                        trigger: 'blur'
                    }],
                    password: [{
                            required: true,
                            message: '请输入验证码',
                            trigger: 'blur'
                        },
                        {
                            min: 6,
                            max: 6,
                            message: '验证码必须是6位',
                            trigger: 'blur'
                        }
                    ]
                },
                rules1: {
                    userName: [{
                        validator: validateUsername,
                        trigger: 'blur'
                    }],
                    password: [{
                        validator: validatePassword,
                        trigger: 'blur'
                    }],
                    checkPassword: [{
                        validator: validatePassword2,
                        trigger: 'blur'
                    }],
                    seccode: [{
                        required: true,
                        message: '请输入验证码',
                        trigger: 'blur'
                    }]
                },
                checkCode: ''
            }
        },
        methods: {
            doLogin() {
                if (this.isLogin) {
                    // 账号登陆
                    // 校验登陆表单
                    if (this.activeName === 'acount') {
                        this.$refs.loginForm.validate((valid) => {
                            if (valid) {
                                let url = 'user/login';
                                let param = JSON.parse(JSON.stringify(this.loginForm));
                                this.$api.post(url, param, null, r => {
                                    if (r.success) {
                                        //do 跳转
                                        this.$router.push({
                                            path: '/item/home',
                                            query: {
                                                id: r.data.id,
                                                userName: r.data.userName
                                            }
                                        });
                                    } else {
                                        this.$message({
                                            message: '用户名或密码错误!',
                                            type: 'error'
                                        });
                                        return false;
                                    }
                                })
                            } else {
                                return false;
                            }
                        })
                        // 手机号登陆
                    } else if (this.activeName === 'phone') {
                        this.$refs.phoneForm.validate((valid) => {
                            if (valid) {
                                this.$message({
                                    message: "Phone Login Success!",
                                    type: "success"
                                });
                            } else {
                                return false;
                            }
                        })
                    }

                } else {
                    this.isLogin = true
                }
            },
            // 注册
            doRegister() {
                if (this.isLogin) {
                    this.isLogin = false
                } else {
                    // 校验注册表单 
                    this.$refs.registerForm.validate((valid) => {
                        if (valid) {
                            // 校验验证码
                            if (this.registerForm.seccode != this.checkCode) {
                                this.$message({
                                    message: "验证码错误，注意大写字母",
                                    type: "warning"
                                });
                                this.createCode();
                                return false;
                            } else {
                                let url = 'user/register';
                                let param = JSON.parse(JSON.stringify(this.registerForm));
                                delete param.checkPassword;
                                delete param.seccode;
                                this.$api.post(url, param, null, r => {
                                    if (r.success) {
                                        this.$message({
                                            message: '注册成功!',
                                            type: 'success'
                                        });
                                        this.$refs['registerForm'].resetFields();
                                    } else {
                                        this.$message({
                                            message: '用户名已存在!',
                                            type: 'error'
                                        });
                                        return false;
                                    }
                                })
                            }
                        } else {
                            return false
                        }
                    })
                }
            },
            createCode() {
                var code = "";
                const codeLength = 4; //验证码的长度  
                const random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
                    'K',
                    'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数  
                for (let i = 0; i < codeLength; i++) { //循环操作  
                    let index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）  
                    let randomChar = random[index];
                    code += randomChar; //根据索引取得随机数加到code上  
                }
                this.checkCode = code; //把code值赋给验证码  
            },
            handleClick(tab, event) {
                var a = this.activeName
                console.log(a);
            },
            getVerifyCode() {
                this.$refs.phoneForm.validateField('phoneNumber')
                if (this.validatePhone) {
                    this.$message({
                        message: "验证码是：123456",
                        type: "success"
                    });
                }
            }
        },
        mounted() {
            this.createCode();
        }
    }
</script>
<style>
    .el-card {
        height: 406px;
        background-color: transparent;
        border: none;
    }

    #app,
    .wrapper,
    body,
    html {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    * {
        padding: 0;
        margin: 0;
    }

    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(./img/login-bg.jpeg);
        background-size: 100%;
    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 350px;
        margin: 190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }

    .login-wrap .el-button {
        width: 100px;
    }

    .checkCode {
        margin-right: 10px;
        color: #14a230;
    }
</style>