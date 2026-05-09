import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import * as dotenv from 'dotenv';
import { MOCK_USERS } from "../data/mockUsers";
import { MOCK_DOCS } from "../data/mockDocs";
import { MOCK_SETORES } from "../data/mockSetores";
import { MOCK_CARGOS } from "../data/mockCargos";

// Carregar variáveis do .env.local
dotenv.config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seed() {
  try {
    console.log("Iniciando seed do banco de dados...");

    // Seed Usuarios
    console.log("Semeando usuários...");
    for (const user of MOCK_USERS) {
      await setDoc(doc(db, "usuarios", user.uid), user);
    }
    console.log(`✅ ${MOCK_USERS.length} usuários inseridos.`);

    // Seed Documentos
    console.log("Semeando documentos...");
    for (const docItem of MOCK_DOCS) {
      await setDoc(doc(db, "documentos", docItem.id), docItem);
    }
    console.log(`✅ ${MOCK_DOCS.length} documentos inseridos.`);

    // Seed Setores
    console.log("Semeando setores...");
    for (const setor of MOCK_SETORES) {
      await setDoc(doc(db, "setores", setor.id), setor);
    }
    console.log(`✅ ${MOCK_SETORES.length} setores inseridos.`);

    // Seed Cargos
    console.log("Semeando cargos...");
    for (const cargo of MOCK_CARGOS) {
      await setDoc(doc(db, "cargos", cargo.id), cargo);
    }
    console.log(`✅ ${MOCK_CARGOS.length} cargos inseridos.`);

    console.log("🎉 Seed concluído com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro durante o seed:", error);
    process.exit(1);
  }
}

seed();
