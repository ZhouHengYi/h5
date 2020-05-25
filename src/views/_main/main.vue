<template>
    <div class="app-main">
        <input type="text"
               class="search"
               v-model="keywords"
               placeholder="输入关键词" />

        <div class="url-list"
             v-for="(item, index) in newList"
             v-show="item.list && item.list.length > 0"
             :key="index">
            <h5>{{ item.name }}</h5>
            <button v-for="(sitem, sindex) in item.list"
                    :key="sindex">
                <router-link :to="{ name: sitem.name, query: sitem.query, params: sitem.params}">{{ sitem.text }}</router-link>
            </button>
        </div>

        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Watch } from "vue-property-decorator";
    import "@/resources/plugins/confirm";

    @Component
    export default class Main extends Vue {

        keywords = '';

        list = [
            {
                name: 'USER',
                list: [
                    { text: '岗位详情', name: 'user-job-detail' },
                ]
            },
            {
                name: 'BUSINESS',
                list: []
            },
            {
                name: 'COMMON',
                list: [
                    { text: '意见反馈', name: 'suggestion-feedback' },
                ]
            },
            {
                name: 'ACTIVITY',
                list: []
            }
        ];

        newList: any[] = [];

        created() {
            this.newList = this.list;
        }

        @Watch('keywords')
        onKeyWordsChange(str: string) {

            let newList: any[] = [];

            if (!str) {
                this.newList = [];
                return;
            }

            this.list.map((itemList) => {
                (itemList.list || []).map((sitem: any) => {
                    sitem.text.indexOf(str) > -1 && newList.push({
                        name: itemList.name,
                        list: [].concat(sitem)
                    })
                });
            });

            this.newList = newList;
        }

    }
</script>
<style lang="scss" scoped>
    .app-main {
        padding: 10px 40px;

        .search {
            margin: 20px 0;
        }

        .url-list {
            h5 {
                margin: 20px 0;
            }

            button {
                background: #ff5722;
                margin: 5px;
                padding: 0 8px;

                a {
                    color: #fff;
                    text-decoration: none;
                }
            }

            input {
                border: 2px solid #c10;
            }
        }
    }
</style>