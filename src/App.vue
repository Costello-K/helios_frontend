<template>
  <img alt="Quiz logo" src="./assets/logo.png">
  <WelcomeToQuizzes msg="Welcome to Quizzes"/>
</template>

<script>
import WelcomeToQuizzes from './components/WelcomeToQuizzes.vue'

export default {
  name: 'App',
  components: {
    WelcomeToQuizzes
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
img {
  max-width: 200px;
}
</style>
