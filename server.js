import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Enable JSON parsing middleware for CAPI requests
app.use(express.json());

// Helper function to hash user fields using SHA256 as required by Meta Ads API
function sha256(text) {
  if (!text) return null;
  return crypto.createHash('sha256').update(text.trim().toLowerCase()).digest('hex');
}

// Meta Ads CAPI Config
const META_PIXEL_ID = '1544310170830189';
const META_ACCESS_TOKEN = process.env.META_ADS_ACCESS_TOKEN || 'EABfBOCvLqvEBSupExHadryKiVZCjOFXqKZCqo1QbI4xsL20W5kypyXdtsDpU4ZB7TveHwBFVwVp8LfUO7oYsYtNGKYG3ZCgr6g3vrDncKEPSZAm72o37loxru9HwgSKgAYry5eEZCwR8wRE6UVaR4fgzCGJjAUFUZCrkyIVQEU5HsyZANlvjZBiYRssUq3OEPmQZDZD';

// Server-side endpoint for Meta Conversions API (CAPI) to prevent token leakage on client-side
app.post('/api/submit-lead', async (req, res) => {
  const { name, whatsapp, company, objective, message } = req.body;

  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const ua = req.headers['user-agent'] || '';
    const normalizedPhone = whatsapp ? whatsapp.replace(/\D/g, '') : '';

    const payload = {
      data: [
        {
          event_name: 'Lead',
          event_time: Math.floor(Date.now() / 1000),
          event_source_url: req.headers.referer || 'https://rubenmassuquetto.com/',
          action_source: 'website',
          user_data: {
            client_ip_address: ip,
            client_user_agent: ua,
            fn: name ? [sha256(name.split(' ')[0])] : [],
            ph: normalizedPhone ? [sha256(normalizedPhone)] : []
          },
          custom_data: {
            content_name: objective,
            company_name: company,
            message: message
          }
        }
      ]
    };

    const capiUrl = `https://graph.facebook.com/v18.0/${META_PIXEL_ID}/events?access_token=${META_ACCESS_TOKEN}`;
    const capiRes = await fetch(capiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const capiData = await capiRes.json();
    console.log('[Meta Conversions API] Resposta recebida:', capiData);

    res.json({ success: true, capi: capiData });
  } catch (err) {
    console.error('[Meta Conversions API] Erro ao enviar evento de Lead:', err.message);
    res.json({ success: false, error: err.message });
  }
});

// Path to CV file
const cvPath = path.join(__dirname, 'cv', 'cv-ruben-massuquetto.pdf');

// API endpoint returning Base64 for guaranteed clean client-side download without proxy interference
app.get('/api/cv-base64', (req, res) => {
  try {
    if (fs.existsSync(cvPath)) {
      const fileBuffer = fs.readFileSync(cvPath);
      const base64 = fileBuffer.toString('base64');
      res.json({
        success: true,
        filename: 'cv-ruben-massuquetto.pdf',
        mimeType: 'application/pdf',
        size: fileBuffer.length,
        base64: base64
      });
    } else {
      res.status(404).json({ error: 'CV file not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error reading CV file' });
  }
});

// Serve PDF with explicit binary stream headers
app.get(['/cv/cv-ruben-massuquetto.pdf', '/cv.pdf', '/download-cv'], (req, res) => {
  if (fs.existsSync(cvPath)) {
    const stat = fs.statSync(cvPath);
    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Length': stat.size,
      'Content-Disposition': 'attachment; filename="cv-ruben-massuquetto.pdf"',
      'Cache-Control': 'public, max-age=3600'
    });
    const readStream = fs.createReadStream(cvPath);
    readStream.pipe(res);
  } else {
    res.status(404).send('Arquivo de currículo não encontrado.');
  }
});

// Cache inteligente em memória para resposta instantânea e atualização automática
let cachedRepos = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 25 * 1000; // 25 segundos para refletir alterações recentes no GitHub

