<template>
  <div class="schoolindex">
    <div class="row">
      <div class="col-sm-6" v-for="school in schools" v-bind:key="school.id">
        <div class="card">
          <div class="card-body">
            <router-link v-bind:to="`school/${school.id}`">
              <img :src="school.image" :alt="school.name" width="100" height="100" />
              <h2>{{ school.name }} {{ school.nickname }}</h2>
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
        this.schools.sort((a, b) => (a.name > b.name ? 1 : -1));
        console.log("all schools:", this.schools);
      });
    },
  },
};
</script>
