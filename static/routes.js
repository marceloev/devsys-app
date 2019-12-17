import Home from '@/components/commom/home/Home.vue';
import Empresas from '@/components/commom/empresas/Empresas.vue';
import Usuarios from '@/components/commom/usuarios/Usuarios.vue';
import Parceiros from '@/components/commom/parceiros/Parceiros.vue';
import Series from '@/components/commom/series/Series.vue';
import Generos from '@/components/commom/generos/Generos.vue';

const routs = [
    { path: '/', component: Home },
    { path: '/home', component: Home },
    { path: '/empresas', component: Empresas },
    { path: '/users', component: Usuarios },
    { path: '/parceiros', component: Parceiros },
    { path: '/series', component: Series },
    { path: '/generos', component: Generos },
]

export default routs;