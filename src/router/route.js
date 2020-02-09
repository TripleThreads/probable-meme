import Vue from 'vue'
import VueRouter from 'vue-router';
const HomeComponent = () => import('../components/Home');
const ContactsComponent = () => import('../components/Contacts');
const ConversationComponent = () => import('../components/Conversation');
Vue.use(VueRouter);

let routes =  [
    {path: '/', component: HomeComponent},
    {path: '/contacts', component: ContactsComponent},
    {path: '/conversation', component: ConversationComponent},
];


export const router = new VueRouter({
    routes
});