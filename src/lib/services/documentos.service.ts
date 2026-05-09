import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/db";
import type { Documento } from "@/types";

const COLLECTION_NAME = "documentos";
const documentosCollection = collection(db, COLLECTION_NAME);

export const documentoService = {
  async getDocumentos(): Promise<Documento[]> {
    const snapshot = await getDocs(documentosCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Documento));
  },

  async getDocumentoById(id: string): Promise<Documento | null> {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Documento;
    }
    return null;
  },

  async createDocumento(data: Omit<Documento, "id">): Promise<string> {
    const docRef = await addDoc(documentosCollection, data);
    return docRef.id;
  },

  async updateDocumento(id: string, data: Partial<Documento>): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, data);
  },

  async deleteDocumento(id: string): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  }
};
