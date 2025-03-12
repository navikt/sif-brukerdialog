import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const directoryPath = path.join(__dirname, '../src/client');

// const importStatementToAdd =
//     "/** Imported types added by fixNativeEnums */\nimport { Oppgavetype, OppgaveStatus } from '../endpoints/ungdomprogramregisterAPI';\n";

const replacements = [
    {
        source: `z.string().regex(/^[\p{Graph}\p{Space}\p{Sc}\p{L}\p{M}\p{N}]+$/)`,
        replacement: 'z.string()',
    },
    {
        source: `type: 'EndretSluttdatoUngdomsytelseOppgaveDTO';`,
        replacement: `type: 'BEKREFT_ENDRET_SLUTTDATO';`,
    },
    {
        source: "type: z.literal('EndretSluttdatoUngdomsytelseOppgaveDTO'),",
        replacement: `type: z.literal('BEKREFT_ENDRET_SLUTTDATO'),`,
    },
    {
        source: `type: 'EndretStartdatoUngdomsytelseOppgaveDTO';`,
        replacement: `type: 'BEKREFT_ENDRET_STARTDATO';`,
    },
    {
        source: "type: z.literal('EndretStartdatoUngdomsytelseOppgaveDTO'),",
        replacement: `type: z.literal('BEKREFT_ENDRET_STARTDATO'),`,
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
                result = result.replace(source, replacement);
            });

            // Legg til importStatementToAdd øverst i filen
            // if (!result.includes(importStatementToAdd)) {
            //     result = `${importStatementToAdd}\n${result}`;
            // }

            fs.writeFile(filePath, result, 'utf8', (err) => {
                if (err) return console.log(err);
            });
        });
        console.log('Fix run in ' + file);
    });
});
