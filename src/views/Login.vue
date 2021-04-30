<template>
  <section class="content-section bg-primary text-white text-center" id="services">
    <div class="login">
      <form v-on:submit.prevent="submit()">
        <h1>Login</h1>
        <ul>
          <li class="text-danger" v-for="error in errors" v-bind:key="error">
            {{ error }}
          </li>
        </ul>
        <div class="mb-3 row">
          <label for="inputEmail" class="col-sm-4 col-form-label"></label>
          <div class="col-sm-4">
            <input type="email" class="form-control" v-model="email" placeholder="Email" />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="inputpassword" class="col-sm-4 col-form-label"></label>
          <div class="col-sm-4">
            <input type="password" class="form-control" v-model="password" placeholder="Password" />
          </div>
        </div>
        <input type="submit" class="btn btn-primary btn-l js-scroll-trigger" value="Submit" />
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    submit: function () {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/api/sessions", params)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>
