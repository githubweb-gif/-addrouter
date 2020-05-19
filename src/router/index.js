import Vue from 'vue'
import VueRouter from 'vue-router'
import page from '../views/page.vue'
import icon from '../views/icon.vue'
import role from '../views/role.vue'
import Login from '../views/login.vue'
import setRoles from '../views/setRoles.vue'
import Layout from '../views/layout.vue'

Vue.use(VueRouter)

export const routeList = [
  {
    path: '/login',
    component: Login,
    hidden: true,
    meta: { title: 'Login' }
  },
  {
    path: '/setRoles',
    component: Layout,
    redirect: '/setRoles/index',
    children: [{
      path: 'index',
      component: setRoles,
      meta: { title: 'setRoles' }
    }]
  }
]

export const asyncRoutes = [{
  path: '/home',
  redirect: '/home/page',
  component: Layout,
  meta: {
    roles: ['admin', 'editor'],
    title: 'home'
  },
  children: [
    {
      path: 'page',
      component: page,
      meta: {
        roles: ['editor'],
        title: 'page'
      }
    },
    {
      path: 'role',
      component: role,
      meta: {
        roles: ['admin'],
        title: 'role'
      }
    }
  ]
},
{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    component: icon,
    meta: { title: 'dashboard' }
  }]
}
]

const router = new VueRouter({
  routes: routeList
})

export default router
