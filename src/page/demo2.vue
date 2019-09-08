/*
* @Author: allen
* @Date: 2019-07-16 20:50:16
* @Last Modified by: allen
* @Last Modified time: 2019-07-17 22:23:49
*/
<template>
    <div>
        demo2:基础指令：条件，循环
        <p v-if="seen">条件为true时，看得见</p>
        <template v-if="ok">
            <span>template模版标签展示DOM</span>
        </template>
        <!-- show的值为 0、null、undefined、false 时为假，其他值为真 -->
        <span v-show="show" style="color: aqua">show?</span>
        <p v-if="randomNum>0.5">随机数大于0.5</p>
        <p v-else>随机数小于0.5</p>
        <button @click="changeRandom()">修改随机数：{{randomNum}}</button>
        <p>for循环：</p>
        <p>标签中使用模版</p>
        <ol>
            <li v-for="site in sites">{{site.name}}</li>
        </ol>
        <p>模版中使用模版</p>
        <ul>
            <template v-for="site in sites">
                <li>{{site.name}}</li>
                <li>---</li>
            </template>
        </ul>
        <p style="color: red">v-for迭代对象</p>
        <ul>
            <li v-for="oneval in anyObj" style="color: rosybrown">{{oneval}}</li>
        </ul>
        <ol>
            <li v-for="(oneval,onekey,index) in anyObj">
                {{onekey}}:{{oneval}}..{{index+1}}
            </li>
        </ol>
        <p>v-for迭代整数、数组</p>
        <span v-for="num in 10">{{num}} </span>
        <span v-for="con in [1,3,4]">{{con}} </span>
        <p>九九乘法表：</p>
        <div v-for="i in 9">
            <b v-for="j in i">
                {{i}} * {{j}} = {{i*j}},
            </b>
        </div>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {
                seen: true,
                ok: true,
                randomNum: 0,
                show: true,
                sites: [
                    { name: '111' },
                    { name: '222' },
                    { name: '333' }
                ],
                anyObj: {
                    name: 'lyl',
                    sex: 'boy',
                    age: 114
                }
            }
        },
        methods: {
            changeRandom: function () {
                debugger
                this.randomNum = Math.random().toFixed(2);
                this.show = this.randomNum > 0.5 ? true : false
            }
        },
        created() {
            //to do...
        }
    };
</script>