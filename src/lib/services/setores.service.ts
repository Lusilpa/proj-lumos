import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/db";
import type { Setor } from "@/types";

const COLLECTION_NAME = "setores";
const setoresCollection = collection(db, COLLECTION_NAME);

export const setorService = {
  async getSetores(): Promise<Setor[]> {
    const snapshot = await getDocs(setoresCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Setor));
  },

  async getSetorById(id: string): Promise<Setor | null> {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Setor;
    }
    return null;
  },

  async createSetor(data: Omit<Setor, "id">): Promise<string> {
    const docRef = await addDoc(setoresCollection, data);
    return docRef.id;
  },

  async updateSetor(id: string, data: Partial<Setor>): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, data);
  },

  async deleteSetor(id: string): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  }
};
