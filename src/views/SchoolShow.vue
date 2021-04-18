<template>
  <div class="schoolshow">
    <div class="container">
      <h2>{{ school.name }}</h2>
      <h3>Location: {{ school.location }}</h3>
      <h3>Nickname: {{ school.nickname }}</h3>
    </div>
    <router-link v-bind:to="`/school/${school.id}/edit`">See recruit list</router-link>
    <!-- <br />
    <br />
    <button v-on:click="destroySchool(school)">Destroy School</button> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      school: {},
    };
  },
  created: function () {
    this.showSchool();
  },
  methods: {
    showSchool: function () {
      axios.get("/api/school/" + this.$route.params.id).then((response) => {
        console.log(response.data);
        this.school = response.data;
      });
    },
    destroySchool: function (school) {
      axios.delete("/api/school/" + school.id).then(() => {
        console.log("School destroyed");
        this.$router.push("/school");
      });
    },
  },
};
</script>
