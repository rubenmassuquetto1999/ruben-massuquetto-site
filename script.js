// ==========================================================================
// PORTFOLIO SCRIPT - RUBEN MASSUQUETTO
// Ecossistema de Soluções de Vendas Sob Medida para Empresas Locais
// GitHub Live Feed + Selos de Performance + Otimização de Conversão (CRO)
// ==========================================================================

const GITHUB_USERNAME = "rubenmassuquetto1999";
const GITHUB_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=30`;
const WHATSAPP_PHONE = "5541997775319";

// Repositórios Reais do GitHub de Ruben Massuquetto (Fallback Fidedigno com os Mesmos Projetos da API)
const FALLBACK_REAL_PROJECTS = [
    {
        name: "ruben-massuquetto-site",
        description: "Portfólio profissional de Engenharia Front-End com arquitetura Vanilla Web Stack, alta performance, Design System modular, integração com GitHub REST API e conformidade com Core Web Vitals.",
        homepage: "https://rubenmassuquetto.com/",
        html_url: "https://github.com/rubenmassuquetto1999/ruben-massuquetto-site",
        previewImage: "./assets/screenshots/ruben-massuquetto-site.webp"
    },
    {
        name: "site-mkt-massuquetto",
        description: "Site institucional da MKT Massuquetto. Agência de marketing digital especializada em tráfego pago (Google/Meta Ads), criação de sites de alta conversão, SEO local e branding.",
        homepage: "https://mktmassuquetto.com/",
        html_url: "https://github.com/rubenmassuquetto1999/site-mkt-massuquetto",
        previewImage: "./assets/screenshots/site-mkt-massuquetto.webp"
    },
    {
        name: "site-metodo-antiprotelacao",
        description: "Landing page oficial do Método Antiprotelação, um treinamento focado em produtividade e quebra de procrastinação. Desenvolvido com HTML, CSS e JavaScript puro.",
        homepage: "https://metodoantiprotelacao.com/",
        html_url: "https://github.com/rubenmassuquetto1999/site-metodo-antiprotelacao",
        previewImage: "./assets/screenshots/site-metodo-antiprotelacao.webp"
    },
    {
        name: "mario-bros-landing-page",
        description: "Landing page temática e imersiva do Mario Bros construída no padrão Single Page Application (SPA), contando com vídeo interativo de fundo e formulário integrado de conversão.",
        homepage: "https://rubenmassuquetto1999.github.io/mario-bros-landing-page/",
        html_url: "https://github.com/rubenmassuquetto1999/mario-bros-landing-page",
        previewImage: "./assets/screenshots/mario-bros-landing-page.webp"
    },
    {
        name: "Monitor-de-Energia-Faturas-IA",
        description: "Controle inteligente de consumo de energia residencial com IA gratuita (Gemini Flash), OCR de faturas de luz (PDF/Imagem), projeção matemática de Tarifa Social e simulador de relógio de luz.",
        homepage: "https://monitor-de-energia-faturas-ia-341519537157.us-east1.run.app",
        html_url: "https://github.com/rubenmassuquetto1999/Monitor-de-Energia-Faturas-IA",
        previewImage: "./assets/screenshots/monitor-de-energia-faturas-ia.png"
    },
    {
        name: "Controle-Financeiro-Pessoal",
        description: "Sistema inteligente de controle financeiro pessoal com categorização automática de transações via Google Gemini AI, gráficos em tempo real, orçamento mensal e banco de dados Firebase Firestore.",
        homepage: "https://ruben-massuquetto-financeiro.ai.studio/",
        html_url: "https://github.com/rubenmassuquetto1999/Controle-Financeiro-Pessoal",
        previewImage: "./assets/screenshots/controle-financeiro-pessoal.png"
    },
    {
        name: "AOR-Master-IBGE-Focus",
        description: "Plataforma preparatória para o concurso IBGE (Agente Operacional Regional). Mais de 1.380 questões comentadas, simulados cronometrados de 60 questões no padrão do edital, caderno de erros e relatórios de precisão.",
        homepage: "https://aor-master-ibge-focus-668338672572.us-east1.run.app",
        html_url: "https://github.com/rubenmassuquetto1999/AOR-Master-IBGE-Focus",
        previewImage: "./assets/screenshots/aor-master-ibge-focus.png"
    },
    {
        name: "ai-css-generator",
        description: "Gerador inteligente de componentes HTML/CSS que transforma descrições em código funcional utilizando IA (Llama 3 via Groq API). Interface moderna com Glassmorphism e Preview em tempo real.",
        homepage: "https://ai-css-generator.ai.studio",
        html_url: "https://github.com/rubenmassuquetto1999/ai-css-generator",
        previewImage: "./assets/screenshots/ai-css-generator.webp"
    }
];

// Associa o print/screenshot real capturado do site armazenado localmente
function getRepoPreviewImage(repoName) {
    const key = (repoName || '').toLowerCase().replace(/_/g, '-');
    if (key.includes("ruben-massuquetto") || key.includes("rubenmassuquetto") || key.includes("portfolio")) return "./assets/screenshots/ruben-massuquetto-site.webp";
    if (key.includes("mario")) return "./assets/screenshots/mario-bros-landing-page.webp";
    if (key.includes("mkt")) return "./assets/screenshots/site-mkt-massuquetto.webp";
    if (key.includes("metodo") || key.includes("procrastinacao") || key.includes("antiprotelacao")) return "./assets/screenshots/site-metodo-antiprotelacao.webp";
    if (key.includes("css")) return "./assets/screenshots/ai-css-generator.webp";
    if (key.includes("energia") || key.includes("fatura")) return "./assets/screenshots/monitor-de-energia-faturas-ia.png";
    if (key.includes("financeiro")) return "./assets/screenshots/controle-financeiro-pessoal.png";
    if (key.includes("ibge") || key.includes("aor")) return "./assets/screenshots/aor-master-ibge-focus.png";
    if (key.includes("tempo")) return "./assets/screenshots/previsao-do-tempo-app.png";
    return `./assets/screenshots/${key}.webp`;
}

// Normaliza o identificador do projeto para indexação de tradução
function getProjectSlug(name) {
    return (name || '').toLowerCase().replace(/_/g, '-');
}

// Obtém a descrição localizada do projeto no idioma ativo
function getProjectLocalizedDescription(repoName, fallbackDesc, lang) {
    const l = lang || currentLanguage || 'pt';
    const dict = (window.TRANSLATIONS && window.TRANSLATIONS[l]) ? window.TRANSLATIONS[l] : null;
    const descriptions = dict?.demos?.projectDescriptions;
    if (descriptions) {
        const slug = getProjectSlug(repoName);
        if (descriptions[slug]) return descriptions[slug];
        for (const [k, v] of Object.entries(descriptions)) {
            if (slug.includes(k) || k.includes(slug)) {
                return v;
            }
        }
    }
    return fallbackDesc || "Projeto desenvolvido por Ruben Massuquetto com foco em alta performance, código sob medida e soluções digitais eficientes.";
}

// Formata o nome do repositório para exibição limpa
function formatProjectTitle(name) {
    return (name || '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());
}

// Cache em memória dos projetos carregados
let lastLoadedProjects = null;

// Renderiza os Cards dos Repositórios Oficiais do GitHub
function renderProjects(projects, container) {
    if (!projects || projects.length === 0) {
        projects = FALLBACK_REAL_PROJECTS;
    }
    lastLoadedProjects = projects;

    const isMainPage = !window.location.pathname.includes("projetos");
    
    // Na página home, só deixa aparecendo três projetos
    const projectsToRender = isMainPage ? projects.slice(0, 3) : projects;

    container.innerHTML = projectsToRender.map((repo, idx) => {
        const slug = getProjectSlug(repo.name);
        const title = formatProjectTitle(repo.name);
        const previewImg = repo.previewImage || getRepoPreviewImage(repo.name);
        const description = getProjectLocalizedDescription(repo.name, repo.description, currentLanguage);
        const liveUrl = repo.homepage && repo.homepage.trim() !== '' ? repo.homepage : repo.html_url;
        
        let displayHost = "projeto-no-ar";
        try {
            if (liveUrl) {
                const u = new URL(liveUrl);
                displayHost = u.hostname.replace(/^www\./, '');
            }
        } catch(e) {}

        const dict = (window.TRANSLATIONS && window.TRANSLATIONS[currentLanguage]) ? window.TRANSLATIONS[currentLanguage] : null;
        const liveText = (dict && dict.demos && dict.demos.liveBtnText) ? dict.demos.liveBtnText : "Ver Projeto no Ar";
        const adaptText = (dict && dict.demos && dict.demos.adaptBtnText) ? dict.demos.adaptBtnText : "Adaptar Soluções para Minha Empresa";
        const whatsappMsg = (dict && dict.demos && typeof dict.demos.whatsappProjectMsg === 'function')
            ? dict.demos.whatsappProjectMsg(title)
            : `Olá Ruben! Vi o seu projeto "${title}" no seu GitHub e gostaria de avaliar uma solução semelhante adaptada para a minha empresa.`;
        const adaptSolutionUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(whatsappMsg)}`;

        return `
        <article class="bento-card fade-in-section" id="repo-${repo.name || idx}" data-repo-name="${repo.name}" data-repo-slug="${slug}" data-repo-title="${title}" data-repo-desc-fallback="${encodeURIComponent(repo.description || '')}">
            <!-- 1. Nome do projeto -->
            <h3 class="project-title">${title}</h3>

            <!-- 2. Pré-carregamento da prévia do site com visual autêntico de navegador -->
            <div class="project-preview-wrapper">
                <div class="preview-browser-bar">
                    <span class="browser-dot dot-red"></span>
                    <span class="browser-dot dot-yellow"></span>
                    <span class="browser-dot dot-green"></span>
                    <span class="browser-url-pill">${displayHost}</span>
                </div>
                <div class="project-preview-img-container">
                    <img src="${previewImg}" 
                         alt="Captura real do site ${title}" 
                         loading="lazy" 
                         class="project-preview-img" 
                         width="1280" 
                         height="760"
                         onerror="this.onerror=null; this.src='./assets/screenshots/ruben-massuquetto-site.webp';">
                </div>
            </div>

            <!-- 3. Descrição do projeto traduzida no idioma ativo -->
            <p class="project-description" data-repo-desc="${slug}" style="color: var(--text-primary) !important; font-weight: 500 !important; line-height: 1.6 !important;">${description}</p>

            <!-- 4. Botões empilhados: botão em cima para ver projeto no ar e logo abaixo outro botão para adaptar soluções -->
            <div class="project-action-buttons">
                <a href="${liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-project btn-project-live" title="${liveText}" style="background: var(--bg-surface) !important; border: 2px solid var(--text-primary) !important; color: var(--text-primary) !important; font-weight: 800 !important; box-shadow: 0 4px 10px rgba(0,0,0,0.05) !important;">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polygon points="10 8 16 12 10 16 10 8"></polygon>
                    </svg>
                    <span>${liveText}</span>
                </a>

                <a href="${adaptSolutionUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-project btn-project-adapt" title="${adaptText}">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span>${adaptText}</span>
                </a>
            </div>
        </article>
        `;
    }).join('');

    initSpotlightEffect();
    initScrollAnimations();
    initProjectsDots();
}

