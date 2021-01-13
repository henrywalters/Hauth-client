<template>
    <div class='hero is-fullheight is-info is-bold'>
        <div class='hero-body'>
            <div class='container'>
                <div class='columns is-desktop'>
                    <div class='column is-4 is-offset-4'>
                        <div class='mb-3'>
                            <img src='@/assets/Hauth_light-05.svg' />
                        </div>
                        <form class='box' @submit.prevent='standardRegister'>
                            <div class='has-text-centered'>
                                <h1 class='title has-text-dark'>Register</h1>
                            </div>
                            <hr />

                            <div class='field'>
                                <label class='label'>Name</label>
                                <div class='control'>
                                    <input class='input' type='text' v-model='data.name' />
                                </div>
                            </div>

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
                            </div>

                            <div class='field' v-if='error'>
                                <div class='control has-text-centered has-text-danger'>
                                    <span v-if='isGenericError()'>{{error}}</span>
                                </div>
                            </div>

                            <div class='field'>
                                <div class='control'>
                                    <button class='button is-primary is-fullwidth standard-button' :class="{'is-loading': loading.standard}">
                                        <span class='icon'><icon icon='sign-in-alt' /></span>
                                        <span>Sign up</span>
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
                                    <button class='button is-fullwidth google-button' ref='googleButton' @click.prevent>
                                        <span class='icon'><icon :icon="['fab', 'google']" /></span>
                                        <span>Sign up with Google</span>
                                    </button>
                                </div>
                            </div>

                            <div class='field'>
                                <div class='control'>
                                    <button class='button is-fullwidth facebook-button' @click.prevent='facebookRegister'>
                                        <span class='icon'><icon :icon="['fab', 'facebook']" /></span>
                                        <span>Sign up with Facebook</span>
                                    </button>
                                </div>
                            </div>

                            <hr />

                            <div class='field'>
                                <div class='control has-text-centered'>
                                    Already have an account?
                                    <br />
                                    <router-link :to="{name: 'Login'}">Sign in</router-link>
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
import {Vue, Component} from 'vue-property-decorator'
import {AuthService, LoginDto, RegisterDto} from './../services/auth.service';

@Component
export default class Register extends Vue {

    private auth: AuthService = new AuthService();
    private error = false;

    private googleAuth!: gapi.auth2.GoogleAuth;

    private registered = false;

    private loading = {
        standard: false,
        google: false,
        facebook: false,
    }

    private redirectTo!: string;

    private data: RegisterDto = {
        name: '',
        email: '',
        password: '',
        organizationId: void 0,
    }

    private reset() {
        this.data = {
            name: '',
            email: '',
            password: '',
            organizationId: void 0,
        }

        if (this.$route.params.orgId) {
            this.data.organizationId = this.$route.params.orgId;
        }
    }

    private postLogin() {
        if (this.redirectTo) {
            window.location.href = this.redirectTo;
        } else {
            this.$router.replace({name: 'Home'});
        }
    }

    private async standardRegister() {
        // this.error = false;
        console.log(this.data);
        this.loading.standard = true;
        const res = await this.auth.registerStandard(this.data);
        this.loading.standard = false;
        if (res.success) {
            this.postLogin();
        } else {
            console.log(res.error);
            this.error = res.error;
        }
    }

    private async googleRegister() {

    }

    private async facebookRegister() {

    }

    private async mounted() {
        gapi.load('auth2', async () => {
            this.googleAuth = gapi.auth2.init({
                client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
                //cookie_policy: 'single_host_origin',
            })

            // @ts-ignore
            this.googleAuth.attachClickHandler(this.$refs.googleButton, {}, async (user) => {
                const idToken = user.getAuthResponse().id_token;
                const res = await this.auth.registerGoogle(idToken, this.$route.params.orgId);
                console.log(res);
            }, (error) => {
                console.log(error);
            });
        })
        if (this.$route.query.redirectTo) {
            this.redirectTo = this.$route.query.redirectTo as string;
        }
    }

    private isGenericError() {
        return typeof this.error === 'string';
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
        background-color: darken($google-brand, 2%);
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
        background-coloR: darken($facebook-brand, 2%);
        color: white;
    }

</style>