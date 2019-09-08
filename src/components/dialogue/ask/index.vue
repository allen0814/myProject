<template>
    <div style="background: #f3f3f3;">
        <el-row class="ask-top">
            <el-col :span="12" class="ask-top-left">
                <span>{{userName}}</span>
                <span>提问</span>
            </el-col>
            <el-col :span="12" class="ask-top-right">
                <el-button type="primary" @click="submit" size="medium">发布问题</el-button>
            </el-col>
        </el-row>
        <el-row style="width: 98%;margin: 0 auto;">
            <!-- 标题 -->
            <el-row style="margin-bottom: 15px;">
                <el-input size="large" v-model="title" placeholder="标题：一句话说清问题，用问号结尾">
                </el-input>
            </el-row>
            <!-- 标签 -->
            <el-row style="margin-bottom: 15px;">
                <div class="tagInput">
                    <!-- 选择标签 -->
                    <el-button size="mini" @click="cardShow=!cardShow" style="margin-bottom: 4px;">选择标签</el-button>
                    <!-- 新建标签 -->
                    <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                    </el-input>
                    <el-button class="button-new-tag" size="mini" v-else @click="showInput">新建标签
                    </el-button>
                    <!-- 展示标签 -->
                    <el-tag :id='tag' type="success" size="small" closable @close="handleClose(tag)" v-for="tag in selectTags" :key="tag" style="margin-right:6px;">
                        {{tag}}
                    </el-tag>
                </div>
                <!-- 标签选择模版 -->
                <el-card v-show="cardShow" style="width: 520px;height:160px;display: block;position: absolute;z-index: 2;line-height: 28px;">
                    <el-tag type="success" size="small" v-for="tag in tags" :key="tag" @click="selectTag(tag)" style="margin-right: 6px;border-radius:12px;padding:0 10px;cursor: pointer;">{{tag}}
                    </el-tag>
                </el-card>
            </el-row>
        </el-row>
        <div style="width: 98%;margin: 0 auto;">
            <Editor ref='myEditor' height="380px"></Editor>
        </div>

    </div>
</template>

<script>
    import Editor from "../../editor/index.vue"
    export default {
        components: { Editor },
        props: ['userId', 'userName'],
        data() {
            return {
                title: '',
                cardShow: false,
                selectTags: [],
                tags: ['vue', 'php', 'java', 'node', 'html', 'css', 'JAVAScript', 'C++',
                    'scss', 'shell', 'mySql', 'Oracle'
                ],
                inputVisible: false,
                inputValue: ''
            };
        },
        //方法集合
        methods: {
            submit() {

                let content = this.$refs.myEditor.getHtmlText();
                let param = {};
                param.title = this.title;
                param.tag = this.selectTags.join(',');
                param.content = content;
                param.createBy = this.userId;
                debugger;
                let url = 'question/save';
                this.$api.post(url, param, null, r => {
                    debugger;
                    if (r.success) {

                    } else {
                        this.$message({
                            type: 'error',
                            message: '提交失败!'
                        });
                    }
                })
            },
            selectTag(tag) {
                if (this.selectTags.length > 4) {
                    this.$message({
                        message: '最多设置5个标签!',
                        type: 'warning'
                    });
                    return;
                }
                if ($.inArray(tag, this.selectTags) > -1) {
                    $("#" + tag).css('border-color', '#faecd8').css('color', '#e6a23c').css(
                        'background-color', '#fdf6ec')
                    $("#" + tag).find('i').css('color', '#e6a23c')
                    setTimeout(() => {
                        $("#" + tag).css('border-color', '#e1f3d8').css('color', '#67c23a').css(
                            'background-color', '#f0f9eb')
                        $("#" + tag).find('i').css('color', '#67c23a')
                    }, 500)
                    return;
                }
                this.selectTags.push(tag);
            },
            handleClose(tag) {
                this.selectTags.splice(this.selectTags.indexOf(tag), 1);
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    if ($.inArray(inputValue, this.tags) > -1 || $.inArray(inputValue, this.selectTags) > -1) {
                        this.$message({
                            message: '新建的标签已存在!',
                            type: 'warning'
                        });
                        this.inputVisible = false;
                        this.inputValue = '';
                        return;
                    }
                    if (this.selectTags.length > 4) {
                        this.$message({
                            message: '最多设置5个标签!',
                            type: 'warning'
                        });
                        this.inputVisible = false;
                        this.inputValue = '';
                        return;
                    }
                    this.selectTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            }
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {},
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {},
    }
</script>
<style lang='scss' scoped>
    @import url("./index.scss");
</style>