# 🚀 Portfólio Profissional | Ruben Massuquetto

Bem-vindo ao repositório do meu portfólio profissional. Desenvolvido para apresentar minhas soluções em engenharia de software Full-Stack e Web Analytics, aplicando o rigor técnico do planejamento industrial (PCP), a visão analítica da Ciência de Dados e estratégias de Growth Marketing para construir interfaces robustas, velozes, seguras e de alta conversão.

🔗 **Visualizar Projeto:** [rubenmassuquetto.com](https://rubenmassuquetto.com)

---

## 🛠 Tecnologias, Ferramentas & Integrações

O projeto foi concebido e arquitetado focando em um ecossistema moderno de alta performance, com controle absoluto sobre a privacidade dos dados, indexação ativa e rastreamento avançado de campanhas:

- **Linguagens:** HTML5 semântico, CSS3 moderno (Custom Properties, Flexbox, CSS Grid) e JavaScript puro (ES6+).
- **Backend (Node.js & Express):** Servidor seguro para processamento de rotas amigáveis, cache inteligente do portfólio GitHub, endpoints otimizados e download direto de arquivos.
- **Rastreabilidade & Analytics (Facebook & Google):**
    - **Meta Pixel Oficial:** Rastreamento direto no navegador (ID: `1544310170830189`) em todos os arquivos HTML (`index.html`, `projetos.html`, `privacidade.html`).
    - **Meta Conversions API (CAPI):** Rastreamento de conversões redundante via servidor Node.js com criptografia unidirecional (SHA256) dos dados dos leads (conforme diretrizes rígidas da Meta e da LGPD).
    - **Google Analytics 4 (GA4):** Mapeamento avançado de comportamento de páginas e conversões.
    - **Google Tag Manager (GTM):** Gerenciamento e conteinerização segura de scripts para máxima performance de carregamento.
- **APIs & Integrações:**
    - **GitHub REST API:** Consumo dinâmico de repositórios públicos em tempo real com sistema automático de screenshot via Microlink API.
    - **Formspree:** Gerenciamento assíncrono (AJAX) para envio de mensagens via formulário com validação inteligente de campos.
    - **WhatsApp Direct Connect:** CTA flutuante integrado com mensagem contextualizada dinâmica baseada no idioma selecionado.
- **Tipografia:** Inter e JetBrains Mono (Google Fonts).

---

## 🎯 Diferenciais Técnicos e Arquitetura

### ⚡ Performance & Core Web Vitals
- **Zero Dependências Pesadas:** Carregamento ultrarrápido sem overhead de frameworks ou bibliotecas desnecessárias.
- **Core Web Vitals Otimizados:**
  - `aspect-ratio` e dimensões explícitas para prevenção de CLS (*Cumulative Layout Shift*).
  - Scripts assíncronos não bloqueantes com carregamento `defer`.
  - Transições por GPU (`transform`, `opacity`) para manter taxas fluidas de 60fps.
- **Tema Dinâmico com Zero Flash:** Script inline no cabeçalho garantindo que o tema preferido (Dark/Light) seja aplicado antes do primeiro paint, sem qualquer oscilação visual.

### 📐 Engenharia Visual & UX
- **Design System Modular:** Variáveis CSS universais para controle unificado de paleta de cores, tipografia, bordas e sombras.
- **Layout Bento Grid Responsivo:** Grade moderna com efeito *Spotlight Hover* dinâmico com iluminação radial no cursor.
- **Carrossel Mobile Inteligente:** Scroll-snapping nativo para dispositivos móveis com indicadores de paginação interativos e sincronizados via `IntersectionObserver` / `scroll events`.
- **Modo Escuro / Modo Claro Nativo:** Transição harmônica entre paletas de alto contraste e conformidade com acessibilidade WCAG AA.
- **Clean Navigation:** Navegação fluida com scroll suave entre seções e menu gaveta (*drawer*) otimizado para dispositivos móveis.

### 📈 Foco em Conversão, Métricas e LGPD
- **Google Consent Mode v2:** Banner de consentimento avançado com controle granular de preferências de cookies (Analytics e Marketing). O disparo dos pixels é bloqueado automaticamente por padrão e só é liberado mediante aceite ativo do visitante.
- **Página de Políticas dedicada (`privacidade.html`)**: Central de transparência detalhando as premissas de Relevância (E-E-A-T), indexação técnica, rastreamento ético e canal de contato do Encarregado de Proteção de Dados (DPO) através do e-mail oficial **`contato@rubenmassuquetto.com`**.
- **Consentimento nos Formulários:** Caixa de seleção (checkbox) obrigatória de consentimento ativo incorporada ao formulário de contato, vinculada às diretrizes da LGPD.
- **Suporte Multilíngue Nativo:** Todo o site, incluindo a página de políticas de privacidade, suporte a metadados e mensagens de feedback de formulários, se adapta dinamicamente aos idiomas Português (BR), Inglês (EN) e Espanhol (ES) de forma instantânea sem recarregar a página.

---

## 🚀 Como Executar o Projeto Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/rubenmassuquetto1999/ruben-massuquetto-portfolio.git
   ```

2. **Acesse o diretório do projeto e instale as dependências:**
   ```bash
   cd ruben-massuquetto-portfolio
   npm install
   ```

3. **Inicie o servidor de alta performance Node.js:**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador:**
   ```text
   http://localhost:3000
   ```

---

## 📄 Licença e Direitos

© 2026 Ruben Massuquetto | Todos os direitos reservados.
