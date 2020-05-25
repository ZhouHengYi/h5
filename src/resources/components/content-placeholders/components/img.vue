<template>
    <div :class="className" />
</template>
<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    @Component
    export default class ContentPlaceholdersImg extends Vue {
        className = 'vue-content-placeholders-img';
    }
</script>
<style lang="scss" scoped>
    .main-class {
    }
</style>