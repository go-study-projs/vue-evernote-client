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
import App from './App.vue'
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

const app = new Vue({
  router,
  store,
  render: (h) => h(App)
})

app.$mount('#app')
