<template>
  <section class="content-section bg-primary text-black text-center" id="services">
    <h1 strong>D1 Recruits</h1>
    <div class="Recruitindex">
      <div class="row">
        <div class="col-sm-6" v-for="recruit in recruits" v-bind:key="recruit.id">
          <div class="card">
            <div class="card-body">
              <router-link v-bind:to="`recruit/${recruit.id}`">
                <img :src="recruit.image" :alt="recruit.name" width="50" height="50" />
                <p1>{{ recruit.school }}: {{ recruit.player }} position:{{ recruit.position }}</p1>
                <br />
                <p></p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div class="row row-3cols-2">
      <div class="col">
        <button class="btn btn-primary btn-xl js-scroll-trigger" v-on:click="goBack()">Back</button>
      </div>
    </div>
  </section>
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
        this.recruits.sort((a, b) => (a.school > b.school ? 1 : -1));
        console.log("all recruits:", this.recruits);
      });
    },
    goBack: function () {
      this.$router.go(-1);
    },
  },
};
</script>
