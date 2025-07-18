#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';
import { execSync } from 'child_process';
import path from 'path';

console.log('🔧 Removing all regex patterns from generated zod files...');

// Find all generated zod files (only zod.gen.ts files)
const files = glob.sync('src/generated/**/zod.gen.ts', { cwd: process.cwd() });

let totalFilesProcessed = 0;
let totalReplacements = 0;

files.forEach((file) => {
    const filePath = path.resolve(file);
    let content = readFileSync(filePath, 'utf8');
    let replacements = 0;

    // Remove ALL .regex() calls in zod files
    // Pattern matches: .regex(/anything/)
    const regexPattern = /\.regex\([^)]*\)/g;

    const matches = content.match(regexPattern);
    if (matches) {
        content = content.replace(regexPattern, ''); // Remove entirely
        replacements = matches.length;

        writeFileSync(filePath, content);
        console.log(`✅ ${file}: ${replacements} regex patterns removed`);
        totalFilesProcessed++;
        totalReplacements += replacements;
    }
});

if (totalReplacements > 0) {
    console.log(`🎉 Done! Removed ${totalReplacements} regex patterns from ${totalFilesProcessed} zod files.`);
} else {
    console.log('ℹ️  No regex patterns found in zod files.');
}

// Format all generated TypeScript files with Prettier
console.log('💄 Formatting all generated TypeScript files...');
try {
    const generatedTsFiles = glob.sync('src/generated/**/*.ts', { cwd: process.cwd() });

    if (generatedTsFiles.length > 0) {
        // Run prettier on all generated TypeScript files
        execSync(`npx prettier --write ${generatedTsFiles.map((f) => `"${f}"`).join(' ')}`, {
            stdio: 'inherit',
            cwd: process.cwd(),
        });
        console.log(`✨ Formatted ${generatedTsFiles.length} TypeScript files`);
    } else {
        console.log('ℹ️  No TypeScript files found to format.');
    }
} catch (error) {
    console.warn('⚠️  Warning: Could not format files with Prettier:', error.message);
}
