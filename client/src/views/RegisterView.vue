<template lang="">
  <div>
    <h1>Register</h1>
    <input v-model="email" type="email" name="email" /> <br />
    <input v-model="password" type="password" name="password" /><br />
    <button @click="register">Register</button>
  </div>
</template>
<script>
import AuthService from "@/services/AuthService";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async register() {
      const response = await AuthService.register({
        email: this.email,
        password: this.password,
      });
      console.log(response.data);
    },
  },
};
</script>
<style lang=""></style>
