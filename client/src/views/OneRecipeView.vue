<template lang="">
  <div v-if="loading">
    <div>
      <recipe-item :recipe="recipe" />
    </div>
    <cooking-list :recipe="recipe" />
  </div>
</template>
<script>
import RecipeItem from "@/components/RecipeItem";
import CookingList from "@/components/CookingList";
import RecipeService from "@/services/RecipeService";

export default {
  components: {
    RecipeItem,
    CookingList,
  },
  data() {
    return {
      recipe: {},
      loading: false,
    };
  },
  methods: {
    async fetchRecipe() {
      try {
        console.log(this.$route.params.id);
        const response = await RecipeService.recipeId(this.$route.params.id);
        console.log(response.data);
        this.recipe = response.data;
        console.log(this.recipe);
        this.loading = true;
        console.log(this.loading);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.fetchRecipe();
  },
};
</script>
<style lang="css"></style>
