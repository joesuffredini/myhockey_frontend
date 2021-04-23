<template>
  <div class="schoolselection-create">
    <ul>
      <li class="text-danger" v-for="error in errors" v-bind:key="error">
        {{ error }}
      </li>
    </ul>

    <form method="dialog">
      <h1>School selection criteria</h1>
      <div class="form-group">
        <label>School size:</label>
        <input type="size" class="form-control" v-model="size" />
        <!-- <option>Select School</option> -->
      </div>
      <br />
      <p1>Or</p1>
      <div class="form-group">
        <label>Conference:</label>
        <input type="conf" class="form-control" v-model="conf" />
      </div>
      <br />
      <button v-on:click="indexSchools(size, conf)">Submit</button>
    </form>
    <br />
    <br />
    <form v-on:submit.prevent="createSchoolSelection()">
      <div class="form-group">
        <label>School</label>
        <select class="form-control" v-model="school">
          <!-- <option>Select School</option> -->
          <option v-for="school in schools" :value="school.id" :key="school.id">{{ school.name }}</option>
        </select>
      </div>
      <br />
      <input type="submit" class="btn btn-primary" value="Submit" />
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
      size: "",
      conf: "",
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
          this.$router.push("/");
        })
        .catch((errors) => console.log(errors.response));
    },
    indexSchools: function (size, conf) {
      axios.get("/api/school").then((response) => {
        var temp = response.data.filter(function (x) {
          return x.enrollment < size || x.conference == conf;
        });
        this.schools = temp;
        console.log(this.schools);
      });
    },
  },
};
</script>
