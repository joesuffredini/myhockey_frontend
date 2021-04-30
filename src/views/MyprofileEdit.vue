<template>
  <section class="content-section bg-primary text-secondary text-center" id="services">
    <div class="myprofile-edit">
      <form v-on:submit.prevent="updateUser(user)">
        <h1>Edit My Profile!</h1>
        <ul>
          <li class="text-danger" v-for="error in errors" v-bind:key="error">
            {{ error }}
          </li>
        </ul>

        <div class="row g-3">
          <label class="col-sm-4 col-form-label"></label>
          <div class="col-sm-auto">
            <input type="text" class="form-control" v-model="user.name" placeholder="Name:" />
          </div>
        </div>

        <div class="row g-3">
          <label class="col-sm-4 col-form-label"></label>
          <div class="col-sm-auto">
            <input type="city" class="form-control" v-model="user.city" placeholder="City:" />
          </div>
          <div class="col-sm-auto">
            <input type="state" class="form-control" v-model="user.state" placeholder="State:" />
          </div>
        </div>

        <div class="row g-3">
          <label class="col-sm-4 col-form-label"></label>
          <div class="col-sm-auto">
            <input
              type="birthdate"
              class="form-control"
              v-model="user.birthdate"
              placeholder="Birthdate:  mm/dd/yyyy"
            />
          </div>
          <div class="col-sm-auto">
            <input type="age" class="form-control" v-model="user.age" placeholder="Age:" />
          </div>
        </div>

        <div class="row g-3">
          <label class="col-sm-4 col-form-label"></label>
          <div class="col-sm-auto">
            <input type="height" class="form-control" v-model="user.height" placeholder="Height:" />
          </div>
          <div class="col-sm-auto">
            <input type="weight" class="form-control" v-model="user.weight" placeholder="Weight:" />
          </div>
        </div>

        <div class="row g-3">
          <label class="col-sm-4 col-form-label"></label>
          <div class="col-sm-auto">
            <input type="position" class="form-control" v-model="user.position" placeholder="Position:" />
          </div>
          <div class="col-sm-auto">
            <input type="shoots" class="form-control" v-model="user.shoots" placeholder="Shoots:" />
          </div>
        </div>

        <div class="row g-3">
          <label class="col-sm-4 col-form-label"></label>
          <div class="col-sm-auto">
            <input type="team" class="form-control" v-model="user.team" placeholder="Team:" />
          </div>
          <div class="col-sm-auto">
            <input type="coach" class="form-control" v-model="user.coach" placeholder="Coach:" />
          </div>
        </div>

        <div class="row g-3">
          <label class="col-sm-4 col-form-label"></label>
          <div class="col-sm-auto">
            <input type="email" class="form-control" v-model="user.email" placeholder="Email:" />
          </div>
          <div class="col-sm-auto">
            <input type="password" class="form-control" v-model="user.password" placeholder="Password:" />
          </div>
        </div>
        <br />
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