// Indicador de Posição / Paginação nos Cards em Mobile e Tablet
function initProjectsDots() {
    const track = document.getElementById("github-cards");
    const dotsContainer = document.getElementById("projects-pagination-dots");

    if (!track || !dotsContainer) return;

    const cards = track.querySelectorAll(".bento-card");
    if (cards.length === 0) {
        dotsContainer.innerHTML = '';
        return;
    }

    dotsContainer.innerHTML = Array.from(cards).map((_, idx) => `
        <button type="button" class="pagination-dot ${idx === 0 ? 'is-active' : ''}" data-index="${idx}" aria-label="Ir para a demonstração ${idx + 1}" title="Demonstração ${idx + 1}"></button>
    `).join('');

    const dots = dotsContainer.querySelectorAll(".pagination-dot");

    dots.forEach((dot, idx) => {
        dot.addEventListener("click", () => {
            const targetCard = cards[idx];
            if (targetCard) {
                targetCard.scrollIntoView({
                    behavior: "smooth",
                    inline: "center",
                    block: "nearest"
                });
            }
        });
    });

    let isTicking = false;
    const updateActiveDot = () => {
        const trackRect = track.getBoundingClientRect();
        let activeIdx = 0;
        let minDiff = Infinity;

        cards.forEach((card, idx) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            const trackCenter = trackRect.left + trackRect.width / 2;
            const diff = Math.abs(cardCenter - trackCenter);

            if (diff < minDiff) {
                minDiff = diff;
                activeIdx = idx;
            }
        });

        dots.forEach((dot, idx) => {
            dot.classList.toggle("is-active", idx === activeIdx);
            dot.setAttribute("aria-current", idx === activeIdx ? "true" : "false");
        });

        isTicking = false;
    };

    track.addEventListener("scroll", () => {
        if (!isTicking) {
            requestAnimationFrame(updateActiveDot);
            isTicking = true;
        }
    }, { passive: true });

    window.addEventListener("resize", () => {
        if (!isTicking) {
            requestAnimationFrame(updateActiveDot);
            isTicking = true;
        }
    }, { passive: true });

    setTimeout(updateActiveDot, 200);
}

