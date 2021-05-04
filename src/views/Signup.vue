<template>
  <section class="content-section bg-primary text-black text-center" id="services">
    <div class="signup">
      <form v-on:submit.prevent="submit()">
        <h1>Create your account</h1>
        <ul>
          <li class="text-danger" v-for="error in errors" v-bind:key="error">
            {{ error }}
          </li>
        </ul>
        <div class="row g-3">
          <label class="col-sm-4 col-form-label"></label>
          <div class="col-sm-auto">
            <input type="text" class="form-control" v-model="name" placeholder="Name:" />
            <small v-if="name.length > 50">NAME IS TO LONG!</small>
          </div>
        </div>

        <div class="row g-3">
          <label class="col-sm-4 col-form-label"></label>
          <div class="col-sm-auto">
            <input type="city" class="form-control" v-model="city" placeholder="City:" />
          </div>
          <div class="col-sm-auto">
            <input type="state" class="form-control" v-model="state" placeholder="State:" />
          </div>
        </div>

        <div class="row g-3">
          <label class="col-sm-4 col-form-label"></label>
          <div class="col-sm-auto">
            <input type="birthdate" class="form-control" v-model="birthdate" placeholder="Birthdate:  mm/dd/yyyy" />
          </div>
          <div class="col-sm-auto">
            <input type="age" class="form-control" v-model="age" placeholder="Age:" />
          </div>
        </div>

        <div class="row g-3">
          <label class="col-sm-4 col-form-label"></label>
          <div class="col-sm-auto">
            <input type="height" class="form-control" v-model="height" placeholder="Height:" />
          </div>
          <div class="col-sm-auto">
            <input type="weight" class="form-control" v-model="weight" placeholder="Weight:" />
          </div>
        </div>

        <div class="row g-3">
          <label class="col-sm-4 col-form-label"></label>
          <div class="col-sm-auto">
            <input type="position" class="form-control" v-model="position" placeholder="Position:" />
          </div>
          <div class="col-sm-auto">
            <input type="shoots" class="form-control" v-model="shoots" placeholder="Shoots:" />
          </div>
        </div>

        <div class="row g-3">
          <label class="col-sm-4 col-form-label"></label>
          <div class="col-sm-auto">
            <input type="team" class="form-control" v-model="team" placeholder="Team:" />
          </div>
          <div class="col-sm-auto">
            <input type="coach" class="form-control" v-model="coach" placeholder="Coach:" />
          </div>
        </div>

        <div class="row g-3">
          <label class="col-sm-4 col-form-label"></label>
          <div class="col-sm-auto">
            <input type="email" class="form-control" v-model="email" placeholder="Email:" />
          </div>
          <div class="col-sm-auto">
            <input type="password" class="form-control" v-model="password" placeholder="Password:" />
          </div>
        </div>

        <div class="row g-3">
          <label class="col-sm-4 col-form-label"></label>
          <div class="col-sm-auto">
            <input
              type="password"
              class="form-control"
              v-model="passwordConfirmation"
              placeholder="Password Confirmation"
            />
          </div>
        </div>
        <br />
        <input type="submit" class="btn btn-primary btn-l js-scroll-trigger" value="Submit" />
      </form>
    </div>
  </section>
</template>

<style>
form-control {
  /* Center the form on the page */
  margin: 0 auto;
  width: 500px;
  /* Form outline */
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 1em;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

form li + li {
  margin-top: 1em;
}

label {
  /* Uniform size & alignment */
  display: inline-block;
  width: 90px;
  text-align: right;
}

input,
textarea {
  /* To make sure that all text fields have the same font settings
     By default, textareas have a monospace font */
  font: 1em sans-serif;

  /* Uniform text field size */
  width: 300px;
  box-sizing: border-box;

  /* Match form field borders */
  border: 1px solid #999;
}

input:focus,
textarea:focus {
  /* Additional highlight for focused elements */
  border-color: rgb(192, 36, 36);
}

textarea {
  /* Align multiline text fields with their labels */
  vertical-align: top;

  /* Provide space to type some text */
  height: 5em;
}

.button {
  /* Align buttons with the text fields */
  padding-left: 90px; /* same size as the label elements */
}

button {
  /* This extra margin represent roughly the same space as the space
     between the labels and their text fields */
  margin-left: 0.5em;
}
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      name: "",
      city: "",
      state: "",
      birthdate: "",
      age: "",
      height: "",
      weight: "",
      position: "",
      shoots: "",
      team: "",
      coach: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: [],
    };
  },
  methods: {
    submit: function () {
      var params = {
        name: this.name,
        city: this.city,
        state: this.state,
        birthdate: this.birthdate,
        age: this.age,
        height: this.height,
        weight: this.weight,
        position: this.position,
        shoots: this.shoots,
        team: this.team,
        coach: this.coach,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      };
      axios
        .post("/api/user", params)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
