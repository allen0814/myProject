<template>
    <div>
        <p>Radio:单选框</p>
        另外：text-color:按钮形式的 Radio 激活时的文本颜色，name:原生name属性
        <br>
        一、v-model绑定变量，其值即为 label的值，可以是String、Number或Boolean。
        <el-row>
            <el-radio v-model="radioValue" label="true" @change="changeSingle">备选项</el-radio>
            <el-radio v-model="radioValue" label="false" @change="changeSingle">备选项</el-radio>
        </el-row>
        二、disabled:禁用
        <el-row>
            <el-radio disabled v-model="radio" label="禁用">备选项</el-radio>
            <el-radio disabled v-model="radio" label="选中且禁用">备选项</el-radio>
        </el-row>
        三、单选按钮组:将el-radio包在el-radio-group下，在el-radio-group中绑定v-modelv-model，在el-radio设置label
        <el-row>
            <el-radio-group v-model="radioGroup" @change="changeRadio">
                <el-radio :label="3">备选项</el-radio>
                <el-radio :label="6">备选项</el-radio>
                <el-radio :label="9">备选项</el-radio>
            </el-radio-group>
        </el-row>
        四、按钮样式:将el-radio换成将el-radio-button。另外el-radio-group还提供了size属性
        <p style="color: red">size仅对按钮形式的 Radio 或带有边框的 Radio 有效</p>
        <el-row>
            <el-radio-group v-model="radio1">
                <el-radio-button label="上海"></el-radio-button>
                <el-radio-button label="北京"></el-radio-button>
                <el-radio-button label="广州"></el-radio-button>
                <el-radio-button label="深圳"></el-radio-button>
            </el-radio-group>
        </el-row>
        <el-row>
            <el-radio-group v-model="radio2" size="medium">
                <el-radio-button label="上海"></el-radio-button>
                <el-radio-button label="北京"></el-radio-button>
                <el-radio-button label="广州"></el-radio-button>
                <el-radio-button label="深圳"></el-radio-button>
            </el-radio-group>
        </el-row>
        <el-row>
            <el-radio-group v-model="radio3" size="small">
                <el-radio-button label="上海"></el-radio-button>
                <el-radio-button label="北京" disabled></el-radio-button>
                <el-radio-button label="广州"></el-radio-button>
                <el-radio-button label="深圳"></el-radio-button>
            </el-radio-group>
        </el-row>
        <el-row>
            <el-radio-group v-model="radio4" disabled size="mini">
                <el-radio-button label="上海"></el-radio-button>
                <el-radio-button label="北京"></el-radio-button>
                <el-radio-button label="广州"></el-radio-button>
                <el-radio-button label="深圳"></el-radio-button>
            </el-radio-group>
        </el-row>
        五、带有边框的单选按钮 border
        <el-row>
            <el-radio v-model="radio1" label="1" border>备选项1</el-radio>
            <el-radio v-model="radio1" label="2" border>备选项2</el-radio>
        </el-row>
        <el-row>
            <el-radio v-model="radio2" label="1" border size="medium">备选项1</el-radio>
            <el-radio v-model="radio2" label="2" border size="medium">备选项2</el-radio>
        </el-row>
        <el-row>
            <el-radio-group v-model="radio3" size="small">
                <el-radio label="1" border>备选项1</el-radio>
                <el-radio label="2" border disabled>备选项2</el-radio>
            </el-radio-group>
        </el-row>
        <el-row>
            <el-radio-group v-model="radio4" size="mini" disabled>
                <el-radio label="1" border>备选项1</el-radio>
                <el-radio label="2" border>备选项2</el-radio>
            </el-radio-group>
        </el-row>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {
                radioValue: "true",
                radio: "选中且禁用",
                radioGroup: 3,
                radio1: '上海',
                radio2: '上海',
                radio3: '上海',
                radio4: '上海'
            }
        },
        methods: {
            changeRadio(radioGroup) {
                console.log(radioGroup)
            },
            changeSingle(radioValue) {
                debugger
            }
        }
    }
</script>

<style lang="scss">
    .el-row {
        margin-bottom: 20px;

        /* &:last-child {
                margin-bottom: 0;
            } */
    }
</style>