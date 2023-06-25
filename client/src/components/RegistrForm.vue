<template lang="">
  <div class="container">
    <h1>Регистрация</h1>
    <fieldset>
      <legend>Имя</legend>
      <my-input v-model="name" :type="'text'" name="name" required autofocus />
    </fieldset>
    <fieldset>
      <legend>Фамилия</legend>
      <my-input v-model="surname" :type="'text'" name="surname" required />
    </fieldset>
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
    <my-button class="btn" @click="register"> Зарегестрироваться </my-button>
    <div v-html="error"></div>
    <p class="redirect" @click="$emit('click')">
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
  methods: {
    async register() {
      try {
        const response = await AuthService.register({
          first_name: this.name,
          last_name: this.surname,
          email: this.email,
          password: this.password,
        });
        this.users = response.data;
        // console.log(this.users);
      } catch (error) {
        this.error = error.response.data.error;
      }
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
  margin-top: 20px;
  cursor: pointer;
  font-style: italic;
  font-weight: 300;
  font-size: 16px;
  color: #2b2c2e;
}
.btn {
  margin: 0 auto;
  margin-top: 10px;
}
</style>
