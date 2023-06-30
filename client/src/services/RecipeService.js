import Api from "@/services/Api";

export default {
  recipe(params) {
    return Api().get("api/recipe", params);
  },
  recipeId(id) {
    return Api().get(`api/recipe/${id}`);
  },
  recipeOptions(params) {
    return Api().get("api/recipeoptions", params);
  },
  products() {
    return Api().get("api/products");
  },
  tegs() {
    return Api().get("api/tegs");
  },
};
