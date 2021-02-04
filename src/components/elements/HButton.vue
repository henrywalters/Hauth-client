<template>
    <button class='button' :class="'is-' + type" @click="$emit('click', $event)">
        <span class='icon' v-if="icon">
            <icon :icon="icon" />
        </span>
        <span v-if="label">
            {{ label }}
        </span>
    </button>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class HButton extends Vue {
    @Prop()
    public icon!: string | string[];

    @Prop()
    public label!: string;

    @Prop({type: String, default: 'primary'})
    public type!: string;
}
</script>