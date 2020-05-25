<template>
    <div class="fullscreen-dialog">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class FullscreenDialog extends Vue {}
</script>
<style lang="scss" scoped>
.fullscreen-dialog {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(75, 75, 75, 0.58);
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 130;
}
</style>