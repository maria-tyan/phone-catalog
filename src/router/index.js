import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import BrandPage from '../views/BrandPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/brands',
    name: 'BrandsPage',
    meta: {
      title: 'Mobiltelefoner',
      metaTags: [
        {
          name: 'description',
          content: 'Mobiltelefoner catalog',
        },
        {
          property: 'og:description',
          content: 'Mobiltelefoner catalog',
        },
      ],
    },
    component: () => import('../views/BrandsPage.vue'),
    children: [
      {
        path: ':brand',
        component: BrandPage,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
