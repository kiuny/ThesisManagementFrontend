import Vue from 'vue'
import VueDragDrop from 'vue-drag-drop'
import Notifications from 'vue-notification'
import AsyncComputed from 'vue-async-computed'
import Vuetify, { VChip } from 'vuetify/lib'
import Vuebar from 'vuebar'
import '@fortawesome/fontawesome-free/css/all.min.css'

Vue.use(Vuetify, {
  components: {
    VChip
  },
  theme: {
    primary: '#9c27b0',
    secondary: '#009688',
    accent: '#ff5722',
    error: '#f44336',
    warning: '#ffc107',
    info: '#03a9f4',
    success: '#8bc34a'
  },
  icons: {
    iconfont: 'fa'
  }
})

Vue.use(AsyncComputed)
Vue.use(Notifications)
Vue.use(VueDragDrop)
Vue.use(Vuebar)
