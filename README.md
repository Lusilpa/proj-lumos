# 🏛️ Laboratório Lupa - Sistema Lumos

> *"Arquitetura limpa, segurança inegociável e inteligência artificial fundidos sob a luz do Conhecimento Corporativo."*

O **Lumos** é o portal corporativo oficial de **Base de Conhecimento e Procedimentos Operacionais Padrão (POPs)**. O núcleo do sistema é governado por um **Motor de Regras Booleanas (ABAC - Attribute-Based Access Control)** e uma **Inteligência Artificial (Google Gemini)** estritamente limitados à hierarquia de acesso do usuário logado.

Este projeto não é apenas um repositório de arquivos. É uma máquina de governança corporativa projetada com tolerância zero para gambiarras e um design system impecável.

---

## 🛠️ Stack Tecnológica Aplicada

O Front-End foi arquitetado para máxima performance, segurança e manutenção fluida:

*   **Next.js 16 (App Router):** Roteamento avançado, divisão clara entre Server Components e Client Components, garantindo SEO e carregamento imediato.
*   **React 19 & TypeScript:** Tipagem rigorosa em todo o código (interfaces centralizadas em `src/types`). Zero tolerância ao uso indiscriminado de `any`.
*   **Tailwind CSS v4:** Motor utilitário pragmático. O sistema utiliza uma paleta customizada baseada na estética **Dark Academia / Terroso** (Marrom Profundo `#3D2412`, Terracota `#B3826C`, Pergaminho `#EDE8D0`), transmitindo tradição, foco e estabilidade corporativa extrema.
*   **Backend as a Service (BaaS):** Firebase v12. **Firestore** para persistência real e escalável dos dados em nuvem, e **Firebase Authentication** para gerenciamento seguro de sessões, garantindo hash criptográfico e blindagem de credenciais.
*   **Expr-Eval:** Biblioteca matemática responsável pelo *parsing* e validação em tempo real das Fórmulas Booleanas (Motor ABAC).
*   **@google/generative-ai:** SDK oficial para integração com o modelo **Gemini 1.5 Flash**, executado exclusivamente no lado do servidor (`/api`) para blindar a chave de API.
*   **Lucide React & React Hot Toast:** Iconografia limpa e sistema de notificações assíncronas (Toasts) não intrusivas para o usuário.

---

## 🧩 Regras de Negócio e Compliance (Motor ABAC)

O coração do sistema é o Motor Lógico. As regras do departamento de Recursos Humanos (Compliance) foram traduzidas em Álgebra Booleana.

1.  **Acesso por Expressões Lógicas:** Ao invés de perfis genéricos, o sistema resolve uma *Árvore Sintática Abstrata (AST)*. 
    *   *Exemplo prático:* `departamento == 'rh' AND (cargo == 'gerente' OR cargo == 'diretor')`.
    *   Se as credenciais do usuário resultarem em `True`, o acesso é liberado. Se `False` (ou falha na expressão matemática), o acesso é bloqueado de forma limpa.
2.  **Segurança por Omissão (Fail-Safe):** Um colaborador comum jamais verá botões, rotas ou arquivos bloqueados. A interface (UI) apenas renderiza aquilo que o Backend e o Motor Lógico permitirem. Casos de sessão nula, *race conditions* ou erro sintático retornam acesso negado automaticamente.
3.  **Auditoria Constante:** O acesso à rota `/admin` é estritamente protegido. O Painel Admin processa permissões dinâmicas garantindo integridade.

---

## ⚙️ Funcionalidades da Aplicação

### 1. Autenticação Corporativa e Onboarding
Integração segura via **Firebase Authentication** acoplada ao Firestore.
*   **Primeiro Acesso:** A conta do colaborador nasce com a senha espelhada ao e-mail corporativo. Ao fazer o primeiro login, o sistema entra em modo *Lockdown*, obrigando a troca para uma senha pessoal intransferível antes de permitir a entrada no portal.
*   **Context API:** O estado do usuário (`AuthContext`) envolve toda a aplicação e reage assincronamente à sessão persistida do Firebase, redirecionando invasores para o `/login`.

