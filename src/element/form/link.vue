/*
* @Author: allen
* @Date: 2019-07-21 00:51:16
* @Last Modified by: allen
* @Last Modified time: 2019-07-21 00:56:52
*/
<template>
    <div>
        <p>Link:文字连接</p>
        一、type(String):primary / success / warning / danger / info / text (颜色) 1.默认按钮
        <el-row>
            <el-link href="https://element.eleme.io" target="_blank">默认链接</el-link>
            <el-link type="primary">主要链接</el-link>
            <el-link type="success">成功链接</el-link>
            <el-link type="warning">警告链接</el-link>
            <el-link type="danger">危险链接</el-link>
            <el-link type="info">信息链接</el-link>
        </el-row>
        二、disabled(Boolean)
        <el-row>
            <el-link disabled>默认链接</el-link>
            <el-link type="primary" disabled>主要链接</el-link>
            <el-link type="success" disabled>成功链接</el-link>
            <el-link type="warning" disabled>警告链接</el-link>
            <el-link type="danger" disabled>危险链接</el-link>
            <el-link type="info" disabled>信息链接</el-link>
        </el-row>
        三、underline(Boolean)
        <el-row>
            <el-link :underline="false">无下划线</el-link>
            <el-link>有下划线</el-link>
        </el-row>
        四、icon(String)
        <el-row>
            <el-link icon="el-icon-edit">编辑</el-link>
            <el-link>查看<i class="el-icon-view el-icon--right"></i> </el-link>
        </el-row>
    </div>
</template>