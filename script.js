// ==========================================================================
// PORTFOLIO SCRIPT - RUBEN MASSUQUETTO
// Architecture: IntersectionObserver + GitHub REST API + Bento Spotlight Effect
// ==========================================================================

const GITHUB_USERNAME = "rubenmassuquetto1999";
const GITHUB_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=30`;

// Fallback curated projects in case GitHub API hits rate limit
const FALLBACK_PROJECTS = [
    {
        name: "devclub-store-system",
        description: "Interface e-commerce com catálogo de alta performance, filtro em tempo real e carrinho reativo.",
        language: "JavaScript",
        topics: ["javascript", "css3", "html5", "ecommerce"],
        html_url: `https://github.com/${GITHUB_USERNAME}`,
        homepage: "https://rubenmassuquetto.com",
        stargazers_count: 4,
        forks_count: 1
    },
    {
        name: "industrial-pcp-dashboard",
        description: "Sistema analítico para controle de produção industrial, hierarquia de BOM e otimização de gargalos.",
        language: "TypeScript",
        topics: ["typescript", "data-analytics", "charts", "front-end"],
        html_url: `https://github.com/${GITHUB_USERNAME}`,
        homepage: "",
        stargazers_count: 6,
        forks_count: 2
    },
    {
        name: "growth-metrics-analyzer",
        description: "Aplicação front-end para monitoramento de KPIs de e-commerce e testes A/B com foco em conversão.",
        language: "JavaScript",
        topics: ["growth-marketing", "metrics", "data-science", "ui-ux"],
        html_url: `https://github.com/${GITHUB_USERNAME}`,
        homepage: "",
        stargazers_count: 5,
        forks_count: 1
    }
];

// Helper: Format Repository Name to Clean Display Title
function formatProjectTitle(name) {
    return name
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());
}

// Helper: Extract Stack Badges
function extractTechStack(repo) {
    const stack = [];
    if (repo.language) {
        stack.push(repo.language);
    }
    
    if (Array.isArray(repo.topics) && repo.topics.length > 0) {
        repo.topics.forEach(t => {
            const formattedTopic = t.charAt(0).toUpperCase() + t.slice(1);
            if (!stack.includes(formattedTopic) && stack.length < 4) {
                stack.push(formattedTopic);
            }
        });
    }

    if (stack.length < 2) {
        const desc = (repo.description || '').toLowerCase();
        if (desc.includes('react')) stack.push('React');
        else if (desc.includes('css')) stack.push('CSS3');
        else if (desc.includes('api')) stack.push('REST API');
        else stack.push('Clean Code');
    }

    return stack;
}

// Helper: Generate Result / Metric Badge
function generateResultMetric(repo) {
    if (repo.homepage) {
        return {
            label: "Status",
            value: "Em Produção / Live",
            isLive: true
        };
    }
    if (repo.stargazers_count > 0) {
        return {
            label: "Impacto",
            value: `${repo.stargazers_count} GitHub Stars`,
            isLive: false
        };
    }
    return {
        label: "Métrica",
        value: "Performance 100/100",
        isLive: true
    };
}

