<template>
    <div class="modal-dialog modal-lg" :id="id">
        <div class="modal-content">
            <form class="avatar-form" enctype="multipart/form-data" method="post">
                <div class="avatar-upload" style="display: inline;">
                    <input type="hidden" class="avatar-src" name="avatar_src">
                    <input type="hidden" class="avatar-data" name="ci">
                    <label for="avatarInput" class="el-button el-button--primary el-button--small">选择图片</label>
                    <input type="file" class="avatar-input " style="visibility: hidden;float: left;" id="avatarInput"
                        name="file" @change="change">
                </div>
                <div class="avatar-btns" style="display: inline;margin-left: -500px;">
                    <el-button-group style="margin-top: -4px;">
                        <button type="primary" class="el-button el-button--primary el-button--small"
                            data-method="rotate" data-option="-45" title="Rotate -45 degrees" style="padding: 7px 15px;"
                            @click.prevent="rotate('l')">
                            <i class="iconfont el-icon-my-rotate-left"
                                style="font-family: 'iconfont' !important;font-size: 16px;"></i></button>
                        <button type="primary" class="el-button el-button--primary  el-button--small"
                            data-method="rotate" data-option="45" title="Rotate 45 degrees" style="padding: 7px 15px;"
                            @click.prevent="rotate('r')">
                            <i class="iconfont el-icon-my-rotate-right"
                                style="font-family: 'iconfont' !important;font-size: 16px;"></i></button>
                        <button type="primary" class="el-button el-button--primary  el-button--small"
                            data-method="rotate" data-option="45" title="Rotate 45 degrees" style="padding: 7px 15px;"
                            @click.prevent="scale">
                            <i class="iconfont el-icon-my-shuipingfanzhuan"
                                style="font-family: 'iconfont' !important;font-size: 16px;"></i></button>
                    </el-button-group>
                </div>
                <button type="primary" class="el-button el-button--primary  el-button--small"
                    style="padding: 7px 15px;margin-left: 5px;" @click.prevent="reset">
                    <i class="iconfont el-icon-my-reset"
                        style="font-family: 'iconfont' !important;font-size: 16px;"></i></button>
                <el-row>
                    <el-col :span="18">
                        <div class="avatar-wrapper"></div>
                    </el-col>
                    <el-col :span="6" style="overflow: hidden;">
                        <div style="padding-left: 10px">
                            <div class="avatar-preview preview-lg"></div>
                            <div class="avatar-preview avatar-preview-round preview-md"></div>
                            <div class="avatar-preview avatar-preview-round preview-sm"></div>
                        </div>
                    </el-col>
                </el-row>
            </form>
        </div>
    </div>
</template>

