import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Father from '../views/cnode/Fatherpage'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/homepage',
        component: Father,
        children: [{
            path: '',
            name: 'homepage',
            component: () =>
                import ('../views/cnode/Homepage.vue')
        }]
    },
    {
        path: '/details',
        component: Father,
        children: [{
            path: '',
            name: 'details',
            component: () =>
                import ('../views/cnode/Detailspage.vue')
        }]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router