// Assinatura em memória para detecção instantânea de alterações no GitHub
let currentReposSignature = "";

// Integração Oficial em Tempo Real com a API do GitHub e Sincronização Automática
async function getGitHubRepos(isAutoSync = false) {
    const container = document.getElementById("github-cards");
    if (!container) return;

    // 1. Na primeira carga, exibe imediatamente os projetos locais para carregamento instantâneo
    if (!isAutoSync && (!container.children || container.children.length === 0)) {
        renderProjects(FALLBACK_REAL_PROJECTS, container);
    }

    // 2. Consulta a API inteligente do servidor local (que mantém prévias atualizadas e cache de 25s)
    let freshRepos = null;
    try {
        const srvRes = await fetch('/api/github-repos');
        if (srvRes.ok) {
            const data = await srvRes.json();
            if (data && Array.isArray(data.repos) && data.repos.length > 0) {
                freshRepos = data.repos;
            }
        }
    } catch(e) {}

    // 3. Fallback para a API direta do GitHub caso necessário
    if (!freshRepos) {
        try {
            const response = await fetch(GITHUB_URL, { headers: { 'Accept': 'application/vnd.github.v3+json' } });
            if (response.ok) {
                const repos = await response.json();
                if (Array.isArray(repos) && repos.length > 0) {
                    freshRepos = repos.filter(r => 
                        r.name.toLowerCase() !== GITHUB_USERNAME.toLowerCase() && 
                        !r.fork
                    );
                }
            }
        } catch (err) {
            console.warn("Utilizando projetos oficiais em cache:", err);
        }
    }

    // 4. Se houver novidades ou alterações no GitHub, atualiza os cards automaticamente
    if (freshRepos && freshRepos.length > 0) {
        const newSignature = freshRepos.map(r => `${r.name}-${r.pushed_at || ''}-${r.homepage || ''}`).join('|');
        if (newSignature !== currentReposSignature) {
            currentReposSignature = newSignature;
            renderProjects(freshRepos, container);
            if (isAutoSync) {
                console.log("[Auto-Sync] Projetos sincronizados automaticamente com alterações do GitHub!");
            }
        }
    }
}

// Inicia monitoramento automático para atualizar o site sem precisar de reload manual
function initAutoSyncGitHub() {
    // 1. Polling periódico em segundo plano a cada 30 segundos
    setInterval(() => {
        getGitHubRepos(true);
    }, 30000);

    // 2. Sincronização imediata ao alternar de aba ou focar na janela
    window.addEventListener("focus", () => {
        getGitHubRepos(true);
    });

    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
            getGitHubRepos(true);
        }
    });
}

// Efeito de iluminação sutil (Spotlight) nos Cards
function initSpotlightEffect() {
    const cards = document.querySelectorAll(".bento-card, .service-card, .ai-search-card");
    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    });
}

// Animações de Rolagem Suave (Intersection Observer)
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll(".fade-in-section");
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px"
    });

    fadeElements.forEach(el => observer.observe(el));
}

