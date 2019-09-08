<template>
    <div>
        <p>switch:开关</p>
        一、基本用法
        <el-row>
            <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-row>
        二、文字描述
        <el-row>
            <el-switch v-model="value" active-color="#13ce66" active-text="按月付费" inactive-text="按年付费"></el-switch>
        </el-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                value: false
            }
        },
        methods: {

        }
    }
</script>