#!/usr/bin/env node

import { fetchAndNormalizeSpec, getNavBaseUrl, parseCodegenEnv } from '../../../codegenUtils.js';

/** TODO: Fjern override når prod-spec er tilgjengelig */
const env = parseCodegenEnv();
const base = env === 'prod' ? 'intern.dev.nav.no' : getNavBaseUrl(env);
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

await Promise.all([
    ...specs.map((name) => fetchAndNormalizeSpec(`https://${service}/v3/api-docs/${name}`, `./specs/${name}.json`)),
    fetchAndNormalizeSpec(`https://${service}/v3/api-docs`, './specs/default.json'),
]);
