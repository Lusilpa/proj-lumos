import Link from "next/link";
import { LogOut } from "lucide-react";
import { CURRENT_MOCK_USER } from "@/data/mockUsers";

export function Footer() {
    return (
        <div className="p-4 border-t border-brand-500/30 space-y-3">
            <div className="flex items-center gap-3 px-2">
                <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center shrink-0 border border-brand-500/40">
                    <span className="font-bold text-sm text-brand-100">
                        {CURRENT_MOCK_USER.nome.charAt(0)}
                    </span>
                </div>
                <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-semibold truncate text-brand-100">{CURRENT_MOCK_USER.nome}</span>
                    <span className="text-xs text-brand-400 truncate capitalize">
                        {CURRENT_MOCK_USER.cargo} · {CURRENT_MOCK_USER.departamento}
                    </span>
                </div>
            </div>

            <div className="flex gap-2">
                <Link
                    href="/login"
                    className="flex-1 flex justify-center items-center py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                    title="Sair do Portal"
                >
                    <LogOut className="w-4 h-4" />
                </Link>
            </div>
        </div>
    )
}