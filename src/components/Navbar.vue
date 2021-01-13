<template>
    <nav class='navbar is-info' role='navigation' aria-label='main navigation'>
        <div class='navbar-brand'>
            <router-link class='navbar-item' :to="{name: 'Home'}">
                <img src='@/assets/Hauth_light-05.svg' class='logo'/>
            </router-link>
            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar" @click="toggled = !toggled">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div class='navbar-menu' :class="{'is-active': toggled}" id='navbar'>
            <div class='navbar-start'>
                <span class='navbar-item' v-if='user'>
                    Hello {{user.name.split(' ')[0]}}
                </span>
                <router-link class='navbar-item' :to="{name: 'Login'}" v-if='!isAuthenticated'>
                    Sign in
                </router-link>
                <a href='#' class='navbar-item' v-else @click.prevent='signout'>
                    Sign out
                </a>
                <a class='navbar-item' href='http://localhost:3000/v1/docs'>Docs</a>
            </div>

            <div class='navbar-end'>
                <div class='navbar-item'>
                    <div class='buttons'>
                        <a class='button is-inverted is-outlined' :class="{'is-dark': !toggled}" href='https://github.com/henrywalters/HAuth'>
                            <span class='icon'>
                                <icon :icon="['fab', 'github']" />
                            </span>
                            <span>
                                View on Github
                            </span>
                        </a>

                        <router-link 
                            :to="{name: 'Dashboard'}" 
                            class='button is-inverted is-outlined' 
                            :class="{'is-dark': !toggled}" 
                            v-if='isAuthenticated && $route.matched.filter(r => r.name === "Dashboard").length === 0'
                        >
                            <span class='icon'>
                                <icon icon="tachometer-alt" />
                            </span>
                            <span>
                                Go to Dashboard
                            </span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { User } from '@/dtos/user.dto';
import { AuthService } from '@/services/auth.service';
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class Navbar extends Vue {
    private toggled = false;

    private get isAuthenticated() {
        return !!this.$store.state.user;
    }

    private get user(): User {
        return this.$store.state.user;
    }

    private async signout() {
        (new AuthService()).clearRefreshToken();
        this.$store.commit('setUser', null);
        this.$router.replace({name: 'Home'});
    }
}
</script>

<style lang="scss" scoped>

img {
    width: 100px;
}

</style>