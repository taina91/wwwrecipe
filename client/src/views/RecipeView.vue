<template lang="">
  <div>
    <div class="search">
      <my-input class="input" />
      <!-- <button class="btn__s">
        <img src="@/img/magnifier.svg" alt="" />
      </button> -->
      <my-button style="flex: 0 0 auto">Расширенный поиск</my-button>
    </div>
    <recipe-list :recipes="recipes" />
  </div>
</template>
<script>
import RecipeList from "@/components/RecipeList";
import RecipeService from "@/services/RecipeService";

export default {
  components: {
    RecipeList,
  },
  data() {
    return {
      recipes: [],
      page: 1,
      limit: 10,
    };
  },
  methods: {
    async fetchRecipes() {
      try {
        const response = await RecipeService.recipe({
          params: {
            page: this.page,
            limit: this.limit,
          },
        });
        console.log(response.data);
        this.recipes = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.fetchRecipes();
  },
};
</script>
<style lang="css">
.search {
  display: flex;
  margin: 0 25px;
}
.input {
  border-radius: 100px 0px 0px 0px;
  border: none;
  padding: 15px 35px;
  border: 2px solid transparent;
  width: 100%;
}
.input:focus {
  outline: none;
  border: 2px solid #ff5800;
}
.btn__s {
  background: #ff5800;
  border-radius: 0px 0px 100px 0px;
  padding: 5px 25px 5px 15px;
  border: none;
  color: #ffffff;
  font-weight: 700;
}
</style>
