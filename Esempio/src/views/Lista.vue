<template>
    <Navbar />
    <div class="container">
        <h1>Eventi</h1>

        <!-- Filtri -->
        <table class="event-table">
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Classe</th>
                    <th>Impegno</th>
                    <th>Azioni</th>
                </tr>
            </thead>
            <tbody>
                <tr 
                    v-for="(evento, index) in eventiFiltrati" 
                    :key="index" 
                    :class="{ 'highlighted-event': isToday(evento.data) }"
                >
                    <td>{{ formattaData(evento.data) || '-' }}</td>
                    <td>{{ evento.classe || '-' }}</td>
                    <td>{{ evento.impegno || '-' }}</td>
                    <td>
                        <button @click="rimuoviEvento(index)" class="remove-button">Rimuovi</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <br><br>
        <!-- Filtri -->
        <div class="filters">
            <div class="filter-row">
                <input 
                    type="text" 
                    placeholder="Filtra per classe" 
                    v-model="filtroClasse" 
                    class="filter-input"
                />
                <input 
                    type="date" 
                    v-model="filtroData" 
                    class="filter-input"
                />
            </div>
            <button @click="resetFiltri" class="reset-button">Reset Filtri</button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from '@/stores/listaeventi.js';
import Navbar from '@/components/Navbar.vue';

const impStore = useStore();
impStore.fetchImpegni();

const filtroClasse = ref('');
const filtroData = ref('');

const today = new Date().toISOString().split('T')[0];

const isToday = (date) => {
    if (!date) return false;
    const eventDate = new Date(date).toISOString().split('T')[0];
    return eventDate === today;
};

const formattaData = (data) => {
    if (!data) return null;
    const [year, month, day] = data.split('-');
    return `${day}-${month}-${year}`;
};

const eventiFiltrati = computed(() => {
    return impStore.listaImpegni
        .filter(evento => {
            const corrispondeClasse = filtroClasse.value
                ? evento.classe.toLowerCase().includes(filtroClasse.value.toLowerCase())
                : true;
            const corrispondeData = filtroData.value
                ? evento.data === filtroData.value
                : true;
            return corrispondeClasse && corrispondeData;
        })
        .sort((a, b) => new Date(a.data) - new Date(b.data));
});

const resetFiltri = () => {
    filtroClasse.value = '';
    filtroData.value = '';
};

const rimuoviEvento = (index) => {
    console.log('Rimuovi evento chiamato per indice:', index);
    impStore.rimuoviEvento(index);
};
</script>

<style scoped>
.container {
    max-width: 800px;
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

.filters {
    display: flex;
    flex-direction: column; /* Disposizione verticale */
    align-items: center; /* Allinea gli elementi al centro */
    gap: 15px; /* Spaziatura tra la riga dei filtri e il bottone */
    margin-bottom: 20px;
}

.filter-row {
    display: flex;
    justify-content: center; /* Centra i campi di input orizzontalmente */
    gap: 10px; /* Spaziatura tra i campi di input */
    width: 100%; /* Occupa tutta la larghezza disponibile */
    max-width: 500px; /* Limita la larghezza massima */
}

.filter-input {
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 200px; /* Larghezza uniforme per i campi di input */
}

.reset-button {
    padding: 10px 15px;
    font-size: 1rem;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 150px; /* Larghezza fissa per un aspetto uniforme */
    text-align: center;
}

.reset-button:hover {
    background-color: #0056b3;
}

.event-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.event-table th,
.event-table td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: left;
}

.event-table th {
    background-color: #007bff;
    color: #fff;
}

.event-table tr:nth-child(even) {
    background-color: #f2f2f2;
}

.remove-button {
    padding: 5px 10px;
    font-size: 0.9rem;
    color: #fff;
    background-color: #dc3545;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.remove-button:hover {
    background-color: #c82333;
}

/* Evidenzia gli eventi della data odierna */
.event-table tr.highlighted-event {
    background-color: #ffeb3b !important; /* Giallo chiaro per evidenziare */
    font-weight: bold;
    color: #333;
    transition: background-color 0.3s, transform 0.2s;
}

.event-table tr.highlighted-event:hover {
    background-color: #ffe082 !important; /* Colore più scuro al passaggio del mouse */
    transform: scale(1.02); /* Leggero ingrandimento */
}
</style>