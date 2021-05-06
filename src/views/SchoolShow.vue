<template>
  <section class="content-section bg-primary text-secondary text-center" id="services">
    <div class="schoolshow">
      <span class="nowrap">
        <h1>{{ school.name }}</h1>
        <img :src="school.image" :alt="school.name" class="img-thumbnail" width="100" height="100" />
        <br />
        <a v-bind:href="school.url" v-bind:alt="school.url">
          <h5>
            <u><i>Athletic website</i></u>
          </h5>
        </a>
        <h5>
          <i>Location:</i>
          {{ school.location }} ---
          <i>Enrollment:</i>
          {{ school.enrollment }}
        </h5>
        <h5>
          <i>Nickname:</i>
          {{ school.nickname }} ---
          <i>Conference:</i>
          {{ school.conference }}
        </h5>
        <h5>
          <i>School Rink:</i>
          {{ school.rink }}
        </h5>
        <h5>
          <i>Head_Coach:</i>
          {{ school.head_coach }} --
          <i>Contact Info:</i>
          {{ school.email }}
        </h5>
        <br />
        <h5>
          <u>Roster Breakdown:</u>
        </h5>
        <h5>
          <ul>
            <li>{{ froshtotal }} - Freshmen</li>
            <li>{{ sophtotal }} - Sophomores</li>
            <li>{{ juniortotal }} - Junior</li>
            <li>{{ seniortotal }} - Senior</li>
            <li>{{ gradtotal }} - Grad Student</li>
          </ul>
        </h5>
        <h5>{{ forwardtotal }} Forwards, {{ defensetotal }} Defensemen, {{ goalietotal }} Goalies</h5>
        <h5>Number of Incoming recruits: {{ total }}</h5>
      </span>

      <div class="row row-3cols-2">
        <div class="col">
          <button class="btn btn-primary btn-l js-scroll-trigger" v-on:click="showRecruits()">View Recruits</button>

          <button class="btn btn-primary btn-l js-scroll-trigger" v-on:click="showRosters()">View Team Roster</button>

          <button class="btn btn-primary btn-l js-scroll-trigger" v-on:click="createSchoolSelection()">
            Select for Profile
          </button>

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
          <h3>Team Roster</h3>

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

h5 {
  font-family: Arial, Helvetica, sans-serif;
  color: rgb(43, 0, 255);
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
      gradtotal: "",
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
        console.log(this.school);
        this.recruits = this.school.recruit;
        this.rosters = this.school.roster;
        this.recruits.sort((a, b) => (a.year > b.year ? 1 : -1));
        this.rosters.sort((a, b) => (a.experience > b.experience ? 1 : -1));

        var i = 0;
        var frosh = 0;
        var soph = 0;
        var junior = 0;
        var senior = 0;
        var graduate = 0;
        while (i < this.rosters.length) {
          if (this.rosters[i]["experience"] == "FR") {
            frosh = frosh + 1;
          } else if (this.rosters[i]["experience"] == "SO") {
            soph = soph + 1;
          } else if (this.rosters[i]["experience"] == "JR") {
            junior = junior + 1;
          } else if (this.rosters[i]["experience"] == "SR") {
            senior = senior + 1;
          } else if (this.rosters[i]["experience"] == "GR") {
            graduate = graduate + 1;
          }
          i = i + 1;
        }
        this.froshtotal = frosh;
        this.sophtotal = soph;
        this.juniortotal = junior;
        this.seniortotal = senior;
        this.gradtotal = graduate;

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

    createSchoolSelection: function () {
      let params = {
        school: this.school.id,
        user: localStorage.getItem("user_id"),
      };
      axios
        .post("/api/recruitinfo", params)
        .then((response) => {
          this.selection = response.data;
          console.log("Creating a Profile", this.selection);
          this.$router.push("/user/" + this.user_id);
        })
        .catch((errors) => console.log(errors.response));
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
