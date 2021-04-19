<template>
  <div class="usershow">
    <div class="container">
      <h2>{{ user.name }}</h2>
      <h3>{{ user.position }}</h3>
      <h3>{{ user.team }}</h3>
      <h3>{{ user.school }}</h3>
      <h3>{{ user.recruit }}</h3>
      -->
    </div>
    <router-link v-bind:to="`/user/${user.id}/edit`">See my recruiting profile</router-link>
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
      user: {},
    };
  },
  created: function () {
    this.showUser();
  },
  methods: {
    showUser: function () {
      axios.get("/api/user/" + this.$route.params.id).then((response) => {
        console.log(response.data);
        this.user = response.data;
      });
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
