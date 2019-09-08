<!--  -->
<template>
    <div style="width: 825px;">
        <el-row class="myAnswer">
            <el-col :span="2">
                <!-- 赞/踩 -->
                <div class="vote" @mouseenter="enterVoteBtn" @mouseleave="leaveVoteBtn">
                    <button @click="count++" class="like" @mouseenter="enterVote" @mouseleave="leaveVote">
                        <i class="el-icon-caret-top"></i>
                    </button>
                    <span>{{count}}</span>
                    <button @click="handleHate" class="hate" @mouseenter="enterVote" @mouseleave="leaveVote">
                        <i class="el-icon-caret-bottom"></i>
                    </button>
                </div>
                <!-- 采纳 -->
                <div class="accept" v-show="false">
                    <i class="el-icon-success"></i>
                    <span>已采纳</span>
                </div>
            </el-col>
            <el-col :span="22">
                <!-- 评论内容 -->
                <div class="answer-body">
                    <div class="ql-container ql-snow" style="border: none;">
                        <div class="ql-editor" style="padding: 0;">
                            <div class="details_box" v-html="content"> </div>
                        </div>
                    </div>

                </div>
                <el-row class="answer-operate">
                    <!-- 操作区 -->
                    <el-col :span="16">
                        <ul>
                            <li>
                                <button @click="commentShow=!commentShow" @mouseenter="enter" @mouseleave="leave">
                                    <i class="iconfont el-icon-my-commenting"></i>
                                    &nbsp;评论 · 1
                                </button>
                            </li>
                            <li>
                                <button @mouseenter="enter" @mouseleave="leave">
                                    <i class="iconfont el-icon-my-money"></i>
                                    赞赏
                                </button>
                            </li>
                            <li>
                                <button @mouseenter="enter" @mouseleave="leave">
                                    <i class="iconfont el-icon-my-bianji"></i>
                                    编辑
                                </button>
                            </li>
                            <li>
                                <button @click="isShoucang=!isShoucang" @mouseenter="enter" @mouseleave="leave">
                                    <i :class="isShoucang?'el-icon-star-on':'el-icon-star-off'"></i>
                                    收藏
                                </button>
                            </li>
                        </ul>
                    </el-col>
                    <!-- 用户信息 -->
                    <el-col :span="8" class="answer-user">
                        <div class="answer-avatar">
                            <el-avatar :src="require('../../../' + answerAvatar)"></el-avatar>
                        </div>
                        <div class="answer-info">
                            <div class="answer-name">
                                <span>{{createUserName}}</span>
                                <i class="iconfont el-icon-my-mla"></i>
                                <label>235</label>
                            </div>
                            <div class="answer-time">
                                {{formatTime(createDate)}}
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <!-- 评论 -->
                <div class="comment" style="text-align: left" v-show="commentShow">
                    <!-- 历史评论 -->
                    <div class="comment-item" style="margin-bottom: 10px;border-bottom: 1px dashed #E3E3E3;">
                        <span style="font-size: 13px;color: #666;margin-bottom: 10px;display: block;">11</span>
                    </div>
                    <div class="comment-item" style="margin-bottom: 10px;border-bottom: 1px dashed #E3E3E3;">
                        <span style="font-size: 13px;color: #666;margin-bottom: 10px;display: block;">11</span>
                    </div>
                    <!-- 写评论 -->
                    <el-row class="comment-answer">
                        <el-col :span="20">
                            <el-input type="textarea" autosize placeholder="请输入内容" v-model="textarea1">
                            </el-input>
                        </el-col>
                        <el-col :span="4" style="text-align: center">
                            <el-button size="small" style="    height: 32px;width: 82px;">提交评论</el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';

    export default {
        //import引入的组件需要注入到对象中才能使用
        components: {},
        props: ['answerObj'],
        data() {
            //这里存放数据，可以先自定义变量var
            return {
                answerAvatar: "item/upload/none/none.png",
                textarea1: '',
                commentShow: false,
                isShoucang: false,
                count: 0,
                content: '',
                createUserName: '',
                createDate: ''
            };
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            handleHate() {
                if (this.count > 0) {
                    this.count--
                }
            },

            enter: function(el) {
                el.currentTarget.style.color = '#797979'
            },
            leave: function(el) {
                el.currentTarget.style.color = '#999'
            },
            enterVote: function(el) {
                el.currentTarget.style.color = '#EFB558'
            },
            leaveVote: function(el) {
                el.currentTarget.style.color = '#000'
            },
            enterVoteBtn: function(el) {
                el.currentTarget.style.background = '#EAEAEA'
            },
            leaveVoteBtn: function(el) {
                el.currentTarget.style.background = '#fff'
            },
            formatNumber(n) {
                n = n.toString()
                return n[1] ? n : '0' + n;
            },
            formatTime(number) {
                let time = new Date(number)
                let newArr = []
                let formatArr = ['Y', 'M', 'D', 'h', 'm', 's']
                newArr.push(time.getFullYear())
                newArr.push(this.formatNumber(time.getMonth() + 1))
                newArr.push(this.formatNumber(time.getDate()))

                newArr.push(this.formatNumber(time.getHours()))
                newArr.push(this.formatNumber(time.getMinutes()))
                newArr.push(this.formatNumber(time.getSeconds()))
                let format = 'Y-M-D h:m:s';
                for (let i in newArr) {
                    format = format.replace(formatArr[i], newArr[i])
                }
                return format;
            },
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {
            debugger
            let obj = this.answerObj;
            this.content = obj.content;
            this.createUserName = obj.createUserName;
            this.createDate = obj.createDate;


            // 加载头像
            let path = "item/upload/" + obj.createBy + "/avatar.jpg";
            try {
                let a = require('../../../' + path);
            } catch (e) {
                path = "item/upload/none/none.png";
            }
            this.answerAvatar = path;
        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {},
    }
</script>
<style lang='scss' scoped>
    @import url("./index.scss");
</style>