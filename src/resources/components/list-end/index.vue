<template>
    <div class="list-end">
        没有更多了
    </div>
</template>
<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    @Component
    export default class ListEnd extends Vue {
    }
</script>
<style lang="scss" scoped>
    .list-end {
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 64px;

        &::before {
            content: "";
            display: block;
            /* prettier-ignore */
            height: 1PX;
            width: 160px;
            margin-right: 30px;
            background: rgba(#000, 0.28);
        }

        &::after {
            content: "";
            display: block;
            /* prettier-ignore */
            height: 1PX;
            width: 160px;
            margin-left: 30px;
            background: rgba(#000, 0.28);
        }
    }
</style>
