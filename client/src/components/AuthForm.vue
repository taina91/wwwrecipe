<template lang="">
  <div class="container">
    <h1>Вход</h1>
    <fieldset>
      <legend>Электронная почта</legend>
      <my-input v-model="email" :type="'email'" name="email" required />
    </fieldset>
    <fieldset>
      <legend>Пароль</legend>
      <my-input
        v-model="password"
        :type="'password'"
        name="password"
        required
      />
    </fieldset>
    <div v-html="error" class="error"></div>
    <my-button class="btn" @click="login"> Войти </my-button>
    <p class="redirect" @click="changeState">
      Впервые на сайте? Зарегестрируйтесь
    </p>
  </div>
</template>
<script>
import AuthService from "@/services/AuthService";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  props: {
    state: {
      type: Boolean,
    },
  },
  methods: {
    async login() {
      try {
        const response = await AuthService.login({
          email: this.email,
          password: this.password,
        });
        this.$store.dispatch("setUser", response.data.user);
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
    changeState() {
      this.$emit("update:state", true);
    },
  },
};
</script>
<style lang="css" scoped>
.container {
  margin: 60px auto;
  background-color: #dde8b9;
  border-radius: 100px 0px;
  width: max-content;
  min-width: 560px;
  max-width: 600px;
  padding: 70px;
  padding-top: 30px;
  display: grid;
}
h1 {
  margin: 20px;
  text-align: center;
  color: #2b2c2e;
}
.btn {
  margin: 0 auto;
  margin-top: 10px;
}
</style>
<style lang="css">
.error {
  color: #ff5800;
  text-align: center;
  max-width: 420px;
  margin: 10px 0;
}
fieldset {
  padding: 5px;
  border: none;
  border-top: 1px dashed #2b2c2e;
  margin: 10px;
}
legend {
  margin-left: 30px;
  font-style: italic;
  font-weight: 300;
  font-size: 16px;
  color: #2b2c2e;
}
.redirect {
  text-align: center;
  margin: 0 auto;
  margin-top: 20px;
  cursor: pointer;
  font-style: italic;
  font-weight: 300;
  font-size: 16px;
  color: #2b2c2e;
  position: relative;
  width: max-content;
}
.redirect::after {
  display: block;
  position: absolute;
  left: 0;
  width: 0;
  height: 1px;
  background-color: #2b2c2e;
  content: "";
  transition: width 0.3s ease-out;
}
.redirect:hover:after,
.redirect:focus:after {
  width: 100%;
}
</style>
