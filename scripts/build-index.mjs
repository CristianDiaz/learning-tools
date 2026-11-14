// Recorre apps/*/index.html y genera apps.json.
// Nombre: <title>. Emoji: <meta name="app-emoji" content="🕐"> (opcional).
import { readdirSync, readFileSync, existsSync, writeFileSync } from 'node:fs';

const apps = readdirSync('apps', { withFileTypes: true })
  .filter(d => d.isDirectory() && existsSync(`apps/${d.name}/index.html`))
  .map(d => {
    const html = readFileSync(`apps/${d.name}/index.html`, 'utf8');
    const title = html.match(/<title>([^<]*)<\/title>/i)?.[1].trim();
    const emoji = html.match(/<meta\s+name=["']app-emoji["']\s+content=["']([^"']+)["']/i)?.[1];
    return { name: title || d.name, emoji: emoji || '⭐', path: `apps/${d.name}/` };
  })
  .sort((a, b) => a.name.localeCompare(b.name, 'es'));

writeFileSync('apps.json', JSON.stringify(apps, null, 2) + '\n');
console.log(`apps.json: ${apps.length} apps`);
