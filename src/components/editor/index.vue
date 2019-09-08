<template>
    <div>
        <div class="quill-editor-example">
            <!-- @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)" -->
            <quill-editor ref="myTextEditor" v-model="content" @textChange="onTextChange($event)" :options="editorOption">
            </quill-editor>
            <!-- <div class="quill-code">
                    <code class="hljs" v-html="contentCode"></code>
                </div> -->
        </div>
    </div>
</template>

<script>
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import { quillEditor } from 'vue-quill-editor'
    import hljs from 'highlight.js'
    import 'highlight.js/styles/atom-one-light.css'

    export default {
        //import引入的组件需要注入到对象中才能使用
        components: {
            quillEditor
        },
        props: ['height'],
        data() {
            return {
                name: 'editor',
                content: '',
                editorOption: {
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
                            [{ 'header': 1 }, { 'header': 2 }],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            // [{ 'script': 'sub' }, { 'script': 'super' }],
                            [{ 'indent': '-1' }, { 'indent': '+1' }],
                            // [{'direction': 'rtl'}],
                            [{ 'size': ['small', false, 'large', 'huge'] }],
                            // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            // [{ 'font': [] }],
                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'align': [] }],
                            ['link', 'image', 'clean']
                        ],
                        syntax: {
                            highlight: text => hljs.highlightAuto(text).value
                        }
                    }
                },
                myEditor: ''
            }
        },
        //监听属性 类似于data概念
        computed: {
            editor() {
                return this.$refs.myTextEditor.quill
            },
            contentCode() {
                return hljs.highlightAuto(this.content).value
            }
        },
        methods: {
            getHtmlText() {
                var delta = this.editor.container.firstChild.innerHTML;
                return delta;
            }
            // onEditorBlur(editor) {
            //     console.log(this.editor);
            //     console.log('editor blur!', editor)
            //     // var delta = editor.getContents();
            // },
            // onEditorFocus(editor) {
            //     console.log('editor focus!', editor)
            // },
            // onEditorReady(editor) {

            //     this.myEditor = editor;
            //     console.log('editor ready!', editor)
            // }
        },
        //监控data中的数据变化
        watch: {},
        //方法集合
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {},
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            $('.ql-toolbar').css('border-top-left-radius', '4px').css('border-top-right-radius', '4px')
            $('.ql-container').css('border-bottom-left-radius', '4px').css('border-bottom-right-radius', '4px').css(
                'min-height', this.height)
        }
    }
</script>
<style lang='scss'>
    /* @import url(); 引入公共css类 */
    .ql-container.ql-snow {
        background: #fff;
    }

    .ql-toolbar.ql-snow {
        background: #f3f3f3;
    }
</style>