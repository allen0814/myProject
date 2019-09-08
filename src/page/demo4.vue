<template>
    <div>
        demo4:样式绑定
        <p :class="obj">核心：v-bind在处理class和style时，表达式的结果类型不仅可以时字符串，还能是对象、数组</p>
        <p>class属性：</p>
        <p :class="{class3:isRed}">class属性对象中，给一个类</p>
        <p :class="{class3:isRed,class4:true}">class属性对象中，给多个个类，value值为true时，key值才为class属性</p>
        <p :class="classObject">用计算属性computed控制对象属性结果</p>
        <p :class="[item1,item2]">class属性为数组：数组里面是多个变量，data中变量对应的值即为class属性值</p>
        <p>style内联样式：</p>
        <p :style="{color:color1,fontSize:fontSize1+'px'}">直接通过data属性改变内联样式(能用，但不好用)</p>
        <button @click="fontSize1++,color1='red'">fontSize+</button>
        <button @click="fontSize1--,color1='green'">fontSize-</button>
        <p :style="styleObj">整个内联样式对象放在data中(方法不生效)</p>
        <p :style="styleObj1">整个内联样式对象放在computed定义的变量中（最实用）</p>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {
                obj: {
                    class1: true,
                    class2: false
                },
                isRed: true,
                isActive: true,
                error: {
                    value: true,
                    type: 'fatal'
                },
                item1: 'class5',
                item2: 'class6',
                color1: 'green',
                fontSize1: 15,
                styleObj: {
                    color: this.color1,
                    fontSize: this.fontSize1 + 'px'
                }
            }
        },
        methods: {
            doThing() {

            }
        },
        computed: {
            classObject: function () {
                return {
                    class5: this.isActive && this.error.value,
                    class6: this.error.value && this.error.type === 'fatal'
                }
            },
            styleObj1: function () {
                return {
                    color: this.color1,
                    fontSize: this.fontSize1 + 'px'
                }
            }
        },
        watch: {

        },
        created() {
            this.doThing()
        }
    }
</script>
<style>
    .class1 {
        color: red
    }

    .class2 {
        font-style: italic
    }

    .class3 {
        color: red
    }

    .class4 {
        font-size: 30px
    }

    .class5 {
        text-decoration: underline
    }

    .class6 {
        font-style: italic
    }
</style>