/**
 *
 * Start opp app og hent ut appMessages fra i18/index.tsx. Lagre dem som messages.json i i18n-mappen.
 * Kjør node findUnusedIntlKeys.cjs for å finne ubrukte keys i messages.json.
 */

const fs = require('fs');
const path = require('path');

// Path to your messages.json and source directory
const MESSAGES_PATH = './src/app/i18n/messages.json';
const SOURCE_PATH = './src';

// Read the messages file
const messages = require(MESSAGES_PATH);
const keys = Object.keys(messages);

// Function to recursively search through files
function searchFiles(dir, key) {
    const files = fs.readdirSync(dir);
    if (dir === 'src/app/i18n') {
        return;
    }

    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            // Recursively search in directories
            if (searchFiles(fullPath, key)) {
                return true; // Return true immediately if key is found
            }
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes(key)) {
                return true; // Key found in file
            }
        }
    }
    return false; // Key not found in this directory
}

// Check each key
const unusedKeys = keys.filter((key) => !searchFiles(SOURCE_PATH, key));
// eslint-disable-next-line no-console
console.log('Unused keys:', unusedKeys.slice(0));
