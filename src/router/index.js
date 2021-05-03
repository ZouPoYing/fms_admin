import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/views/login/Login";
import FundManage from "../views/fundManage/FundManage";
import UpAndDownManage from "../views/upAndDownManage/UpAndDownManage";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/fundManage',
      name: 'FundManage',
      component: FundManage
    },
    {
      path: '/upAndDownManage',
      name: 'UpAndDownManage',
      component: UpAndDownManage
    }
  ]
})
