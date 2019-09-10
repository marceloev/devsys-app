import Empresas from '@/components/Empresas.vue';
import Usuarios from '@/components/Usuarios.vue';
import Parceiros from '@/components/Parceiros.vue';
import Teste from '@/components/Teste.vue';

export default [
    { path: '/', component: Teste },
    { path: '/home', component: Teste },
    { path: '/empresas', component: Empresas },
    { path: '/users', component: Usuarios },
    { path: '/parceiros', component: Parceiros },
];