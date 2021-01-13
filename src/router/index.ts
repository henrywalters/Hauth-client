import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: 'Login' */ '../views/Login.vue'),
  },
  {
    path: '/register/:orgId?',
    name: 'Register',
    component: () => import(/* webpackChunkName: 'Register' */ '../views/Register.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: 'Dashboard' */ '../views/Dashboard.vue'),
    children: [
      {
        name: 'CreateOrganization',
        path: 'organization',
        component: () => import(/* webpackChunkname: 'Organization' */ '../views/Dashboard/CreateOrganization.vue')
      },
      {
        name: 'Organization',
        path: 'organization/:orgId',
        component: () => import(/* webpackChunkName: 'Organization' */ '../views/Dashboard/Organization.vue'),
        children: [
          {
            name: 'Privileges',
            path: 'privileges',
            component: () => import(/* webpackChunkName: 'Privileges' */ '../views/Dashboard/Privileges.vue'),
          },
          {
            name: 'Roles',
            path: 'roles',
            component: () => import(/*webpackChunkName: 'Roles' */ '../views/Dashboard/Roles.vue'),
          },
          {
            name: 'Users',
            path: 'users',
            component: () => import(/*webpackChunkName: 'Users' */ '../views/Dashboard/Users.vue'),
          },
          {
            name: 'Applications',
            path: 'applications',
            component: () => import(/*webpackChunkName: 'Applications' */ '../views/Dashboard/Applications.vue'),
          }
        ]
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
