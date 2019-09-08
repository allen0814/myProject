/*
* @Author: allen
* @Date: 2019-07-18 22:04:58
* @Last Modified by: allen
* @Last Modified time: 2019-07-29 16:00:22
*/
<template>
    <div>
        demo6:钩子函数，生命周期
        <p style="color: brown">
            1.created:页面加载时（组件初始化），做数据请求，可以访问data。<br>
            2.mounted:页面加载时（组件初始化），可以访问真实DOM。<br>
            3.updated:数据更新时（data数据发生变化），访问最新的DOM与data
        </p>
        <br>
        <input type="button" @click="change" value="更新数据" />
        <!-- <input type="button" @click="destroy" value="销毁" /> -->
        <p>{{ message }}</p>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {
                message: "Welcome VUE"
            }
        },
        // 1.创建前:VUE实例化时的初始操作。此时访问不到data，访问不到DOM结构(el)。可以做初始化的‘loading’动作
        beforeCreate() {
            console.group('1.beforeCreate 创建前状态===============》');
            console.log("%c%s", "color:red", "el     : " + this.$el); //undefined
            console.log("%c%s", "color:red", "data   : " + this.$data); //undefined
            console.log("%c%s", "color:red", "message: " + this.message);//undefined
        },
        // 2.创建后:在beforeCreate后执行。可以访问到data，访问不到DOM结构(el)。此处进行前后端数据交互（ajax请求）
        created() {
            console.group('2.created 创建完毕状态===============》');
            console.log("%c%s", "color:red", "el     : " + this.$el); //undefined
            console.log("%c%s", "color:green", "data   : " + this.$data); //[object Object]  =>  已被初始化
            console.log("%c%s", "color:green", "message: " + this.message); //Welcome Vue  =>  已被初始化
        },
        // 3.挂载前:(渲染)render函数初次被调用，数据data和模版el还没有结合(分别初始化完成)，还没有渲染到html上。此处可以做data中数据最后的修改
        beforeMount() {
            console.group('3.beforeMount 挂载前状态===============》');
            console.log("%c%s", "color:red", "el     : " + this.$el); //已被初始化，但还没渲染出来
            console.log(this.$el); // 此时访问不到DOM
            console.log("%c%s", "color:green", "data   : " + this.$data); //已被初始化
            console.log("%c%s", "color:green", "message: " + this.message); //已被初始化
        },
        // 4.挂载后:数据data与模版el结合，渲染成真实的DOM结构。此时可以访问到真实的DOM，可以通过this.$refs访问DOM。
        // tip: ref类似于id一样，值必须时唯一的。如标签里的属性ref='myName'，则用this.$refs.myName获取到DOM标签。
        mounted() {
            console.group('4.mounted 挂载结束状态===============》');
            console.log("%c%s", "color:green", "el     : " + this.$el); //已被初始化，也渲染出真实DOM
            console.log(this.$el); // 此时访问到DOM（整个VUE实例：<template>标签内所有）
            console.log("%c%s", "color:green", "data   : " + this.$data); //已被初始化
            console.log("%c%s", "color:green", "message: " + this.message); //已被初始化
        },
        // 5.更新前:只要data数据发生改变，此时就会被执行，render函数会再次执行。可以对数据进行最后的修改，也可以访问到最新的DOM结构和数据
        beforeUpdate() {
            alert("更新前状态");
            console.group('5.beforeUpdate 更新前状态===============》'); //这里指的是页面渲染新数据之前
            console.log("%c%s", "color:green", "el     : " + this.$el);
            console.log(this.$el);//没DOM
            console.log("%c%s", "color:green", "data   : " + this.$data);
            console.log("%c%s", "color:green", "message: " + this.message);//是更新后的数据
            alert("更新前状态2");
        },
        // 6.更新后:可以访问到最新的DOM结构(数据更新后最新的DOM结构)和数据
        updated() {
            console.group('6.updated 更新完成状态===============》');
            console.log("%c%s", "color:green", "el     : " + this.$el);
            console.log(this.$el);//有DOM
            console.log("%c%s", "color:green", "data   : " + this.$data);
            console.log("%c%s", "color:green", "message: " + this.message);//是更新后的数据
        },
        // 7.销毁前:还可以访问到DOM结构  以及相关的数据(data)。此处可以将绑定的事件进行移除
        beforeDestroy() {
            console.group('7.beforeDestroy 销毁前状态===============》');
            console.log("%c%s", "color:red", "el     : " + this.$el);
            console.log(this.$el);
            console.log("%c%s", "color:red", "data   : " + this.$data);
            console.log("%c%s", "color:red", "message: " + this.message);
        },
        // 8.销毁后:还是可以访问到data中的属性，但是访问不到真实的DOM结构了
        destroyed() {
            console.group('8.destroyed 销毁完成状态===============》');
            console.log("%c%s", "color:red", "el     : " + this.$el);
            console.log(this.$el);
            console.log("%c%s", "color:red", "data   : " + this.$data);
            console.log("%c%s", "color:red", "message: " + this.message)
        },
        methods: {
            change() {
                this.message = 'Datura is me';
            },
            destroy() {
                vm.$destroy();
            }
        },
        computed: {

        },
        watch: {

        }
    }
</script>