<template>
  <section class="content-section bg-primary text-secondary text-center" id="services">
    <div class="Recruitshow">
      <img :src="recruit.image" :alt="recruit.name" width="150" height="150" />
      <h3>Name: {{ recruit.player }}</h3>
      <h3>Position: {{ recruit.position }}</h3>
      <h3>Height: {{ recruit.height }}</h3>
      <h3>Weight: {{ recruit.weight }} lbs</h3>
      <h3>Position: {{ recruit.position }}</h3>
      <h3>Recruit Year: {{ recruit.year }}</h3>
    </div>

    <div class="row row-3cols-2">
      <div class="col">
        <button class="btn btn-primary btn-l js-scroll-trigger" v-on:click="goBack()">Back</button>
      </div>
    </div>
  </section>
</template>

<style>
h3 {
  /* font-family: Arial, Helvetica, sans-serif; */
  /* background-color: black; */
  /* color: blue; */
}

h1 {
  /* font-family: Arial, Helvetica, sans-serif; */
  /* background-color: black; */
  /* color: blue; */
}

.Recruitshow {
  /* background-color: lightblue; */
}
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      recruit: {},
    };
  },
  created: function () {
    this.showRecruit();
  },
  methods: {
    showRecruit: function () {
      axios.get("/api/recruit/" + this.$route.params.id).then((response) => {
        console.log(response.data);
        this.recruit = response.data;
      });
    },
    destroyRecruit: function (recruit) {
      axios.delete("/api/recruit/" + recruit.id).then(() => {
        console.log("Recruit destroyed");
        this.$router.push("/recruit");
      });
    },
    goBack: function () {
      this.$router.go(-1);
    },
  },
};
</script>
