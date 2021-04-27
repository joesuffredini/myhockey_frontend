<template>
  <div class="Recruitshow">
    <div class="container">
      <h3>Position: {{ recruit.position }}</h3>
      <h3>Height: {{ recruit.height }}</h3>
      <h3>Weight: {{ recruit.weight }} lbs</h3>
      <h3>Position: {{ recruit.position }}</h3>
      <h3>DOB: {{ recruit.birthdate }}</h3>
      <h3>Recruit Year: {{ recruit.year }}</h3>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      recruit: {},
    };
  },
  created: function () {
    this.showRecruit();
  },
  methods: {
    showRecruit: function () {
      axios.get("/api/recruit/" + this.$route.params.id).then((response) => {
        console.log(response.data);
        this.recruit = response.data;
      });
    },
    destroyRecruit: function (recruit) {
      axios.delete("/api/recruit/" + recruit.id).then(() => {
        console.log("Recruit destroyed");
        this.$router.push("/recruit");
      });
    },
  },
};
</script>
