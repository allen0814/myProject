<template>
    <div>
        <el-container class="fat">
            <el-aside ref="aside">
                <!-- 左侧导航菜单 -->
                <el-menu :default-active="activeMenu" class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @select="handleLeftMenu">
                    <el-menu-item>
                        <i class="el-icon-set-up" @click="handleCollapse"></i>
                    </el-menu-item>
                    <el-menu-item index="1">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-document-add"></i>
                            <span slot="title">新增资料</span>
                        </template>
                        <el-menu-item index="2-1">基本信息</el-menu-item>
                        <el-menu-item index="2-2">教育经历</el-menu-item>
                        <el-menu-item index="2-3">工作经历</el-menu-item>
                        <el-menu-item index="2-4">掌握技能</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-s-data"></i>
                            <span slot="title">数据管理</span>
                        </template>
                        <el-menu-item index="3-1">表格数据</el-menu-item>
                        <el-menu-item index="3-2">图形数据</el-menu-item>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-s-data"></i>
                            <span slot="title">问题相关</span>
                        </template>
                        <el-menu-item index="4-1">提出问题</el-menu-item>
                        <el-menu-item index="4-2">问题列表</el-menu-item>
                        <el-menu-item index="4-3">问题详情</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="5">
                        <i class="el-icon-chat-dot-round"></i>
                        <span slot="title">联系我们</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header>
                    <el-image style="width: 200px; height: 60px;float: left;" :src="imageUrl" fit="contain"></el-image>
                    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" style="width: 418px;float: left;" background-color="#739aadbf" text-color="#fff" active-text-color="#ffd04b" ref="topMenu">
                        <el-menu-item index="1">处理中心</el-menu-item>
                        <el-submenu index="2">
                            <template slot="title">我的工作台</template>
                            <el-menu-item index="2-1">选项1</el-menu-item>
                            <el-menu-item index="2-2">选项2</el-menu-item>
                            <el-menu-item index="2-3">选项3</el-menu-item>
                            <el-submenu index="2-4">
                                <template slot="title">选项4</template>
                                <el-menu-item index="2-4-1">选项1</el-menu-item>
                                <el-menu-item index="2-4-2">选项2</el-menu-item>
                                <el-menu-item index="2-4-3">选项3</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-menu-item index="3">消息中心</el-menu-item>
                        <el-menu-item index="4">订单管理</el-menu-item>
                    </el-menu>
                    <!-- 个人信息管理 -->
                    <el-dropdown @command="handleCommand" @visible-change="handleDrop" style="margin-right:50px;float: right;cursor: pointer;">
                        <span>
                            {{userName}}
                            <i class="el-icon--right" :class="isDropdown?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="personal" icon="el-icon-user-solid">个人中心</el-dropdown-item>
                            <el-dropdown-item command="b" icon="el-icon-s-tools">账号设置</el-dropdown-item>
                            <el-dropdown-item command="c" icon="el-icon-question">帮助</el-dropdown-item>
                            <el-dropdown-item command="d" icon="el-icon-switch-button">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <!-- 头像 -->
                    <el-avatar size="medium" :src="require('./' + circleUrl)" style="float: right;margin-top: 10px;margin-right: 5px;"></el-avatar>
                    <!-- 消息 -->
                    <el-dropdown @command="handleMessageCommand" style="cursor: pointer;margin-right:20px;float: right;">
                        <el-link :underline="false" :icon="hasMessage?'el-icon-message-solid':'el-icon-bell'">
                            消息
                        </el-link>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="comment" icon="el-icon-chat-dot-square">
                                评论
                                <el-badge class="mark" :value="100" :max="99" />
                            </el-dropdown-item>
                            <el-dropdown-item command="editor" icon="el-icon-view">
                                关注
                                <el-badge class="mark" :value="0" hidden />
                            </el-dropdown-item>
                            <el-dropdown-item command="o" icon="el-icon-magic-stick">
                                点赞
                                <el-badge class="mark" :value="3" />
                            </el-dropdown-item>
                            <el-dropdown-item command="p" icon="el-icon-message">
                                系统通知
                                <el-badge class="mark" :value="1" />
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <i class="iconfont el-icon-my-gouwuche gouwuche" @click="drawer = true"></i>
                    <el-input placeholder="请输入内容" suffix-icon="el-icon-search" v-model="searchCondition" style="float: right;width:200px;margin-right: 15px" size="small">
                    </el-input>
                </el-header>
                <el-main>
                    <p v-if="activeMenu==='1'">首页</p>
                    <Baseinfo v-else-if="activeMenu==='2-1'"></Baseinfo>
                    <Basedata v-else-if="activeMenu==='3-1'"></Basedata>
                    <ChartData v-else-if="activeMenu==='3-2'"></ChartData>
                    <Ask v-else-if="activeMenu==='4-1'" :userId='userId' :userName="userName"></Ask>
                    <QuestionList v-else-if="activeMenu==='4-2'" @goToQuestion="question"></QuestionList>
                    <Question v-else-if="activeMenu==='4-3'" :questionId2="questionId1" :userId='userId'></Question>
                    <Personal v-else-if="activecommand==='personal'" @showAvatar="handeleAvatar" :userId='userId' :userName="userName">
                    </Personal>
                </el-main>
            </el-container>
        </el-container>
        <!-- 右侧抽屉 element UI 2.11.0   当前版本为2.10.1 -->
        <!-- <el-drawer title="我是标题" :visible.sync="drawer" direction="rtl" :before-close="handleClose">
            <span>我来啦!</span>
        </el-drawer> -->
    </div>
