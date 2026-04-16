/* eslint-disable no-undef */
import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';
import path from 'path';

function sortKeysDeep(obj) {
    if (Array.isArray(obj)) {
        return obj.map(sortKeysDeep);
    }
    if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj)
            .sort()
            .reduce((acc, key) => {
                acc[key] = sortKeysDeep(obj[key]);
                return acc;
            }, {});
    }
    return obj;
}

export function parseCodegenEnv() {
    const value = process.env.CODEGEN_ENV;
    if (value === 'prod') return 'prod';
    if (value === 'dev' || value === undefined) return 'dev';
    throw new Error(`Invalid CODEGEN_ENV: '${value}'. Must be 'dev' or 'prod'.`);
}

export function getNavBaseUrl(env) {
    return env === 'dev' ? 'intern.dev.nav.no' : 'intern.nav.no';
}

export async function fetchAndNormalizeSpec(url, outputPath) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch spec from ${url}: ${response.status}`);
    }
    const spec = await response.json();
    const sorted = sortKeysDeep(spec);
    writeFileSync(outputPath, JSON.stringify(sorted, null, 2) + '\n');
}

const PATTERNS = {
    removeZodRegex: {
        pattern: /\.regex\([^)]*\)/g,
        replacement: '',
        description: 'regex patterns removed',
    },

    /** Fjerner hardkodet URL fra baseURL-typen, beholder kun (string & {}) */
    removeBaseUrlLiteral: {
        pattern: /baseURL: '[^']+' \| \(string & \{\}\);/g,
        replacement: 'baseURL: string & {};',
        description: 'baseURL URL literal removed',
    },

    /** Erstatter @ts-expect-error med @ts-ignore */
    fixTsExpectError: {
        pattern: /\/\/\s*@ts-expect-error/g,
        replacement: '// @ts-ignore',
        description: '@ts-expect-error replaced with @ts-ignore',
    },

    /** Utvider z.iso.datetime() til å støtte local fordi vi ikke alltid får dette fra backend */
    fixIsoDateTimeAllowLocal: {
        pattern: /z\.iso\.datetime\(\)/g,
        replacement: 'z.iso.datetime({ local: true })',
        description: 'z.iso.datetime() expanded to allow local',
    },

    /** Fjerner @ts-expect-error som står rett etter en asynkron arrow function
     * Denne har ingen effekt hvis fixTsExpectError også kjøres
     */
    fixTsExpectErrorAfterArrowFunction: {
        pattern: /(\s*const\s+\w+\s*:\s*[^=]+=\s*async\s*\([^)]*\)\s*=>\s*{\s*)\n\s*\/\/ @ts-expect-error\s*\n/g,
        replacement: '$1\n',
        description: '@ts-expect-error after arrow function removed',
    },

    /** Fikser feil Zod-type for vedlegg-felter: format: binary genereres som z.string()
     * men skal være z.instanceof(Blob) for å ikke feile synkront ved filopplasting
     */
    fixVedleggBlobType: {
        pattern: /vedlegg: z\.string\(\)/g,
        replacement: 'vedlegg: z.instanceof(Blob)',
        description: 'vedlegg z.string() fixed to z.instanceof(Blob)',
    },
};

export function fixGeneratedCode(globPath, extraPatterns = {}) {
    const cwd = process.cwd();
    const patterns = { ...PATTERNS, ...extraPatterns };

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

export function fixAndFormatGeneratedCode(globPath, { patterns: extraPatterns = {} } = {}) {
    const summary = fixGeneratedCode(globPath, extraPatterns);
    formatGeneratedFiles(globPath);
    return summary;
}
