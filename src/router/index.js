import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '',
        component: () => import('@/components/NavbarComponent'),
        children: [
            { path: '', component: () => import('@/views/HomePage') },
            { path: 'registration', component: () => import('@/views/UserRegistrationPage') },
            { path: 'authorization', component: () => import('@/views/UserAuthorizationPage') },
            { path: 'users', component: () => import('@/views/UserListPage') },
            { path: 'users/:id', component: () => import('@/views/UserProfilePage') },
            { path: 'companies', component: () => import('@/views/CompanyListPage') },
            { path: 'companies/:id', component: () => import('@/views/CompanyProfilePage') },
            { path: 'about', component: () => import('@/views/AboutPage') },
            { path: 'settings', component: () => import('@/views/UserProfileSettingsPage') },
            { path: '/:catchAll(.*)', component: () => import('@/views/NotFoundPage') },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
