<template>
  <div class="schoolshow">
    <div class="container">
      <h2>{{ school.name }}</h2>
      <img v-bind:src="school.image" v-bind:alt="school.name" />
      <br />
      <br />
      <a v-bind:href="school.url" v-bind:alt="school.url">Athletic website</a>
      <h5>Location: {{ school.location }}</h5>
      <h5>Nickname: {{ school.nickname }}</h5>
      <h5>Conference: {{ school.conference }}</h5>
      <h5>Enrollment: {{ school.enrollment }}</h5>
      <h5>School Rink: {{ school.rink }}</h5>
      <h5>Head_Coach: {{ school.head_coach }}</h5>
      <h5>Contact Info: {{ school.email }}</h5>
    </div>

    <button v-on:click="showRecruits()">View Recruits</button>
    <dialog id="recruit-info">
      <form method="dialog">
        <h1>Recruits:</h1>
        <h2>{{ school.name }}</h2>
        <h3>Name: {{ school.recruits_player }}</h3>
        <h3>Position: {{ school.recruits_position }}</h3>
        <h3>Height: {{ school.recruits_height }}</h3>
        <h3>Weight:{{ school.recruits_weight }}</h3>
        <h3>Recruit Year: {{ school.recruits_year }}</h3>
        <button>Close</button>
      </form>
    </dialog>

    <!-- <router-link v-bind:to="`/school/${school.id}/edit`">
      See recruit list" -->

    <!-- </router-link> -->
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
    showRecruits: function () {
      document.querySelector("#recruit-info").showModal();
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
