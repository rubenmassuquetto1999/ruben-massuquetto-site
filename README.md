# 🚀 Portfólio Pessoal | Ruben Massuquetto

Bem-vindo ao repositório do meu portfólio profissional. Desenvolvido para apresentar minhas soluções em engenharia de software Front-End, aplicando o rigor técnico do planejamento industrial (PCP), a visão analítica da Ciência de Dados e estratégias de Growth Marketing para construir interfaces robustas, velozes e de alta performance.

🔗 **Visualizar Projeto:** [rubenmassuquetto.com](https://rubenmassuquetto.com)

---

## 🛠 Tecnologias e Ferramentas

O projeto foi concebido e arquitetado focando em **Vanilla Web Stack**, priorizando performance máxima, acessibilidade e controle absoluto sobre o código:

- **Linguagens:** HTML5 semântico, CSS3 moderno (Custom Properties, Flexbox, CSS Grid) e JavaScript puro (ES6+).
- **APIs & Integrações:**
    - **GitHub REST API:** Consumo dinâmico de repositórios públicos em tempo real para alimentação automática da vitrine de projetos.
    - **Formspree:** Gerenciamento assíncrono (AJAX) para envio de mensagens via formulário com validação de campos.
    - **WhatsApp Direct Connect:** CTA flutuante integrado com mensagem contextualizada.
- **Tipografia:** Inter e JetBrains Mono (Google Fonts).

---

## 🎯 Diferenciais Técnicos e Arquitetura

### ⚡ Performance & Core Web Vitals
- **Zero Dependências Pesadas:** Carregamento ultra rápido sem overhead de frameworks ou bibliotecas desnecessárias.
- **Core Web Vitals Otimizados:**
  - `aspect-ratio` e dimensões explícitas para prevenção de CLS (Cumulative Layout Shift).
  - Scripts assíncronos não bloqueantes com carregamento `defer`.
  - Transições por GPU (`transform`, `opacity`) para manter taxas fluidas de 60fps.
- **Tema Dinâmico com Zero Flash:** Script inline no cabeçalho garantindo que o tema preferido (Dark/Light) seja aplicado antes do primeiro paint, sem qualquer oscilação visual.

### 📐 Engenharia Visual & UX
- **Design System Modular:** Variáveis CSS universais para controle unificado de paleta de cores, tipografia, bordas e sombras.
- **Layout Bento Grid Responsivo:** Grade moderna com efeito *Spotlight Hover* dinâmico com iluminação radial no cursor.
- **Carrossel Mobile Inteligente:** Scroll-snapping nativo para dispositivos móveis com indicadores de paginação interativos e sincronizados via `IntersectionObserver` / `scroll events`.
- **Modo Escuro / Modo Claro Nativo:** Transição harmônica entre paletas de alto contraste e conformidade com acessibilidade WCAG AA.
- **Clean Navigation:** Navegação fluida com scroll suave entre seções e menu gaveta (*drawer*) otimizado para dispositivos móveis.

### 📈 Foco em Conversão e Segurança
- Validação robusta de formulário no cliente com feedback instantâneo de envio e tratamento de erros.
- Aderência à LGPD com aviso explícito de privacidade no tratamento de dados de contato.

---

## 🚀 Como Executar o Projeto Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/rubenmassuquetto1999/ruben-massuquetto-portfolio.git
   ```

2. **Acesse o diretório do projeto:**
   ```bash
   cd ruben-massuquetto-portfolio
   ```

3. **Inicie um servidor local (opções disponíveis):**

   *Usando Python 3:*
   ```bash
   python3 -m http.server 3000
   ```

   *Usando Node.js:*
   ```bash
   npx serve .
   ```

   *Ou abra diretamente o arquivo `index.html` em seu navegador.*

4. **Acesse no navegador:**
   ```text
   http://localhost:3000
   ```

---

## 📄 Licença e Direitos

© 2026 Ruben Massuquetto | Todos os direitos reservados.
