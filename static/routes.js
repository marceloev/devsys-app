import Home from '@/components/commom/home/Home.vue';
import Empresas from '@/components/commom/empresas/Empresas.vue';
import Usuarios from '@/components/commom/usuarios/Usuarios.vue';
import Parceiros from '@/components/commom/parceiros/Parceiros.vue';
import Series from '@/components/commom/series/Series.vue';
import Generos from '@/components/commom/generos/Generos.vue';

let routes = [
    { value: 'Home', path: '/', component: Home, display: false },
    { value: 'Home', path: '/home', component: Home, display: false },
    { value: 'Empresas', path: '/empresas', tooltip: "Registro de Empresas", component: Empresas, display: true },
    { value: 'Usuários', path: '/users', tooltip: "Registro de Usuários", component: Usuarios, display: true },
    { value: 'Parceiros', path: '/parceiros', tooltip: "Registro de Parceiros", component: Parceiros, display: true },
    { value: 'Séries', path: '/series', tooltip: "Registro de Séries", component: Series, display: true, props: true },
    { value: 'Gêneros', path: '/generos', tooltip: "Registro de Gêneros", component: Generos, display: true },
]

export default routes;