import { wrapFunctional } from './utils'

export { default as Task } from '../../components/task.vue'

export const LazyTask = import('../../components/task.vue' /* webpackChunkName: "components/task" */).then(c => wrapFunctional(c.default || c))
