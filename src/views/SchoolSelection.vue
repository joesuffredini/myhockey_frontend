<template>
  <div class="schoolselection-create">
    <ul>
      <li class="text-danger" v-for="error in errors" v-bind:key="error">
        {{ error }}
      </li>
    </ul>

    <form method="dialog">
      <h1>School selection filter options:</h1>
      <div class="form-group">
        <label for="enrollment">Enrollment range:</label>
        <input type="range" v-model="range" min="5000" max="80000" step="500" />
        Selected: {{ range }}
      </div>
      <br />
      <div class="form-group">
        <label>Conference:</label>
        <input type="conf" class="form-control" v-model="conf" />
      </div>
      <br />

      <button v-on:click="indexSchools(range, conf)">Submit your filters</button>
    </form>
    <br />
    <br />
    <form v-on:submit.prevent="createSchoolSelection()">
      <h1>Select your school to add to profile</h1>
      <div class="form-group">
        <label>School</label>
        <select class="form-control" v-model="school">
          <!-- <option>Select School</option> -->
          <option v-for="school in schools" :value="school.id" :key="school.id">{{ school.name }}</option>
        </select>
      </div>
      <br />
      <input type="submit" class="btn btn-primary" value="Submit your school for your profile" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      school: "",
      user: "",
      conf: "",
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
    indexSchools: function (range, conf) {
      axios.get("/api/school").then((response) => {
        var temp = response.data.filter(function (x) {
          return x.enrollment < range || (x.enrollment < range && x.conference == conf);
        });
        this.schools = temp;
        console.log(this.schools);
      });
    },
    // filterSchoolByRange: function () {
    //   axios.get("/api/school").then((response) => {
    //     this.schools = response.data;
    //     return this.schools.filter((school) => (school.enrollment > 5000 && school.enrollment < range ? school : ""));
    //   });
    //   console.log(this.schools);
    // },
  },
};
</script>
