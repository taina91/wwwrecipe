<template lang="">
  <button class="btn"><slot></slot></button>
</template>
<script>
export default {
  name: "my-button",
};
</script>
<style lang="css" scoped>
.btn {
  background: #ff5800;
  border-radius: 100px 0px;
  padding: 15px 60px;
  border: none;
  color: #ffffff;
  font-weight: 700;
}
</style>
