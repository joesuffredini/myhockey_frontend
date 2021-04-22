<template>
  <div class="Recruitindex">
    <div class="row">
      <div class="col-sm-6" v-for="recruit in recruits" v-bind:key="recruit.id">
        <div class="card">
          <div class="card-body">
            <router-link v-bind:to="`recruit/${recruit.id}`">
              <p1>{{ recruit.school }}: {{ recruit.player }}</p1>
              <br />
              <!-- <p1>{{ recruit.player }}</p1> -->
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
      recruits: [],
    };
  },
  created: function () {
    this.RecruitIndex();
  },
  methods: {
    RecruitIndex: function () {
      axios.get("/api/recruit").then((response) => {
        this.recruits = response.data;
        console.log("all recruits:", this.recruits);
      });
    },
  },
};
</script>
