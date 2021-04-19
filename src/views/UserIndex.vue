<template>
  <div class="userindex">
    <div class="row">
      <div class="col-sm-6" v-for="user in users" v-bind:key="user.id">
        <div class="card">
          <div class="card-body">
            <router-link v-bind:to="`user/${user.id}`">
              <h3>{{ user.name }}</h3>
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
      users: [],
    };
  },
  created: function () {
    this.UserIndex();
  },
  methods: {
    UserIndex: function () {
      axios.get("/api/user").then((response) => {
        this.users = response.data;
        console.log("all users:", this.users);
      });
    },
  },
};
</script>
