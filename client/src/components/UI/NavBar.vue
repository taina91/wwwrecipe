<template lang="">
  <nav>
    <img src="@/assets/logo.svg" alt="" @click="$router.push('/')" />
    <ul class="menu">
      <li class="menu__item">Рецепты</li>
      <li class="menu__item" v-if="$store.state.isLoggedIn">Холодильник</li>
      <li class="menu__item" v-if="$store.state.isLoggedIn">Избранное</li>
    </ul>
    <div v-if="$store.state.isLoggedIn == false" class="btns">
      <my-button @click="$router.push('/register')">Войти</my-button>
    </div>
    <div v-else class="btns">
      <div class="profile">
        <img src="@/assets/profile.svg" alt="" />
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "navbar",
};
</script>
<style lang="css">
nav {
  display: grid;
  grid-template-columns: 151px 4fr 1fr;
  margin: 20px 40px;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: #f5f5f7;
}
.menu {
  display: flex;
  justify-content: flex-start;
  justify-self: start;
  margin-left: 30px;
}
.menu__item {
  list-style-type: none;
  margin: 30px;
  color: #2b2c2e;

  font-weight: 400;
  font-size: 20px;
  cursor: pointer;

  position: relative;
}
.menu__item::after {
  display: block;
  position: absolute;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #2b2c2e;
  content: "";
  transition: width 0.3s ease-out;
}
.menu__item:hover:after,
.menu__item:focus:after {
  width: 100%;
}
.btns {
  justify-self: end;
  display: flex;
}
/* .profile {
  background-image: url("@/assets/profile.svg");
} */
</style>
