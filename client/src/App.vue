<template>
  <div class="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Poppins:wght@400;600&family=Roboto:ital,wght@0,400;0,700;1,300&display=swap");
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}
html {
  background-color: #f5f5f7;
}
.app {
  max-width: 1082px;
  margin: 0 auto;
}
</style>
