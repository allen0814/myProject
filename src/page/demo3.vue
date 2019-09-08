/*
* @Author: allen
* @Date: 2019-07-16 22:20:32
* @Last Modified by: allenn
* @Last Modified time: 2019-07-17 00:13:511
*/
<template>
    <div>
        demo3:监听，事件，计算
        <br>
        千米：<input type="text" v-model="kilometres"><br>
        米： <input type="text" v-model="metres"><br>
        厘米：<input type="text" v-model="centimetre">
        <input type="text" v-model="aa">
        <br>
        <div style="height: 30px;"></div>
        <table>
            <tr>
                <th>序号</th>
                <th>商品名称</th>
                <th>商品价格</th>
                <th>购买数量</th>
                <th>操作</th>
            </tr>
            <tr v-for="phone in iphones">
                <td>{{phone.id}}</td>
                <td>{{phone.name}}</td>
                <td>{{phone.price}}</td>
                <td>
                    <button :disabled="phone.count===0" @click="phone.count-=1">-</button>
                    {{phone.count}}
                    <button @click="phone.count+=1">+</button>
                </td>
                <td>
                    <button @click="phone.count=0">移除</button>
                </td>
            </tr>
        </table>
        总价：¥{{totalPrice()}}
        总价：${{totalPrice_}}
        <br>
        时间：{{dateFormat(Date.now())}}
    </div>
</template>
<script>
    export default {
        data: function () {
            return {
                kilometres: 0,
                metres: 0,
                centimetre: 0,
                aa: 0,
                iphones: [
                    { id: 1, name: "iphone8", price: "5099", count: 1 },
                    { id: 2, name: "iphoneX", price: "8699", count: 1 },
                    { id: 3, name: "iphoneXR", price: "6499", count: 1 }
                ]
            }
        },
        // methods ，在重新渲染的时候，函数总会重新调用执行
        methods: {
            totalPrice() {
                debugger
                var totalP = 0;
                for (var i = 0, len = this.iphones.length; i < len; i++) {
                    totalP += this.iphones[i].price * this.iphones[i].count;
                }
                return totalP.toString().replace(/\B(?=(\d{3})+$)/g, ',');
            },
            dateFormat: function (time) {
                var date = new Date(time);
                var year = date.getFullYear();
                /* 在日期格式中，月份是从0开始的，因此要加0
                 * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
                 * */
                var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
                var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
                var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
                // 拼接
                return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
            },
        },
        // *** 重点：computed性能更好。理由：computed只关心自定义变量对应的函数内的变量值有没有发生变化，如没变化则直接返回上次计算的结果
        //                       而 methods 是任意data内变量发生变化，都会被执行！！！


        // computed 用来监控自己【自定义的变量】 totalPrice_ 【该变量不在data中声明】。
        // 当函数里面的变量发生变化时导致结果变化，也就是我们自定义的变量随之发生了变化。 只在依赖的变量发生变化时，才去计算（性能）。
        computed: {
            totalPrice_: function () {
                debugger
                var totalP = 0;
                for (var i = 0, len = this.iphones.length; i < len; i++) {
                    totalP += this.iphones[i].price * this.iphones[i].count;
                }
                return totalP.toString().replace(/\B(?=(\d{3})+$)/g, ',');
            }
        },
        // watch 用来监控【data里面声明的变量】， 被监控的data中的某个变量发生变化时，而触发对应的事件
        watch: {
            kilometres: function (val) {
                this.kilometres = val
                this.metres = this.kilometres * 1000 // 对应的数据修改，会继续触发对应数据的函数。同下
                this.centimetre = this.kilometres * 100000
            },
            metres: function (val) {
                this.metres = val
                this.kilometres = this.metres / 1000
                this.centimetre = this.metres * 100
            },
            centimetre: function (val) {
                this.centimetre = val
                this.kilometres = this.centimetre / 100000
                this.metres = this.centimetre / 100
            }

        }
    }
</script>