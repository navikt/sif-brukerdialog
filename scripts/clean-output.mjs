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

async function cleanOutputFolders() {
    const patterns = searchPaths.flatMap((base) => foldersToDelete.map((folder) => `${base}/**/${folder}`));

    const matches = await glob(patterns, { onlyDirectories: true });

    if (matches.length === 0) {
        console.log('Ingen output-mapper funnet.');
        return;
    }

    console.log(`Sletter ${matches.length} mapper:\n`);

    for (const match of matches) {
        if (existsSync(match)) {
            console.log(`  🗑️  ${match}`);
            rmSync(match, { recursive: true, force: true });
        }
    }

    console.log('\n✅ Ferdig!');
}

cleanOutputFolders();
