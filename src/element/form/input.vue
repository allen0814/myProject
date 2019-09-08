<template>
    <div>
        <p>Input:输入框</p>
        一、基础用法，使用v-model数据绑定；disabled禁用；clearable可清空;show-password密码框;size:large、small 和 mini
        <el-row>
            <el-input v-model="inputValue" placeholder="请输入内容" :disabled="isDisabled" size="mini" clearable
                show-password>
            </el-input>
            <br><span style="margin-left: 20px">输入长度限制：maxlength 和minlength。
                在使用maxlength最大长度限制时，使用show-word-limit统计数量</span><br>
            <el-input type="text" placeholder="请输入内容" v-model="input1" maxlength="10" show-word-limit>
            </el-input>
            <el-input type="textarea" placeholder="请输入内容" v-model="input1" maxlength="30" show-word-limit>
            </el-input>
        </el-row>
        二：带icon的输入框:suffix-icon图标在输入框内后面；prefix-icon图标在输入框内前面
        <el-row>
            <el-input placeholder="请输入日期" suffix-icon="el-icon-date" v-model="input1"></el-input>
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input2"></el-input>
        </el-row>
        三、文本域：用type="textarea"实现，row控制初始高度.autosize根据本文内容自动调整高度，也可以给个对象，指定最小行与最大行
        <el-row>
            <el-input type="textarea" placeholder="请输入内容" v-model="textareaValue" :row=2></el-input>
            <el-input type="textarea" placeholder="请输入内容" v-model="textareaValue" autosize></el-input>
            <el-input type="textarea" placeholder="请输入内容" v-model="textareaValue" :autosize="{minRows:2,maxRows:4}">
            </el-input>
        </el-row>
        四、复合型输入框:prepend内容添加在输入框外前面；append内容添加在输入框外后面
        <el-row>
            <el-input v-model="inputValue" placeholder="请输入地址" style="width: 300px">
                <template slot="prepend">http://</template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="input2">
                <template slot="append">.com</template>
            </el-input>
        </el-row>
        <el-row style="margin-top: 10px">
            <el-input placeholder="请输入内容" v-model="input1" class="input-with-select" style="width: 400px">
                <el-select v-model="selectValue" placeholder="请选择" slot="prepend">
                    <el-option label="手机号" value="1"></el-option>
                    <el-option label="用户名" value="2"></el-option>
                    <el-option label="QQ号" value="3"></el-option>
                </el-select>
                <el-button icon="el-icon-search" slot="append"></el-button>
            </el-input>
        </el-row>
        五、带输入建议：el-autocomplete
        <el-row class="demo-autocomplete">
            <el-col :span="12">
                <div class="sub-title">激活即列出输入建议</div>
                <el-autocomplete placeholder="请输入内容" class="inline-input" v-model="state1"
                    :fetch-suggestions="querySearch" @select="handleSelect">
                </el-autocomplete>
            </el-col>
            <el-col :span="12">
                <div class="sub-title">输入后匹配输入建议</div>
                <el-autocomplete placeholder="请输入内容" class="inline-input" v-model="state2"
                    :fetch-suggestions="querySearch" @select="handleSelect" :trigger-on-focus="false"></el-autocomplete>
            </el-col>
        </el-row>
        六、自定义建议模版
        <el-row>
            <el-autocomplete popper-class="my-autocomplete" v-model="state" :fetch-suggestions="querySearch"
                placeholder="请输入内容" @select="handleSelect" suffix-icon="el-icon-edit">
                <template slot-scope="{item}">
                    <div class="name">{{item.value}}</div>
                    <span class="addr">{{item.address}}</span>
                </template>
            </el-autocomplete>
        </el-row>
        七、inputNumber计数器:min最小值，max最大值，step控制步长，step-strictly(Boolean)严格步数，<br>
        值只能是步数的倍数，precision精度(小数点后保留几位),controls-position控制按钮的位置（没有就是默认一边一个）
        <el-row>
            <el-input-number v-model="num" :min="1" :max="10" @change="handleChange" :step="2" step-strictly
                :precision="2" controls-position="right">
            </el-input-number>
        </el-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                num: '1',
                inputValue: '',
                isDisabled: false,
                input1: '',
                input2: '',
                textareaValue: '',
                selectValue: '',
                restaurants: [],
                state1: '',
                state2: '',
                state: ''
            }
        },
        methods: {
            handleChange(value) {
                console.log(value);
            },
            querySearch(queryString, cb) {
                debugger
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                cb(results);
            },
            createFilter(queryString) {
                debugger
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                }
            },
            loadAll() {
                return [
                    { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
                    { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
                    { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
                    { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
                    { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
                    { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
                    { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
                    { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
                    { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
                    { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
                    { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
                    { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
                    { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
                    { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
                    { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" }
                ];
            },
            handleSelect(item) {
                debugger
                console.log(item);
            }
        },
        mounted() {
            debugger
            this.restaurants = this.loadAll();
        }
    }
</script>
<style lang="scss">
    @import "../../style/scss/content.scss"
</style>