<script>
    import 'cropper/dist/cropper.js'
    export default {
        props: {
            id: String
        },
        data() {
            return {
                $scale: null,
                obj: {},
                $container: null,
                $avatarForm: null,
                $avatarSrc: null,
                $avatarData: null,
                $avatarInput: null,
                $avatarWrapper: null,
                $avatarPreview: null,
                support: {
                    fileList: !!$('<input type="file">').prop('files'),
                    blobURLs: !!window.URL && URL.createObjectURL,
                    formData: !!window.FormData
                }
            }
        },
        mounted() {
            this.$scale = -1;
            this.$container = $('#' + this.id);
            this.$avatarForm = this.$container.find('.avatar-form');
            this.$avatarSrc = this.$avatarForm.find('.avatar-src');
            this.$avatarData = this.$avatarForm.find('.avatar-data');
            this.$avatarInput = this.$avatarForm.find('.avatar-input');
            this.$avatarWrapper = this.$container.find('.avatar-wrapper');
            this.$avatarPreview = this.$container.find('.avatar-preview');

            this.$nextTick(function () {
                this.support.datauri = this.support.fileList && this.support.blobURLs;
            })
        },
        methods: {
            // 上传图片
            change: function () {
                var files;
                var file;
                if (this.support.datauri) {
                    files = this.$avatarInput.prop('files');
                    if (files.length > 0) {
                        file = files[0];
                        if (this.isImageFile(file)) {
                            if (this.url) {
                                URL.revokeObjectURL(this.url); // Revoke the old one
                            }
                            this.url = URL.createObjectURL(file);
                            this.startCropper();
                        }
                    }
                } else {
                    file = this.$avatarInput.val();
                }
            },
            //旋转事件
            rotate: function (e) {
                var data;
                if (e === 'l') {
                    data = {
                        method: "rotate",
                        option: -45
                    }
                }
                if (e === 'r') {
                    data = {
                        method: "rotate",
                        option: 45
                    }
                }
                if (this.active) {
                    if (data.method) {
                        this.$img.cropper(data.method, data.option); //旋转图片rotate
                    }
                }
            },
            reset: function () {
                this.$img.cropper('reset'); //将图像和裁剪框重置为初始状态
            },
            scale: function () {
                this.$img.cropper('scale', this.$scale, 1); //水平方向翻转
                this.$scale = (-this.$scale);
            },
            // 开始裁剪
            startCropper: function () {
                var _this = this;
                if (this.active) {
                    this.$img.cropper('replace', this.url);
                } else {
                    this.$img = $('<img src="' + this.url + '">');
                    this.$avatarWrapper.empty().html(this.$img);
                    this.$img.cropper({
                        viewMode: 1, //定义cropper的视图模式
                        aspectRatio: 1, //裁剪框的宽高比
                        preview: this.$avatarPreview, //预览
                        restore: false,
                        crop: function (e) {
                            var json = [
                                '{"x":' + e.detail.x,
                                '"y":' + e.detail.y,
                                '"height":' + e.detail.height,
                                '"width":' + e.detail.width,
                                '"rotate":' + e.detail.rotate + '}'
                            ].join();
                            //裁图参数存起来
                            _this.$avatarData.val(json);
                        }
                    });
                    this.active = true;
                }
            },
            // 裁剪提交
            submit: function (userId) {
                var _this = this;
                if (!this.$avatarSrc.val() && !this.$avatarInput.val()) {
                    return false;
                }
                if (this.support.formData) {
                    this.$img.cropper('getCroppedCanvas', {
                        width: 300,
                        height: 300
                    }).toBlob(function (blob) {
                        var formData = new FormData();
                        formData.append('file', blob);
                        formData.append('userId', userId);
                        let contentType = 'application/x-www-form-urlencoded';
                        //var src = URL.createObjectURL(blob);
                        let url = 'baseinfo/updateAvatar';
                        _this.$api.post(url, formData, contentType, r => {
                            if (r.success) {
                                _this.$message({
                                    message: '保存成功!',
                                    type: 'success'
                                });
                                _this.submitDone(r);
                                //将返回的数据传给父组件
                                _this.$emit('cropper-success', r.data);
                                _this.cropDone();
                            } else {
                                _this.$message({
                                    message: '保存失败!',
                                    type: 'error'
                                });
                                return false;
                            }
                        })

                    }, 'image/jpeg');

                    // var cas = this.$img.cropper('getCroppedCanvas');
                    // var base64url = cas.toDataURL('image/jpeg'); //生成base64图片的格式

                    // cas.toBlob(function (e) {
                    //     console.log(e);  //生成Blob的图片格式
                    // })
                }
            },
            submitDone: function (data) {
                this.url = data.data;
                if (this.support.datauri || this.uploaded) {
                    this.uploaded = false;
                    this.cropDone();
                } else {
                    this.uploaded = true;
                    this.$avatarSrc.val(this.url);
                    this.startCropper();
                }
                this.$avatarInput.val('');
            },
            isImageFile: function (file) {
                if (file.type) {
                    return /^image\/\w+$/.test(file.type);
                } else {
                    return /\.(jpg|jpeg|png|gif)$/.test(file);
                }
            },
            // 停止裁剪
            cropDone: function () {
                if (this.active) {
                    this.$img.cropper('destroy'); //销毁cropper并从图像中删除整个cropper
                    this.$img.remove();
                    this.active = false;
                }
            }
        }
    }

</script>

<style rel="stylesheet/scss" lang='scss'>
    @import "./index.scss";

</style>
