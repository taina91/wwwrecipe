import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import RecipeView from "../views/RecipeView.vue";
import OneRecipeView from "../views/OneRecipeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/recipes",
    name: "recipes",
    component: RecipeView,
  },
  {
    path: "/recipes/:id",
    name: "recipe",
    component: OneRecipeView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