// Render Bento Cards
function renderProjects(projects, container) {
    if (!projects || projects.length === 0) {
        projects = FALLBACK_PROJECTS;
    }

    container.innerHTML = projects.map(repo => {
        const title = formatProjectTitle(repo.name);
        const stackList = extractTechStack(repo);
        const metric = generateResultMetric(repo);
        const problemDescription = repo.description 
            ? repo.description 
            : "Desenvolvimento de interface com foco em arquitetura de dados, alta fidelidade visual e carregamento instantâneo.";

        return `
        <article class="bento-card fade-in-section" id="repo-${repo.name}">
            <div>
                <!-- 1. TÍTULO DO REPOSITÓRIO -->
                <div class="card-header-row">
                    <h3 class="project-title">
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
                            ${title}
                            <svg class="project-title-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                        </a>
                    </h3>
                </div>

                <!-- 2. O PROBLEMA / DESAFIO -->
                <div class="card-problem-block">
                    <div class="section-micro-label">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="16" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                        O Desafio
                    </div>
                    <p class="project-description">${problemDescription}</p>
                </div>

                <!-- 3. STACK (TAGS MINIMALISTAS) -->
                <div class="card-stack-block">
                    <div class="section-micro-label">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="16 18 22 12 16 6"></polyline>
                            <polyline points="8 6 2 12 8 18"></polyline>
                        </svg>
                        Stack Tecnológica
                    </div>
                    <div class="tech-tags-list">
                        ${stackList.map(tech => `<span class="tech-tag-mono">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>

            <div>
                <!-- 4. RESULTADO / MÉTRICA -->
                <div class="card-metric-block">
                    <div class="metric-item">
                        <span class="metric-status-dot"></span>
                        <span>${metric.label}:</span>
                    </div>
                    <span class="metric-value">${metric.value}</span>
                </div>

                <!-- 5. AÇÕES -->
                <div class="card-actions">
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="btn-card btn-card-code">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                        Código
                    </a>
                    ${repo.homepage ? `
                    <a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" class="btn-card btn-card-demo">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polygon points="10 8 16 12 10 16 10 8"></polygon>
                        </svg>
                        Live Demo
                    </a>` : ''}
                </div>
            </div>
        </article>
        `;
    }).join('');

    initSpotlightEffect();
    initScrollAnimations();
    initProjectsDots();
}

// Pagination Dots Indicator for Mobile & Tablet Projects Slider
function initProjectsDots() {
    const track = document.getElementById("github-cards");
    const dotsContainer = document.getElementById("projects-pagination-dots");

    if (!track || !dotsContainer) return;

    const cards = track.querySelectorAll(".bento-card");
    if (cards.length === 0) {
        dotsContainer.innerHTML = '';
        return;
    }

    // Build dots dynamically based on number of cards
    dotsContainer.innerHTML = Array.from(cards).map((_, idx) => `
        <button type="button" class="pagination-dot ${idx === 0 ? 'is-active' : ''}" data-index="${idx}" aria-label="Ir para o projeto ${idx + 1}" title="Projeto ${idx + 1}"></button>
    `).join('');

    const dots = dotsContainer.querySelectorAll(".pagination-dot");

    // Click handler on dots to smoothly scroll to that specific card
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

    // Update active dot based on scroll position in real-time
    let isTicking = false;
    const updateActiveDot = () => {
        const trackRect = track.getBoundingClientRect();
        let activeIdx = 0;
        let minDiff = Infinity;

        cards.forEach((card, idx) => {
            const cardRect = card.getBoundingClientRect();
            // Calculate distance between card center and track center
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

    // Initial sync
    setTimeout(updateActiveDot, 200);
}

// Fetch GitHub Repos
async function getGitHubRepos() {
    const container = document.getElementById("github-cards");
    if (!container) return;

    // Show initial skeleton loaders
    container.innerHTML = `
        <div class="skeleton-card"></div>
        <div class="skeleton-card"></div>
        <div class="skeleton-card"></div>
    `;

    try {
        const response = await fetch(GITHUB_URL, { headers: { 'Accept': 'application/vnd.github.v3+json' } });
        if (!response.ok) throw new Error("GitHub rate limit or network error");
        
        const repos = await response.json();
        const path = window.location.pathname;
        const isMainPage = !path.includes("projetos");

        const filteredRepos = repos.filter(repo => 
            repo.name.toLowerCase() !== GITHUB_USERNAME.toLowerCase() && 
            !repo.fork
        );

        const listToDisplay = filteredRepos.length > 0 ? filteredRepos : repos;
        const reposToDisplay = isMainPage ? listToDisplay.slice(0, 6) : listToDisplay;

        renderProjects(reposToDisplay, container);
    } catch (error) {
        console.warn("Utilizando dados de projetos locais:", error);
        const path = window.location.pathname;
        const isMainPage = !path.includes("projetos");
        renderProjects(isMainPage ? FALLBACK_PROJECTS : [...FALLBACK_PROJECTS], container);
    }
}

// Spotlight cursor effect on Bento Cards
function initSpotlightEffect() {
    const cards = document.querySelectorAll(".bento-card");
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

// Intersection Observer for Smooth Scroll Fade-ins
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
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    });

    fadeElements.forEach(el => observer.observe(el));
}

// Form Submission Handler
async function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const status = document.getElementById("form-status");
    const button = document.getElementById("form-button");
    const data = new FormData(form);

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
            Enviando mensagem...
        `;
    }

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            status.innerHTML = `<span style="color: var(--accent-emerald);">✔ Mensagem enviada com sucesso! Responderei em breve.</span>`;
            form.reset();
        } else {
            status.innerHTML = `<span style="color: #f87171;">✖ Erro ao enviar mensagem. Tente novamente ou use o WhatsApp/LinkedIn.</span>`;
        }
    } catch (err) {
        status.innerHTML = `<span style="color: #f87171;">✖ Erro na comunicação com o servidor.</span>`;
    } finally {
        if (button) {
            button.disabled = false;
            button.innerHTML = `Enviar Mensagem`;
        }
    }
}

