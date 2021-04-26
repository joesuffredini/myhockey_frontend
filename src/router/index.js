import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import Signup from "../views/Signup.vue";
import SchoolShow from "../views/SchoolShow.vue";
import SchoolIndex from "../views/SchoolIndex.vue";
import UserIndex from "../views/UserIndex.vue";
import UserShow from "../views/UserShow.vue";
import RecruitShow from "../views/RecruitShow.vue";
import RecruitIndex from "../views/RecruitIndex.vue";
import SchoolSelection from "../views/SchoolSelection.vue";
import MyprofileEdit from "../views/MyprofileEdit.vue";
import MyschoolEdit from "../views/MyschoolEdit.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  { path: "/login", name: "login", component: Login },
  { path: "/logout", name: "logout", component: Logout },
  { path: "/signup", name: "signup", component: Signup },
  { path: "/school/:id", name: "schoolshow", component: SchoolShow},
  { path: "/school", name: "schoolindex", component: SchoolIndex},
  { path: "/user", name: "userindex", component: UserIndex},
  { path: "/user/:id", name: "usershow", component: UserShow},
  { path: "/recruit/:id", name: "recruitshow", component: RecruitShow},
  { path: "/recruit", name: "recruitindex", component: RecruitIndex},
  { path: "/schoolselection", name: "schoolselectioncreate", component: SchoolSelection},
  { path: "/user/:id/edit", name: "myprofile-edit", component: MyprofileEdit},
  { path: "/school/:id/edit", name: "myschool-edit", component: MyschoolEdit},
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
