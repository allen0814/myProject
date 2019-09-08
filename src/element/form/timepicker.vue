<template>
    <div>
        <p>timepicker:时间选择器</p>
        一、固定时间点:el-time-select;值为String（04:00）
        <el-row>
            <el-time-select v-model="value" :picker-options="{
                    start: '03:30',
                    step: '00:30',
                    end: '21:30'
                  }" @change="handleChange"></el-time-select>
        </el-row>
        二、任意时间点:el-time-picker;值为Date（Wed Jul 24 2019 00:57:41 GMT+0800 (中国标准时间)）
        <el-row>
            <el-time-picker v-model="value1" @change="handleChange" placeholder="任意时间点" :picker-options="{
                selectableRange: '8:30:00 - 20:30:00'
              }"></el-time-picker>
        </el-row>
        三、固定时间范围
        <el-row>
            <el-time-select placeholder="起始时间" v-model="startTime" :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30',
                  maxTime:endTime
                }">
            </el-time-select>
            <el-time-select placeholder="结束时间" v-model="endTime" :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30',
                  minTime: startTime
                }">
            </el-time-select>
        </el-row>
        四、任意时间点范围
        <el-row>
            <el-time-picker is-range v-model="value2" range-separator="至" start-placeholder="开始时间"
                end-placeholder="结束时间" :editable="false">
            </el-time-picker>
        </el-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                value: '',
                value1: new Date(),
                startTime: '',
                endTime: '',
                value2: [new Date(), new Date()]
            }
        },
        methods: {
            handleChange(value) {
                console.log(value)
                console.log(typeof (value))
            }
        }
    }
</script>