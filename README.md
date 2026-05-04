# 🏛️ Portal Lumos

> *"Tecnologia, Compliance e Inteligência Artificial fundidos sob a luz do Conhecimento Corporativo."*

**Lumos** é um portal corporativo de **Base de Conhecimento e Procedimentos Operacionais Padrão (POPs)**. O grande diferencial da plataforma reside em seu núcleo de segurança governado por um **Motor de Regras Booleanas (ABAC)** e uma **Inteligência Artificial (Google Gemini)** estritamente limitada ao nível de acesso hierárquico do colaborador.

O projeto foi arquitetado não apenas como um repositório de arquivos, mas como uma máquina de governança corporativa.

---

## 🚀 Principais Funcionalidades

### 1. Motor Lógico ABAC (*Attribute-Based Access Control*)
Diferente de sistemas de controle de acesso baseados em grupos fixos (RBAC), o Lhumos utiliza Álgebra Booleana para resolver permissões dinâmicas. 
O sistema processa uma *Árvore Sintática Abstrata (AST)* em tempo real. Cada documento possui uma "Fórmula Lógica". Se os atributos do usuário logado (Cargo e Departamento) tornarem a fórmula `True`, o documento é exibido; caso contrário, ele sequer existe para aquele usuário.
*Exemplo:* `departamento == 'rh' AND cargo IN ['gerente', 'diretor']`.

### 2. Agentes de IA com *Blindfold Prompting* (Corredor Cego)
Integração profunda com o modelo **Google Gemini 1.5 Flash**. 
A segurança de dados é garantida por meio de Engenharia de Prompt restrita pelo Motor ABAC. Antes da IA receber a pergunta do usuário, o backend filtra a base de conhecimento e injeta *apenas* os documentos que o usuário tem acesso. A IA é instruída a **negar educadamente** informações sobre documentos ou assuntos fora desse escopo de acesso (*clearance*).
- **Chat Local:** Dentro de cada PDF, o usuário pode invocar a IA para tirar dúvidas sobre aquele procedimento específico.
- **Agente Global:** Uma aba dedicada onde o usuário pode fazer perguntas amplas, e a IA cruzará os dados de todos os documentos permitidos à sua hierarquia.

### 3. Painel Administrativo Unificado (CRUD)
Gestão completa dos pilares da organização, com fluxo assíncrono simulado (Loadings, Spinners e Toasts):
- **Gestão de Setores (Departamentos)**
- **Gestão de Cargos (Hierarquias e Slugs)**
- **Gestão de Colaboradores (Identidade)**
- **Gestão de Documentos (Upload de POPs, Definição de Metadados e Matriz ABAC)**

### 4. Visualizador Nativo de PDF
Um leitor de PDFs acoplado de forma fluida à interface administrativa, permitindo a leitura de documentos estáticos com possibilidade de "Abrir em Nova Aba", mantendo a atenção do colaborador dentro do portal.

---

## 🧩 Regras de Negócio e Compliance (RH)

Sob a égide do Alto Comando de Compliance, o sistema obedece a regras inegociáveis:
1. **Segurança por Omissão:** Um usuário comum nunca deve ver a existência de um arquivo restrito. O frontend apenas reflete o estado validado pelo motor lógico.
2. **Separação de Privilégios (Admin vs. Consumo):** Apenas usuários designados como Gestores de TI ou RH podem acessar a rota estritamente protegida `/admin`. 
3. **Auditoria Visual:** Qualquer alteração no ecossistema de documentos exige *feedback* de carregamento e confirmação (Toasts) para assegurar o administrador de que a alteração foi persistida.

---

## 🛠️ Stack Tecnológica e Arquitetura

O projeto foi construído com foco absoluto na **Experiência do Usuário (UX)** e em **Código Limpo/Tipado**.

### Front-End (Camada de Interface)
*   **React 19 & Next.js 15 (App Router):** Roteamento, SSR e construção modular de componentes.
*   **TypeScript:** Tipagem estrita. Zero tolerância a `any`. Interfaces definidas em `src/types/index.ts`.
*   **Tailwind CSS v4:** Motor de estilos utilitários utilizado para construir o *Design System* exclusivo.
*   **Lucide React:** Biblioteca oficial de iconografia.
*   **React Hot Toast:** Sistema de notificações flutuantes (Alertas de sucesso/erro) sem interrupção de fluxo.

### Lógica Core e IA
*   **`expr-eval`:** Biblioteca de *parsing* matemático utilizada no frontend/backend para resolver as Fórmulas Booleanas (Motor ABAC).
*   **`@google/generative-ai`:** SDK Oficial do Google para o modelo Gemini 1.5 Flash. Executado exclusivamente no Server-Side (`src/app/api/...`) para proteger a Chave de API (`GEMINI_API_KEY`).

### Design System: *Dark Academia / Terroso*
Todas as diretrizes visuais foram ditadas para transmitir *Tradição, Estabilidade e Foco Corporativo*:
*   **Tons Principais:** Marrom Profundo (`brand-900`), Terracota (`brand-500`), e Areia/Pergaminho (`brand-100`).
*   **Estética:** Monocromática, brutalista corporativa, com *glassmorphism* (blur) sutil nos painéis de fundo e animações suaves (`transition-all`).

---

## 🚧 Status do Projeto e Roadmap (Para o Time de Backend e Banco de Dados)

Atualmente, o **Front-End está 100% isolado, pronto e funcional (Protótipo Interativo)**. 
Os dados residem localmente (`src/data/mock*.ts`) e o fluxo de formulários simula o delay de internet (`setTimeout`).

Para o lançamento (V1 de Produção), a equipe de Backend precisará implementar:

1. **Substituição da Camada de Dados (Firebase/Supabase):** Trocar as chamadas das variáveis de Mock pela integração com Firestore/Supabase.
2. **Integração Real de PDF (Firebase Storage):** Conectar a área de "Arquivo PDF" no formulário de documentos à API de Storage, capturando o Link Assinado e alimentando a propriedade `fileUrl` do documento.
3. **Autenticação Genuína:** Integrar o Firebase Auth para validar o Nível Hierárquico do usuário e proteger as rotas da API.
4. **Extração de Texto OCR (Aprimoramento da IA):** Atualmente, a IA injeta *Título e Descrição* no prompt de contexto. No backend final, é recomendável adicionar um Parser de PDF para ler o arquivo e enviar seu texto completo ao Gemini.
5. **CRUD de Arquivos PDF, Cargos, Setores e Usuários**: Atualmente, os dados são mockados em arquivos TypeScript. É preciso substituir essa lógica por chamadas reais à API do backend (Rotas, Funções, etc). 
6. **Implementar a lógica de upload de PDFs para o Firebase Storage e obter o Link Assinado para o documento.** 
7. **Implementar a lógica de persistência e recuperação dos dados (CRUD) no banco de dados escolhido (Firestore/Supabase)**.

---

“Um sistema não é apenas um emaranhado de lógicas, mas a extensão digital da cultura de uma empresa."