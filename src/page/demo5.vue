/*
* @Author: allen
* @Date: 2019-07-17 22:21:52
* @Last Modified by: allenn
* @Last Modified time: 2019-07-18 01:20:577
*/
<template>
    <div>
        demo5:表单：v-model双向数据绑定
        <p>input元素：</p>
        <input type="text" v-model="message" placeholder="编辑我...">
        <p>输入的内容是：{{message}}</p>
        <p>textarea元素：</p>
        <textarea v-model="message2" placeholder="多行文本输入"></textarea>
        <p style="white-space:pre">输入的内容是：{{message2}}</p>

        <p>checkbox复选框：</p>
        <p>单个复选框：（一个v-model变量只绑定了一次，结果为逻辑值：true,false）</p>
        <input type="checkbox" id="singleChexk" v-model="singleCheckedValue" @change="changeAllCheck">
        <span for="singleChexk">{{singleCheckedValue}}</span>

        <p>多个复选框：（一个v-model变量绑定了多次，结果为数组：['One', 'Two', 'Three']，即value组成的数组）</p>
        <input type="checkbox" id="one" value="One" v-model="checkNames">
        <label for="one">one</label>
        <input type="checkbox" id="two" value="Two" v-model="checkNames">
        <label for="two">two</label>
        <input type="checkbox" id="three" value="Three" v-model="checkNames">
        <label for="three">three</label>
        <br>选择的是：{{checkNames}}

        <p>radio单选按钮：</p>
        <input type="radio" id="apple" value="Apple" v-model="radioValue">
        <label for="apple">Apple</label>
        <input type="radio" id="orange" value="Orange" v-model="radioValue">
        <label for="orange">Orange</label>
        <br>选择的是：{{radioValue}}

        <p>select下拉框：</p>
        <select v-model="selectValue">
            <option value="">--请选择--</option>
            <option v-for="site in sites" :value="site.url">{{site.name}}</option>
        </select>
        <br>选择的是：{{selectValue}}

        <p>v-model修饰符：.trim去首位空格 .number转为Number类型 .lazy控件失去焦点时，同步数据</p>
        <label for="userName">用户名：</label>
        <input type="text" id="userName" v-model.trim="username"><br>
        <span>输入的用户名:</span>{{username}}
        <br>
        <label for="age">年龄：</label>
        <input type="number" id="age" v-model.number="age"><br>
        <span>输入的年龄：</span>{{age}}
        <br>
        <input v-model.lazy="msg"><br>
        懒加载输入的值：{{msg}}

    </div>
</template>
<script>
    export default {
        data: function () {
            return {
                message: '',
                message2: '',
                singleCheckedValue: false,
                checkNames: [],
                checkedAll: ['One', 'Two', 'Three'],
                radioValue: '',
                selectValue: '',
                sites: [
                    { url: 'www.baidu.com', name: 'Baidu' },
                    { url: 'www.google.com', name: 'Google' },
                    { url: 'www.douyu.com', name: 'Douyu' }
                ],
                username: '',
                age: '',
                msg: ''
            }
        },
        methods: {
            changeAllCheck() {
                if (this.singleCheckedValue) {
                    this.checkNames = this.checkedAll
                } else {
                    this.checkNames = []
                }
            }
        },
        // 全选与取消全选
        watch: {
            checkNames: function () {
                if (this.checkNames.length == this.checkedAll.length) {
                    this.singleCheckedValue = true
                } else {
                    this.singleCheckedValue = false
                }
            }
        }
    }
</script>