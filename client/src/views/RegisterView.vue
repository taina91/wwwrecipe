<template lang="">
  <div>
    <registr-form v-if="state" @click="stateAuth" />
    <auth-form v-else @click="stateReg" />
  </div>
</template>
<script>
import RegistrForm from "@/components/RegistrForm";
import AuthForm from "@/components/AuthForm";
export default {
  components: {
    RegistrForm,
    AuthForm,
  },
  data() {
    return {
      state: false,
    };
  },
  methods: {
    stateReg() {
      this.state = true;
    },
    stateAuth() {
      this.state = false;
    },
  },
};
</script>
<style lang=""></style>
