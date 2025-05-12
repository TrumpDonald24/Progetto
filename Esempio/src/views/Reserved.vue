<template>
    <Navbar/>
    <div class="container">
        <h1>Benvenuto nel sito!</h1>
        <h3>Aggiungi un evento nell'agenda!</h3>
        <form @submit.prevent="inserisciArticolo">
            <p>Data:</p>
            <input type="date" v-model="dataItem" :min="minDate" placeholder="Aggiungi data" />
            <p>Classe:</p>
            <input type="text" v-model="classItem" placeholder="Aggiungi classe" />
            <p>Evento:</p>
            <input type="text" v-model="impegnoItem" placeholder="Aggiungi impegno" />
            <button type="submit">Aggiungi</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from '@/stores/listaeventi.js';
import Navbar from '@/components/Navbar.vue';

// Variabili per i campi del form
const dataItem = ref('');
const classItem = ref('');
const impegnoItem = ref('');

// Calcola la data corrente in formato YYYY-MM-DD
const today = new Date();
const minDate = ref(today.toISOString().split('T')[0]); // Ottieni la data corrente

const spesaStore = useStore();

const inserisciArticolo = () => {
    if (dataItem.value.trim() !== '' || classItem.value.trim() !== '' || impegnoItem.value.trim() !== '') {
        spesaStore.aggiungiEvento(dataItem.value, classItem.value, impegnoItem.value);
        dataItem.value = '';
        classItem.value = '';
        impegnoItem.value = '';
    } else {
        console.error('Tutti i campi sono vuoti. Inserisci almeno un valore.');
    }
};
</script>

<style scoped>
.container {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
}

h1 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 20px;
}
h3{
    font-size: 1.5rem;
    color: #666;
    margin-bottom: 20px;
}

p {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 10px;
    text-align: left;
}

form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

input[type="text"] {
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s;
}

input[type="text"]:focus {
    border-color: #007bff;
}

input[type="date"] {
    padding: 13px; 
    font-size: 1rem; 
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s;
}

input[type="date"]:focus {
    border-color: #007bff;
}

button {
    padding: 10px 15px;
    font-size: 1.2rem;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #0056b3;
}
</style>