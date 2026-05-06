# 🏛️ Laboratório Lupa - Sistema Lumos

> *"Arquitetura limpa, segurança inegociável e inteligência artificial fundidos sob a luz do Conhecimento Corporativo."*

O **Lumos** é o portal corporativo oficial de **Base de Conhecimento e Procedimentos Operacionais Padrão (POPs)** do Laboratório Lupa. O núcleo do sistema é governado por um **Motor de Regras Booleanas (ABAC - Attribute-Based Access Control)** e uma **Inteligência Artificial (Google Gemini)** estritamente limitados à hierarquia de acesso do usuário logado.

Este projeto não é apenas um repositório de arquivos. É uma máquina de governança corporativa projetada com tolerância zero para gambiarras e um design system impecável.

---

## 🛠️ Stack Tecnológica Aplicada

O Front-End foi arquitetado para máxima performance, segurança e manutenção fluida:

*   **Next.js 16 (App Router):** Roteamento avançado, divisão clara entre Server Components e Client Components, garantindo SEO e carregamento imediato.
*   **React 19 & TypeScript:** Tipagem rigorosa em todo o código (interfaces centralizadas em `src/types`). Zero tolerância ao uso indiscriminado de `any`.
*   **Tailwind CSS v4:** Motor utilitário pragmático. O sistema utiliza uma paleta customizada baseada na estética **Dark Academia / Terroso** (Marrom Profundo `#3D2412`, Terracota `#B3826C`, Pergaminho `#EDE8D0`), transmitindo tradição, foco e estabilidade corporativa extrema.
*   **Expr-Eval:** Biblioteca matemática responsável pelo *parsing* e validação em tempo real das Fórmulas Booleanas (Motor ABAC).
*   **@google/generative-ai:** SDK oficial para integração com o modelo **Gemini 1.5 Flash**, executado exclusivamente no lado do servidor (`/api`) para blindar a chave de API.
*   **Lucide React & React Hot Toast:** Iconografia limpa e sistema de notificações assíncronas (Toasts) não intrusivas para o usuário.

---

## 🧩 Regras de Negócio e Compliance (Motor ABAC)

O coração do sistema é o Motor Lógico. As regras do departamento de Recursos Humanos (Compliance) foram traduzidas em Álgebra Booleana.

1.  **Acesso por Expressões Lógicas:** Ao invés de perfis genéricos, o sistema resolve uma *Árvore Sintática Abstrata (AST)*. 
    *   *Exemplo prático:* `departamento == 'rh' AND (cargo == 'gerente' OR cargo == 'diretor')`.
    *   Se as credenciais do usuário resultarem em `True`, o acesso é liberado. Se `False`, o documento não existe para aquele usuário.
2.  **Segurança por Omissão:** Um colaborador comum jamais verá botões, rotas ou arquivos bloqueados. A interface (UI) apenas renderiza aquilo que o Backend e o Motor Lógico permitirem. O bloqueio não é apenas visual, é matemático.
3.  **Auditoria Constante:** O acesso à rota `/admin` é estritamente protegido. Qualquer alteração ou visualização fora do escopo deve gerar logs de auditoria (a serem implementados no Backend).

---

## ⚙️ Funcionalidades da Aplicação

### 1. Painel Administrativo Dinâmico (CRUD)
Gestão unificada da organização através de tabelas modernas (com menu Kebab de ações rápidas para Editar/Excluir):
*   **Gestão de Setores:** Criação e controle de departamentos organizacionais com geração de identificadores lógicos (Slugs).
*   **Gestão de Cargos:** Definição da hierarquia corporativa, atrelada diretamente aos Setores, validando a atuação estratégica.
*   **Gestão de Colaboradores:** Controle de identidades e vinculação aos cargos mapeados.
*   **Gestão de Documentos (POPs):** Interface fluida dividida entre a parametrização do Motor ABAC (seleção visual de cargos/departamentos ou injeção de fórmula lógica bruta) e o upload seguro de arquivos PDF.

### 2. Agentes de Inteligência Artificial (*Blindfold Prompting*)
A IA corporativa opera dentro de um "Corredor Cego". 
*   A API do Gemini responde dúvidas dos colaboradores, mas o backend **injeta no prompt de contexto apenas os documentos aos quais o usuário logado tem permissão matemática de acessar**.
*   Se um assistente perguntar sobre um balanço financeiro restrito à gerência, a IA desconhecerá a existência do documento e negará o acesso educadamente.

### 3. Leitor Nativo de PDF
Um visualizador limpo, integrado ao layout global via *Topbar*, eliminando o ruído de uma Sidebar pesada e garantindo que o foco do usuário seja 100% no conteúdo normativo.

---

## 📂 Arquitetura de Interface e UX

Para atingir as exigências de redução de carga cognitiva:
*   **Topbar Global:** A estrutura de navegação foi enxugada de uma Sidebar vertical para uma barra de topo elegante, liberando espaço de tela e consolidando o painel de leitura.
*   **Feedback Imediato:** Botões desabilitam durante o `isSubmitting` para evitar duplicação de dados, e *loaders* nativos sinalizam operações de banco.
*   **Menus Contextuais (Três Pontinhos):** Para manter as tabelas administrativas limpas, as ações de edição e exclusão foram condensadas em menus do tipo *Dropdown* visíveis apenas sob iteração do usuário (hover).

---

## 🚀 Como Executar o Protótipo Front-End

Atualmente, o repositório é um **Protótipo Interativo 100% funcional**, aguardando o acoplamento do Backend terceirizado. Os dados estão em estado simulado (Mock) na pasta `src/data/`.

```bash
# 1. Instalar as dependências rigorosas
npm install

# 2. Executar o servidor de desenvolvimento
npm run dev

# 3. Acessar o ambiente em http://localhost:3000
```

---

## 🚧 Roadmap (Para a Equipe Terceirizada de Back-End)

1.  **Substituição da Camada Mock:** Injetar chamadas de API (fetch/axios) ou Server Actions em substituição aos dados mockados em `src/data/*.ts`.
2.  **Upload de PDF e Storage Real:** Ligar a aba "Arquivo PDF" da Gestão de Documentos a um Storage em nuvem (ex: S3, Supabase Storage, Firebase). O front-end apenas fornecerá o `File` no formulário.
3.  **Persistência do Motor ABAC:** O backend deve salvar a `regra_acesso` no banco e validar essa regra no lado do servidor toda vez que o Client solicitar o vetor de documentos.
4.  **Autenticação JWT/Session:** Proteger rigorosamente as rotas `/api/` para aceitarem requisições apenas de usuários com `Session` válida e cargo autorizado ao Painel Admin.

---
**Documento mantido e auditado pela Direção Executiva (Jonas - Presidente/Arquiteto-Chefe).**