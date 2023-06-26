<template lang="">
  <div class="container">
    <h1>Регистрация</h1>
    <form autocomplete="off">
      <fieldset>
        <legend>Имя</legend>
        <my-input
          v-model="name"
          :type="'text'"
          name="name"
          required
          autofocus
        />
      </fieldset>
      <fieldset>
        <legend>Фамилия</legend>
        <my-input v-model="surname" :type="'text'" name="surname" required />
      </fieldset>
      <fieldset>
        <legend>Электронная почта</legend>
        <my-input
          v-model="email"
          :type="'email'"
          name="email"
          required
          autocomplete="off"
        />
      </fieldset>
      <fieldset>
        <legend>Пароль</legend>
        <my-input
          v-model="password"
          :type="'password'"
          name="password"
          required
          autocomplete="new-password"
        />
      </fieldset>
    </form>
    <div v-html="error" class="error"></div>
    <my-button class="btn" @click="register"> Зарегестрироваться </my-button>
    <p class="redirect" @click="changeState">
      Уже есть аккаунт? Войдите в систему
    </p>
  </div>
</template>
<script>
import AuthService from "@/services/AuthService";
export default {
  data() {
    return {
      name: "",
      surname: "",
      email: "",
      password: "",
      users: [],
      error: null,
    };
  },
  props: {
    state: {
      type: Boolean,
    },
  },
  methods: {
    async register() {
      try {
        const response = await AuthService.register({
          first_name: this.name,
          last_name: this.surname,
          email: this.email,
          password: this.password,
        });
        this.$store.dispatch("setUser", response.data.user);
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
    changeState() {
      this.$emit("update:state", false);
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
