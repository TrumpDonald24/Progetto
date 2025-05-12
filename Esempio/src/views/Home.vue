<template>
    <Navbar />
    <div class="container">
        <div v-if="!isLoggedIn" class="auth-container">
            <template v-if="showLogin">
                <Login @loggedIn="checkAuthState" />
                <p class="toggle-text">
                    Non hai un account? <span @click="toggleLogin" class="toggle-link">Registarti</span>
                </p>
            </template>
            <template v-else>
                <Signup @loggedIn="checkAuthState" />
                <p class="toggle-text">
                    Hai un account? <span @click="toggleLogin" class="toggle-link">Accedi</span>
                </p>
            </template>
        </div>
        <div v-else class="welcome-container">
            <h2>Welcome, {{ displayName }}</h2>
            <button @click="auth.signOut()" class="logout-button">Logout</button>
        </div>
    </div>
</template>

<script setup>
import Signup from '@/components/Signup.vue';
import Login from '@/components/Login.vue';
import { auth } from '@/firebase/init.js';
import Navbar from '@/components/Navbar.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
// Stato reattivo per gestire l'autenticazione
const isLoggedIn = ref(false);
const showLogin = ref(true);
const displayName = ref('');
const router=useRouter();
// Funzione per verificare l'utente autenticato al caricamento
const checkAuthState = () => {
  const user = auth.currentUser;
  if (user) {
    isLoggedIn.value = true;
    displayName.value = user.displayName || 'User';
    router.push('/reserved'); // Reindirizza alla home page se l'utente è autenticato
  } else {
    isLoggedIn.value = false;
    displayName.value = '';
  }
};

// Cambia tra login e signup
const toggleLogin = () => {
  showLogin.value = !showLogin.value;
};

// Controlla lo stato di autenticazione al caricamento
onMounted(() => {
  checkAuthState();
  // Ascolta i cambiamenti dello stato di autenticazione
  auth.onAuthStateChanged((user) => {
    if (user) {
      isLoggedIn.value = true;
      displayName.value = user.displayName || 'User';
      router.push('/reserved'); 
    } else {
      isLoggedIn.value = false;
      displayName.value = '';
    }
  });
});
</script>

<style scoped>
/* Paragrafi */
.toggle-text {
    font-size: 1rem;
    color: #666;
    margin-top: 20px;
    text-align: center; /* Allinea il testo al centro */
}

/* Link nei paragrafi */
.toggle-link {
    color: #007bff;
    cursor: pointer;
    text-decoration: underline;
    transition: color 0.3s;
}

.toggle-link:hover {
    color: #0056b3;
}
</style>