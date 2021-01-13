<template>
    <div class='hero is-fullheight is-info is-bold'>
        <div class='hero-body'>
            <div class='container'>
                <div class='columns is-desktop'>
                    <div class='column is-4 is-offset-4'>
                        <div class='mb-3'>
                            <img src='@/assets/Hauth_light-05.svg' />
                        </div>
                        <form class='box' @submit.prevent='standardLogin'>
                            <div class='has-text-centered'>
                                <h1 class='title has-text-dark'>Login</h1>
                            </div>
                            <hr />

                            <div class='field'>
                                <label class='label'>Email</label>
                                <div class='control'>
                                    <input class='input' type='text' v-model='data.email' />
                                </div>
                            </div>

                            <div class='field'>
                                <label class='label'>Password</label>
                                <div class='control'>
                                    <input class='input' type='password' v-model='data.password' />
                                </div>
                                <a href='#'>Forgot your password?</a>
                            </div>

                            <div class='field' v-if='error'>
                                <div class='control has-text-centered has-text-danger'>
                                    Invalid email / password
                                </div>
                            </div>

                            <div class='field'>
                                <div class='control'>
                                    <button class='button is-primary is-fullwidth standard-button' :class="{'is-loading': loading.standard}">
                                        <span class='icon'><icon icon='sign-in-alt' /></span>
                                        <span>Sign in</span>
                                    </button>
                                </div>
                            </div>

                            <div class='field has-text-centered'>
                                <div class='control'>
                                    Or
                                </div>
                            </div>

                            <div class='field'>
                                <div class='control'>
                                    <button class='button is-fullwidth google-button' @click.prevent ref='googleButton'>
                                        <span class='icon'><icon :icon="['fab', 'google']" /></span>
                                        <span>Sign in with Google</span>
                                    </button>
                                </div>
                            </div>

                            <div class='field'>
                                <div class='control'>
                                    <button class='button is-fullwidth facebook-button' @click.prevent='facebookLogin'>
                                        <span class='icon'><icon :icon="['fab', 'facebook']" /></span>
                                        <span>Sign in with Facebook</span>
                                    </button>
                                </div>
                            </div>

                            <hr />

                            <div class='field'>
                                <div class='control has-text-centered'>
                                    Don't have an account?
                                    <br />
                                    <router-link :to="{name: 'Register'}">Sign up</router-link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { FormDefinition, FormFieldType } from '@/dtos/form.dto';
import {Vue, Component} from 'vue-property-decorator'
import {AuthService, TokenSet} from './../services/auth.service';

@Component
export default class Login extends Vue {

    private auth: AuthService = new AuthService();
    private error = false;

    private loading = {
        standard: false,
        google: false,
        facebook: false,
    }

    private redirectTo!: string;

    private data = {
        email: '',
        password: '',
    }

    private reset() {
        this.data = {
            email: '',
            password: '',
        }
    }

    private postLogin(payload: TokenSet) {
        this.auth.setBearerToken(payload.accessToken);
        this.auth.saveRefreshToken(payload.refreshToken);
        this.$store.dispatch('fetchUser');
        if (this.redirectTo) {
            window.location.href = this.redirectTo;
        } else {
            this.$router.replace({name: 'Home'});
        }
    }

    private async standardLogin() {
        // this.error = false;
        this.loading.standard = true;
        const res = await this.auth.loginStandard(this.data);
        this.loading.standard = false;
        if (res.success) {
            this.postLogin(res.result);
        } else {
            this.error = true;
        }
    }

    private async googleLogin() {

    }

    private async facebookLogin() {

    }

    private mounted() {
        if (this.$route.query.redirectTo) {
            this.redirectTo = this.$route.query.redirectTo as string;
        }

        gapi.load('auth2', async () => {
            const googleAuth = gapi.auth2.init({
                client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
                //cookie_policy: 'single_host_origin',
            })
            
            console.log(this.$refs.googleButton);

            // @ts-ignore
            googleAuth.attachClickHandler(this.$refs.googleButton, {}, async (user) => {
                const idToken = user.getAuthResponse().id_token;
                const res = await this.auth.loginGoogle(idToken);
                if (res.success) {
                    this.postLogin(res.result);
                }
            }, (error) => {
                console.log(error);
            });
        })
        if (this.$route.query.redirectTo) {
            this.redirectTo = this.$route.query.redirectTo as string;
        }
    }
}
</script>

<style scoped lang="scss">

    $google-brand: #DB4437;
    $facebook-brand: #4267B2;

    .standard-button {
        color: black;
        font-weight: bold;
    }

    .google-button {
        background-color: $google-brand;
        color: #FFFFFF;
    }

    .google-button:focus {
        background-color: $google-brand;
        color: #FFFFFF;
    }

    .google-button:hover {
        background-color: darken($google-brand, 5%);
        color: white;
    }

    .facebook-button {
        background-color: #4267B2;
        color: white;
    }

    .facebook-button:focus {
        background-color: #4267B2;
        color: white;
    }

    .facebook-button:hover {
        background-coloR: darken($facebook-brand, 5%);
        color: white;
    }

</style>