import Home from '@/components/commom/home/Home.vue';
import Empresas from '@/components/commom/empresas/Empresas.vue';
import Usuarios from '@/components/commom/usuarios/Usuarios.vue';
import Parceiros from '@/components/commom/parceiros/Parceiros.vue';

export default [
    { path: '/', component: Home },
    { path: '/home', component: Home },
    { path: '/empresas', component: Empresas },
    { path: '/users', component: Usuarios },
    { path: '/parceiros', component: Parceiros },
];