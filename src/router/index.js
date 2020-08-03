import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../views/Main.vue';
import Home from '../views/Home.vue';
import Discover from '../views/Discover.vue';
import Notifications from '../views/Notifications.vue';
import Profile from '../views/Profile.vue';
import Error404 from '../views/404.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '',
        name: 'Home',
        key: '0',
        component: Home,
      },
      {
        path: 'discover',
        name: 'Discover',
        component: Discover,
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications,
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile,
      },
    ],
  },
  {
    path: '/login',
  },
  {
    path: '*',
    name: '404',
    component: Error404,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
