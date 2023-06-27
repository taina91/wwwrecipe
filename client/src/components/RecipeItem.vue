<template lang="">
  <div class="recipe">
    <div class="photo"></div>
    <div class="recipe__info">
      <div class="title">{{ recipe.title }}</div>
      <div class="author">Автор: {{ recipe.author }}</div>
      <div class="info">
        <!-- <p>{{ recipe.products.length }} ингридиентов</p> -->
        <div class="dropdown">
          <button class="dropbtn">
            {{ recipe.products.length }} ингридиентов
          </button>
          <div class="dropdown-content">
            <!-- <p v-for="ing in recipe.products" :key="ing.title">
              {{ ing.title.padEnd(30, "ㅤ") }}
              {{ String(ing.count).padStart(10, "ㅤ") }}
              {{ ing.unit }}
            </p> -->
            <div
              class="ingr__item"
              v-for="ing in recipe.products"
              :key="ing.title"
            >
              <p>{{ ing.title }}</p>
              <p>{{ ing.count }} {{ ing.unit }}</p>
            </div>
          </div>
        </div>
        <p v-if="recipe.time_cooking.substring(0, 2) == '00'">
          {{ recipe.time_cooking.substring(3, 5) }} мин
        </p>
        <p v-else-if="recipe.time_cooking.substring(0, 1) == '0'">
          {{ recipe.time_cooking.substring(1, 2) }} час
          {{ recipe.time_cooking.substring(3, 5) }} мин
        </p>
        <p v-else>
          {{ recipe.time_cooking.substring(0, 2) }} час
          {{ recipe.time_cooking.substring(3, 5) }} мин
        </p>
        <div class="diff">
          <div
            v-for="i in parseInt(recipe.difficult)"
            class="diff__item painted"
          ></div>
          <div
            v-for="i in 5 - parseInt(recipe.difficult)"
            class="diff__item"
          ></div>
        </div>
      </div>
      <div class="tags">
        <!-- <div class="tag" v-for="tag in recipe.tags">
          {{ tag }}
        </div> -->
      </div>
    </div>
    <div class="recipe__bths">
      <div class="save">
        <img src="@/assets/flag_false.svg" alt="" />
        <p>Избранное</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="css" scoped>
.recipe {
  border-radius: 0px 0px 100px 0px;
  background-color: #ffffff;
  width: 1032px;
  height: 261px;
  padding: 25px;
  margin: 25px;
  display: grid;
  grid-template-columns: 215px 3fr 1fr;
}
.recipe__info {
  margin-left: 24px;
  display: grid;
  align-items: start;
  grid-template-rows: min-content;
}
.photo {
  width: 215px;
  height: 211px;
  background-color: #dde8b9;
}
.title {
  font-weight: 700;
  font-size: 32px;
  color: #2b2c2e;
}
.author {
  font-style: italic;
  font-weight: 300;
  font-size: 16px;
  color: #9f9db0;
  margin-top: 8px;
}
.recipe__bths {
  justify-self: end;
}
.info {
  display: flex;
  align-self: center;
  justify-content: space-between;
  align-items: center;
  /* justify-self: start; */
  padding: 10px 0;
  font-weight: 400;
  font-size: 20px;
}
.diff {
  display: flex;
}
.diff__item {
  width: 20px;
  height: 20px;
  border-radius: 11px 0px;
  border: 1px solid #209b90;
  margin-right: 5px;
}
.painted {
  background-color: #209b90;
}
.tags {
  display: flex;
  align-self: end;
  flex-wrap: wrap;
}
.tag {
  color: #9f9db0;
  border: 1px solid #9f9db0;
  border-radius: 100px 0px;
  padding: 5px 25px;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  margin-right: 10px;
}
.save {
  display: flex;
  align-items: center;
  font-weight: 300;
  font-size: 20px;
  color: #9f9db0;
  margin-top: 10px;
  cursor: pointer;
}
.save p {
  margin: 5px;
}
.dropbtn {
  font-weight: 400;
  font-size: 20px;
  color: #2b2c2e;
  background-color: white;
  min-width: 150px;
  /* padding: 16px;
  font-size: 16px; */
  border: none;
  padding: 10px;
}
.ingr__item {
  display: flex;
  width: 300px;
  justify-content: space-between;
}
.dropdown {
  position: relative;
  display: inline-block;
  color: #2b2c2e;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  width: max-content;
  z-index: 1;
  transition: all 2s linear;
}
.dropdown-content .ingr__item:hover {
  background-color: #f5f5f7;
}
.dropdown-content .ingr__item {
  padding: 10px;
  color: #2b2c2e;
}
.dropdown:hover .dropdown-content {
  display: block;
}
.dropdown:hover .dropbtn {
  background-color: rgba(255, 88, 0, 0.2);
}
</style>
