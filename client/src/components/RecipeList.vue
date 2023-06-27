<template lang="">
  <div v-if="recipes.length > 0">
    <recipe-item v-for="recipe in recipes" :recipe="recipe" ::key="recipe.id" />
  </div>
  <h3 v-else>По вашему запросу постов не найдено</h3>
</template>
<script>
import RecipeItem from "@/components/RecipeItem";
export default {
  components: {
    RecipeItem,
  },
  props: {
    recipes: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style lang="css" scoped></style>
