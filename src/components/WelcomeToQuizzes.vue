<template>
  <div class="welcome">
    <h1 class="project-title">HELIOS</h1>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'WelcomeToQuizzes',
  props: {
    msg: String
  }
}
</script>

<style>
.project-title {
  font-size: 42px;
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
