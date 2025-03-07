import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const directoryPath = path.join(__dirname, '../src/generated/schemas');

const importStatementToAdd =
    "/** Imported types added by fixNativeEnums */\nimport { Oppgavetype, OppgaveStatus } from '../endpoints/ungdomprogramregisterAPI';\n";

const replacements = [
    {
        source: "zod.enum(['BEKREFT_ENDRET_STARTDATO', 'BEKREFT_ENDRET_SLUTTDATO'])",
        replacement: 'zod.nativeEnum(Oppgavetype)',
    },
    {
        source: "zod.enum(['LØST', 'ULØST'])",
        replacement: 'zod.nativeEnum(OppgaveStatus)',
    },
];

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    files.forEach((file) => {
        const filePath = path.join(directoryPath, file);
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return console.log(err);
            }

            let result = data;
            replacements.forEach(({ source, replacement }) => {
                result = result.split(source).join(replacement);
            });

            // Legg til importStatementToAdd øverst i filen
            if (!result.includes(importStatementToAdd)) {
                result = `${importStatementToAdd}\n${result}`;
            }

            fs.writeFile(filePath, result, 'utf8', (err) => {
                if (err) return console.log(err);
            });
        });
        console.log('Fixed enums in ' + file);
    });
});
