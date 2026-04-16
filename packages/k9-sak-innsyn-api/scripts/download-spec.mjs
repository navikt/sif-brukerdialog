#!/usr/bin/env node

import { fetchAndNormalizeSpec, getNavBaseUrl, parseCodegenEnv } from '../../../codegenUtils.js';

const base = getNavBaseUrl(parseCodegenEnv());
const service = `k9-sak-innsyn-api.${base}`;

await Promise.all([
    fetchAndNormalizeSpec(`https://${service}/v3/api-docs/innsyn`, './specs/innsyn.json'),
    fetchAndNormalizeSpec(`https://${service}/v3/api-docs/k9-sak`, './specs/k9-sak.json'),
]);
