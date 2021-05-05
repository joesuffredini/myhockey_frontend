<template>
  <section class="content-section bg-primary text-secondary text-center" id="services">
    <h1>D1 Hockey Schools</h1>
    <button class="btn btn-primary btn-xl js-scroll-trigger" v-on:click="goBack()">Back</button>

    <div class="schoolindex">
      <div class="row">
        <div class="col-lg-4" v-for="school in schools" v-bind:key="school.id" style="background-color: blue">
          <div class="card" style="background-color: lightblue">
            <div class="card-body">
              <router-link v-bind:to="`school/${school.id}`">
                <img
                  :src="school.image"
                  :alt="school.name"
                  width="150"
                  height="150"
                  style="background-color: lightblue"
                />
                <h5>{{ school.name }} {{ school.nickname }}</h5>
                <p></p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
  </section>
</template>

<style>
h1 {
  margin-bottom: 100px;
}
</style>

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

    goBack: function () {
      this.$router.go(-1);
    },
  },
};
</script>
