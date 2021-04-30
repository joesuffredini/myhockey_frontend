<template>
  <section class="content-section bg-primary text-secondary text-center" id="services">
    <div class="myschool-edit">
      <form v-on:submit.prevent="updateSchool(school)">
        <h1>Edit School Attributes!</h1>
        <ul>
          <li class="text-danger" v-for="error in errors" v-bind:key="error">
            {{ error }}
          </li>
        </ul>
        <div class="form-group">
          <label>Academic Classification(High/Med/Low):</label>
          <input type="text" class="form-control" v-model="school.academics" />
        </div>
        <div class="form-group">
          <label>Recruit Classification(High/Med/Low):</label>
          <input type="text" class="form-control" v-model="school.recruitclass" />
        </div>

        <input type="submit" class="btn btn-primary" value="Submit" />
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      school: {},
      errors: [],
    };
  },
  created: function () {
    console.log("Get school data");
    axios.get("/api/school/" + this.$route.params.id).then((response) => {
      console.log(response.data);
      this.school = response.data;
    });
  },

  methods: {
    updateSchool: function (school) {
      console.log("Updating My School Attributes");
      var params = {
        academics: school.academics,
        recruitclass: school.recruitclass,
      };
      axios
        .patch("/api/school/" + this.$route.params.id, params)
        .then(() => {
          this.$router.push("/school/" + this.school.id);
        })
        .catch((error) => console.log(error.response));
    },
  },
};
</script>
