import { createRouter, createWebHistory } from 'vue-router'
import MyTasks from '../components/MyTasks.vue'
import SearchTask from '../components/SearchTask.vue'

const routes = [
  {
    path: '/',
    name: 'MyTasks',
    component: MyTasks
  },
  {
    path: '/search',
    name: 'search',
    component: SearchTask
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
