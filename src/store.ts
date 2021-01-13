import Vue from 'vue';
import Vuex, { ActionTree, GetterTree, MutationTree } from 'vuex';
import { Organization } from './dtos/organization.dto';
import {User} from './dtos/user.dto';
import { AuthService } from './services/auth.service';
import { OrganizationService } from './services/organization.service';

Vue.use(Vuex);

class State {
    user: User | null = null;
    organization: Organization | null = null;
    organizations: Organization[] = [];
    tutorialMode: boolean = false;
}

const getters = <GetterTree<State, any>> {};

const mutations = <MutationTree<State>> {
    setUser(state, payload) {
        state.user = payload;
    },

    setOrganization(state, payload) {
        state.organization = payload;
    },

    setOrganizations(state, payload) {
        state.organizations = payload;
    },

    setTutorialMode(state, payload) {
        state.tutorialMode = payload;
    }
}

const actions = <ActionTree<State, any>> {
    async fetchUser(store) {
        const res = await (new AuthService()).getSelf();
        if (res.success) {
            store.commit('setUser', res.result);
        }
    },

    async fetchOrganizations(store) {
        const res = await (new OrganizationService()).get();
        if (res.success) {
            store.commit('setOrganizations', res.result);
        }
    }
}

export default new Vuex.Store({
    state: new State(),
    mutations,
    actions,
})