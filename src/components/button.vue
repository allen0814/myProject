/*
* @Author: allen
* @Date: 2019-07-14 22:43:01
* @Last Modified by: allen
* @Last Modified time: 2019-08-07 03:32:58
* @api button Components 按钮组件
*/

// 第一层 ：template （html）：需要继续包一层div
<template>
  <div>
    <button @click="confirm" :disabled="state" class="confirm" :style="{background:btnData.bgColor}">{{text}}</button>
  </div>
</template>

// 第二层：script （js）
<script>
  export default {
    data() {
      return {
        text: this.btnData.text,
        state: false
      };
    },
    //props接收父组件参数
    props: {
      btnData: {}
    },
    methods: {
      confirm() {
        this.text = "...";
        this.state = true;
        //手动触发父组件事件 $emit
        this.$emit("confirm");
      },
      cancel() {
        this.text = this.btnData.text;
        this.state = false;
      }
    }
  };
</script>

// 第三层 Style （css）
<style lang="css" scoped>
  .confirm {
    border: none;
    color: #fff;
    width: 100%;
    padding: 1rem 0;
    border-radius: 4px;
    font-size: 1.6rem;
    background: #5da1fd;
  }

  .confirm:focus {
    outline: none;
  }
</style>