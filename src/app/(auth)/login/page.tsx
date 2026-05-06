import LoginForm from "../components/LoginForm";
import Detalhes from "../components/decorativos";
import Detalhes_Fim from "../components/decorativos";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-900 text-brand-100 p-4 font-sans selection:bg-brand-500/30">
      <div className="max-w-md w-full bg-brand-800/80 p-10 rounded-3xl border border-brand-500/20 shadow-2xl backdrop-blur-xl relative overflow-hidden">

        {/* Detalhe estético */}
        <Detalhes />

        {/* Formulário de Login*/}
        <LoginForm />

        {/* Rodapé */}
        <Detalhes_Fim />

      </div>
    </div>
  );
}
