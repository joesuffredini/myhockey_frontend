<template>
  <section class="content-section bg-primary text-black text-center" id="services">
    <div class="schoolselection-create">
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>

      <form method="dialog">
        <h1>School selection filters:</h1>
        <h3>Filter your school list based on enrollment size</h3>
        <br />
        <br />
        <div class="row g-3">
          <!-- <label class="col-sm-2 col-form-label"></label> -->
          <div class="col-sm-12">
            <h5>LIMIT:{{ range }}</h5>

            <input type="range" v-model="range" min="500" max="80000" step="100" />
          </div>
        </div>
        <br />
        <!-- <div class="row">
          <label class="col-sm-4 col-form-label"></label>
          <div class="col-sm-4">
            <input
              type="recruittotal"
              class="form-control"
              v-model="recruittotal"
              placeholder="# of recruits threshold"
            />
          </div>
        </div> -->
        <br />
        <a class="btn btn-primary btn-s js-scroll-trigger" v-on:click="indexSchools(range)">Submit</a>
      </form>
      <br />
      <br />
      <div class="col">
        <a class="btn btn-primary btn-xl js-scroll-trigger" v-on:click="showSchools()">View Filtered School List</a>
        <dialog id="school-info">
          <form method="dialog">
            <div class="dropdown">
              <span><h3>Schools - based on filters chosen</h3></span>
              <div class="dropdown-conent">
                <div v-for="school in schools" :key="school.id">
                  <router-link v-bind:to="`/school/${school.id}`">
                    <h5>
                      {{ school.name }}
                      <img :src="school.image" :alt="school.name" width="25" height="25" />
                    </h5>
                  </router-link>
                </div>
              </div>
            </div>
            <button>Close</button>
          </form>
        </dialog>
      </div>
    </div>
  </section>
</template>

<style>
h5 {
  /* font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  color: blue; */
}

h1 {
  /* font-family: Arial, Helvetica, sans-serif; */
  /* background-color: blue; */
  /* color: blue;
  text-align: center; */
}

.schoolselection-create {
  background-color: lightblue;
}
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      school: "",
      user: "",
      academics: "",
      recruittotal: "",
      range: "",
      schools: [],
      errors: [],
    };
  },
  created: function () {
    this.indexSchools();
  },
  methods: {
    showSchool: function () {
      axios.get("/api/school/" + this.$route.params.id).then((response) => {
        this.school = response.data;
        this.school.sort((a, b) => (a.name > b.name ? 1 : -1));
        console.log(this.school);
      });
    },

    showSchools: function () {
      document.querySelector("#school-info").showModal();
    },

    indexSchools: function (range) {
      axios.get("/api/school").then((response) => {
        var temp = response.data.filter(function (x) {
          return x.enrollment < range;
        });
        this.schools = temp;
        console.log("filtered data", this.schools);
      });
    },
  },
};
</script>
