<!--  -->
<template>
    <div style="width: 825px;margin-bottom: 15px;">
        <el-row class="question-title">
            <h1>{{title}}</h1>
            <el-tag type="success" size="mini" v-for="tag in tags" :key="tag" class="miniTag">{{tag}}
            </el-tag>
            <span class="browse_count">{{browseCount}} 次浏览</span>
        </el-row>
        <el-row class="myQuestion">
            <el-col :span="2">
                <!-- 赞/踩 -->
                <div class="vote" @mouseenter="enterVoteBtn" @mouseleave="leaveVoteBtn">
                    <button @click="handleLike" class="like" @mouseenter="enterVote" @mouseleave="leaveVote">
                        <i class="el-icon-caret-top"></i>
                    </button>
                    <span>{{likeCount}}</span>
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
                <div class="question-body">
                    <div class="ql-container ql-snow">
                        <div class="ql-editor">
                            <div class="details_box" v-html="content"> </div>
                        </div>
                    </div>
                </div>
                <el-row class="question-operate">
                    <!-- 操作区 -->
                    <el-col :span="16">
                        <ul>
                            <li>
                                <button class="watch" @mouseenter="enterWatch" @mouseleave="leaveWatch" @click="doWatch">
                                    {{hasWatch?'已关注':'关注'}}
                                    <span>|</span>
                                    {{followCount}}
                                </button>
                            </li>
                            <li>
                                <button class="shoucang" @mouseenter="enter" @mouseleave="leave">
                                    收藏
                                </button>
                            </li>
                            <li>
                                <button class="shoucang" @mouseenter="enter" @mouseleave="leave" @click="isEditorShow=!isEditorShow">
                                    回答
                                </button>
                            </li>
                        </ul>
                    </el-col>
                    <!-- 用户信息 -->
                    <el-col :span="8" class="question-user">
                        <div class="question-avatar">
                            <el-avatar :src="require('../../../' + circleAvatar)"></el-avatar>
                        </div>
                        <div class="question-info">
                            <div class="question-name">
                                <span>{{createUserName}}</span>
                                <i class="iconfont el-icon-my-mla"></i>
                                <label>235</label>
                            </div>
                            <div class="question-time">
                                {{formatTime(createDate)}}
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <div v-show="isEditorShow" class="comment-editor">
            <h4>撰写答案</h4>
            <el-button size="medium" type="primary" plain class="submitBtn" @click="submit">提交答案</el-button>
            <Editor ref="commentEditor" height="100px"></Editor>
        </div>
    </div>
</template>

<script>
    import Editor from "../../editor/index.vue"
    export default {
        props: ['questionId4', 'userId2'],
        components: {
            Editor
        },
        data() {
            return {
                circleAvatar: "item/upload/none/none.png",
                isEditorShow: false,
                id: '',
                tags: [],
                title: '',
                content: '',
                browseCount: '',
                likeCount: '',
                followCount: '',
                answerCount: '',
                createUserName: '',
                createDate: '',
                hasWatch: false
            };
        },
        methods: {
            submit() {
                let content = this.$refs.commentEditor.getHtmlText();
                let param = {};
                param.createBy = this.userId2;
                param.questionId = this.questionId4;
                param.content = content;

                let url = 'answer/save';
                this.$api.post(url, param, null, r => {
                    debugger;
                    if (r.success) {
                        this.$message({
                            type: 'success',
                            message: '提交成功!'
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: '提交失败!'
                        });
                    }
                })
            },

            handleLike() {
                debugger
                this.likeCount++

                this.doUpdate();
            },
            handleHate() {
                if (this.likeCount > 0) {
                    this.likeCount--
                    this.doUpdate();
                }
            },

            enterWatch: function(el) {
                el.currentTarget.style.backgroundColor = '#449d44'
                el.currentTarget.style.borderColor = '#398439'
            },
            leaveWatch: function(el) {
                if (!this.hasWatch) {
                    el.currentTarget.style.backgroundColor = '#5cb85c'
                    el.currentTarget.style.borderColor = '#4cae4c'
                }

            },
            doWatch() {
                this.hasWatch = !this.hasWatch;
                if (this.hasWatch) {
                    this.followCount++
                } else {
                    this.followCount--
                }
                this.doUpdate();
            },
            enter: function(el) {
                el.currentTarget.style.background = '#EAEAEA'
            },
            leave: function(el) {
                el.currentTarget.style.background = '#fff'
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
            doUpdate() {
                let param = {};
                param.id = this.id;
                param.likeCount = this.likeCount;
                param.browseCount = this.browseCount;
                param.followCount = this.followCount;
                param.answerCount = this.answerCount;
                let url = 'question/update';
                this.$api.post(url, param, null, r => {
                    if (r.success) {

                    } else {

                    }
                })
            }
        },
        created() {
            this.id = this.questionId4
            let param = {};
            param.id = this.id;
            let url = 'question/single';
            this.$api.post(url, param, null, r => {
                if (r.success) {
                    var questionObj = r.data;
                    this.tags = questionObj.tag.split(',');
                    this.title = questionObj.title;
                    this.content = questionObj.content;
                    this.browseCount = questionObj.browseCount + 1;
                    this.likeCount = questionObj.likeCount;
                    this.followCount = questionObj.followCount;
                    this.answerCount = questionObj.answerCount;
                    this.createUserName = questionObj.createUserName;
                    this.createDate = questionObj.createDate;

                    // 加载头像
                    let path = "item/upload/" + questionObj.createBy + "/avatar.jpg";
                    try {
                        let a = require('../../../' + path);
                    } catch (e) {
                        path = "item/upload/none/none.png";
                    }
                    this.circleAvatar = path;

                    this.doUpdate();

                    this.$emit('getAnswerCount', questionObj.answerCount)
                } else {
                    this.$message({
                        type: 'error',
                        message: 'error!'
                    });
                }
            })
        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {

        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //生命周期 - 创建完成（可以访问当前this实例）
    }
</script>
<style lang='scss' scoped>
    @import url("./index.scss");
</style>