"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { signInWithEmailAndPassword, signOut, updatePassword as fbUpdatePassword } from "firebase/auth";
import { auth } from "@/lib/firebase/db";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  login: (cpf: string, senha: string) => Promise<boolean>;
  logout: () => void;
  atualizarSenha: (novaSenha: string) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Rotas públicas que não exigem autenticação
const PUBLIC_ROUTES = ["/login", "/primeiro-acesso"];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedUser = localStorage.getItem("@Lhumos:user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Proteção de Rotas + Lógica de Primeiro Acesso
  useEffect(() => {
    if (!isLoading) {
      const isPublic = PUBLIC_ROUTES.includes(pathname);

      if (!user && !isPublic) {
        router.push("/login");
      } else if (user && pathname === "/login") {
        router.push(user.primeiro_acesso ? "/primeiro-acesso" : "/documentos");
      } else if (user && user.primeiro_acesso && pathname !== "/primeiro-acesso") {
        router.push("/primeiro-acesso");
      }
    }
  }, [user, pathname, isLoading, router]);

  const login = async (cpf: string, senha: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      // 1. Busca o perfil no Firestore pelo CPF para obter o email
      const { usuarioService } = await import("@/lib/services/usuarios.service");
      const usuarios = await usuarioService.getUsuarios();
      const cpfClean = cpf.replace(/\D/g, "");

      const perfilFirestore = usuarios.find(u => u.cpf.replace(/\D/g, "") === cpfClean);

      if (!perfilFirestore) return false;

      // 2. Autentica no Firebase Auth com email + senha (Firebase gerencia a segurança)
      await signInWithEmailAndPassword(auth, perfilFirestore.email, senha);

      // 3. Salva o perfil completo (sem a senha) na sessão local
      setUser(perfilFirestore);
      localStorage.setItem("@Lhumos:user", JSON.stringify(perfilFirestore));
      return true;

    } catch (error: unknown) {
      // Firebase Auth retorna código de erro específico para credenciais inválidas
      const code = (error as { code?: string }).code;
      if (code === "auth/invalid-credential" || code === "auth/wrong-password") {
        return false;
      }
      console.error("Erro no login:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const atualizarSenha = useCallback(async (novaSenha: string) => {
    if (!user) return;

    const currentFbUser = auth.currentUser;
    if (!currentFbUser) throw new Error("Sessão do Firebase expirada. Faça login novamente.");

    // 1. Atualiza a senha no Firebase Authentication
    await fbUpdatePassword(currentFbUser, novaSenha);

    // 2. Marca primeiro_acesso como false no Firestore
    const { usuarioService } = await import("@/lib/services/usuarios.service");
    await usuarioService.updateUsuario(user.uid, { primeiro_acesso: false });

    // 3. Atualiza a sessão local
    const userAtualizado = { ...user, primeiro_acesso: false };
    setUser(userAtualizado);
    localStorage.setItem("@Lhumos:user", JSON.stringify(userAtualizado));
    router.push("/documentos");
  }, [user, router]);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("@Lhumos:user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, atualizarSenha, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
