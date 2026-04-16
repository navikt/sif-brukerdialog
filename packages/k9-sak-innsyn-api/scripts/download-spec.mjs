#!/usr/bin/env node

import { mkdirSync } from 'fs';
import { fetchAndNormalizeSpec, parseCodegenEnv, getNavBaseUrl } from '../../../codegenUtils.js';

const base = getNavBaseUrl(parseCodegenEnv());
const service = `k9-sak-innsyn-api.${base}`;

mkdirSync('./specs', { recursive: true });

await Promise.all([
    fetchAndNormalizeSpec(`https://${service}/v3/api-docs/innsyn`, './specs/innsyn.json'),
    fetchAndNormalizeSpec(`https://${service}/v3/api-docs/k9-sak`, './specs/k9-sak.json'),
]);
