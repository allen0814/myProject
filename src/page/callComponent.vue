/*
* @Author: allen
* @Date: 2019-07-15 22:59:26
* @Last Modified by: allen
* @Last Modified time: 2019-07-20 23:16:13
* @api 调用组件
*/
<template>
  <div>
    调用子组件
    <Button :btnData="{text:'确认注册',bgColor:bgColor}" @confirm="confirm" ref="btn"></Button>
    <span v-text="msg"></span>
  </div>
</template>
<script>
  import Button from "../components/button.vue";

  export default {
    components: { Button },
    data: function () {
      return {
        msg: 0,
        bgColor: "#ccc"
      };
    },
    methods: {
      confirm() {
        debugger;
        this.msg += 1;
        this.bgColor = "red";
        //$refs调用子组件的方法
        this.$refs.btn.cancel();
      }
    }
  };
</script>