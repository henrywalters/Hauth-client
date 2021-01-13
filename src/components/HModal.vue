<template>
    <div class='modal' :class="{'is-active': show}">
        <div class='modal-background' @click='$emit("close")'></div>
        <div class='modal-card'>
            <div class='modal-card-body'>
                <slot></slot>
            </div>
        </div>
        <div>
            <button class="modal-close is-large" aria-label="close" @click='$emit("close")'></button>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue,Component, Prop, Watch} from 'vue-property-decorator';

@Component({})
export default class HModal extends Vue {
    @Prop({type: Boolean, default: false})
    public show!: boolean;
}
</script>