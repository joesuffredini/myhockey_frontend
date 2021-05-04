<template>
  <div id="app">
    <!-- Navigation -->
    <a class="menu-toggle rounded" href="/">
      <i class="fas fa-bars"></i>
    </a>
    <nav id="sidebar-wrapper">
      <ul class="sidebar-nav">
        <li class="sidebar-brand">
          <a class="js-scroll-trigger" href="/">Home</a>
        </li>

        <span v-if="!userLoggedIn()">
          <li class="sidebar-nav-item">
            <a class="js-scroll-trigger" href="/signup">Create an Account</a>
          </li>
        </span>

        <span v-if="!userLoggedIn()">
          <li class="sidebar-nav-item">
            <a class="js-scroll-trigger" href="/login">Login</a>
          </li>
        </span>

        <span v-if="userLoggedIn()">
          <li class="sidebar-nav-item">
            <a class="js-scroll-trigger" href="/school">Athletic Programs</a>
          </li>
        </span>

        <span v-if="userLoggedIn()">
          <li class="sidebar-nav-item">
            <a class="js-scroll-trigger" href="/recruit">Recruits</a>
          </li>
        </span>

        <span v-if="userLoggedIn()">
          <li class="sidebar-nav-item">
            <a class="js-scroll-trigger" href="/schoolselection">Pick a School</a>
          </li>
        </span>

        <span v-if="userLoggedIn()">
          <li class="sidebar-nav-item">
            <a class="js-scroll-trigger" href="/user/:id">My Profile</a>
          </li>
        </span>

        <span v-if="userLoggedIn()">
          <li class="sidebar-nav-item">
            <a class="js-scroll-trigger" href="/logout">Logout</a>
          </li>
        </span>
      </ul>
    </nav>

    <router-view />
    <!-- Footer -->
    <footer class="footer text-center">
      <div class="container">
        <ul class="list-inline mb-5">
          <li class="list-inline-item">
            <a class="social-link rounded-circle text-white mr-3" href="#!">
              <i class="icon-social-facebook"></i>
            </a>
          </li>
          <li class="list-inline-item">
            <a class="social-link rounded-circle text-white mr-3" href="#!">
              <i class="icon-social-twitter"></i>
            </a>
          </li>
          <li class="list-inline-item">
            <a class="social-link rounded-circle text-white" href="#!">
              <i class="icon-social-github"></i>
            </a>
          </li>
        </ul>
        <p class="text-muted small mb-0">Copyright &copy; Your Website 2020</p>
      </div>
    </footer>
  </div>
</template>

<style>
body {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
</style>
<script>
export default {
  methods: {
    userLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
    getUserId: function () {
      return localStorage.getItem("user_id");
    },
  },
};
</script>
