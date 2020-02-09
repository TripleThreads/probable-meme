<template>
    <v-container>
        <v-row class="mx-6">
            <v-list three-line>
                <template v-for="(item, index) in watchFirebase">
                    <v-subheader
                            v-if="item.header"
                            :key="item.header"
                            v-text="item.header"></v-subheader>

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
                            <v-img :src="items[item.id].avatar"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>Person {{ item.id }}</v-list-item-title>
                            <v-list-item-subtitle v-html="item.word"></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>

        </v-row>
    </v-container>
</template>

<script>
    import { firestore } from "../firestore/fire-base"
    export default {
        data: () => ({
            items: [
                { title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
                { title: 'Travis Howard', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
                { title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
                { title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
            ],
        }),
        firestore() {
            return {
                trans : firestore.collection('transcripts')
            }
        },

        computed : {
            watchFirebase() {
                let self = this;
                let subarr = [];
                for (let i = 0; i < self.trans.length; i++) {
                    let words = self.trans[i].response.words;
                    let string = " ";
                    let id = words[0].speaker_id;
                    for (let j = 0; j < words.length; j++) {
                        if (id === words[j].speaker_id) {
                            string += words[j].word + " ";

                            if (j === words.length - 1) {
                                subarr.push({"id": id, "word" :string});
                            }
                        }
                        else {
                            subarr.push({"id": id, "word" :string});
                            string = words[j].word;
                            id = words[j].speaker_id;
                        }
                    }

                }
                console.log(subarr);
                return subarr;
            }
        }
    }
</script>
<style scoped>

</style>