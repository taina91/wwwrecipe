<template lang="">
  <div class="cooking-list">
    <div class="ings">
      <div class="ingr__item" v-for="ing in recipe.products" :key="ing.title">
        <p>{{ ing.title }}</p>
        <p>{{ ing.count }} {{ ing.unit }}</p>
      </div>
    </div>
    <div class="steps">
      <div
        v-for="(text, index) in recipe.recipe_text.Steps"
        class="steps__item"
      >
        <h3 class="step">Шаг {{ index + 1 }}</h3>
        <p class="step__text">{{ text }}</p>
        <div class="step__img">
          <img src="" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    recipe: {
      type: Object,
    },
  },
};
</script>
<style lang="css">
.cooking-list {
  border-radius: 0px 100px 0px 0px;
  background-color: #ffffff;
  width: 1032px;
  height: max-content;
  padding: 25px;
  margin: 25px;
  display: grid;
  grid-template-columns: min-content 1fr;
  color: #2b2c2e;
}
.ings {
  border: 3px solid #ff5800;
  border-radius: 70px 0px;
  padding: 30px;
  color: #2b2c2e;
  position: sticky;
  top: 100px;
  width: max-content;
  height: min-content;
}
.ingr__item {
  display: flex;
  width: 270px;
  margin: 15px 0;
  justify-content: space-between;
  color: #2b2c2e;
}
.steps {
  margin-left: 50px;
}
.steps__item {
  margin: 50px 0;
}
.steps__item:first-child {
  margin: 0;
}
.steps__item:last-child {
  margin-bottom: 0;
}
.step {
  font-weight: 600;
  font-size: 24px;
  color: #2b2c2e;
}
.step__text {
  font-weight: 300;
  font-size: 16px;
  color: #2b2c2e;
  margin: 10px 0;
}

.step__img {
  width: 100%;
  height: 100px;
  background: #dde8b9;
  margin-top: 10px;
}
.step__img img {
  width: 100%;
  /* height: 100%; */
  object-fit: cover;
  border-radius: 20px;
}
</style>
