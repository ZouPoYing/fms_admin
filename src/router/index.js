import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/views/login/Login";
import FundManage from "../views/fundManage/FundManage";
import UpAndDownManage from "../views/upAndDownManage/UpAndDownManage";
import UserManage from "../views/userManage/UserManage";
import FkManage from "../views/fk/FkManage";

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
    },
    {
      path: '/userManage',
      name: 'UserManage',
      component: UserManage
    },
    {
      path: '/fkManage',
      name: 'FkManage',
      component: FkManage
    }
  ]
})
