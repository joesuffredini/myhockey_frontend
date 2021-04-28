<template>
  <div class="usershow">
    <div>
      <router-link v-bind:to="`/user/${user.id}/edit`" tag="button">Edit My Profile</router-link>
    </div>
    <div class="container">
      <h2>Name: {{ user.name }}</h2>
      <h3>City: {{ user.city }}</h3>
      <h3>State: {{ user.state }}</h3>
      <h3>BD: {{ user.birthdate }}</h3>
      <h3>Height: {{ user.height }} Weight: {{ user.weight }}</h3>
      <h3>Position: {{ user.position }} Shoots: {{ user.shoots }}</h3>
      <h3>Current Coach: {{ user.coach }}</h3>
      <h3>Email: {{ user.email }}</h3>
    </div>

    <!-- <div v-for="school in schools" :key="school">
      <router-link v-bind:to="`user/${user.id}`">
        <h3>MySchool: {{ school }}</h3>
      </router-link>
    </div> -->

    <!-- <h1>My School Choices</h1>
    <div v-for="image in images" :key="image">
      <router-link v-bind:to="`user/${user.id}`">
        <img :src="image" :alt="image" width="150" height="150" />
      </router-link>
    </div> -->

    <button v-on:click="showSchools()">View Schools Selected</button>
    <dialog id="school-info">
      <form method="dialog">
        <div v-for="image in images" :key="image">
          <router-link v-bind:to="`/school`">
            <img :src="image" :alt="image" width="75" height="75" />
          </router-link>
        </div>
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
      schools: {},
      images: {},
    };
  },
  created: function () {
    this.showUser();
  },
  methods: {
    showUser: function () {
      axios.get("/api/user/" + localStorage.getItem("user_id")).then((response) => {
        console.log("user info", response.data);
        this.user = response.data;
        this.schools = this.user.schools;
        this.images = this.user.image;
        console.log(this.user.schools);
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
