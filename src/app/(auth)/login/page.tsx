import LoginForm from "../components/LoginForm";
import Detalhes from "../components/decorativos";
import { Detalhes_Fim_Login } from "../components/decorativos";
import { Toaster } from "react-hot-toast";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-900 text-brand-100 p-4 font-sans selection:bg-brand-500/30">
      <Toaster position="top-right" toastOptions={{ style: { background: '#2d1a0d', color: '#ede8d0', border: '1px solid #b3826c40', fontWeight: 'bold' } }} />
      <div className="max-w-md w-full bg-brand-800/80 p-10 rounded-3xl border border-brand-500/20 shadow-2xl backdrop-blur-xl relative overflow-hidden">

        {/* Detalhe estético */}
        <Detalhes />

        {/* Formulário de Login*/}
        <LoginForm />

        {/* Rodapé */}
        <Detalhes_Fim_Login />

      </div>
    </div>
  );
}
