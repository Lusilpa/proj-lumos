import Link from "next/link";
import { MessageSquareMore } from "lucide-react";

export default function Home() {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-black"
      style={{
        // Atualizado com o caminho correto da sua máquina/projeto Next.js
        backgroundImage: "url('/img/amazonico.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay escuro para garantir a legibilidade do texto sobre a foto */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Conteúdo Principal */}
      <div className="relative z-10 flex flex-col items-center max-w-5xl px-6">

        {/* Bloco de Logo e Título */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">

          {/* Logo LUMOS */}
          <div className="flex flex-col items-center">
            <MessageSquareMore className="w-28 h-28 text-white" strokeWidth={1.5} />
            <span className="text-2xl font-extrabold tracking-[0.2em] mt-[-10px] text-white">
              LUMOS
            </span>
          </div>

          {/* Linha Divisória */}
          <div className="hidden md:block w-[3px] h-28 bg-white/90 rounded-full"></div>

          {/* Título Principal */}
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-center md:text-left text-white drop-shadow-lg font-sans">
            Sistema de Onboarding com <br />
            aplicação de Álgebra Booleana
          </h1>
        </div>

        {/* Grupo de Botões */}
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto mt-6">

          {/* Botão Acessar (Leva para o painel interno) */}
          <Link href="/login" className="w-full sm:w-auto">
            <button className="w-full px-12 py-4 rounded-[2rem] text-xl font-bold text-white bg-white/10 border-2 border-white/50 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
              Acessar
            </button>
          </Link>

          {/* Botão Contratar */}
          <a href="mailto:mapusuporte@gmail.com?subject=Interesse%20na%20plataforma%20Lhumos&body=Olá!%20Gostaria%20de%20agendar%20uma%20demonstração%20e%20saber%20mais%20sobre%20a%20contratação%20do%20portal." className="w-full sm:w-auto px-12 py-4 rounded-[2rem] text-xl font-bold text-gray-800 bg-[#C4C4C4] hover:bg-white transition-all duration-300 shadow-xl text-center inline-block cursor-pointer">
            Contratar
          </a>
        </div>
      </div>
    </div>
  );
}