// Manipulador do Formulário de Contato Consultivo
async function handleConsultativeFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const status = document.getElementById("form-status");
    const button = document.getElementById("form-button");
    const data = new FormData(form);

    const clientName = form.querySelector('[name="name"]')?.value || 'Cliente';
    const whatsappNum = form.querySelector('[name="whatsapp"]')?.value || '';
    const companyName = form.querySelector('[name="company"]')?.value || '';
    const goalOption = form.querySelector('[name="objective"]')?.value || '';
    const messageDetail = form.querySelector('[name="message"]')?.value || '';

    if (button) {
        button.disabled = true;
        button.innerHTML = `
            <svg class="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="2" x2="12" y2="6"></line>
                <line x1="12" y1="18" x2="12" y2="22"></line>
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                <line x1="2" y1="12" x2="6" y2="12"></line>
                <line x1="18" y1="12" x2="22" y2="12"></line>
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
            </svg>
            Gerando solicitação de diagnóstico...
        `;
    }

    try {
        const response = await fetch(form.action, {
            method: form.method || 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            // Eventos oficiais de Rastreamento (GA4 e Meta Pixel)
            try {
                if (window.gtag) {
                    window.gtag('event', 'generate_lead', {
                        event_category: 'Conversao',
                        event_label: goalOption
                    });
                }
                if (window.fbq) {
                    window.fbq('track', 'Lead', {
                        content_name: goalOption,
                        status: 'diagnostico_solicitado'
                    });
                }
            } catch (trackErr) {}

            // Chamar o servidor para acionar a API de Conversões da Meta (CAPI) de forma redundante e segura
            try {
                await fetch('/api/submit-lead', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: clientName,
                        whatsapp: whatsappNum,
                        company: companyName,
                        objective: goalOption,
                        message: messageDetail
                    })
                });
                console.log('[Meta CAPI] Evento de Conversão redundante disparado via Servidor.');
            } catch (capiErr) {
                console.error('[Meta CAPI] Erro ao disparar conversão:', capiErr);
            }

            const dict = (window.TRANSLATIONS && window.TRANSLATIONS[currentLanguage]) ? window.TRANSLATIONS[currentLanguage] : (window.TRANSLATIONS?.pt || {});
            const successTitle = dict.contact?.submitSuccessTitle || "✔ Solicitação de Diagnóstico Enviada com Sucesso!";
            const successText = typeof dict.contact?.submitSuccessText === 'function' 
                ? dict.contact.submitSuccessText(companyName) 
                : (dict.contact?.submitSuccessText || "Analisaremos seu mercado e retornaremos em até 24 horas úteis.");

            status.innerHTML = `
                <div class="form-feedback success">
                    <strong>${successTitle}</strong>
                    <p>${successText}</p>
                </div>
            `;
            form.reset();
        } else {
            const dict = (window.TRANSLATIONS && window.TRANSLATIONS[currentLanguage]) ? window.TRANSLATIONS[currentLanguage] : (window.TRANSLATIONS?.pt || {});
            const errorTitle = dict.contact?.submitErrorTitle || "✖ Não foi possível enviar pelo formulário automático.";
            const errorText = typeof dict.contact?.submitErrorText === 'function'
                ? dict.contact.submitErrorText(companyName)
                : (dict.contact?.submitErrorText || "Você pode falar imediatamente comigo direto pelo WhatsApp.");

            status.innerHTML = `
                <div class="form-feedback error">
                    <strong>${errorTitle}</strong>
                    <p>${errorText}</p>
                </div>
            `;
        }
    } catch (err) {
        const dict = (window.TRANSLATIONS && window.TRANSLATIONS[currentLanguage]) ? window.TRANSLATIONS[currentLanguage] : (window.TRANSLATIONS?.pt || {});
        status.innerHTML = `
            <div class="form-feedback error">
                <strong>✖ Falha de conexão.</strong>
                <p><a href="https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(dict.floatingWpp?.prefilledMessage || 'Olá Ruben!')}" target="_blank" rel="noopener noreferrer">WhatsApp</a></p>
            </div>
        `;
    } finally {
        if (button) {
            button.disabled = false;
            const dict = (window.TRANSLATIONS && window.TRANSLATIONS[currentLanguage]) ? window.TRANSLATIONS[currentLanguage] : (window.TRANSLATIONS?.pt || {});
            const btnText = dict.contact?.submitBtn || "Solicitar Diagnóstico Gratuito";
            button.innerHTML = `
                <span>${btnText}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            `;
        }
    }
}

// Download de Currículo e Apresentação Executiva
async function handleCvDownload(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    const triggerBtn = event?.currentTarget;
    const originalHtml = triggerBtn ? triggerBtn.innerHTML : '';
    
    if (triggerBtn) {
        triggerBtn.style.pointerEvents = 'none';
        triggerBtn.innerHTML = `
            <svg class="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 0.8s linear infinite;">
                <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
                <path d="M12 2a10 10 0 0 1 10 10"></path>
            </svg>
            <span>Baixando PDF...</span>
        `;
    }

    try {
        let blob = null;
        let isPdf = false;

        try {
            const res = await fetch('/cv/cv-ruben-massuquetto.pdf', {
                headers: { 'Accept': 'application/pdf' },
                cache: 'no-cache'
            });
            if (res.ok) {
                const tempBlob = await res.blob();
                if (tempBlob.size > 2000) {
                    const headerTxt = await tempBlob.slice(0, 8).text();
                    if (headerTxt.startsWith('%PDF')) {
                        blob = tempBlob;
                        isPdf = true;
                    }
                }
            }
        } catch (e) {
            console.warn("Estratégia direta 1 falhou, tentando API Base64...", e);
        }

        if (!isPdf) {
            const apiRes = await fetch('/api/cv-base64');
            if (apiRes.ok) {
                const data = await apiRes.json();
                if (data.base64) {
                    const binaryString = atob(data.base64);
                    const bytes = new Uint8Array(binaryString.length);
                    for (let i = 0; i < binaryString.length; i++) {
                        bytes[i] = binaryString.charCodeAt(i);
                    }
                    blob = new Blob([bytes], { type: 'application/pdf' });
                    isPdf = true;
                }
            }
        }

        if (blob && isPdf) {
            const blobUrl = window.URL.createObjectURL(blob);
            const downloadLink = document.createElement('a');
            downloadLink.style.display = 'none';
            downloadLink.href = blobUrl;
            downloadLink.download = 'cv-ruben-massuquetto.pdf';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            setTimeout(() => {
                document.body.removeChild(downloadLink);
                window.URL.revokeObjectURL(blobUrl);
            }, 1500);
        } else {
            window.location.href = '/download-cv';
        }
    } catch (err) {
        console.error("Falha no download do documento:", err);
        window.location.href = '/download-cv';
    } finally {
        if (triggerBtn) {
            setTimeout(() => {
                triggerBtn.innerHTML = originalHtml;
                triggerBtn.style.pointerEvents = 'auto';
            }, 800);
        }
    }
}

// ==========================================================================
// GERENCIADOR DE TEMAS (Modo Escuro Preto Ardósia / Modo Claro)
// ==========================================================================
const THEME_STORAGE_KEY = 'ruben_portfolio_theme';

function getSystemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function updateThemeToggleUI(theme) {
    const toggleBtn = document.getElementById('theme-toggle-btn');
    if (!toggleBtn) return;
    
    if (theme === 'dark') {
        toggleBtn.setAttribute('aria-label', 'Ativar modo claro');
        toggleBtn.setAttribute('title', 'Ativar modo claro (Atualmente: Preto Ardósia / Noturno)');
    } else {
        toggleBtn.setAttribute('aria-label', 'Ativar modo escuro');
        toggleBtn.setAttribute('title', 'Ativar modo escuro (Atualmente: Claro Corporativo)');
    }
}

function applyTheme(theme, save = false) {
    document.documentElement.setAttribute('data-theme', theme);
    if (save) {
        try {
            localStorage.setItem(THEME_STORAGE_KEY, theme);
        } catch (e) {
            console.warn('Não foi possível salvar preferência de tema:', e);
        }
    }
    updateThemeToggleUI(theme);
}