### 2. Painel Administrativo Dinâmico (CRUD Completo e *Inline*)
Gestão unificada com edições diretamente na tabela (*inline editing*) e proteção nas remoções:
*   **Gestão de Setores:** Criação e controle de departamentos organizacionais com geração de identificadores lógicos (Slugs).
*   **Gestão de Cargos:** Definição da hierarquia corporativa, atrelada diretamente aos Setores, validando a atuação estratégica.
*   **Gestão de Colaboradores:** Controle de identidades, vinculação de cargos e integração contínua com a base do Firebase.
*   **Gestão de Documentos (POPs):** Interface fluida dividida entre a parametrização do Motor ABAC (seleção visual de cargos/departamentos ou injeção de fórmula lógica bruta) e armazenamento indexado.

### 3. Agentes de Inteligência Artificial (*Blindfold Prompting*)
A IA corporativa opera dentro de um "Corredor Cego". 
*   A API do Gemini responde dúvidas dos colaboradores, mas o backend **injeta no prompt de contexto apenas os documentos aos quais o usuário logado tem permissão matemática de acessar**.
*   Se um assistente perguntar sobre um balanço financeiro restrito à gerência, a IA desconhecerá a existência do documento e negará o acesso educadamente.

### 4. Leitor Nativo de PDF
Um visualizador limpo, integrado ao layout global via *Topbar*, eliminando o ruído de uma Sidebar pesada e garantindo que o foco do usuário seja 100% no conteúdo normativo.

---

## 🚀 Como Executar o Sistema

O repositório está operando em produção com integração real ao ecossistema Firebase e APIs Google.

### Pré-requisitos (Variáveis de Ambiente)
Crie um arquivo `.env.local` na raiz contendo as chaves privadas do seu projeto:
```env
NEXT_PUBLIC_FIREBASE_API_KEY="..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="lhumos-db.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="lhumos-db"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="lhumos-db.firebasestorage.app"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="..."
NEXT_PUBLIC_FIREBASE_APP_ID="..."
GEMINI_API_KEY="..."
```

### Comandos Iniciais
```bash
# 1. Instalar as dependências rigorosas
npm install

# 2. Executar o servidor de desenvolvimento
npm run dev

# 3. Executar Testes Unitários de Segurança do Motor ABAC (Vitest)
npm run test
```

---

## 🚧 Status de Desenvolvimento e Integração

1.  **Mocks Extintos (Resolvido):** Toda a arquitetura do Painel Administrativo, Listagem de Colaboradores, Setores, Cargos e Documentos responde dinamicamente ao **Firestore**, com leitura e gravação confirmada.
2.  **Firebase Authentication (Resolvido):** Migração do login de dados plain-text para a arquitetura criptografada do Firebase Auth finalizada.
3.  **Persistência do Motor ABAC (Resolvido):** As regras estão persistidas na nuvem e sendo validadas com tolerância zero com proteções de tipo (*fail-safe*).
4.  **Integração Storage Real (Ação Futura):** Consolidar o upload do painel Modal para interagir definitivamente com o `Firebase Storage`.
5.  **Políticas de Auditoria (Ação Futura):** Implementar geração sistemática de relatórios de registro de ações e sessões da liderança no banco.

---

## 👥 Equipe Envolvida no Projeto

* **Hanna Reis** — [![GitHub](https://img.shields.io/badge/GitHub-hannareis-181717?style=for-the-badge&logo=github)](https://github.com/hannareis)
* **Luan Palma** — [![GitHub](https://img.shields.io/badge/GitHub-Lusilpa-181717?style=for-the-badge&logo=github)](https://github.com/Lusilpa)
* **Thiago Carvalho** — [![GitHub](https://img.shields.io/badge/GitHub-ThiagoCarvlh-181717?style=for-the-badge&logo=github)](https://github.com/ThiagoCarvlh)

**Documento mantido e auditado por estudantes do Instituto de Ensino Superior Fucapi.**