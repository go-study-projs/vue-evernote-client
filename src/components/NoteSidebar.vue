<template>
    <div class="note-sidebar">
        <el-button size="mini" round class="add-note" @click="onAddNote">添加笔记</el-button>
        <el-dropdown class="notebook-title" placement="bottom" @command="handleCommand">
            <span class="el-dropdown-link">
                {{currentNotebook.title}}
                <i class="iconfont icon-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="notebook in notebooks" :command="notebook.id" :key="notebook.id">
                    {{notebook.title}}
                </el-dropdown-item>
                <el-dropdown-item command="trash">回收站</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <div class="menu">
            <div>更新时间</div>
            <div>标题</div>
        </div>
        <ul class="notes">
            <li v-for="note in notes" :key="note.id">
                <router-link :to="`/note?notebookId=${currentNotebook.id}&noteId=${note.id}`">
                    <span class="date">{{note.updatedAt|friendlyDate}}</span>
                    <span class="title">{{note.title}}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {

    data() {
        return {}
    },

    computed: {
        ...mapGetters(['notebooks', 'notes', 'currentNote', 'currentNotebook'])
    },

    created() {
        this.getNotebooks().then(_ => {
            this.setCurrentBookId({ currentNotebookId: +this.$route.query.notebookId })
            return this.getNotes({ notebookId: this.currentNotebook.id })
        }).then(_ => {
            this.setCurrentNoteId({ currentNoteId: +this.$route.query.noteId })
            this.$router.replace({
                path: '/note',
                query: {
                    notebookId: this.currentNotebook.id,
                    noteId: this.currentNote.id
                }
            })
        })
    },

    methods: {
        ...mapMutations(['setCurrentBookId', 'setCurrentNoteId']),
        ...mapActions(['getNotebooks', 'getNotes', 'addNote']),

        handleCommand(notebookId) {
            if (notebookId === 'trash') {
                return this.$router.push({ path: '/trash' })
            }
            this.setCurrentBookId({ currentNotebookId: notebookId })
            this.getNotes({ notebookId })
                .then(_ => {
                    this.setCurrentNoteId()
                    this.$router.replace({
                        path: '/note',
                        query: {
                            notebookId: this.currentNotebook.id,
                            noteId: this.currentNote.id
                        }
                    })
                })
        },

        onAddNote() {
            this.addNote({ notebookId: this.currentNotebook.id })
                .then(noteId => {
                    this.setCurrentNoteId({ currentNoteId: noteId })
                })
        }
    }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/note-sidebar.less);
</style>
