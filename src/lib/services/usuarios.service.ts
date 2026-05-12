import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/db";
import type { User } from "@/types";

const COLLECTION_NAME = "usuarios";
const usuariosCollection = collection(db, COLLECTION_NAME);

export const usuarioService = {
  // Ler todos
  async getUsuarios(): Promise<User[]> {
    const snapshot = await getDocs(usuariosCollection);
    return snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() } as User));
  },

  // Ler por ID
  async getUsuarioById(id: string): Promise<User | null> {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { uid: docSnap.id, ...docSnap.data() } as User;
    }
    return null;
  },

  // Criar
  async createUsuario(data: Omit<User, "uid">): Promise<string> {
    const docRef = await addDoc(usuariosCollection, data);
    return docRef.id;
  },

  // Atualizar
  async updateUsuario(id: string, data: Partial<User>): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, data);
  },

  // Deletar
  async deleteUsuario(id: string): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  }
};
