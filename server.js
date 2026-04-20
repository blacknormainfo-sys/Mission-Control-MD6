// ============================================================
// MISSION CONTROL MD6 — STATIC SERVER
// ============================================================
// Minimal Express server that serves the single-file frontend
// from the /public directory. No backend logic, no database —
// the app uses browser localStorage for persistence.
// ============================================================

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Security & basic middleware
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Serve static assets from /public
app.use(express.static(path.join(__dirname, 'public'), {
  etag: true,
  lastModified: true,
  maxAge: '1h'
}));

// Health check for Render / uptime monitors
app.get('/healthz', (req, res) => {
  res.json({
    status: 'operational',
    unit: 'MD6',
    timestamp: new Date().toISOString()
  });
});

// Fallback to index.html for unknown routes (future SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`\n╔══════════════════════════════════════════╗`);
  console.log(`║  MISSION CONTROL MD6 — OPERATIONAL       ║`);
  console.log(`║  Listening on http://${HOST}:${PORT}          ║`);
  console.log(`║  ${new Date().toISOString()}      ║`);
  console.log(`╚══════════════════════════════════════════╝\n`);
});
