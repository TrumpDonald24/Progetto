import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Lista from '../views/Lista.vue'
import Reserved from '../views/Reserved.vue'
import { auth } from '@/firebase/init.js'
    
const routes=[
    {path:'/',component:Home},
    {path:'/reserved',component:Reserved, meta: { requiresAuth: true }},
    {path:'/lista',component:Lista, meta: { requiresAuth: true }},
]

const router=createRouter({
    history:createWebHistory(),
    routes,
})

//verifica dell'autenticazione
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = auth.currentUser; // Verifica se l'utente è autenticato
  
    if (requiresAuth && !isAuthenticated) {
      // Se la rotta richiede autenticazione e l'utente non è autenticato, reindirizza alla Home
      alert('Devi avere un account per accedere a questa pagina.');
      next('/');
    } else {
      // Altrimenti, consenti l'accesso
      next();
    }
  });
export default router;