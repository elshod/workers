<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark" class="pl-3 pr-3">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/workers">Workers</b-nav-item>
          <b-nav-item to="/tasks">Tasks</b-nav-item>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
    <b-container>
      <router-view/>
    </b-container>
  </div>
</template>
<script>
export default {
  created(){
    this.$store.dispatch('getAllWorkers')
    this.$store.dispatch('getAllTasks')
  }
}
</script>
<style>
.text-right {
        text-align: right;
    }
</style>
