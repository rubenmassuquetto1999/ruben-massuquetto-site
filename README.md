# 🚀 Ruben Massuquetto | Tráfego Pago, Google Ads, Meta Ads & Sites de Alta Conversão

Bem-vindo ao repositório oficial da minha plataforma de negócios e portfólio de engenharia de conversão. Este projeto foi concebido para ser o canal oficial de captação de clientes para empresas locais, apresentando um ecossistema integrado que une **alta performance técnica**, **anúncios patrocinados inteligentes (Google & Meta Ads)**, **posicionamento geolocalizado (Google Meu Negócio)** e **mecanismos de alta conversão (CRO)** para colocar empresas no topo das buscas e direcionar leads diretamente para o WhatsApp.

🔗 **Visualizar Projeto:** [rubenmassuquetto.com](https://rubenmassuquetto.com)

---

## 🛠 Tecnologias, Ferramentas & Integrações

O projeto foi planejado e otimizado seguindo as diretrizes mais rigorosas de SEO moderno, conformidade legal e experiência do usuário:

- **Linguagens:** HTML5 semântico, CSS3 moderno (Custom Properties, Flexbox, CSS Grid) e JavaScript puro (ES6+).
- **Backend (Node.js & Express):** Servidor seguro de alto rendimento para controle de rotas amigáveis, cache inteligente do portfólio GitHub, endpoints otimizados e suporte a downloads diretos.
- **Rastreabilidade Avançada & Analytics (Facebook & Google):**
    - **Meta Pixel Oficial:** Rastreamento direto no navegador (ID: `1544310170830189`) em todos os arquivos HTML (`index.html`, `projetos.html`, `privacidade.html`).
    - **Meta Conversions API (CAPI):** Integração redundante via servidor Node.js com criptografia unidirecional (SHA256) dos dados dos leads (conforme diretrizes rígidas de privacidade da Meta e da LGPD).
    - **Google Analytics 4 (GA4):** Mapeamento avançado do comportamento de usuários, eventos e conversões.
    - **Google Tag Manager (GTM):** Gerenciamento e conteinerização segura de scripts de terceiros (ID: `GTM-KRM5S48`).
- **APIs & Integrações de Alta Conversão:**
    - **Formspree:** Gerenciamento assíncrono (AJAX) para envio de mensagens via formulário com validação inteligente e feedback multilíngue instantâneo.
    - **WhatsApp Direct Connect:** CTA flutuante integrado com mensagem contextualizada dinâmica baseada no idioma selecionado.
- **Tipografia:** Inter e JetBrains Mono (Google Fonts) pré-carregadas e otimizadas contra flash de renderização.

---

## ⚡ Otimizações Sênior de Performance & Core Web Vitals (Lighthouse 95+ Mobile)

Recentemente, o site passou por uma reestruturação de engenharia de performance extrema para atingir nota máxima no Google Lighthouse:

- **Compactação Brutal de Imagens (95%+ de Economia):**
  - **Foto de Avatar (`ruben.massuquetto.webp`)**: Redimensionada para `800px` de largura e compactada em WebP para apenas **24 KB** (redução de 86% do tamanho original de 172 KB).
  - **Prints de Demonstrações**: Todos os arquivos de visualização de projetos foram convertidos de PNG para WebP hiper-leve (por exemplo, a landing page do Mario Bros caiu de **2.5 MB** para apenas **32 KB**, uma redução de 98.7% no payload!).
- **Eliminação de Bloqueio de Renderização:**
  - O script multilíngue `translations.js` (19.8 KB) foi deferido com o atributo `defer` nas três páginas (`index.html`, `projetos.html`, `privacidade.html`), desimpedindo o processamento crítico do HTML.
  - Remoção de tags de preload redundantes no cabeçalho, direcionando a conexão móvel do usuário apenas aos recursos críticos da tela inicial.
- **Prevenção Total de CLS (Cumulative Layout Shift):**
  - Adição de dimensões explícitas (`width` e `height`) e prioridade especial de carregamento (`fetchpriority="high"`) na foto de perfil e demais imagens para eliminar qualquer mudança inesperada de layout no carregamento.
- **Lazy Loading Sob Demanda**:
  - Imagens de visualização dos projetos abaixo da dobra agora usam `loading="lazy"`, economizando dados celulares e processamento.

---

## 📐 Diferenciais Técnicos, SEO & UX

### 🔍 SEO & Metadados Estratégicos
- **Novas Meta Tags**: Título e meta-descrição otimizados com foco em marketing local, tráfego pago e sites de alta conversão para otimizar o snippet de busca orgânica no Google.
- **Favicon de Próxima Geração**: Introdução de um **Favicon Inline em formato SVG Vetorial** (uma elegante caixa dark com bordas verde-neon e a letra "M" estilizada no centro) para carregamento instantâneo, super-nítido e de altíssima definição em qualquer dispositivo, complementado pelo fallback `./assets/favicon.png`.

### 🎨 Engenharia Visual & Design System
- **Design System Baseado em Variáveis CSS**: Controle absoluto e unificado de paletas de cor (temas escuro e claro de alto contraste), tipografias, bordas de neon e sombras.
- **Tema Dinâmico com Zero Flash**: Script de inicialização precoce (*early-init*) no cabeçalho garantindo que o tema preferido do visitante (salvo em localStorage ou preferência do SO) seja aplicado instantaneamente antes do primeiro paint visual do navegador.
- **Sincronização Perfeita**: Alinhamento estético de botões e spans (incluindo o botão de alternância de tema corrigido na página de política de privacidade) para uma identidade de marca limpa e profissional em todo o ecossistema.

### ⚖️ LGPD & Google Consent Mode v2
- **Segurança de Dados Granular**: Banner de cookies totalmente integrado que bloqueia ou libera os pixels do Google/Meta em tempo real baseado na decisão do usuário.
- **Página de Políticas Dedicada (`privacidade.html`)**: Layout unificado com os mesmos padrões de modo claro/escuro e navegação da página inicial, detalhando o compromisso de privacidade sob o e-mail oficial **`contato@rubenmassuquetto.com`**.

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

3. **Inicie o servidor Node.js de alta performance:**
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