function initThemeSystem() {
    let activeTheme = 'dark';
    try {
        const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (storedTheme === 'dark' || storedTheme === 'light') {
            activeTheme = storedTheme;
        } else {
            activeTheme = getSystemTheme();
        }
    } catch (e) {
        activeTheme = getSystemTheme();
    }

    applyTheme(activeTheme, false);

    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleDeviceThemeChange = (e) => {
            const hasManualOverride = localStorage.getItem(THEME_STORAGE_KEY);
            if (!hasManualOverride) {
                applyTheme(e.matches ? 'dark' : 'light', false);
            }
        };

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleDeviceThemeChange);
        } else if (mediaQuery.addListener) {
            mediaQuery.addListener(handleDeviceThemeChange);
        }
    }

    const toggleBtn = document.getElementById('theme-toggle-btn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || getSystemTheme();
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(nextTheme, true);
        });
    }
}

// ==========================================================================
// MENU MOBILE (Drawer Responsivo com Fechamento Inteligente)
// ==========================================================================
function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const drawer = document.getElementById('mobile-nav-drawer');
    const floatWhatsapp = document.getElementById('whatsapp-floating-cta');
    const header = document.getElementById('header-nav') || document.querySelector('header');

    if (!toggleBtn || !drawer) return;

    const hideFloatingBtn = () => {
        if (!floatWhatsapp) return;
        floatWhatsapp.style.setProperty('display', 'none', 'important');
        floatWhatsapp.style.setProperty('visibility', 'hidden', 'important');
        floatWhatsapp.style.setProperty('opacity', '0', 'important');
        floatWhatsapp.style.setProperty('pointer-events', 'none', 'important');
        floatWhatsapp.classList.add('is-menu-hidden');
    };

    const showFloatingBtn = () => {
        if (!floatWhatsapp) return;
        floatWhatsapp.style.removeProperty('display');
        floatWhatsapp.style.removeProperty('visibility');
        floatWhatsapp.style.removeProperty('opacity');
        floatWhatsapp.style.removeProperty('pointer-events');
        floatWhatsapp.classList.remove('is-menu-hidden');
    };

    const toggleMenu = (open) => {
        const shouldOpen = typeof open === 'boolean' ? open : !drawer.classList.contains('is-open');
        
        if (shouldOpen) {
            drawer.classList.add('is-open');
            toggleBtn.classList.add('is-active');
            toggleBtn.setAttribute('aria-expanded', 'true');
            toggleBtn.setAttribute('aria-label', 'Fechar menu de navegação');
            drawer.setAttribute('aria-hidden', 'false');
            document.body.classList.add('mobile-menu-open');
            if (header) header.classList.add('is-menu-open');
            hideFloatingBtn();
        } else {
            drawer.classList.remove('is-open');
            toggleBtn.classList.remove('is-active');
            toggleBtn.setAttribute('aria-expanded', 'false');
            toggleBtn.setAttribute('aria-label', 'Abrir menu de navegação');
            drawer.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('mobile-menu-open');
            if (header) header.classList.remove('is-menu-open');
            showFloatingBtn();
        }
    };

    // Observador contínuo de segurança: se a classe is-open for detectada, garante ocultação imediata
    try {
        const observer = new MutationObserver(() => {
            if (drawer.classList.contains('is-open')) {
                hideFloatingBtn();
                document.body.classList.add('mobile-menu-open');
            } else {
                showFloatingBtn();
                document.body.classList.remove('mobile-menu-open');
            }
        });
        observer.observe(drawer, { attributes: true, attributeFilter: ['class', 'style'] });
    } catch (e) {}

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    const mobileLinks = drawer.querySelectorAll('.mobile-nav-link, .mobile-cta-btn');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu(false);
        });
    });

    document.addEventListener('click', (e) => {
        const header = document.getElementById('header-nav');
        if (header && !header.contains(e.target)) {
            toggleMenu(false);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
            toggleMenu(false);
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1120 && drawer.classList.contains('is-open')) {
            toggleMenu(false);
        }
    }, { passive: true });
}

// Rastreamento de Acessibilidade e Cliques no WhatsApp Flutuante
function initFloatingWhatsAppTracker() {
    const btn = document.getElementById('whatsapp-floating-cta');
    if (btn) {
        btn.addEventListener('click', () => {
            try {
                if (window.gtag) {
                    window.gtag('event', 'click_whatsapp_floating', {
                        event_category: 'Conversao',
                        event_label: 'Botao Flutuante Falar com Especialista'
                    });
                }
            } catch (e) {}
        });
    }
}

// Garante abertura estrita no topo absoluto da página (evita abrir no meio)
function ensureStrictScrollTop() {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    // Se a URL foi carregada com âncora que puxa para o meio, zera a rolagem para o início
    if (window.location.hash && window.location.hash !== '#hero') {
        history.replaceState(null, document.title, window.location.pathname + window.location.search);
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
}

ensureStrictScrollTop();

// ==========================================================================
// SISTEMA MULTILÍNGUE NATIVO (PT-BR, EN, ES) COM DETECÇÃO AUTOMÁTICA
// ==========================================================================
const LANG_STORAGE_KEY = 'preferred_language';
let currentLanguage = 'pt';

function detectUserLanguage() {
    // 1. URL Query Param (?lang=en, ?lang=es, ?lang=pt)
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = (urlParams.get('lang') || '').toLowerCase();
        if (['pt', 'en', 'es'].includes(langParam)) {
            return langParam;
        }
    } catch (e) {}

    // 2. LocalStorage manual preference
    try {
        const stored = localStorage.getItem(LANG_STORAGE_KEY);
        if (stored && ['pt', 'en', 'es'].includes(stored)) {
            return stored;
        }
    } catch (e) {}

    // 3. Browser language auto-detection for international/gringo visitors
    try {
        const navLangs = navigator.languages || [navigator.language || navigator.userLanguage || ''];
        for (const l of navLangs) {
            const lower = (l || '').toLowerCase();
            if (lower.startsWith('pt')) return 'pt';
            if (lower.startsWith('es')) return 'es';
            if (lower.startsWith('en')) return 'en';
        }
    } catch (e) {}

    // Foreign visitor with any other language (de, fr, it, zh, ja, etc.) -> English!
    return 'en';
}

