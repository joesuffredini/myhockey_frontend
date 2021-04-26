<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <span v-if="!userLoggedIn()">
        <router-link to="/signup">Create an Account</router-link>
        |
      </span>

      <span v-if="!userLoggedIn()">
        <router-link to="/login">Log in</router-link>
        |
      </span>

      <span v-if="userLoggedIn()">
        <router-link to="/user/:id">My Profile</router-link>
        |
      </span>

      <span v-if="userLoggedIn()">
        <router-link to="/school">Schools</router-link>
        |
      </span>

      <span v-if="userLoggedIn()">
        <router-link to="/recruit">Recruits</router-link>
        |
      </span>

      <span v-if="userLoggedIn()">
        <router-link to="/schoolselection">School Selections</router-link>
        |
      </span>

      <span v-if="userLoggedIn()">
        <router-link to="/logout">Logout</router-link>
        |
      </span>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
export default {
  methods: {
    userLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
  },
};
</script>
