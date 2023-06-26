<template lang="">
  <div>
    <registr-form v-if="state" v-model:state="state" />
    <auth-form v-else v-model:state="state" />
    <!-- @click="stateReg(element)" -->
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
};
</script>
<style lang=""></style>
