<template>
  <section class="content-section bg-primary text-secondary text-center" id="services">
    <div class="schoolshow">
      <div class="container">
        <h2>{{ school.name }}</h2>
        <img :src="school.image" :alt="school.name" width="150" height="150" />
        <br />
        <a v-bind:href="school.url" v-bind:alt="school.url"><h5>Athletic website</h5></a>
        <h5>Location: {{ school.location }} -- Enrollment: {{ school.enrollment }}</h5>
        <h5>Nickname: {{ school.nickname }} -- Conference: {{ school.conference }}</h5>
        <h5>School Rink: {{ school.rink }}</h5>
        <h5>Head_Coach: {{ school.head_coach }} -- Contact Info: {{ school.email }}</h5>
        <h5>Number of Incoming recruits: {{ total }}</h5>
      </div>
      <div class="row row-3cols-2">
        <div class="col">
          <button class="btn btn-primary btn-l js-scroll-trigger" v-on:click="showRecruits()">View Recruits</button>
          <button class="btn btn-primary btn-l js-scroll-trigger" v-on:click="goBack()">Back</button>
        </div>
      </div>

      <dialog id="recruit-info">
        <form method="dialog">
          <div v-for="recruit in recruits" :key="recruit">
            <router-link v-bind:to="`/recruit`">
              <h3>Name: {{ recruit }}</h3>
            </router-link>
          </div>
          <button>Close</button>
        </form>
      </dialog>
    </div>
  </section>
</template>

<style>
.schoolshow {
  background-color: lightblue;
}
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      school: {},
      recruits: {},
      total: "",
    };
  },
  created: function () {
    this.showSchool();
    this.getRecruittotal();
  },
  methods: {
    showSchool: function () {
      axios.get("/api/school/" + this.$route.params.id).then((response) => {
        this.school = response.data;
        this.recruits = this.school.recruits_player;
      });
    },

    getRecruittotal: function () {
      axios.get("/api/school/" + this.$route.params.id).then((response) => {
        this.total = response.data.recruits_position.length;
        console.log("Number of recruits", this.total);
      });
    },

    showRecruits: function () {
      document.querySelector("#recruit-info").showModal();
    },

    goBack: function () {
      this.$router.go(-1);
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
