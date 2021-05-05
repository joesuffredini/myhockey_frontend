<template>
  <section class="content-section bg-primary text-secondary text-center" id="services">
    <div class="schoolshow">
      <div class="container">
        <h2>{{ school.name }}</h2>
        <img :src="school.image" :alt="school.name" width="150" height="150" />
        <br />
        <a v-bind:href="school.url" v-bind:alt="school.url"><h5>Athletic website</h5></a>
        <h5>Location: {{ school.location }} -- Enrollment: {{ school.enrollment }}</h5>
        <h5>Nickname: {{ school.nickname }} -- Conference: {{ school.conference }}</h5>
        <h5>School Rink: {{ school.rink }}</h5>
        <h5>Head_Coach: {{ school.head_coach }} -- Contact Info: {{ school.email }}</h5>
        <h5>Roster Breakdown:</h5>
        <h5>Class: {{ froshtotal }} FR, {{ sophtotal }} SO, {{ juniortotal }} JR, {{ seniortotal }} SR</h5>
        <h5>Position: {{ forwardtotal }} Forwards, {{ defensetotal }} Defensemen, {{ goalietotal }} Goalies</h5>
        <h5>Number of Incoming recruits: {{ total }}</h5>
      </div>

      <div class="row row-3cols-2">
        <div class="col">
          <button class="btn btn-primary btn-l js-scroll-trigger" v-on:click="showRecruits()">View Recruits</button>
          <button class="btn btn-primary btn-l js-scroll-trigger" v-on:click="showRosters()">View Team Roster</button>
          <button class="btn btn-primary btn-l js-scroll-trigger" v-on:click="goBack()">Back</button>
        </div>
      </div>

      <dialog id="recruit-info">
        <form method="dialog">
          <div v-for="recruit in recruits" :key="recruit">
            <router-link v-bind:to="`/recruit/${recruit.id}`">
              <h5>{{ recruit["player"] }} -- Position {{ recruit["position"] }} -- Year {{ recruit["year"] }}</h5>
            </router-link>
          </div>
          <button>Close</button>
        </form>
      </dialog>

      <dialog id="roster-info">
        <form method="dialog">
          <div v-for="roster in rosters" :key="roster">
            <router-link v-bind:to="`/roster/${roster.id}`">
              <h9>{{ roster["name"] }} -- {{ roster["position"] }} -- {{ roster["experience"] }}</h9>
            </router-link>
          </div>

          <button>Close</button>
        </form>
      </dialog>
    </div>
  </section>
</template>

<style>
.schoolshow {
  background-color: lightblue;
}
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      school: {},
      recruits: {},
      rosters: {},
      total: "",
      froshtotal: "",
      sophtotal: "",
      juniortotal: "",
      seniortotal: "",
      forwardtotal: "",
      defensetotal: "",
      goalietotal: "",
    };
  },
  created: function () {
    this.showSchool();
    this.getRecruittotal();
  },
  methods: {
    showSchool: function () {
      axios.get("/api/school/" + this.$route.params.id).then((response) => {
        this.school = response.data;
        this.recruits = this.school.recruit;
        this.rosters = this.school.roster;
        this.recruits.sort((a, b) => (a.year > b.year ? 1 : -1));
        this.rosters.sort((a, b) => (a.experience > b.experience ? 1 : -1));

        console.log(this.rosters);

        var i = 0;
        var frosh = 0;
        var soph = 0;
        var junior = 0;
        var senior = 0;
        while (i < this.rosters.length) {
          if (this.rosters[i]["experience"] == "FR") {
            frosh = frosh + 1;
            console.log(frosh);
          } else if (this.rosters[i]["experience"] == "SO") {
            soph = soph + 1;
            console.log(soph);
          } else if (this.rosters[i]["experience"] == "JR") {
            junior = junior + 1;
            console.log(junior);
          } else if (this.rosters[i]["experience"] == "SR") {
            senior = senior + 1;
            console.log(senior);
          }
          i = i + 1;
        }
        this.froshtotal = frosh;
        this.sophtotal = soph;
        this.juniortotal = junior;
        this.seniortotal = senior;

        i = 0;
        var forward = 0;
        var defense = 0;
        var goalie = 0;
        while (i < this.rosters.length) {
          if (this.rosters[i]["position"] == "F") {
            forward = forward + 1;
          } else if (this.rosters[i]["position"] == "D") {
            defense = defense + 1;
          } else if (this.rosters[i]["position"] == "G") {
            goalie = goalie + 1;
          }
          i = i + 1;
        }
        this.forwardtotal = forward;
        this.defensetotal = defense;
        this.goalietotal = goalie;
      });
    },

    getRecruittotal: function () {
      axios.get("/api/school/" + this.$route.params.id).then((response) => {
        this.total = response.data.recruits_position.length;
        console.log("Number of recruits", this.total);
      });
    },

    showRecruits: function () {
      document.querySelector("#recruit-info").showModal();
    },

    showRosters: function () {
      document.querySelector("#roster-info").showModal();
    },

    goBack: function () {
      this.$router.go(-1);
    },

    destroySchool: function (school) {
      axios.delete("/api/school/" + school.id).then(() => {
        console.log("School destroyed");
        this.$router.push("/school");
      });
    },
  },
};
</script>