function getNestedTranslation(obj, path) {
    if (!obj || !path) return null;
    const parts = path.split('.');
    let curr = obj;
    for (const p of parts) {
        if (curr && typeof curr === 'object' && p in curr) {
            curr = curr[p];
        } else {
            return null;
        }
    }
    return curr;
}

function applyLanguage(lang, save = false) {
    if (!['pt', 'en', 'es'].includes(lang)) {
        lang = 'pt';
    }
    currentLanguage = lang;

    if (save) {
        try {
            localStorage.setItem(LANG_STORAGE_KEY, lang);
        } catch (e) {}
    }

    // Atualiza atributo lang do elemento <html>
    const htmlLangMap = { pt: 'pt-BR', en: 'en', es: 'es' };
    document.documentElement.lang = htmlLangMap[lang] || 'pt-BR';

    // Atualiza abreviatura visível na bolinha do seletor de idioma (PT, EN, ES)
    document.querySelectorAll('.lang-current-code').forEach(el => {
        el.textContent = lang.toUpperCase();
    });

    // Atualiza itens ativos na lista dropdown de idiomas
    document.querySelectorAll('.lang-dropdown-item').forEach(item => {
        const itemLang = item.getAttribute('data-lang');
        const isActive = itemLang === lang;
        item.classList.toggle('is-active', isActive);
        item.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Atualiza botões legados ou de compatibilidade
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const btnLang = btn.getAttribute('data-lang');
        const isActive = btnLang === lang;
        btn.classList.toggle('is-active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    const dict = (window.TRANSLATIONS && window.TRANSLATIONS[lang]) ? window.TRANSLATIONS[lang] : null;
    if (!dict) return;

    // Metadados
    const isProjetosPage = window.location.pathname.includes('projetos');
    const isPrivacidadePage = window.location.pathname.includes('privacidade');
    if (isProjetosPage && dict.projetosPage) {
        if (dict.projetosPage.metaTitle) document.title = dict.projetosPage.metaTitle;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && dict.projetosPage.metaDesc) metaDesc.setAttribute('content', dict.projetosPage.metaDesc);
    } else if (isPrivacidadePage && dict.privacidadePage) {
        if (dict.privacidadePage.metaTitle) document.title = dict.privacidadePage.metaTitle;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && dict.privacidadePage.metaDesc) metaDesc.setAttribute('content', dict.privacidadePage.metaDesc);
    } else if (dict.meta) {
        if (dict.meta.title) document.title = dict.meta.title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && dict.meta.description) metaDesc.setAttribute('content', dict.meta.description);
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle && dict.meta.title) ogTitle.setAttribute('content', dict.meta.title);
        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc && dict.meta.description) ogDesc.setAttribute('content', dict.meta.description);
    }

    // Elementos com data-i18n (texto puro)
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const keyPath = el.getAttribute('data-i18n');
        const val = getNestedTranslation(dict, keyPath);
        if (val) {
            el.textContent = val;
        }
    });

    // Elementos com data-i18n-html (com marcação HTML)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const keyPath = el.getAttribute('data-i18n-html');
        const val = getNestedTranslation(dict, keyPath);
        if (val) {
            el.innerHTML = val;
        }
    });

    // Elementos com data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const keyPath = el.getAttribute('data-i18n-placeholder');
        const val = getNestedTranslation(dict, keyPath);
        if (val) {
            el.setAttribute('placeholder', val);
        }
    });

    // Elementos com data-i18n-title
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const keyPath = el.getAttribute('data-i18n-title');
        const val = getNestedTranslation(dict, keyPath);
        if (val) {
            el.setAttribute('title', val);
        }
    });

    // Elementos com data-i18n-aria
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
        const keyPath = el.getAttribute('data-i18n-aria');
        const val = getNestedTranslation(dict, keyPath);
        if (val) {
            el.setAttribute('aria-label', val);
        }
    });

    // Atualiza links e mensagens dinâmicas do WhatsApp
    if (dict.floatingWpp) {
        const floatBtn = document.getElementById('whatsapp-floating-cta');
        if (floatBtn) {
            floatBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(dict.floatingWpp.prefilledMessage)}`;
            floatBtn.setAttribute('aria-label', dict.floatingWpp.aria);
            const labelEl = floatBtn.querySelector('.whatsapp-float-label');
            if (labelEl) labelEl.textContent = dict.floatingWpp.label;
        }

        const directWpp = document.getElementById('contact-whatsapp');
        if (directWpp) {
            directWpp.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(dict.floatingWpp.prefilledMessage)}`;
        }

        const btnCommercialWpp = document.getElementById('btn-commercial-whatsapp');
        if (btnCommercialWpp) {
            btnCommercialWpp.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(dict.floatingWpp.prefilledMessage)}`;
        }
    }

    // Atualiza cards de projetos (descrições no idioma ativo, botões e mensagem dinâmica do WhatsApp)
    const projectCardsContainer = document.getElementById('github-cards');
    if (projectCardsContainer && projectCardsContainer.children.length > 0) {
        projectCardsContainer.querySelectorAll('.bento-card').forEach(card => {
            const repoName = card.getAttribute('data-repo-name') || card.id.replace('repo-', '');
            const title = card.getAttribute('data-repo-title') || formatProjectTitle(repoName);
            const fallbackRaw = card.getAttribute('data-repo-desc-fallback');
            const fallbackDesc = fallbackRaw ? decodeURIComponent(fallbackRaw) : '';
            
            // 1. Atualiza a descrição no idioma ativo (PT / EN / ES)
            const descEl = card.querySelector('.project-description');
            if (descEl) {
                descEl.textContent = getProjectLocalizedDescription(repoName, fallbackDesc || descEl.textContent, lang);
            }

            // 2. Atualiza o botão "Ver Projeto no Ar"
            const liveBtn = card.querySelector('.btn-project-live');
            if (liveBtn) {
                const s = liveBtn.querySelector('span');
                if (s && dict?.demos?.liveBtnText) s.textContent = dict.demos.liveBtnText;
                if (dict?.demos?.liveBtnText) liveBtn.setAttribute('title', dict.demos.liveBtnText);
            }

            // 3. Atualiza o botão "Adaptar Soluções para Minha Empresa" com o link do WhatsApp no idioma
            const adaptBtn = card.querySelector('.btn-project-adapt');
            if (adaptBtn) {
                const s = adaptBtn.querySelector('span');
                if (s && dict?.demos?.adaptBtnText) s.textContent = dict.demos.adaptBtnText;
                if (dict?.demos?.adaptBtnText) adaptBtn.setAttribute('title', dict.demos.adaptBtnText);
                const whatsappMsg = (dict?.demos && typeof dict.demos.whatsappProjectMsg === 'function')
                    ? dict.demos.whatsappProjectMsg(title)
                    : `Olá Ruben! Vi o seu projeto "${title}" no seu GitHub e gostaria de avaliar uma solução semelhante adaptada para a minha empresa.`;
                adaptBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(whatsappMsg)}`;
            }
        });
    }

    // Traduz o banner de cookies e consentimento de forma dinâmica
    if (typeof translateConsentBanner === 'function') {
        translateConsentBanner(lang);
    }
}

