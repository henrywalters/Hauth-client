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
                <router-link class='navbar-item' :to="{name: 'Login'}">Sign in</router-link>
                <router-link class='navbar-item' :to="{name: 'Home'}">Home</router-link>

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
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class Navbar extends Vue {
    private toggled = false;
}
</script>

<style lang="scss" scoped>

img {
    width: 100px;
}

</style>