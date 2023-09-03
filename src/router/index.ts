import { createRouter, createWebHashHistory } from "vue-router";
import NewsPage from "../pages/news/index.vue";

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: NewsPage,
      meta: {
      },
    },
    {
      path: "/login",
      name: "Login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../pages/login/index.vue"),
    },
    {
      path: "/news/detail",
      name: "NewsDetail",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../pages/news/detail.vue"),
    },
  ],
});

export default router;