</template>
<script>
    import Baseinfo from "./baseinfo.vue"
    import Basedata from "./basedata.vue"
    import ChartData from "./chartData.vue"

    import Ask from "../components/dialogue/ask/index.vue"
    import QuestionList from "./questionList.vue"
    import Question from "./question.vue"

    import Personal from "./personal"

    export default {
        components: {
            Baseinfo,
            Basedata,
            ChartData,
            Question,
            Personal,
            Ask,
            QuestionList
        },
        data() {
            return {
                activeMenu: "4-2", //3-2,3-1,4
                activeIndex: "",
                messageIndex: "", //comment,editor
                activecommand: "", //personal
                isCollapse: false,
                isDropdown: false,
                hasMessage: false,
                searchCondition: '',
                imageUrl: require("./img/logo.jpg"),
                userName: 'admin',
                userId: '',
                circleUrl: "upload/none/none.png",
                drawer: false,
                questionId1: ''
            }
        },
        methods: {
            question(questionId) {
                this.questionId1 = questionId
                this.activeMenu = '4-3'
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            handeleAvatar(data) {
                debugger
            },
            handleLeftMenu(key) {
                if (key) {
                    this.activeMenu = key;
                    this.activeIndex = '';
                }
            },
            handleSelect(key) {
                console.log(key);
            },
            handleCommand(command) {
                if (command) {
                    this.activeMenu = '';
                    this.activeIndex = '';
                    this.activecommand = command;
                }
            },
            handleCollapse() {
                this.isCollapse = !this.isCollapse;
            },
            handleMessageCommand(command) {
                if (command) {
                    this.activeMenu = '';
                    this.activeIndex = '';
                    this.activecommand = '';
                    this.messageIndex = command;
                }
            },
            handleDrop(flag) {
                this.isDropdown = flag;
            },
            getParams() {
                // 接收跳转参数
                let id = this.$route.query.id
                let userName = this.$route.query.userName
                this.userId = id;
                this.userName = userName
                // 如果是params 传参，那就是this.$route.params.site

                // 加载头像
                let path = "upload/" + id + "/avatar.jpg";
                try {
                    let a = require('./' + path);
                } catch (e) {
                    path = "upload/none/none.png";
                }
                this.circleUrl = path;

            }
        },
        created() {
            let self = this
            self.getParams()
        },
        mounted() {
            this.$refs.aside.$el.style.width = ""
            this.$refs.topMenu.$el.style.background = ""
        },
        updated() {
            this.$refs.topMenu.$el.style.background = ""
        }
    }
</script>
<style>
    @import "./scss/home.scss"
</style>