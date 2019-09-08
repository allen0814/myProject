<!--  -->
<template>
    <!--  style="width: 830px;height: 400px;overflow: scroll;" -->
    <div style="padding: 20px;">
        <Question :questionId4="questionId3" :userId2="userId1" @getAnswerCount='ansCount'></Question>
        <el-row style="width: 825px;margin-bottom:15px;">
            <el-col :span="12" style="text-align: left;">
                <span style="font-size: 22px;">{{answers}}个回答</span>
            </el-col>
            <el-col :span="12" style="text-align: right;">
                <el-button-group>
                    <el-button size="mini" type="primary" style="font-weight: normal;padding: 4px;color: #333;
                    background-color: #fff;
                    border-color: #adadad;">点赞排序</el-button>
                    <el-button size="mini" type="primary" style="font-weight: normal;padding: 4px;color: #333;
                    background-color: #e6e6e6;
                    border-color: #adadad;">时间排序</el-button>
                </el-button-group>
            </el-col>
        </el-row>
        <Answer :questionId5="questionId3" v-for="(answer,index) in answerList" :key="index" :answerObj="answer"></Answer>
    </div>
</template>

<script>
    import Question from "../components/dialogue/question/index.vue"
    import Answer from "../components/dialogue/answer/index.vue"

    export default {
        components: {
            Question,
            Answer
        },
        props: ['questionId2', 'userId'],
        data() {
            //这里存放数据，可以先自定义变量var
            return {
                questionId3: '',
                userId1: '',
                answers: 0,
                answerList: []
            };
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            ansCount(num) {
                this.answers = num;
            }
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {
            this.questionId3 = this.questionId2;
            this.userId1 = this.userId;
            debugger
            let param = {};
            param.questionId = this.questionId3;
            let url = 'answer/query';
            this.$api.post(url, param, null, r => {
                debugger;
                if (r.success) {
                    this.answerList = r.data
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
    }
</script>
<style lang='scss' scoped>
    /* @import url(); 引入公共css类 */
</style>