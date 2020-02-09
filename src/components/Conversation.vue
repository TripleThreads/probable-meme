<template>
    <v-container>
        <v-row class="mx-6">
            <v-list three-line>
                <template v-for="(item, index) in trans.response">
                    {{ item.transcript }}
                    <v-subheader
                            v-if="item.header"
                            :key="item.header"
                            v-text="item.header"
                    ></v-subheader>

                    <v-divider
                            v-else-if="item.divider"
                            :key="index"
                            :inset="item.inset"
                    ></v-divider>

                    <v-list-item
                            v-else
                            :key="item.title"
                    >
                        <v-list-item-avatar>
                            <v-img :src="item.avatar"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-subtitle v-html="item.transcript"></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>

        </v-row>
    </v-container>
</template>

<script>
    import { transcript } from "../firestore/fire-base"
    export default {
        data: () => ({
            items: [
                { header: 'Today' },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                    title: 'Brunch this weekend?',
                    subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
                },
                { divider: true, inset: true },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                    title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
                    subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
                },
                { divider: true, inset: true },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                    title: 'Oui oui',
                    subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
                },
            ],
        }),
        firestore() {
            return {
                trans : transcript
            }
        }
    }
</script>
<style scoped>

</style>