<template>
    <div class='collapsible-container'>
        <div v-show='expanded'>
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";

@Component
export default class HCollapsible extends Vue {

    private expanded = false;

    public toggle() {
        this.expanded = !this.expanded;
    }

    public close() {
        this.expanded = false;
    }

    public open() {
        this.expanded = true;
    }
}
</script>

<style scoped lang="scss">

</style>