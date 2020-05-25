<template>
    <div class="list-loading">
        <i class="icon-loading"></i>加载中…
    </div>
</template>
<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    @Component
    export default class ListLoading extends Vue {
    }
</script>
<style lang="scss" scoped>
    .list-loading {
        display: flex;
        align-content: center;
        justify-content: center;
        line-height: 64px;

        i {
            display: block;
            margin: 0 16px;
            animation: spin 1.8s infinite linear;
            font-size: 42px;
        }

        @keyframes spin {
            0% {
                transform: rotate(0);
            }

            100% {
                transform: rotate(360deg);
            }
        }
    }
</style>