function initLanguageSystem() {
    const initialLang = detectUserLanguage();
    applyLanguage(initialLang, false);

    // Gerenciamento dos seletores dropdown de idioma (bolinha circular + lista suspensa)
    document.querySelectorAll('.lang-dropdown-wrapper').forEach(wrapper => {
        const btn = wrapper.querySelector('.lang-circle-btn');
        const menu = wrapper.querySelector('.lang-dropdown-menu');
        if (!btn || !menu) return;

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isOpen = menu.classList.contains('is-open');

            // Fecha outros seletores eventualmente abertos
            document.querySelectorAll('.lang-dropdown-menu.is-open').forEach(m => {
                if (m !== menu) {
                    m.classList.remove('is-open');
                    const otherBtn = m.parentElement?.querySelector('.lang-circle-btn');
                    if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                }
            });

            menu.classList.toggle('is-open', !isOpen);
            btn.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
        });

        menu.querySelectorAll('.lang-dropdown-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const targetLang = item.getAttribute('data-lang');
                if (targetLang && targetLang !== currentLanguage) {
                    applyLanguage(targetLang, true);
                }
                menu.classList.remove('is-open');
                btn.setAttribute('aria-expanded', 'false');
            });
        });
    });

    // Fecha a lista suspensa ao clicar fora
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.lang-dropdown-wrapper')) {
            document.querySelectorAll('.lang-dropdown-menu.is-open').forEach(menu => {
                menu.classList.remove('is-open');
                const btn = menu.parentElement?.querySelector('.lang-circle-btn');
                if (btn) btn.setAttribute('aria-expanded', 'false');
            });
        }
    });

    // Fecha a lista suspensa ao pressionar a tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.lang-dropdown-menu.is-open').forEach(menu => {
                menu.classList.remove('is-open');
                const btn = menu.parentElement?.querySelector('.lang-circle-btn');
                if (btn) {
                    btn.setAttribute('aria-expanded', 'false');
                    btn.focus();
                }
            });
        }
    });

    // Compatibilidade com eventuais botões legados .lang-btn
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetLang = btn.getAttribute('data-lang');
            if (targetLang && targetLang !== currentLanguage) {
                applyLanguage(targetLang, true);
            }
        });
    });
}

