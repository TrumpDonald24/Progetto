<template>
  <form @submit.prevent="signUp">
  <h2>Registrazione</h2>
    <input type="text"     placeholder="Inserisci Username" required v-model="username">
    <input type="email"    placeholder="Inserisci Email"    required v-model="email">
    <input type="password" placeholder="Inserisci Password" required v-model="password">
    <button>Registrati</button>
  </form>
</template>

<script>
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase/init.js'

export default {
  // register event to emit
  emits: ['loggedIn'],
  data() {
    return {
      username: '',
      email:    '',
      password: ''
    }
  },
  methods: {
    signUp() {
      // Controlla che l'email contenga il dominio richiesto
      if (!this.email.endsWith('@iisvolta.it')) {
        alert('L\'email deve contenere il dominio @iisvolta.it');
        return;
      }

      // Registra e autentica l'utente
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          // Aggiorna il displayName
          updateProfile(auth.currentUser, {
            displayName: this.username
          })
          .then(() => {
            // Emetti l'evento
            this.$emit('loggedIn');
          });
        })
        .catch((error) => {
          alert('Errore durante la registrazione: ' + error.message);
        });
    }
  }
}
</script>

<style scoped>
/* Contenitore principale del form */
form {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

/* Titolo del form */
h2 {
    font-size: 1.8rem;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
}

/* Campi di input */
input[type="text"],
input[type="email"],
input[type="password"] {
    width: 100%;
    padding: 15px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    transition: border-color 0.3s;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus {
    border-color: #007bff;
    outline: none;
}

/* Bottone Sign Up */
button {
    width: 100%;
    padding: 15px;
    font-size: 1.2rem;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
    text-align: center;
}

button:hover {
    background-color: #0056b3;
    transform: scale(1.05);
}

button:active {
    background-color: #003f7f;
    transform: scale(0.95);
}

/* Stile responsivo */
@media (max-width: 768px) {
    form {
        padding: 15px;
    }

    h2 {
        font-size: 1.5rem;
    }

    button {
        font-size: 1rem;
        padding: 12px;
    }
}
</style>