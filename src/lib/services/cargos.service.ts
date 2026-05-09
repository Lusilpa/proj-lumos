import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/db";

// Use a custom interface locally if CargoItem is not in types
interface CargoItem {
    id: string;
    nome: string;       
    slug: string;       
    nivel: string;      
    setor_slug: string; 
}

const COLLECTION_NAME = "cargos";
const cargosCollection = collection(db, COLLECTION_NAME);

export const cargoService = {
  async getCargos(): Promise<CargoItem[]> {
    const snapshot = await getDocs(cargosCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CargoItem));
  },

  async getCargoById(id: string): Promise<CargoItem | null> {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as CargoItem;
    }
    return null;
  },

  async createCargo(data: Omit<CargoItem, "id">): Promise<string> {
    const docRef = await addDoc(cargosCollection, data);
    return docRef.id;
  },

  async updateCargo(id: string, data: Partial<CargoItem>): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, data);
  },

  async deleteCargo(id: string): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  }
};
