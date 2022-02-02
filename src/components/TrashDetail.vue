<template>
    <div id="trash" class="detail">
        <div class="note-sidebar">
            <h3 class="notebook-title">回收站</h3>
            <div class="menu">
                <div>更新时间</div>
                <div>标题</div>
            </div>
            <ul class="notes">
                <li v-for="note in trashNotes" :key="note.id">
                    <router-link :to="`/trash?noteId=${note.id}`">
                        <span class="date">{{note.updatedAt|friendlyDate}}</span>
                        <span class="title">{{note.title}}</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="note-detail">
            <div class="note-bar" v-if="currentTrashNote.id">
                <span>创建日期: {{currentTrashNote.createdAt|friendlyDate}}</span>
                <span> | </span>
                <span>更新日期: {{currentTrashNote.updatedAt|friendlyDate}}</span>
                <span> | </span>
                <span> 所属笔记本:{{belongTo}}</span>
                <a class="btn action" @click="onRevert">恢复</a>
                <a class="btn action" @click="onDelete">彻底删除</a>
            </div>
            <div class="note-title">
                <span>{{currentTrashNote.title}}</span>
            </div>
            <div class="editor">
                <div class="preview markdown-body" v-html="compiledMarkdown"></div>
            </div>
        </div>
    </div>
</template>
<script>
import MarkdownIt from 'markdown-it'
import { mapActions, mapMutations, mapGetters } from 'vuex'

const md = new MarkdownIt()

export default {
    name: 'Login',
    data() {
        return {}
    },

    computed: {
        ...mapGetters(['currentTrashNote', 'trashNotes', 'belongTo']),

        compiledMarkdown() {
            return md.render(this.currentTrashNote.content || '')
        }
    },

    created() {
        this.checkLogin()
        this.getNotebooks()
        this.getTrashNotes().then(_ => {
            const { noteId } = this.$route.query
            const currentTrashNoteId = noteId ? +noteId : null
            this.setCurrentTrashNoteId({ currentTrashNoteId })
            this.$router.replace({
                path: '/trash',
                query: {
                    noteId: this.currentTrashNote.id
                }
            })
        })
    },

    methods: {
        ...mapMutations(['setCurrentTrashNoteId']),

        ...mapActions(['checkLogin', 'getNotebooks', 'getTrashNotes', 'deleteTrashNote', 'revertTrashNote']),

        onDelete() {
            const note = this.currentTrashNote

            this.$confirm(`删除笔记 ${note.title} 后将无法恢复`, '确定删除？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(_ => {
                return this.deleteTrashNote({ noteId: note.id })
            }).then(_ => {
                this.setCurrentTrashNoteId()
                this.$router.replace({
                    path: '/trash',
                    query: {
                        noteId: this.currentTrashNote.id
                    }
                })
            })
        },

        onRevert() {
            this.revertTrashNote({ noteId: this.currentTrashNote.id })
                .then(_ => {
                    this.setCurrentTrashNoteId()
                    this.$router.replace({
                        path: '/trash',
                        query: {
                            noteId: this.currentTrashNote.id
                        }
                    })
                })
        }

    },

    beforeRouteUpdate(to, from, next) {
        this.setCurrentTrashNoteId({ currentTrashNoteId: +to.query.noteId })
        next()
    }

}
</script>

<style lang="less" scoped>
@import url(../assets/css/note-sidebar.less);
@import url(../assets/css/note-detail.less);
#trash {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
  .note-bar {
    span:last-of-type {
      flex: 1;
    }
    .action {
      margin-right: 10px;
      padding: 2px 4px;
      font-size: 12px;
      &:last-child {
        margin-right: 20px;
      }
    }
  }
  .note-title {
    padding: 10px 20px;
  }
}
</style>
