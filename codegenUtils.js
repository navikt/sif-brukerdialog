/* eslint-disable no-undef */
import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';
import path from 'path';

const PATTERNS = {
    removeZodRegex: {
        pattern: /\.regex\([^)]*\)/g,
        replacement: '',
        description: 'regex patterns removed',
    },

    /** Erstatter @ts-expect-error med @ts-ignore */
    fixTsExpectError: {
        pattern: /\/\/\s*@ts-expect-error/g,
        replacement: '// @ts-ignore',
        description: '@ts-expect-error replaced with @ts-ignore',
    },

    /** Fjerner @ts-expect-error som står rett etter en asynkron arrow function
     * Denne har ingen effekt hvis fixTsExpectError også kjøres
     */
    fixTsExpectErrorAfterArrowFunction: {
        pattern: /(\s*const\s+\w+\s*:\s*[^=]+=\s*async\s*\([^)]*\)\s*=>\s*{\s*)\n\s*\/\/ @ts-expect-error\s*\n/g,
        replacement: '$1\n',
        description: '@ts-expect-error after arrow function removed',
    },
};

export function fixGeneratedCode(globPath) {
    const cwd = process.cwd();
    const patterns = PATTERNS;

    const globPattern = `${globPath}/**/*.gen.ts`;
    const allFiles = glob.sync(globPattern, { cwd });

    let totalFilesProcessed = 0;
    const patternStats = {};

    Object.keys(patterns).forEach((key) => {
        patternStats[key] = 0;
    });

    allFiles.forEach((file) => {
        const filePath = path.resolve(cwd, file);
        let content = readFileSync(filePath, 'utf8');
        let hasChanges = false;

        Object.entries(patterns).forEach(([patternKey, config]) => {
            const { pattern, replacement } = config;

            const matches = content.match(pattern);

            if (matches) {
                content = content.replace(pattern, replacement);
                const count = matches.length;
                patternStats[patternKey] += count;
                hasChanges = true;
            }
        });

        if (hasChanges) {
            writeFileSync(filePath, content);
            totalFilesProcessed++;
        }
    });

    const summaryParts = [];
    Object.entries(patternStats).forEach(([key, count]) => {
        if (count > 0) {
            summaryParts.push(`${count} ${patterns[key].description}`);
        }
    });

    const summary = {
        totalFilesProcessed,
        patternStats,
        summaryParts,
    };

    return summary;
}

export function formatGeneratedFiles(globPath) {
    const cwd = process.cwd();

    const globPattern = `${globPath}/**/*.ts`;
    const files = glob.sync(globPattern, { cwd });

    if (files.length === 0) {
        return;
    }

    execSync(`npx prettier --write ${files.map((f) => `"${f}"`).join(' ')}`, {
        stdio: 'pipe',
        cwd,
    });

    execSync(`yarn lint:fix`, {
        stdio: 'pipe',
        cwd,
    });
}

export function fixAndFormatGeneratedCode(globPath) {
    const summary = fixGeneratedCode(globPath);
    formatGeneratedFiles(globPath);
    return summary;
}
