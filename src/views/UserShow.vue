<template>
  <section class="content-section bg-primary text-secondary text-center" id="My Profile">
    <div class="usershow">
      <div class="row g-3">
        <label class="col-sm-4 col-form-label"></label>
        <span class="col-auto col-form-label">
          <h1>My Profile</h1>
          <h3>Name: {{ user.name }}</h3>
          <h3>City: {{ user.city }} -- State: {{ user.state }}</h3>
          <h3>BD: {{ user.birthdate }}</h3>
          <h3>Height: {{ user.height }} Weight: {{ user.weight }}</h3>
          <h3>Position: {{ user.position }} Shoots: {{ user.shoots }}</h3>
          <h3>Current Coach: {{ user.coach }}</h3>
          <h3>Email: {{ user.email }}</h3>
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
                  </router-link>
                </div>
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
.usershow {
  background-color: lightblue;
}

h2 {
  margin-bottom: 5px;
  font-style: italic;
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
