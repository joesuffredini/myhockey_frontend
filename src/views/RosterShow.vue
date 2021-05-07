<template>
  <section class="content-section bg-primary text-secondary text-center" id="services">
    <div class="rostershow">
      <div class="container">
        <img :src="rosters.image" :alt="rosters.school" width="150" height="150" />
        <br />
        <h5>Name: {{ rosters["name"] }}</h5>
        <h5>Position: {{ rosters["position"] }}</h5>
        <h5>Shoots: {{ rosters["shoots"] }}</h5>
        <h5>Class: {{ rosters["year"] }}</h5>
      </div>
    </div>
    <button class="btn btn-primary btn-l js-scroll-trigger" v-on:click="goBack()">Back</button>
  </section>
</template>

<style>

</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      rosters: {},
    };
  },
  created: function () {
    this.showRoster();
  },
  methods: {
    showRoster: function () {
      axios.get("/api/roster/" + this.$route.params.id).then((response) => {
        this.rosters = response.data;
        console.log(this.rosters);
      });
    },
    goBack: function () {
      this.$router.go(-1);
    },
  },
};
</script>