// Garante que qualquer novo repositório subido no GitHub receba screenshot salvo localmente
async function ensureRepoScreenshot(repo) {
  const slug = (repo.name || '').toLowerCase().replace(/_/g, '-');
  const filename = `${slug}.png`;
  const assetsDir = path.join(__dirname, 'assets', 'screenshots');
  const assetsFilePath = path.join(assetsDir, filename);

  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  if (fs.existsSync(assetsFilePath)) {
    return `./assets/screenshots/${filename}`;
  }

  // Tenta capturar screenshot dinamicamente se o repositório tiver homepage
  const liveUrl = (repo.homepage && repo.homepage.trim() !== '') ? repo.homepage : repo.html_url;
  try {
    const mUrl = 'https://api.microlink.io/?url=' + encodeURIComponent(liveUrl) + '&screenshot=true&meta=false&viewport.width=1280&viewport.height=760&viewport.deviceScaleFactor=1&waitForTimeout=2000';
    const res = await fetch(mUrl);
    if (res.ok) {
      const data = await res.json();
      const imgUrl = data.data?.screenshot?.url;
      if (imgUrl) {
        const imgRes = await fetch(imgUrl);
        if (imgRes.ok) {
          const buf = Buffer.from(await imgRes.arrayBuffer());
          fs.writeFileSync(assetsFilePath, buf);
          console.log(`[Auto-Sync GitHub] Nova captura salva com sucesso para: ${repo.name}`);
          return `./assets/screenshots/${filename}`;
        }
      }
    }
  } catch (err) {
    console.warn(`[Auto-Sync GitHub] Tentativa de screenshot dinâmico de ${repo.name}:`, err.message);
  }

  // Fallback: GitHub OpenGraph oficial para repositório novo
  try {
    const ogUrl = `https://opengraph.githubassets.com/1/rubenmassuquetto1999/${repo.name}`;
    const ogRes = await fetch(ogUrl);
    if (ogRes.ok) {
      const buf = Buffer.from(await ogRes.arrayBuffer());
      fs.writeFileSync(assetsFilePath, buf);
      return `./assets/screenshots/${filename}`;
    }
  } catch (e) {}

  return `./assets/screenshots/ruben-massuquetto-site.png`;
}

// Endpoint de sincronização automática com o GitHub (qualquer alteração no GitHub reflete aqui)
app.get('/api/github-repos', async (req, res) => {
  const now = Date.now();
  const force = req.query.force === 'true';

  if (!force && cachedRepos && (now - lastFetchTime < CACHE_TTL_MS)) {
    return res.json({ repos: cachedRepos, cached: true, timestamp: lastFetchTime });
  }

  try {
    const ghRes = await fetch('https://api.github.com/users/rubenmassuquetto1999/repos?sort=pushed&per_page=30', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (RubenMassuquetto-AutoSync)',
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (ghRes.ok) {
      const allRepos = await ghRes.json();
      if (Array.isArray(allRepos)) {
        const filtered = allRepos.filter(r => 
          r.name.toLowerCase() !== 'rubenmassuquetto1999' && !r.fork
        );

        // Processa as prévias de cada repositório
        const processed = await Promise.all(filtered.map(async (r) => {
          const preview = await ensureRepoScreenshot(r);
          return {
            id: r.id,
            name: r.name,
            description: r.description,
            homepage: r.homepage,
            html_url: r.html_url,
            pushed_at: r.pushed_at,
            updated_at: r.updated_at,
            previewImage: preview
          };
        }));

        cachedRepos = processed;
        lastFetchTime = now;
        return res.json({ repos: cachedRepos, cached: false, timestamp: lastFetchTime });
      }
    }
  } catch (e) {
    console.error('[API GitHub] Erro ao sincronizar com GitHub:', e.message);
  }

  if (cachedRepos) {
    return res.json({ repos: cachedRepos, cached: true, fallback: true });
  }

  res.status(500).json({ error: 'Erro ao consultar GitHub API' });
});

// Webhook para invalidação instantânea de cache quando o GitHub disparar evento push
app.post(['/api/github-webhook', '/webhook/github'], (req, res) => {
  console.log('[Webhook GitHub] Evento de push recebido! Invalidando cache para atualização imediata.');
  cachedRepos = null;
  lastFetchTime = 0;
  res.json({ success: true, message: 'Cache do GitHub invalidado com sucesso' });
});

// Serve SEO & GEO files with exact content types for search engines and AI agents
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.sendFile(path.join(__dirname, 'robots.txt'));
});

app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  res.sendFile(path.join(__dirname, 'sitemap.xml'));
});

app.get('/llms.txt', (req, res) => {
  res.type('text/plain');
  res.sendFile(path.join(__dirname, 'llms.txt'));
});

// Clean URLs matching original routing
app.get('/projetos', (req, res) => {
  res.sendFile(path.join(__dirname, 'projetos.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve screenshots from assets/screenshots
app.use('/screenshots', express.static(path.join(__dirname, 'assets', 'screenshots')));

// Serve static directory files
app.use(express.static(__dirname));

// Fallback for SPA/direct navigation
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Portfolio server running on http://0.0.0.0:${PORT}`);
});
