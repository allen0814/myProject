<template>
    <div>
        <el-tabs tab-position="left" style="width: 720px;margin: 50px auto;">
            <el-tab-pane label="个人信息">
                <!-- 头像 -->
                <div class="touxiang" @mouseenter="enter" @mouseleave="leave" @click="openCropper">
                    <el-avatar :size="100">
                        <img :src="require('./' + circleUrl)" alt="" id="portrait" style="width: 100px;height: 100px" />
                    </el-avatar>
                    <i class="iconfont el-icon-my--camera myCamera" v-show="cameraShow"></i>
                    <input type="file" id="saveImage" name="myphoto" style="display: none">
                </div>
                <el-dialog :visible.sync="showCropper" title="封面裁图" width="70%" top="10vh">
                    <cropper id="avatarCrop" ref="cropper" @cropper-success="cropperSuccessHandle"></cropper>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="cancelCropper">取 消</el-button>
                        <el-button type="primary" @click="toCropper">确 定</el-button>
                    </span>
                </el-dialog>
                <!-- personForm -->
                <el-form ref="personForm" :model="personForm" :rules="personRules" class="personForm">
                    <el-form-item prop="userName">
                        <el-input v-model="personForm.userName" class="userName"></el-input>
                    </el-form-item>
                    <el-form-item prop="sex" class="sex">
                        <el-radio v-model="personForm.sex" label="man">男</el-radio>
                        <el-radio v-model="personForm.sex" label="woman">女</el-radio>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="personForm.description" class="userName" placeholder="个性签名"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="width: 400px" @click="savePerson">保存</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="账号绑定">账号绑定</el-tab-pane>
            <el-tab-pane label="隐私设置">隐私设置</el-tab-pane>
            <el-tab-pane label="密码修改">
                <el-form ref="passwordForm" :model="passwordForm" :rules="passwordRules" class="personForm">
                    <el-form-item class="account">
                        登陆账号：{{this.userName}}
                    </el-form-item>
                    <el-form-item prop="oldPassword">
                        <el-input v-model="passwordForm.oldPassword" show-password class="userName"
                            placeholder="请输入当前密码"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="passwordForm.password" show-password class="userName" placeholder="请输入新密码">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="checkPassword">
                        <el-input v-model="passwordForm.checkPassword" show-password class="userName"
                            placeholder="请确认新密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="width: 400px" @click="updatePassword">保存</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import cropper from '@/components/Cropper/index'
    const regPassword = /^[a-zA-Z0-9_]{4,16}$/;
    export default {
        components: {
            cropper
        },
        props: ['userId', 'userName'],
        data() {
            var validateOldPwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入旧密码'));
                } else {
                    let url = 'user/findUser';
                    let param = {};
                    param.id = this.userId;
                    param.password = value;
                    this.$api.post(url, param, null, r => {
                        debugger;
                        if (r.success) {
                            if (r.data === null) {
                                callback(new Error('旧密码错误，请重新输入'))
                            }
                            callback();
                        }
                    })
                }
            }
            var validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (!regPassword.test(value.trim())) {
                    callback(new Error('密码必须是4-16位字符：英文、数字、下划线'))
                } else {
                    if (this.passwordForm.checkPassword !== '') {
                        // 校验字段
                        this.$refs.passwordForm.validateField('checkPassword');
                    }
                    callback();
                }
            }
            var validatePassword2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.passwordForm.password) {
                    callback(new Error('两次输入密码不一致'));
                } else {
                    callback();
                }
            }
            return {
                circleUrl: "upload/none/none.png",
                cameraShow: false,
                showCropper: false,
                cropperImg: '',
                croppable: false,
                cropper: '',
                personForm: {
                    userName: '',
                    sex: '',
                    description: ''
                },
                personRules: {
                    userName: [{
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    }],
                    sex: [{
                        required: true,
                        message: '请选择性别',
                        trigger: 'change'
                    }]
                },
                passwordForm: {
                    oldPassword: '',
                    password: '',
                    checkPassword: ''
                },
                passwordRules: {
                    oldPassword: [{
                        validator: validateOldPwd,
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
                }
            };
        },
        methods: {
            enter: function () {
                this.cameraShow = true;
            },
            leave: function () {
                this.cameraShow = false;
            },
            openCropper() {
                this.showCropper = true
            },
            //隐藏裁剪框
            cancelCropper() {
                debugger
                this.showCropper = false
                this.$refs.cropper.cropDone();
            },
            //父组件调用子组件裁剪方法
            toCropper() {
                this.$refs.cropper.submit(this.userId);
            },
            //子组件裁剪方法成功执行后与父组件通信
            cropperSuccessHandle(data) {
                debugger
                //返回data
                this.showCropper = false
                this.circleUrl = "upload/" + data + "/avatar.jpg";
                this.$emit('showAvatar', data);

            },
            savePerson() {
                this.$refs.personForm.validate((valid) => {
                    if (valid) {
                        let param = this.personForm;
                        param.id = this.userId;
                        let url = 'user/updateUserinfo';
                        this.$api.post(url, param, null, r => {
                            if (r.success) {
                                this.$message({
                                    message: '更新成功!',
                                    type: 'success'
                                });
                            } else {
                                this.$message({
                                    message: '更新失败!',
                                    type: 'error'
                                });
                            }
                        })
                    } else {
                        return false;
                    }
                })
            },
            updatePassword() {
                this.$refs.passwordForm.validate((valid) => {
                    if (valid) {
                        let param = {};
                        param.id = this.userId;
                        param.password = this.passwordForm.password;
                        let url = 'user/updatePassword';
                        this.$api.post(url, param, null, r => {
                            if (r.success) {
                                this.$message({
                                    message: '更新成功!',
                                    type: 'success'
                                });
                                this.$refs['passwordForm'].resetFields();
                            } else {
                                this.$message({
                                    message: '更新失败!',
                                    type: 'error'
                                });
                            }
                        })
                    } else {
                        return false;
                    }
                })
            }
        },
        created() {
            // 加载头像
            let path = "upload/" + this.userId + "/avatar.jpg";
            try {
                let a = require('./' + path);
            } catch (e) {
                path = "upload/none/none.png";
            }
            this.circleUrl = path;
            let url = 'user/findUser';
            let param = {};
            param.id = this.userId;
            this.$api.post(url, param, null, r => {
                if (r.success) {
                    // this.personForm.userName = this.userName
                    this.personForm = Object.assign({}, r.data);
                }
            })
        },
    };

</script>
<style lang='scss'>
    /*  @import url(); 引入公共css类 */
    .myCamera {
        font-family: 'iconfont' !important;
        font-size: 60px;
        vertical-align: top;
        line-height: 100px;
        height: 100px;
        width: 100px;
        margin-top: -105px;
        background: rgba(0, 0, 0, .5);
        border-radius: 50px;
        color: #fff;
        font-size: 50px;
    }

    .touxiang {
        width: 100px;
        height: 100px;
        margin: 0 auto;
        border-radius: 50px;
        cursor: pointer;
        margin-bottom: 20px;
    }

    .userName {
        width: 400px;
    }

    .userName .el-input__inner {
        border-radius: 0;
        padding: 0;
        border-left: none;
        border-right: none;
        border-top: none;
    }

    .sex .el-form-item__content {
        text-align: left;
        padding-left: 106px;
    }

    .personForm .el-form-item__error {
        margin-left: 106px;
    }

    .account {
        text-align: left;
        margin-left: 106px;
        width: 400px;
        border-bottom: 1px dashed #d9d9d9;
    }

</style>
