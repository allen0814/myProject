<template>
    <div>
        <p>select:下拉框</p>
        一、基础用法:clearable清空,disabled禁用
        <el-row>
            <el-select v-model="value" placeholder="请选择" :clearable="true" :disabled="false">
                <el-option v-for="item in options" :label="item.value" :key="item.key" :value="item.key"
                    :disabled="item.disabled"></el-option>
            </el-select>
        </el-row>
        二、多选:multiple多选,collapse-tags选项折叠(仅在多选时可用)
        <el-row>
            <el-select v-model="value1" placeholder="请选择" multiple collapse-tags clearable>
                <el-option v-for="item in options" :label="item.value" :key="item.key" :value="item.key">
                </el-option>
            </el-select>
        </el-row>
        三、自定义模版
        <el-row>
            <el-select placeholder="请选择" v-model="value2">
                <el-option v-for="item in options" :label="item.value" :key="item.key" :value="item.key">
                    <span style="float: left">{{item.value}}</span>
                    <span style="float: right;color: #8492a6; font-size: 13px">{{item.desc}}</span>
                </el-option>
            </el-select>
        </el-row>
        四、选项分组el-options-group
        <el-row>
            <el-select placeholder="请选择" v-model="value3">
                <el-option-group v-for="group in options1" :key="group.label" :label="group.label">
                    <el-option v-for="item in group.options2" :key="item.key" :label="item.value" :value="item.value">
                        <span style="float: left">{{item.value}}</span>
                        <span style="float: right;color: #8492a6; font-size: 13px">{{item.desc}}</span>
                    </el-option>
                </el-option-group>
            </el-select>
        </el-row>
        五、可搜索:filterable。可创建:allow-create(注：可创建必须在filterable为真时使用)
        <el-row>
            <el-select placeholder="请选择" v-model="value4" filterable allow-create>
                <el-option v-for="item in options" :key="item.key" :value="item.key" :label="item.value"></el-option>
            </el-select>
        </el-row>
    </div>
</template>
<script>
    const hotOptions = [
        { key: '00', value: '热门1', desc: 'hot1' },
        { key: '01', value: '热门2', desc: 'hot2' }
    ]
    const options = [
        { key: '11', value: '选项1', desc: 'select1' },
        { key: '12', value: '选项2', desc: 'select2', disabled: true },
        { key: '13', value: '选项3', desc: 'select3' },
        { key: '14', value: '选项4', desc: 'select4' },
    ]
    export default {
        data() {
            return {
                options: options,
                value: '',
                value1: '',
                value2: '',
                value3: '',
                value4: '',
                options1: [{
                    label: '热门选项',
                    options2: hotOptions
                }, {
                    label: '选项名',
                    options2: options
                }]
            }
        },
        methods: {

        }
    }
</script>