<template>
    <!-- 组件代码 -->
    <span>
        <el-popover ref="popover5" placement="top" width="160" v-model="visible">
            <p>{{content}}</p>
            <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button type="danger" size="mini" @click="deleteItem()">确定</el-button>
            </div>
        </el-popover>
        <el-button v-popover:popover5 type="text" size="small" :style="styleColor">删除</el-button>
    </span>
</template>

<script>
    module.exports = {
        // 组件名称, 在外部可以使用<delete-confirm-popover></delete-confirm-popover>来使用组件
        name: "delete-confirm-popover",
        // 组件的属性, 可以从外部传入相应的值进来
        props: ["content", "styleColor"],
        data: function () {
            return {
                // 每个组件自己的控制变量
                visible: false
            };
        },
        methods: {
            deleteItem() {
                // 回调父组件方法
                this.$emit("confirmDelete");
                this.visible = false;
            }
        }
    };
</script>