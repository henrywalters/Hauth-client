<template>
  <div id="app">
    <navbar v-if='showNavbar' />
    <router-view v-if='initialized' />
  </div>
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';
import Navbar from '@/components/Navbar.vue';
import { AuthService } from './services/auth.service';

@Component({
  components: {
    Navbar
  }
})
export default class App extends Vue {
  private showNavbar = false;
  private auth!: AuthService;

  private initialized = false;

  private async created() {

    this.auth = new AuthService();
    await this.auth.initialize();
    this.$store.dispatch('fetchUser');

    this.checkIfNavbarHidden();
    this.$router.afterEach(() => {
      console.log(this.$route);
      this.checkIfNavbarHidden();
    })

    this.initialized = true;
  }

  private checkIfNavbarHidden() {
    // @ts-ignore
    if (['Login', 'Register'].indexOf(this.$route.name) === -1) {
      this.showNavbar = true;
    } else {
      this.showNavbar = false;
    }
  }
}
</script>

<style lang="scss">

#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  height: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
