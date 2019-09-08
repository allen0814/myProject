/*
* @Author: allen
* @Date: 2019-07-20 22:42:19
* @Last Modified by: allen
* @Last Modified time: 2019-07-21 00:51:28
*/
<template>
    <div>
        <p>button 按钮：</p>
        <el-row>
            <el-button :type="btnType" :size="btnSize" :plain="isPlain" :round="isRound" :icon="btnIcon"
                :loading="isLoad">
                模版按钮
            </el-button>
        </el-row>
        另外：autofocus(Boolean)是否默认聚焦，native-type(String):button / submit / reset
        <br>
        一、type(String):primary / success / warning / danger / info / text (颜色) 1.默认按钮
        <el-row>
            <el-button @click="load">默认按钮</el-button>
            <el-button type="primary">主要按钮</el-button>
            <el-button type="success">成功按钮</el-button>
            <el-button type="info">信息按钮</el-button>
            <el-button type="warning">警告按钮</el-button>
            <el-button type="danger">危险按钮</el-button>
            <el-button type="text">文字按钮</el-button>
        </el-row>
        2.plain(Boolean):朴素按钮
        <el-row>
            <el-button plain>朴素按钮</el-button>
            <el-button type="primary" plain>主要按钮</el-button>
            <el-button type="success" plain>成功按钮</el-button>
            <el-button type="info" plain>信息按钮</el-button>
            <el-button type="warning" plain>警告按钮</el-button>
            <el-button type="danger" plain>危险按钮</el-button>
        </el-row>
        3.round(Boolean):圆角按钮
        <el-row>
            <el-button round>圆角按钮</el-button>
            <el-button type="primary" round>主要按钮</el-button>
            <el-button type="success" round>成功按钮</el-button>
            <el-button type="info" round>信息按钮</el-button>
            <el-button type="warning" round>警告按钮</el-button>
            <el-button type="danger" round>危险按钮</el-button>
        </el-row>
        4.circle(Boolean):圆形按钮
        <el-row>
            <el-button icon="el-icon-search" circle></el-button>
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
            <el-button type="success" icon="el-icon-check" circle></el-button>
            <el-button type="info" icon="el-icon-message" circle></el-button>
            <el-button type="warning" icon="el-icon-star-off" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </el-row>
        5.disabled(Boolean):禁用按钮
        <el-row>
            <el-button disabled>默认按钮</el-button>
            <el-button type="primary" disabled>主要按钮</el-button>
            <el-button type="success" disabled>成功按钮</el-button>
            <el-button type="info" disabled>信息按钮</el-button>
            <el-button type="warning" disabled>警告按钮</el-button>
            <el-button type="danger" disabled>危险按钮</el-button>
            <el-button type="text" disabled>文字按钮</el-button>
        </el-row>
        6.带图标按钮:icon(String)写在按钮标签内，在文字左边。写在文字右边并加上el-icon--right类
        <el-row>
            <el-button type="primary" icon="el-icon-share"></el-button>
            <el-button type="primary" icon="el-icon-delete"></el-button>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
            <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
        </el-row>
        7.按钮组:将按钮包在el-button-group标签中
        <el-row>
            <el-button-group>
                <el-button type="primary" icon="el-icon-arrow-left">上一页</el-button>
                <el-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </el-button-group>
            <el-button-group>
                <el-button type="primary" icon="el-icon-edit"></el-button>
                <el-button type="primary" icon="el-icon-share"></el-button>
                <el-button type="primary" icon="el-icon-delete"></el-button>
            </el-button-group>
        </el-row>
        8.加载中、 :loading="true/false"(Boolean)
        <el-row>
            <el-button type="primary" :loading="isLoad">加载中</el-button>
        </el-row>
        9.size(String):按钮大小:medium、small、mini（不写就是默认的最大）
        <el-row>
            <el-button>默认按钮</el-button>
            <el-button size="medium">中等按钮</el-button>
            <el-button size="small">小型按钮</el-button>
            <el-button size="mini">超小按钮</el-button>
        </el-row>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                btnType: "success",
                btnSize: "medium",
                isPlain: false,
                isRound: false,
                isLoad: true,
                btnIcon: "el-icon-eleme"
            }
        },
        methods: {
            load: function () {
                this.isLoad = !this.isLoad
                this.btnSize = this.btnSize == "medium" ? "mini" : "medium"
                this.btnType = this.btnType == "success" ? "primary" : "success"
                this.isPlain = !this.isPlain
                this.isRound = !this.isRound
                this.btnIcon = "el-icon-user-solid"
            }
        }
    }
</script>
<style lang="scss">
    .el-button {
        cursor: pointer;
    }

    .el-row {
        margin-bottom: 20px;

        /* &:last-child {
            margin-bottom: 0;
        } */
    }
</style>