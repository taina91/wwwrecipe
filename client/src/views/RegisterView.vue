<template lang="">
  <div>
    <h1>Register</h1>
    <input v-model="email" type="email" name="email" /> <br />
    <input v-model="password" type="password" name="password" /><br />
    <button @click="register">Register</button>
    <ul>
      <li v-for="user in users">{{ user.first_name }} {{ user.first_name }}</li>
    </ul>
  </div>
</template>
<script>
import AuthService from "@/services/AuthService";
export default {
  data() {
    return {
      // email: "",
      // password: "",
      users: [],
    };
  },
  methods: {
    async register() {
      const response = await AuthService.register({
        // email: this.email,
        // password: this.password,
        users: this.users,
      });
      this.users = response.data;
      console.log(response.data);
      console.log(this.users);
    },
  },
};
</script>
<style lang=""></style>
