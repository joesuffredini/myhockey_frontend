<template>
  <div class="myprofile-edit">
    <form v-on:submit.prevent="updateUser(user)">
      <h1>Edit My Profile!</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>Name:</label>
        <input type="text" class="form-control" v-model="user.name" />
      </div>
      <div class="form-group">
        <label>City:</label>
        <input type="text" class="form-control" v-model="user.city" />
      </div>
      <div class="form-group">
        <label>State:</label>
        <input type="text" class="form-control" v-model="user.state" />
      </div>
      <div class="form-group">
        <label>Birthdate:</label>
        <input type="text" class="form-control" v-model="user.birthdate" />
      </div>
      <div class="form-group">
        <label>Height:</label>
        <input type="text" class="form-control" v-model="user.height" />
      </div>
      <div class="form-group">
        <label>Weight:</label>
        <input type="text" class="form-control" v-model="user.weight" />
      </div>
      <div class="form-group">
        <label>Position:</label>
        <input type="text" class="form-control" v-model="user.position" />
      </div>
      <div class="form-group">
        <label>Shoots:</label>
        <input type="text" class="form-control" v-model="user.shoots" />
      </div>
      <div class="form-group">
        <label>Team:</label>
        <input type="text" class="form-control" v-model="user.team" />
      </div>
      <div class="form-group">
        <label>Coach:</label>
        <input type="text" class="form-control" v-model="user.coach" />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="text" class="form-control" v-model="user.email" />
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
      user: {},
      errors: [],
    };
  },
  created: function () {
    axios.get("/api/user/" + localStorage.getItem("user_id")).then((response) => {
      console.log(response.data);
      this.user = response.data;
    });
  },

  methods: {
    updateUser: function (user) {
      console.log("Updating My Profile");
      var params = {
        name: user.name,
        city: user.city,
        state: user.state,
        birthdate: user.birthdate,
        age: user.age,
        height: user.height,
        weight: user.weight,
        position: user.position,
        shoots: user.shoots,
        team: user.team,
        coach: user.coach,
        email: user.email,
      };
      axios
        .patch("/api/user/" + this.$route.params.id, params)
        .then(() => {
          this.$router.push("/user/" + this.user_id);
        })
        .catch((error) => console.log(error.response));
    },
  },
};
</script>
