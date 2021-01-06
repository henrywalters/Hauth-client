<template>
  <section class='hero is-medium is-info is-dark'>
    <div class='hero-body'>
      <div class='container'>
        <img src='@/assets/Hauth_light-05.svg' class='logo'/>
        <h1 class='title'>Hauth</h1>
        <h2 class='subtitle'>A fast and simple authentication and authorization service for businesses</h2>
        <div class='buttons'>
            <router-link :to="{name: 'Register'}" class='button is-dark is-inverted is-outlined'>
                <span class='icon'>
                    <icon icon="user-plus" />
                </span>
                <span>
                    Sign up to get started for free
                </span>
            </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Home extends Vue {}
</script>

<style scoped lang="scss">
  .logo {
    width: 400px;
    height: auto;
    margin-bottom: 3rem;
  }
</style>