<template>
    <div>
        <p>Checkbox:复选框</p>
        一、单一的checkbox中,绑定变量的值会是Boolean，选中为true。
        <el-row>
            <el-checkbox v-model="checkedValue">备选项</el-checkbox>
        </el-row>
        二、disabled 禁用
        <el-row>
            <el-checkbox v-model="checked1" disabled>备选项1</el-checkbox>
            <el-checkbox v-model="checked2" disabled>备选项</el-checkbox>
        </el-row>
        三、多选框组
        <el-row>
            <el-checkbox-group v-model="checkList">
                <el-checkbox label="复选框 A"></el-checkbox>
                <el-checkbox label="复选框 B"></el-checkbox>
                <el-checkbox label="复选框 C"></el-checkbox>
                <el-checkbox label="禁用" disabled></el-checkbox>
                <el-checkbox label="选中且禁用" disabled></el-checkbox>
            </el-checkbox-group>
        </el-row>
        四、indeterminate状态：实现全选效果(indeterminate控制的是没有全选，有没有全部取消的状态及样式)
        <el-row>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handelCheckAllChange">全选
            </el-checkbox>
            <el-checkbox-group v-model="checkedCitys" @change="handelCheckedCitysChange">
                <el-checkbox v-for="city in citys" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
        </el-row>
        五、可选数量限制min和max
        <el-row>
            <el-checkbox-group v-model="checkedBalls" :min="1" :max="2">
                <el-checkbox v-for="ball in balls" :label="ball" :key="ball">{{ball}}</el-checkbox>
            </el-checkbox-group>
        </el-row>
    </div>
</template>
<script>
    const cityOptions = ['上海', '北京', '广州', '深圳'];
    const ballOptions = ['篮球', '足球', '排球', '乒乓球']
    export default {
        data() {
            return {
                checkedValue: true,
                checked1: false,
                checked2: true,
                checkList: ['复选框 A', '选中且禁用'],
                citys: cityOptions,
                checkedCitys: ['上海', '北京'],
                isIndeterminate: true,
                checkAll: false,
                checkedBalls: ['篮球', '足球'],
                balls: ballOptions
            }
        },
        methods: {
            handelCheckAllChange(val) {
                this.checkedCitys = val ? this.citys : []
                this.isIndeterminate = false;
            },
            handelCheckedCitysChange(value) {
                debugger
                let checkedCount = value.length;
                this.checkAll = checkedCount == this.citys.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.citys.length
            }
        }
    }
</script>