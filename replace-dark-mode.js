const fs = require('fs');
const path = require('path');

const dirsToSearch = ['app', 'components'];
const projectRoot = 'c:\\Projects\\BharatElectronics';

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            // Only replace whole words (using regex boundaries or just simple replace for classnames)
            // It's safer to just replace standard class names globally.
            // Some might already have dark: variants, so let's only replace if it doesn't already have one?
            // Actually, simple replace is okay if we know they aren't dark: yet. We can check if `dark:` exists.
            
            content = content.replace(/(?<!dark:)bg-white/g, 'bg-white dark:bg-slate-900');
            content = content.replace(/(?<!dark:)border-slate-200/g, 'border-slate-200 dark:border-slate-800');
            content = content.replace(/(?<!dark:)text-slate-900/g, 'text-slate-900 dark:text-slate-50');
            content = content.replace(/(?<!dark:)text-slate-800/g, 'text-slate-800 dark:text-slate-200');
            content = content.replace(/(?<!dark:)text-slate-600/g, 'text-slate-600 dark:text-slate-400');
            content = content.replace(/(?<!dark:)text-slate-500/g, 'text-slate-500 dark:text-slate-400');
            content = content.replace(/(?<!dark:)bg-slate-50(?!0)/g, 'bg-slate-50 dark:bg-slate-800/50');
            content = content.replace(/(?<!dark:)bg-slate-100/g, 'bg-slate-100 dark:bg-slate-800');
            content = content.replace(/(?<!dark:)text-slate-950/g, 'text-slate-950 dark:text-slate-50');
            
            // Revert double replacements if any
            content = content.replace(/dark:bg-slate-900 dark:bg-slate-900/g, 'dark:bg-slate-900');
            
            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Updated ' + fullPath);
            }
        }
    }
}

for (const dir of dirsToSearch) {
    processDirectory(path.join(projectRoot, dir));
}
console.log('Done');
