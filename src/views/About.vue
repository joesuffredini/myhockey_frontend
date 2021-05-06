<template>
  <section class="content-section text-black text-center bg-primary" id="services">
    <div class="container text-center my-auto">
      <h1>NCAA Recruiting Details</h1>
      <button class="btn btn-primary btn-xl js-scroll-trigger" v-on:click="goBack()">Back</button>

      <img src="../assets/ncaa-rules.jpeg" alt="../assets/logo.png" width="900" height="900" />
    </div>
  </section>
</template>

<style>
h1 {
  text-align: center;
  margin-bottom: 35px;
}
img {
  margin-bottom: 35px;
}
</style>

<script>
export default {
  methods: {
    goBack: function () {
      this.$router.go(-1);
    },
  },
};
</script>
