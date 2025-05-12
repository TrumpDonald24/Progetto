import { defineStore } from 'pinia';
import db from '../firebase/init.js';
import { doc, collection, getDocs, addDoc, deleteDoc } from 'firebase/firestore';

export const useStore = defineStore('listaImpegni', {
  state: () => ({
    listaImpegni: [],
  }),
  actions: {
    async fetchImpegni() {
      const colRef = collection(db, 'impegni');
      const snapshot = await getDocs(colRef);
      this.listaImpegni = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
    async aggiungiEvento(data, classe, impegno) {
      const colRef = collection(db, 'impegni');
      const docRef=await addDoc(colRef, {
        data: data,
        classe: classe,
        impegno: impegno,
      });
      this.listaImpegni.push({ id: docRef, data, classe, impegno });
    },
    svuotaLista() {
      this.listaImpegni = [];
    },
    async rimuoviEvento(index) {
      console.log('Rimuovo evento all\'indice:', index);
      const id = this.listaImpegni[index].id;
      const colRef = collection(db, 'impegni'); 
      await deleteDoc(doc(db, 'impegni', id)); // Assicurati di importare deleteDoc da firebase/firestore
      console.log('Evento rimosso con ID:', id);
      this.listaImpegni.splice(index, 1);
    },
  },
});