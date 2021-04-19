<template>
  <div class="Recruitshow">
    <div class="container">
      <h3>Player: {{ recruit.player }}</h3>
      <h3>Position: {{ recruit.position }}</h3>
      <h3>Recruit Year: {{ recruit.year }}</h3>
    </div>
    <router-link v-bind:to="`/recruit/${recruit.id}/edit`">See recruit list</router-link>
    <!-- <br />
    <br />
    <button v-on:click="destroyRecruit(recruit)">Destroy Recruit</button> -->
  </div>
</template>

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
  },
};
</script>
