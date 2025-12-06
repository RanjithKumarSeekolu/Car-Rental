const fs = require('fs');
const path = require('path');

function renameJsToJsx(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(dir, item.name);

        if (item.isDirectory()) {
            renameJsToJsx(fullPath);
        } else if (item.isFile()) {
            const ext = path.extname(item.name);
            if (ext === '.js') {
                const newPath = path.join(dir, item.name.replace(/\.js$/, '.jsx'));
                fs.renameSync(fullPath, newPath);
                console.log(`Renamed: ${fullPath} → ${newPath}`);
            }
        }
    }
}

// ---- RUN SCRIPT ----
// Change this to the directory you want to process:
const targetDirectory = '/Users/ranjiths_500376/Documents/Personal/Personal_Files/projects/car-rental-frontend/src/components';

console.log(`Processing directory: ${targetDirectory}`);
renameJsToJsx(targetDirectory);
console.log('Done!');
