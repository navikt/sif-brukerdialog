#!/usr/bin/env node

import { mkdirSync } from 'fs';

import { fetchAndNormalizeSpec, getNavBaseUrl, parseCodegenEnv } from '../../../codegenUtils.js';

/** TODO: Fjern override når prod-spec er tilgjengelig */
const base = parseCodegenEnv() === 'prod' ? 'intern.dev.nav.no' : getNavBaseUrl(parseCodegenEnv());
const service = `k9-brukerdialog-prosessering.${base}`;

const specs = [
    'aktivitetspenger',
    'omsorgspenger-kronisk-sykt-barn',
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
