<template>
  <section class="content-section text-black text-center" id="services">
    <div class="schoolselection-create">
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>

      <form method="dialog">
        <h1>School selection filters:</h1>
        <div class="form-group">
          <label for="enrollment">School size:</label>
          <input type="range" v-model="range" min="5000" max="80000" step="500" />
          Selected: {{ range }}
        </div>
        <div class="form-group">
          <label>Recruit #'s:</label>
          <input type="recruittotal" class="form-control" v-model="recruittotal" />
        </div>
        <br />
        <a class="btn btn-primary btn-xl js-scroll-trigger" v-on:click="indexSchools(range, recruittotal)">
          Submit your filters
        </a>
      </form>
      <br />
      <br />
      <form v-on:submit.prevent="createSchoolSelection()">
        <!-- Select your school to add to profile -->
        <div class="dropdown">
          <span>School</span>
          <div class="dropdown-conent">
            <select class="form-control" v-model="school">
              <option v-for="school in schools" :value="school.id" :key="school.id">{{ school.name }}</option>
            </select>
          </div>
        </div>
        <br />
        <input type="submit" class="btn btn-primary" value="Submit your school for your profile" />
      </form>
    </div>
  </section>
</template>

<style>
dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
}
. .dropdown:hover .dropdown-content {
  display: block;
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
    createSchoolSelection: function () {
      let params = {
        school: this.school,
        user: localStorage.getItem("user_id"),
      };
      axios
        .post("/api/recruitinfo", params)
        .then((response) => {
          this.selection = response.data;
          console.log("Creating a Profile", this.selection);
          this.$router.push("/user/" + this.user_id);
        })
        .catch((errors) => console.log(errors.response));
    },
    indexSchools: function (range, recruittotal) {
      axios.get("/api/school").then((response) => {
        var temp = response.data.filter(function (x) {
          return x.enrollment < range && x.recruits_position.length <= recruittotal;
        });
        this.schools = temp;
        console.log("filtered data", this.schools);
      });
    },
  },
};
</script>
