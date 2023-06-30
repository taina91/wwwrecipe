<template lang="">
  <div class="recipes-view">
    <div class="search">
      <input v-model="searchQuery" class="input" />
      <button class="btn__s" @click="searchedRecipe">
        <img src="@/assets/magnifier.svg" alt="" />
      </button>
      <my-button
        style="flex: 0 0 auto"
        v-if="!moreSeartch"
        @click="showMoreParamSeartch"
        >Расширенный поиск</my-button
      >
      <my-button style="flex: 0 0 auto" v-else @click="showMoreParamSeartch"
        >Скрыть поиск</my-button
      >
    </div>
    <div class="searth-params" v-if="moreSeartch">
      <fieldset>
        <legend>Теги</legend>
        <my-multiselect
          :options="products"
          v-model="searchTags"
        ></my-multiselect>
      </fieldset>
      <fieldset>
        <legend>Без продуктов</legend>
        <my-multiselect
          :options="products"
          v-model="searchProdExcl"
        ></my-multiselect>
      </fieldset>
      <fieldset>
        <legend>С продуками</legend>
        <my-multiselect
          :options="products"
          v-model="searchProdIncl"
        ></my-multiselect>
      </fieldset>
      <div class="btns">
        <my-button @click="aaaaa">Найти</my-button>
        <my-button @click="clearSearthOptions">Сбросить</my-button>
      </div>
    </div>
    <div v-if="loading">
      <recipe-list :recipes="recipes" />
      <my-button v-if="!end" style="margin: 20px auto" @click="showMore"
        >Показать еще</my-button
      >
    </div>
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
      end: false,
      searchQuery: "",
      moreSeartch: false,
      tags: [],
      products: [],
      searchTags: [],
      searchProdIncl: [],
      searchProdExcl: [],
      loading: false,
    };
  },
  methods: {
    async fetchRecipes() {
      try {
        const response = await RecipeService.recipe({
          params: {
            page: this.page,
            limit: this.limit,
            str: this.searchQuery,
          },
        });
        this.recipes = response.data;
        console.log(this.recipes);
        this.loading = true;
      } catch (error) {
        console.log(error);
      }
    },
    async aaaaa() {
      try {
        const response = await RecipeService.recipeOptions({
          params: {
            withProduct: this.searchProdIncl,
            withoutProduct: this.searchProdExcl,
          },
        });
        this.recipes = response.data;
        console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    },
    async loadMoreRecipes() {
      try {
        const response = await RecipeService.recipe({
          params: {
            page: this.page,
            limit: this.limit,
            str: this.searchQuery,
          },
        });
        if (response.data.length > 0) {
          this.recipes = [...this.recipes, ...response.data];
          console.log(this.recipes);
          if (response.data.length < this.limit) {
            this.end = true;
          }
        } else {
          this.end = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchProducts() {
      try {
        const response = await RecipeService.products();
        this.products = response.data;
        console.log(this.products);
      } catch (error) {
        console.log(error);
      }
    },
    showMore() {
      this.page += 1;
      this.loadMoreRecipes();
    },
    searchedRecipe() {
      this.page = 1;
      this.end = false;
      this.fetchRecipes();
    },
    showMoreParamSeartch() {
      this.moreSeartch = !this.moreSeartch;
    },
    clearSearthOptions() {
      this.searchTags = [];
      this.searchProdIncl = [];
      this.searchProdExcl = [];
    },
  },
  mounted() {
    this.fetchRecipes();
    this.fetchProducts();
  },
};
</script>
<style lang="css">
.search {
  display: flex;
  margin: 0 25px;
}
.searth-params {
  margin: 25px;
  padding: 30px;
  background-color: #dde8b9;
  border-radius: 50px 0px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start;
  gap: 10px;
}
.btns {
  display: grid;
  margin: 15px 25px;
  grid-template-columns: 1fr 1fr;
  align-self: end;
  align-items: end;
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
.recipes-view {
  display: grid;
  align-items: center;
}
</style>
