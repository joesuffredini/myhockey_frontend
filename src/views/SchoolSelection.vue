<template>
  <div class="schoolselection-create">
    <ul>
      <li class="text-danger" v-for="error in errors" v-bind:key="error">
        {{ error }}
      </li>
    </ul>
    <form v-on:submit.prevent="createSchoolSelection()">
      <div class="form-group">
        <label>User</label>
        <select class="form-control" v-model="user">
          <option>Select User</option>
          <option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label>School</label>
        <select class="form-control" v-model="school">
          <option>Select School</option>
          <option v-for="school in schools" :value="school.id" :key="school.id">{{ school.name }}</option>
        </select>
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>

    <form method="dialog">
      <h1>School select filters</h1>
      <div class="form-group">
        <label>School size (less then value):</label>
        <input type="size" class="form-control" v-model="size" />
      </div>
      <div class="form-group">
        <label>Conference(Big Ten, WCHA, NCDC, AHA, or HockeyEast):</label>
        <input type="conf" class="form-control" v-model="conf" />
      </div>
      <button v-on:click="indexSchools(size, conf)">Submit</button>
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
      users: [],
      errors: [],
    };
  },
  created: function () {
    this.indexSchools();
    this.indexUsers();
  },
  methods: {
    createSchoolSelection: function () {
      let params = {
        school: this.school,
        user: this.user,
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
          return x.enrollment < size && x.conference == conf;
        });
        this.schools = temp;
        console.log(this.schools);
      });
    },
    indexUsers: function () {
      axios.get("/api/user").then((response) => {
        this.users = response.data;
      });
    },
  },
};
</script>
