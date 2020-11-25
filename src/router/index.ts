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
    component: Main,
    meta: {
      title: 'Leaf',
    },
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: {
          title: 'Leaf',
        },
      },
      {
        path: 'discover',
        name: 'Discover',
        component: Discover,
        meta: {
          title: 'Discover - Leaf',
        },
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications,
        meta: {
          title: 'Notifications - Leaf',
        },
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile,
        meta: {
          title: 'Profile - Leaf',
        },
      },
      {
        path: 'user/:username',
        name: 'User',
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
