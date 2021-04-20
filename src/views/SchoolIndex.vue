<template>
  <div class="schoolindex">
    <div class="row">
      <div class="col-sm-6" v-for="school in schools" v-bind:key="school.id">
        <div class="card">
          <div class="card-body">
            <router-link v-bind:to="`school/${school.id}`">
              <h2>{{ school.name }}</h2>
              <!-- <h3>{{ school.recruits_player }}</h3>
              <h3>{{ school.recruits_position }}</h3>
              <h3>{{ school.recruits_height }}</h3>
              <h3>{{ school.recruits_weight }}</h3>
              <h3>{{ school.recruits_year }}</h3> -->

              <p></p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      schools: [],
    };
  },
  created: function () {
    this.SchoolIndex();
  },
  methods: {
    SchoolIndex: function () {
      axios.get("/api/school").then((response) => {
        this.schools = response.data;
        console.log("all schools:", this.schools);
      });
    },
  },
};
</script>
