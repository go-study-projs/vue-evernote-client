// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import filters from '@/helpers/filter'
import Vue from 'vue'

import {
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Message,
    MessageBox,
    Button
} from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './store'

// 全局过滤器
for (let key in filters) {
    Vue.filter(key, filters[key])
}

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt

/* eslint-disable no-new */
window.vm = new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
