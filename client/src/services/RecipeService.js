import Api from "@/services/Api";

export default {
  recipe(params) {
    return Api().get("api/recipe", params);
  },
};
