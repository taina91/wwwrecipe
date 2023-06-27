<template lang="">
  <nav>
    <img src="@/assets/logo.svg" alt="" @click="$router.push('/')" />
    <ul class="menu">
      <li class="menu__item" @click="$router.push('/recipes')">Рецепты</li>
      <li class="menu__item" v-if="$store.state.isLoggedIn">Холодильник</li>
      <li class="menu__item" v-if="$store.state.isLoggedIn">Избранное</li>
    </ul>
    <div v-if="$store.state.isLoggedIn == false" class="btns">
      <my-button @click="$router.push('/register')">Войти</my-button>
    </div>
    <div v-else class="dropdown">
      <div class="dropbtn">
        <img src="@/assets/profile.svg" alt="" />
      </div>
      <div class="dropdown-content">
        <p class="menu__item">Мои рецепты</p>
        <p v-if="$store.state.user.admin" class="menu__item">Админка</p>
        <p class="menu__item" @click="logout">Выйти</p>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "navbar",
  methods: {
    logout() {
      this.$store.dispatch("unsetUser");
    },
  },
};
</script>
<style lang="css" scoped>
nav {
  display: grid;
  grid-template-columns: 151px 4fr 1fr;
  margin: 20px 0;
  padding: 0 auto;
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
.dropbtn {
  padding: 16px;
  font-size: 16px;
  border: 3px solid transparent;
}
.dropdown:hover .dropbtn {
  border-radius: 100px;
  border: 3px solid #209b90;
  /* background-color: white; */
}
.dropdown {
  position: relative;
  display: inline-block;
  justify-self: end;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  min-width: 180px;
  width: max-content;
}
.dropdown-content p {
  display: block;
}
.dropdown:hover .dropdown-content {
  display: block;
}
</style>
