import Api from "@/services/Api";

export default {
  recipe(params) {
    return Api().get("api/recipe", params);
  },
  recipeId(id) {
    return Api().get(`api/recipe/${id}`);
  },
};
