import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

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

// Clean URLs matching original routing
app.get('/projetos', (req, res) => {
  res.sendFile(path.join(__dirname, 'projetos.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve static directory files
app.use(express.static(__dirname));

// Fallback for SPA/direct navigation
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Portfolio server running on http://0.0.0.0:${PORT}`);
});
