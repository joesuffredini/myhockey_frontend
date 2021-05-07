<template>
  <section class="content-section bg-primary text-secondary text-center" id="My Profile">
    <div class="usershow">
      <div class="row g-3">
        <label class="col-sm-4 col-form-label"></label>
        <span class="col-auto col-form-label">
          <h1>My Profile</h1>
          <img src="../assets/DanteVH.jpg" alt="../assets/logo.png" width="200" height="200" />
          <br />
          <h5>Name: {{ user.name }}</h5>
          <h5>City: {{ user.city }} -- State: {{ user.state }}</h5>
          <h5>Height: {{ user.height }} -- Weight: {{ user.weight }}lbs</h5>
          <h5>Position: {{ user.position }} -- Shoots: {{ user.shoots }}</h5>
          <h5>Coach: {{ user.coach }}</h5>
          <h5>Email: {{ user.email }}</h5>
        </span>
      </div>

      <div class="container">
        <div class="row row-cols-2">
          <div class="col">
            <router-link v-bind:to="`/user/${user.id}/edit`" class="btn btn-primary btn-xl js-scroll-trigger">
              Edit My Profile
            </router-link>
          </div>
          <div class="col">
            <a class="btn btn-primary btn-xl js-scroll-trigger" v-on:click="showSchools()">View Schools Selected</a>
            <dialog id="school-info">
              <form method="dialog">
                <div v-for="school in schools" :key="school.id">
                  <router-link v-bind:to="`/school/${school.id}`">
                    <img :src="school.image" :alt="school.name" width="75" height="75" />
                    <br />
                  </router-link>
                </div>
                <!-- <a class="btn btn-primary btn-l js-scroll-trigger" v-on:click="deleteSchools()">
                  Delete a school from list
                </a> -->
                <br />
                <button>Close</button>
              </form>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
h1 {
  /* font-family: Arial, Helvetica, sans-serif; */
  /* color: white; */
  /* background-color: lightblue; */
}
h5 {
  /* font-family: Arial, Helvetica, sans-serif; */
  /* color: white; */
  /* background-color: lightblue; */
  /* margin-top: 10px; */
  /* font-style: italic; */
}
</style>

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
        console.log("schools", this.schools);
      });
    },

    showSchools: function () {
      document.querySelector("#school-info").showModal();
    },
  },
};
</script>
