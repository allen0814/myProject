/*
* @Author: allen
* @Date: 2019-07-14 19:33:24
* @Last Modified by: allen
* @Last Modified time: 2019-08-12 13:41:20
*/
<template>
    <div>
        Demo1:基础模版语法
        <div id="demo1">
            <h1>site:{{site}}</h1>
            <h2>url:{{url}}</h2>
            <h3>{{details()}}</h3>
        </div>
        <!-- v-html指令用于输出html代码 -->
        <div v-html="message"></div>
        <label for="r1">修改颜色</label>
        <!-- use为true时，使用class1的属性（样式）  复选框选中，值为true -->
        <input type="checkbox" v-model="use" id="r1" />
        <!-- v-bind 缩写 : (v-bind:class == :class) -->
        <div v-bind:class="{'class1':use,class2:true}">v-bind:class指令</div>
        <!-- 条件语句 -->
        <div v-if="use">看得到吗？</div>
        <!-- 单纯判断dom元素 显示与隐藏 -->
        <div v-show="use">看得到吗？</div>
        <!-- v-model指令 双向数据绑定（主要用于表单控件） -->
        <input v-model="inputValue" />
        <br />
        输入的内容是：{{inputValue}}
        <br />
        <!-- 双大括号内，支持完全的js表达式 -->
        {{5+5}}
        <!-- v-on 缩写 @   (v-on:click == @click) -->
        <button v-on:click="doSomething">点击事件</button>
        <br />
        <button @click="addAttrOrCount">给对象添加属性或修改属性的值</button>
        {{food.count}}
    </div>
</template>
<script>
    export default {
        data: function () {
            return {
                site: "www.aa.com",
                url: "www.bb.com",
                message: "<h1>v-html文本</h1>",
                use: false,
                seen: false,
                inputValue: "",
                food: {
                    type: Object
                }
            };
        },
        created() {
            this.addAttrOrCount();
        },
        methods: {
            addAttrOrCount() {
                if (!this.food.count) {
                    //   给对象添加属性
                    this.$set(this.food, "count", 1);
                } else {
                    //   修改对象 某个属性的值
                    this.food.count++;
                }
            },
            details() {
                return this.site + "···哈哈···" + this.url;
            },
            doSomething() {
                this.use = false;
            }
        }
    };
</script>

<style>
    .class1 {
        background: #444;
        color: #eee;
    }

    .class2 {
        font-size: 28px;
    }
</style>