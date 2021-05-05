<template>
  <section class="content-section bg-primary text-secondary text-center" id="services">
    <h1>D1 Hockey School Rosters</h1>
    <div class="rosterindex">
      <div class="row">
        <div class="col-sm-6" v-for="roster in rosters" v-bind:key="roster.id">
          <div class="card">
            <div class="card-body">
              <router-link v-bind:to="`roster/${roster.id}`">
                <img :src="roster.image" :alt="roster.school" width="100" height="100" />
                <h5>{{ roster.school }}</h5>
                <p></p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <button class="btn btn-primary btn-xl js-scroll-trigger" v-on:click="goBack()">Back</button>
  </section>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      rosters: {},
    };
  },
  created: function () {
    this.RosterIndex();
    this.goBack();
  },

  methods: {
    RosterIndex: function () {
      axios.get("/api/roster").then((response) => {
        this.rosters = response.data;
        console.log("all rosters", this.rosters);
      });
    },

    goBack: function () {
      this.$router.go(-1);
    },
  },
};
</script>
