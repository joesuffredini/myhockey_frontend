<template>
  <div class="usershow">
    <div class="container">
      <h2>Name: {{ user.name }}</h2>
      <h3>Position: {{ user.position }}</h3>
      <h3>City: {{ user.city }}</h3>
      <h3>State: {{ user.state }}</h3>
      <h3>BD: {{ user.birthdate }}</h3>
      <h3>Height: {{ user.height }}</h3>
      <h3>Weight: {{ user.weight }}</h3>
      <h3>Position: {{ user.position }}</h3>
      <h3>Shoots: {{ user.shoots }}</h3>
      <h3>Current Coach: {{ user.coach }}</h3>
      <h3>Email: {{ user.email }}</h3>
    </div>
    <button v-on:click="showSchools()">View Schools Selected</button>
    <dialog id="school-info">
      <form method="dialog">
        <h1>Recruits:</h1>
        <h3>Schools: {{ user.schools }}</h3>
        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      user: {},
    };
  },
  created: function () {
    this.showUser();
  },
  methods: {
    showUser: function () {
      axios.get("/api/user/" + this.$route.params.id).then((response) => {
        this.user = response.data;
        console.log(response.data);
      });
    },

    showSchools: function () {
      document.querySelector("#school-info").showModal();
    },

    destroyUser: function (user) {
      axios.delete("/api/user/" + user.id).then(() => {
        console.log("User destroyed");
        this.$router.push("/user");
      });
    },
  },
};
</script>
