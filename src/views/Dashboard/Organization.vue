<template>
    <div class='container is-fullhd columns'>
        <section class='section column is-3'>
            <aside class='menu'>
                <p class='menu-label'>Organization Management</p>
                <ul class='menu-list'>
                    <li>
                        <router-link :to="{name: 'Privileges'}" :class="{'is-active': isRoute('Privileges')}">Privileges</router-link>
                    </li>
                    <li><router-link :to="{name: 'Roles'}" :class="{'is-active': isRoute('Roles')}">Roles</router-link></li>
                    <li>
                        <router-link :to="{name: 'Applications'}" :class="{'is-active': isRoute('Applications')}">Applications</router-link>
                        <ul class='menu-list'>
                            <li><a>Privileges</a></li>
                            <li><a>Roles</a></li>
                        </ul>
                    </li>
                    <li><router-link :to="{name: 'Users'}" :class="{'is-active': isRoute('Users')}">Users</router-link></li>
                </ul>
                <br />
                <p class='menu-label'>General Management</p>
                <ul class='menu-list'>
                    <li>
                        <a>Organizations</a>
                        <ul class='menu-list'>
                            <li><a>Create new</a></li>
                        </ul>
                    </li>
                </ul>
            </aside>
        </section>

        <div class='column is-9 m-3'>
            <h1 class='title has-text-centered'>{{organization.name}}</h1>
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue,Component} from 'vue-property-decorator'

@Component({
    components: {

    }
})
export default class Organization extends Vue {
    private get organization() {
        return this.$store.state.organization;
    }

    private get orgs() {
        return this.$store.state.organizations;
    }

    private get tutorialMode() {
        return this.$store.state.tutorialMode;
    }

    private isRoute(name: string) {
        return this.$route.name === name;
    }
}
</script>

<style scoped lang="scss">

</style>