// Bulletproof CV Download Handler: Fetches real PDF binary in-session and triggers local Blob download
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

        // Try Strategy 1: Fetch raw PDF directly
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

        // Try Strategy 2: Fallback to base64 API endpoint
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
            // Direct fallback
            window.location.href = '/download-cv';
        }
    } catch (err) {
        console.error("Falha no download do CV:", err);
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
// THEME MANAGER (Device Auto-Sync + Manual Toggle Persistence)
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
        toggleBtn.setAttribute('title', 'Ativar modo claro (Atualmente: Modo Escuro)');
    } else {
        toggleBtn.setAttribute('aria-label', 'Ativar modo escuro');
        toggleBtn.setAttribute('title', 'Ativar modo escuro (Atualmente: Modo Claro)');
    }
}

function applyTheme(theme, save = false) {
    document.documentElement.setAttribute('data-theme', theme);
    if (save) {
        try {
            localStorage.setItem(THEME_STORAGE_KEY, theme);
        } catch (e) {
            console.warn('Não foi possível salvar preferência de tema no localStorage:', e);
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

    // Real-time listener for device / OS theme changes
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleDeviceThemeChange = (e) => {
            // If user hasn't explicitly set a preference, follow device changes in real-time
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

    // Toggle button click listener
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
// MOBILE MENU CONTROLLER (Hamburger Drawer + Auto-Close on Click)
// ==========================================================================
function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const drawer = document.getElementById('mobile-nav-drawer');

    if (!toggleBtn || !drawer) return;

    const toggleMenu = (open) => {
        const shouldOpen = typeof open === 'boolean' ? open : !drawer.classList.contains('is-open');
        
        if (shouldOpen) {
            drawer.classList.add('is-open');
            toggleBtn.classList.add('is-active');
            toggleBtn.setAttribute('aria-expanded', 'true');
            toggleBtn.setAttribute('aria-label', 'Fechar menu de navegação');
            drawer.setAttribute('aria-hidden', 'false');
        } else {
            drawer.classList.remove('is-open');
            toggleBtn.classList.remove('is-active');
            toggleBtn.setAttribute('aria-expanded', 'false');
            toggleBtn.setAttribute('aria-label', 'Abrir menu de navegação');
            drawer.setAttribute('aria-hidden', 'true');
        }
    };

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close when clicking any nav link
    const mobileLinks = drawer.querySelectorAll('.mobile-nav-link, .mobile-cv-btn');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu(false);
        });
    });

    // Close when clicking outside header
    document.addEventListener('click', (e) => {
        const header = document.getElementById('header-nav');
        if (header && !header.contains(e.target)) {
            toggleMenu(false);
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
            toggleMenu(false);
        }
    });

    // Auto-close on resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && drawer.classList.contains('is-open')) {
            toggleMenu(false);
        }
    }, { passive: true });
}

// App Initialization
document.addEventListener("DOMContentLoaded", () => {
    initThemeSystem();
    initMobileMenu();
    initScrollAnimations();
    getGitHubRepos();

    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", handleFormSubmit);
    }

    // Attach CV download handlers to all CV links across header, hero, and footer
    const cvButtons = document.querySelectorAll('a[href*="cv"], a[id*="cv"], a[download*="cv"], .btn-cv, .mobile-cv-btn');
    cvButtons.forEach(btn => {
        btn.addEventListener('click', handleCvDownload);
    });
});
