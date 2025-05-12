<template>
    <div class="navbar">
        <div class="navbar-brand">
            <img src="@/assets/logo.png" alt="Logo" class="logo" />
            <span class="company-name">IIS A.Volta</span>
        </div>
        <nav>
            <router-link to="/" class="nav-link">Home</router-link>
            <router-link to="/reserved" class="nav-link">Riservato</router-link>
            <router-link to="/lista" class="nav-link">Eventi</router-link>
        </nav>
        <div class="user-menu" v-if="isLoggedIn">
            <div class="user-info" @click="toggleMenu">
                {{ username || 'Utente' }}
                <span class="dropdown-circle"></span>
            </div>
            <div v-if="menuOpen" class="dropdown-menu">
                <button @click="logout" class="dropdown-item">Logout</button>
            </div>
        </div>
        <div class="datetime">
            <div class="time">{{ currentTime }}</div>
            <div class="date">{{ currentDate }}</div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { getAuth, onAuthStateChanged, updatePassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

const auth = getAuth();
const currentDate = ref('');
const currentTime = ref('');
const isLoggedIn = ref(false);
const username = ref(''); // Stato per l'username dell'utente
const menuOpen = ref(false); // Stato per il menu a tendina
const router = useRouter();

const logout = async () => {
    try {
        await auth.signOut();
        router.push('/');
    } catch (error) {
        console.error('Errore durante il logout:', error);
    }
};

const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
};

const updateDateTime = () => {
    const now = new Date();
    const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    currentDate.value = now.toLocaleDateString('it-IT', dateOptions);
    currentTime.value = now.toLocaleTimeString('it-IT', timeOptions);
};

onMounted(() => {
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    onAuthStateChanged(auth, (user) => {
        isLoggedIn.value = !!user;
        username.value = user ? user.displayName || user.email : ''; // Mostra il nome o l'email dell'utente
    });

    onUnmounted(() => clearInterval(interval));
});
</script>

<style scoped>
/* Navbar principale */
.navbar {
    background-color: #007bff;
    padding: 25px 40px; 
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 2rem;
}

/* Brand della navbar */
.navbar-brand {
    display: flex;
    align-items: center;
    gap: 15px; 
}

.logo {
    width: 60px; 
    height: 60px;
}

.company-name {
    color: #fff;
    font-size: 2rem;
    font-weight: bold;
}

/* Link della navbar */
.navbar nav {
    display: flex;
    justify-content: center; /* Allinea gli elementi al centro orizzontalmente */
    align-items: center; /* Allinea gli elementi al centro verticalmente */
    gap: 30px; /* Spaziatura tra i link */
    flex-grow: 1;
}

.nav-link {
    color: #fff;
    text-decoration: none;
    font-size: 1.5rem; 
    font-weight: 500;
    padding: 12px 20px;
    border-radius: 6px; 
    transition: background-color 0.3s, transform 0.2s;
}

.nav-link:hover {
    background-color: #0056b3;
    transform: scale(1.05);
}

.nav-link:active {
    transform: scale(0.95);
}

/* Menu utente */
.user-menu {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #fff;
    font-size: 1.2rem;
    font-weight: bold;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 12px 20px;
    border-radius: 6px;
    background-color: #007bff;
    transition: background-color 0.3s, transform 0.2s;
}

.user-info:hover {
    background-color: #0056b3;
    transform: scale(1.05);
}

/* Cerchio accanto al nome utente */
.dropdown-circle {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-left: 8px;
    background-color: #fff; /* Colore del cerchio */
    border-radius: 50%; /* Rende il cerchio perfettamente rotondo */
    transition: transform 0.2s;
}

.user-info:hover .dropdown-circle {
    transform: scale(1.2); /* Effetto di ingrandimento al passaggio del mouse */
}

/* Menu a tendina */
.dropdown-menu {
    position: absolute;
    top: 100%;
    right: auto; /* Rimuove l'allineamento a destra */
    left: 0; /* Allinea il menu a tendina a sinistra rispetto al contenitore */
    background-color: #fff;
    color: #333;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    min-width: 150px;
    margin-top: 10px;
}

/* Bottoni del menu a tendina */
.dropdown-item {
    padding: 12px 20px;
    font-size: 1rem;
    text-align: left;
    background-color: #ff0000; /* Colore di sfondo blu */
    color: #fff; /* Testo bianco */
    border: none;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s, box-shadow 0.2s;
    border-radius: 6px; /* Angoli arrotondati */
    margin: 5px 10px; /* Spaziatura tra i bottoni */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Aggiunge un'ombra */
}

.dropdown-item:hover {
    background-color: #760000; /* Colore blu più scuro al passaggio del mouse */
    transform: scale(1.05); /* Leggero ingrandimento */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Ombra più pronunciata */
}

.dropdown-item:active {
    background-color: #003f7f; /* Colore ancora più scuro quando cliccato */
    transform: scale(0.95); /* Leggero rimpicciolimento */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Riduce l'ombra */
}

/* Data e ora */
.datetime {
    color: #fff;
    font-size: 1.2rem;
    font-weight: 500;
    margin-left: auto; 
    text-align: right; 
    white-space: nowrap; 
}

.datetime .date {
    font-size: 1.2rem;
    margin-bottom: 5px; 
}

.datetime .time {
    font-size: 1.2rem; 
}

/* Stile responsivo */
@media (max-width: 768px) {
    .navbar {
        flex-direction: column;
        align-items: center;
    }

    .navbar nav {
        flex-direction: column;
        gap: 15px; 
    }

    .nav-link {
        font-size: 1.2rem;
        padding: 12px 15px;
    }
}
</style>