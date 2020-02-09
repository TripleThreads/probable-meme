<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="drawer"
                mini-variant-width="56"
                :clipped="$vuetify.breakpoint.lgAndUp"
                app
        >
            <div class="my-2 ml-2 mt-3">
                <v-btn x-large @click="openDialog">
                    <v-icon color="red">mdi-microphone</v-icon>
                    Start Recording
                </v-btn>
            </div>
            <v-list dense>
                <template v-for="(item, i) in items">
                    <v-divider v-if="item.divider" :key="i"></v-divider>
                    <v-list-item v-else :key="item.title" @click="route(item.link)">
                        <v-list-item-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-title>{{ item.text }}</v-list-item-title>
                    </v-list-item>
                </template>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
                :clipped-left="$vuetify.breakpoint.lgAndUp"
                app
                color="blue darken-3"
                dark
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
            <v-toolbar-title
                    style="width: 300px"
                    class="ml-0 pl-4"
            >
                <v-btn icon large>
                    <v-avatar size="32px" item>
                        <v-img
                                src="@/assets/ear.svg"
                                alt="Vuetify"
                        />
                    </v-avatar>
                </v-btn>
                <span class="hidden-sm-and-down">eHear</span>
            </v-toolbar-title>
            <v-spacer/>
            <v-btn icon>
                <v-icon>mdi-apps</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-bell</v-icon>
            </v-btn>
        </v-app-bar>
        <v-content>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <router-view></router-view>
                </v-row>
            </v-container>
        </v-content>
        <v-dialog
                v-model="dialog"
                width="800px"
        >
            <v-card>
                <v-card-title class="blue darken-4 white">
                    Listening to your conversation
                </v-card-title>
                <v-container>
                    <v-row>
                        <v-col cols="3" class="mr-12">
                            <v-container fluid class="width">
                                <div id="app">
                                    <audio-recorder
                                            v-model="record"
                                            upload-url='https://shiny-ehear.herokuapp.com/'
                                            :attempts="3"
                                            :time="2"
                                            :after-recording="callback"
                                            :before-upload="callback"
                                            :successful-upload="callback"
                                            :failed-upload="callback"/>
                                </div>
                            </v-container>
                        </v-col>
                        <v-col cols="5" class="ml-12">
<!--                            <v-card elevation="6" height="390" class="ml-3">-->
<!--                            </v-card>-->
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
    import axios from 'axios';
    import {router} from "@/router/route";
    // import Conversation from "./components/Conversation";

    export default {
        // components: {Conversation},
        props: {
            source: String,
        },
        data: () => ({
            record: null,
            dialog: false,
            drawer: null,
            headers: "speak now",
            items: [
                {icon: 'mdi-home', text: 'Home', link: '/'},
                {icon: 'mdi-account-multiple', text: 'Contacts', link: '/contacts'},
                {icon: 'mdi-message', text: 'Conversation', link: '/conversation'},
                {icon: 'mdi-settings', text: 'Settings'},
                {icon: 'mdi-help-circle', text: 'Help'},
            ],
        }),
        methods: {
            route(link) {
                router.push(link);
            },
            onResult() {

            },
            openDialog() {
                this.dialog = !this.dialog;
            },
            callback (data) {

                console.log('The blob data:', data.blob);
                let formData = new FormData();
                formData.append("audio", data.blob);
                axios.post('https://shiny-ehear.herokuapp.com/receive',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then(function (res) {
                    console.log(res);
                })
                .catch(function (err) {
                    console.log(err);
                });
            }
        }
    }
</script>

<style scoped>
    .white {
        color: white !important;
    }

    .width {
        width: 25%;
    }
</style>