// Inicializa o Banner e o Modo de Consentimento v2 (GDPR / LGPD) do Google
function initCookieConsentSystem() {
    const consentKey = 'ruben_cookie_consent_v2';
    const hasConsent = localStorage.getItem(consentKey);

    // Cria o HTML do banner caso não esteja presente no DOM
    if (!document.getElementById('ruben-consent-banner')) {
        const bannerHtml = `
        <div id="ruben-consent-banner" class="ruben-consent-banner" role="dialog" aria-modal="true" aria-labelledby="consent-title">
          <div class="consent-container">
            <div class="consent-header">
              <div class="consent-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M12 2a10 10 0 0 0-10 10c0 5.523 4.477 10 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2zm1 15.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-.25-4.25a.75.75 0 0 1-1.5 0v-4.5a.75.75 0 0 1 1.5 0v4.5z"/>
                </svg>
              </div>
              <h4 id="consent-title" class="consent-title"></h4>
            </div>
            <p id="consent-desc" class="consent-description"></p>
            
            <div id="consent-preferences" class="consent-preferences" style="display: none;">
              <div class="preference-item">
                <div class="preference-info">
                  <span class="preference-label" id="label-necessary">Cookies Essenciais (Obrigatório)</span>
                  <p class="preference-desc" id="desc-necessary">Segurança, integridade e funções de base do site.</p>
                </div>
                <div class="preference-toggle">
                  <input type="checkbox" id="consent-necessary" checked disabled>
                  <label for="consent-necessary" class="toggle-switch-label"></label>
                </div>
              </div>
              <div class="preference-item">
                <div class="preference-info">
                  <span class="preference-label" id="label-analytics"></span>
                  <p class="preference-desc" id="desc-analytics"></p>
                </div>
                <div class="preference-toggle">
                  <input type="checkbox" id="consent-analytics">
                  <label for="consent-analytics" class="toggle-switch-label"></label>
                </div>
              </div>
              <div class="preference-item">
                <div class="preference-info">
                  <span class="preference-label" id="label-marketing"></span>
                  <p class="preference-desc" id="desc-marketing"></p>
                </div>
                <div class="preference-toggle">
                  <input type="checkbox" id="consent-marketing">
                  <label for="consent-marketing" class="toggle-switch-label"></label>
                </div>
              </div>
            </div>

            <div class="consent-actions">
              <button type="button" id="btn-consent-customize" class="btn-consent btn-secondary"></button>
              <button type="button" id="btn-consent-reject" class="btn-consent btn-secondary"></button>
              <button type="button" id="btn-consent-accept" class="btn-consent btn-primary"></button>
            </div>
          </div>
        </div>
        `;
        document.body.insertAdjacentHTML('beforeend', bannerHtml);
    }

    const banner = document.getElementById('ruben-consent-banner');
    const btnAccept = document.getElementById('btn-consent-accept');
    const btnReject = document.getElementById('btn-consent-reject');
    const btnCustomize = document.getElementById('btn-consent-customize');
    const preferencesPanel = document.getElementById('consent-preferences');
    
    const inputAnalytics = document.getElementById('consent-analytics');
    const inputMarketing = document.getElementById('consent-marketing');

    // Carrega preferências salvas ou inicia comDenied
    let currentPref = { ad_storage: 'denied', analytics_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' };
    if (hasConsent) {
        try {
            currentPref = JSON.parse(hasConsent);
            inputAnalytics.checked = currentPref.analytics_storage === 'granted';
            inputMarketing.checked = currentPref.ad_storage === 'granted';
        } catch (e) {}
    } else {
        // Exibe o banner com transição limpa
        setTimeout(() => {
            banner.classList.add('is-visible');
        }, 1200);
    }

    // Função de tradução dinâmica do banner
    window.translateConsentBanner = function(lang) {
        const l = lang || currentLanguage || 'pt';
        const dict = (window.TRANSLATIONS && window.TRANSLATIONS[l]) ? window.TRANSLATIONS[l] : null;
        if (!dict || !dict.consent) return;

        const c = dict.consent;
        
        const titleEl = document.getElementById('consent-title');
        const descEl = document.getElementById('consent-desc');
        const labelAnalyticsEl = document.getElementById('label-analytics');
        const descAnalyticsEl = document.getElementById('desc-analytics');
        const labelMarketingEl = document.getElementById('label-marketing');
        const descMarketingEl = document.getElementById('desc-marketing');

        const btnCustomizeEl = document.getElementById('btn-consent-customize');
        const btnRejectEl = document.getElementById('btn-consent-reject');
        const btnAcceptEl = document.getElementById('btn-consent-accept');

        if (titleEl) titleEl.textContent = c.title;
        if (descEl) descEl.textContent = c.desc;
        if (labelAnalyticsEl) labelAnalyticsEl.textContent = c.labelAnalytics;
        if (descAnalyticsEl) descAnalyticsEl.textContent = c.descAnalytics;
        if (labelMarketingEl) labelMarketingEl.textContent = c.labelMarketing;
        if (descMarketingEl) descMarketingEl.textContent = c.descMarketing;

        const labelNecessaryEl = document.getElementById('label-necessary');
        const descNecessaryEl = document.getElementById('desc-necessary');
        if (l === 'pt') {
            if (labelNecessaryEl) labelNecessaryEl.textContent = "Cookies Essenciais (Obrigatório)";
            if (descNecessaryEl) descNecessaryEl.textContent = "Segurança, integridade e funções de base do site.";
        } else if (l === 'en') {
            if (labelNecessaryEl) labelNecessaryEl.textContent = "Necessary Cookies (Required)";
            if (descNecessaryEl) descNecessaryEl.textContent = "Security, integrity, and core website utilities.";
        } else if (l === 'es') {
            if (labelNecessaryEl) labelNecessaryEl.textContent = "Cookies Necesarias (Obligatorio)";
            if (descNecessaryEl) descNecessaryEl.textContent = "Seguridad, integridad y utilidades esenciales del sitio.";
        }

        if (preferencesPanel && preferencesPanel.style.display === 'block') {
            if (btnCustomizeEl) btnCustomizeEl.textContent = c.btnSavePreferences;
        } else {
            if (btnCustomizeEl) btnCustomizeEl.textContent = c.btnCustomize;
        }
        
        if (btnRejectEl) btnRejectEl.textContent = c.btnRejectAll;
        if (btnAcceptEl) btnAcceptEl.textContent = c.btnAcceptAll;
    };

    // Traduz inicialmente para o idioma selecionado
    translateConsentBanner(currentLanguage);

    // Ouvintes de eventos
    btnAccept.addEventListener('click', () => {
        const consentObj = {
            ad_storage: 'granted',
            analytics_storage: 'granted',
            ad_user_data: 'granted',
            ad_personalization: 'granted'
        };
        saveAndApplyConsent(consentObj);
    });

    btnReject.addEventListener('click', () => {
        const consentObj = {
            ad_storage: 'denied',
            analytics_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
        };
        saveAndApplyConsent(consentObj);
    });

    btnCustomize.addEventListener('click', () => {
        const l = currentLanguage || 'pt';
        const dict = (window.TRANSLATIONS && window.TRANSLATIONS[l]) ? window.TRANSLATIONS[l] : null;
        const c = dict ? dict.consent : null;

        if (preferencesPanel.style.display === 'none') {
            preferencesPanel.style.display = 'block';
            preferencesPanel.classList.add('fade-in');
            if (btnCustomize && c) btnCustomize.textContent = c.btnSavePreferences;
        } else {
            const analyticsState = inputAnalytics.checked ? 'granted' : 'denied';
            const marketingState = inputMarketing.checked ? 'granted' : 'denied';
            const consentObj = {
                ad_storage: marketingState,
                analytics_storage: analyticsState,
                ad_user_data: marketingState,
                ad_personalization: marketingState
            };
            saveAndApplyConsent(consentObj);
        }
    });

    function saveAndApplyConsent(consentObj) {
        localStorage.setItem(consentKey, JSON.stringify(consentObj));

        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                'ad_storage': consentObj.ad_storage,
                'analytics_storage': consentObj.analytics_storage,
                'ad_user_data': consentObj.ad_user_data,
                'ad_personalization': consentObj.ad_personalization
            });
        }

        banner.classList.remove('is-visible');
    }
}

// Inicialização Principal
document.addEventListener("DOMContentLoaded", () => {
    ensureStrictScrollTop();
    initThemeSystem();
    initLanguageSystem();
    initCookieConsentSystem();
    initMobileMenu();
    initScrollAnimations();
    initSpotlightEffect();
    initFloatingWhatsAppTracker();
    getGitHubRepos();
    initAutoSyncGitHub();

    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", handleConsultativeFormSubmit);
    }

    const cvButtons = document.querySelectorAll('a[href*="cv"], a[id*="cv"], a[download*="cv"], .btn-cv');
    cvButtons.forEach(btn => {
        btn.addEventListener('click', handleCvDownload);
    });
});

window.addEventListener('load', () => {
    setTimeout(ensureStrictScrollTop, 50);
});
