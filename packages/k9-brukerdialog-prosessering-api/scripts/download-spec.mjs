#!/usr/bin/env node

import { mkdirSync } from 'fs';

import { fetchAndNormalizeSpec } from '../../../codegenUtils.js';

/** I påvente av at prod-spec ikke er tilgjengelig enda brukes alltid dev her */
const service = `k9-brukerdialog-prosessering.intern.dev.nav.no`;

const specs = [
    'aktivitetspenger',
    'omsorgspenger',
    'ungdomsytelse',
    'ettersendelse',
    'omsorgspenger-aleneomsorg',
    'omsorgspenger-midlertidig-alene',
    'omsorgspengerutbetaling-arbeidstaker',
    'omsorgspengerutbetaling-snf',
    'opplaeringspenger',
    'pleiepenger-livets-sluttfase',
    'pleiepenger-sykt-barn-endringsmelding',
    'pleiepenger-sykt-barn-soknad',
];

mkdirSync('./specs', { recursive: true });

await Promise.all([
    ...specs.map((name) => fetchAndNormalizeSpec(`https://${service}/v3/api-docs/${name}`, `./specs/${name}.json`)),
    fetchAndNormalizeSpec(`https://${service}/v3/api-docs`, './specs/default.json'),
]);
