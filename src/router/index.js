import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import EmpresasTable from '../views/EmpresasTable'
import OfertasForm from '../views/OfertasForm'
import OfertasTable from '../views/OfertasTable'
import Empresa from '../views/EmpresaVista'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/empresas',
    name: 'Empresas',
    component: EmpresasTable
  },
  {
    path: '/new',
    name: 'OfertasForm',
    component: OfertasForm
  },

  {
    path: '/editOfer/:id',
    name: 'FormEdit',
    component: OfertasForm,
    props:true
  },
  {
    path: '/ofertas/:id',
    name: 'OfertasTable',
    component: OfertasTable,
    props: true
  },

  {
    path: '/empresa/:id',
    name: 'Empresa',
    component: Empresa,
    props: true
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
