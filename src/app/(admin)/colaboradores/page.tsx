import Link from "next/link";
import { MOCK_USERS } from "@/data/mockUsers";

export default function AdminPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Painel de Gestão de Identidade</h1>

      <div className="overflow-x-auto border border-black/10 dark:border-white/10 rounded-2xl bg-black/5 dark:bg-white/5">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
            <tr>
              <th className="p-4">Nome</th>
              <th className="p-4">E-mail</th>
              <th className="p-4">Departamento</th>
              <th className="p-4">Cargo</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_USERS.map((user) => (
              <tr key={user.uid} className="border-b last:border-0 border-black/5 dark:border-white/5">
                <td className="p-4">{user.nome}</td>
                <td className="p-4 opacity-70">{user.email}</td>
                <td className="p-4 capitalize">{user.departamento}</td>
                <td className="p-4 capitalize">{user.cargo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <Link href="/documentos" className="text-sm opacity-70 hover:opacity-100">
          &larr; Voltar ao Portal
        </Link>
      </div>
    </div>
  );
}
