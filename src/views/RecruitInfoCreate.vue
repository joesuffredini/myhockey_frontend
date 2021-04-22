<template>
  <div class="recruitinfo-create">
    <ul>
      <li class="text-danger" v-for="error in errors" v-bind:key="error">
        {{ error }}
      </li>
    </ul>
    <form v-on:submit.prevent="createRecruitInfo()">
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      school: "",
      user: "",
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
    createRecruitInfo: function () {
      let params = {
        school: this.school,
        user: this.user,
      };
      axios
        .post("/api/recruitinfo", params)
        .then(() => {
          console.log("Creating a Recruit Profile");
          this.$router.push("/");
        })
        .catch((errors) => console.log(errors.response));
    },
    indexSchools: function () {
      axios.get("/api/school").then((response) => {
        this.schools = response.data;
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
