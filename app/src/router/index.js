import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/userList",
    name: "UserList",
	title:"用户查询",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/UserList.vue")
  },
  {
    path: "/userAdd",
    name: "UserAdd",
	title:"用户新增",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/UserAdd.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
