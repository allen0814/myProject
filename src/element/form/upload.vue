<template>
    <div>
        <p>upload:上传</p>
        一、点击上传::auto-upload="false" 取消自动上传
        <el-row style="width: 300px;">
            <el-upload :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple
                :limit="3" :on-exceed="handleExceed" :file-list="fileList"
                action="https://jsonplaceholder.typicode.com/posts/">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-row>
        二、用户头像上传
        <el-row>
            <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-row>
        三、照片墙
        <el-row>
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card"
                :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                fileList: [],
                imageUrl: '',
                dialogImageUrl: '',
                dialogVisible: false
            }
        },
        methods: {
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleAvatarSuccess(res, file) {
                debugger
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                debugger
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            handleRemove(file, fileList) {
                debugger
                console.log(file);
                console.log(fileList);
            },
            beforeRemove(file, fileList) {
                debugger
                return this.$confirm(`确定移除${file.name} ?`);
            },
            handlePreview(file) {
                debugger
                console.log(file);
            },
            handleExceed(files, fileList) {
                debugger
                this.$message.warning(`当前限制选择3个文件，本次选择了${files.length}个文件，共选择了${files.length +
                    fileList.length}个文件`);
            }
        }
    }
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>