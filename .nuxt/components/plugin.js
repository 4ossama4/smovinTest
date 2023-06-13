import Vue from 'vue'
import { wrapFunctional } from './utils'

const components = {
  Task: () => import('../../components/task.vue' /* webpackChunkName: "components/task" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
