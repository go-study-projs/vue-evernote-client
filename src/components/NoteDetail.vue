<template>
    <div id="note" class="detail">
        <NoteSidebar :notes.sync="notes"></NoteSidebar>
        <div class="note-detail">
            <div class="note-empty" v-show="!currentNote.id">请选择笔记</div>
            <div class="note-detail-ct" v-show="currentNote.id">
                <div class="note-bar">
                    <span>创建日期: {{currentNote.createdAt|friendlyDate}}</span>
                    <span>|</span>
                    <span>更新日期: {{currentNote.updatedAt|friendlyDate}}</span>
                    <span>|</span>
                    <span class="save">{{statusText}}</span>
                    <span class="iconfont icon-fullscreen" @click="isShowPreview=!isShowPreview"></span>
                    <span class="iconfont icon-delete" @click="onDeleteNote"></span>
                </div>
                <div class="note-title">
                    <input type="text" v-model="currentNote.title" @input="onUpdateNote" @keydown="statusText='输入中...'" placeholder="输入标题">
                </div>
                <div class="editor">
                    <textarea v-show="!isShowPreview" v-model="currentNote.content" @input="onUpdateNote" @keydown="statusText='输入中...'" placeholder="输入内容, 支持 markdown 语法">
                    </textarea>
                    <div class="preview markdown-body" v-html="previewContent" v-show="isShowPreview"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NoteSidebar from '@/components/NoteSidebar'
import _ from 'loadsh'
import MarkdownIt from 'markdown-it'
import { mapActions, mapGetters, mapMutations } from 'vuex'

const md = new MarkdownIt()

export default {
    components: { NoteSidebar },
    name: 'NodeDetail',
    data() {
        return {
            statusText: '笔记未更新',
            isShowPreview: false
        }
    },

    computed: {
        ...mapGetters(['notes', 'currentNote', 'currentNoteId']),

        previewContent() {
            return md.render(this.currentNote.content || '')
        }
    },

    created() {
        this.checkLogin()
    },

    methods: {
        ...mapMutations(['setCurrentNoteId']),

        ...mapActions(['checkLogin', 'updateNote', 'deleteNote']),

        onUpdateNote: _.debounce(function() {
            const { id: noteId, title, content } = this.currentNote
            this.updateNote({ noteId, title, content })
                .then(data => {
                    this.statusText = '已保存'
                }).catch(data => {
                    this.statusText = '保存出错'
                })
        }, 300),

        onDeleteNote() {
            this.deleteNote({ noteId: this.currentNote.id })
                .then(data => {
                    this.$router.replace({
                        path: '/note',
                        query: {
                            noteId: this.currentNote.id
                        }
                    })
                })
        }
    },

    beforeRouteUpdate(to, from, next) {
        this.setCurrentNoteId({ currentNoteId: +to.query.noteId })
        next()
    }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/note-detail.less);
#note {
  display: flex;
  align-items: stretch;
  flex: 1;
  background-color: #fff;
}
</style>
