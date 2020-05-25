<template>
    <div :class="className">
        <div v-for="n in lines"
             :key="n"
             :class="`${className}__line`" />
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component
    export default class ContentPlaceholdersText extends Vue {
        @Prop({
            default: 4
        })
        lines?: Number;

        className = 'vue-content-placeholders-text';
    }
</script>
<style lang="scss" scoped>
    .main-class {
    }
</style>