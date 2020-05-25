<template>
    <div :class="className">
        <div v-if="img"
             :class="`${className}__img`" />
        <div :class="`${className}__content`">
            <div :class="`${className}__title`" />
            <div :class="`${className}__subtitle`" />
        </div>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component
    export default class ContentPlaceholdersHead extends Vue {
        @Prop({
            default: false
        })
        img?: Boolean;

        className = 'vue-content-placeholders-head'
    }
</script>
<style lang="scss" scoped>
    .main-class {
    }
</style>