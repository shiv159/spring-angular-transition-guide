const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src', 'app', 'transition-topics.ts');
let content = fs.readFileSync(targetPath, 'utf8');

content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
content = content.replace(/`(.*?)`/g, '<code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">$1</code>');

fs.writeFileSync(targetPath, content, 'utf8');
console.log('Descriptions updated.');
