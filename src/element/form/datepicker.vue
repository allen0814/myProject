<template>
    <div>
        <p>datepicker:日期选择器</p>
        一、基础用法: 配置icker-options对象中shortcuts设置快捷选项，disabledDate设置禁用日期
        <el-row>
            <el-date-picker v-model="value" type="date" placeholder="请选择日期" :picker-options="pickerOptions">
            </el-date-picker>
        </el-row>
        二、选择月：
        <el-row>
            <el-date-picker v-model="value1" type="month" placeholder="选择月">
            </el-date-picker>
        </el-row>
        三、选择日期范围：picker-options 可配置快捷键shortcuts
        <el-row>
            <el-date-picker v-model="value2" type="daterange" range-separator="至" start-placeholder="开始日期"
                end-placeholder="结束日期" :picker-options="pickerOptionsRange"></el-date-picker>
        </el-row>
        四、选择月份范围：
        <el-row>
            <el-date-picker v-model="value3" type="monthrange" range-separator="至" start-placeholder="开始日期"
                end-placeholder="结束日期"></el-date-picker>
        </el-row>
        五、日期格式：format显示的格式；value-format值的格式
        <el-row>
            <el-date-picker v-model="value4" type="date" placeholder="请输入日期" format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
            </el-date-picker>
        </el-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                value: '',
                value1: '',
                value2: '',
                value3: '',
                value4: '',
                pickerOptionsRange: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const start = new Date();
                            const end = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end])
                        }
                    }, {
                        text: '最近一月',
                        onClick(picker) {
                            const start = new Date();
                            const end = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三月',
                        onClick(picker) {
                            const start = new Date();
                            const end = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                pickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date())
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }],
                    disabledDate(time) {
                        return time.getTime() > Date.now()
                    }
                }
            }
        }
    }
</script>