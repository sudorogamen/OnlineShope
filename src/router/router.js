import MainPage from "@/pages/MainPage.vue";
import ProductPage from "@/pages/ProductPage.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage,
  },
  {
    path: "/prod/:id",
    name: "ProductPage",
    component: ProductPage,
    props: (route) => ({
      product:  JSON.parse(sessionStorage.getItem("products")),
      // product: JSON.parse(route.query.product)
    }),
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
