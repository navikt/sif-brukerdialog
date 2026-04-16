#!/usr/bin/env node

import { fetchAndNormalizeSpec, getNavBaseUrl, parseCodegenEnv } from '../../../codegenUtils.js';

const base = getNavBaseUrl(parseCodegenEnv());

await fetchAndNormalizeSpec(`https://k9-sak-innsyn-api.${base}/v3/api-docs/k9-sak`, './openapi-spec.json');
