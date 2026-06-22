import { rmSync, existsSync } from 'fs';
import { glob } from 'glob';

const foldersToDelete = [
    '.turbo',
    'dist',
    'dist-playwright',
    'playwright-report',
    'test-results',
    'coverage',
    'storybook-static',
];

const searchPaths = ['apps', 'apps-intern', 'packages'];

const filePatterns = searchPaths.map((base) => `${base}/**/openapi-ts-error-*.log`).concat('openapi-ts-error-*.log');

async function cleanOutputFolders() {
    const patterns = searchPaths.flatMap((base) => foldersToDelete.map((folder) => `${base}/**/${folder}`));

    const matches = await glob(patterns, { onlyDirectories: true });

    if (matches.length === 0) {
        console.log('Ingen output-mapper funnet.');
    } else {
        console.log(`Sletter ${matches.length} mapper:\n`);
    }

    for (const match of matches) {
        if (existsSync(match)) {
            console.log(`  🗑️  ${match}`);
            rmSync(match, { recursive: true, force: true });
        }
    }

    const fileMatches = await glob(filePatterns);

    if (fileMatches.length > 0) {
        console.log(`\nSletter ${fileMatches.length} loggfiler:\n`);
        for (const match of fileMatches) {
            if (existsSync(match)) {
                console.log(`  🗑️  ${match}`);
                rmSync(match, { force: true });
            }
        }
    }

    console.log('\n✅ Ferdig!');
}

cleanOutputFolders();
