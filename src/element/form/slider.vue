<template>
    <div>
        <p>Slider:滑块</p>
        一、基础用法 value1取值0-100
        <el-slider v-model="value1"></el-slider>
        二、格式化:format-tooltip
        <el-slider v-model="value2" :format-tooltip="formatTooltip"></el-slider>
        三、离散值:step ;show-stops显示间隔点
        <el-slider v-model="value3" :step="10"></el-slider>
        <el-slider v-model="value3" :step="10" show-stops></el-slider>
        四、带输入框:show-input
        <el-slider v-model="value4" show-input></el-slider>
        五、竖向模式:vertical
        <el-slider v-model="value4" vertical height="100px"></el-slider>
        六、范围选择:range
        <el-slider v-model="value5" range show-stops :max=10></el-slider>
        七、标记:marks
        <el-slider v-model="value6" range :marks="marks" :min=20 :max=50 :step=10></el-slider>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                value1: 50,
                value2: 20,
                value3: 0,
                value4: 0,
                value5: [0, 10],
                value6: [30, 40],
                marks: {
                    20: '20cm',
                    30: '30cm',
                    40: '40cm',
                    50: '50cm'
                }
            }
        },
        methods: {
            formatTooltip(val) {
                return val / 100
            }
        }
    }
</script>
<style>
    .el-slider {
        width: 400px;
        margin-left: 20px
    }
</style>