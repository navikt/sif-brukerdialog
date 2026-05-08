#!/usr/bin/env node

import { fetchAndNormalizeSpec, getNavBaseUrl, parseCodegenEnv } from '../../../codegenUtils.js';

const base = getNavBaseUrl(parseCodegenEnv());

await fetchAndNormalizeSpec(`https://sif-innsyn-api.${base}/v3/api-docs`, './openapi-spec.json');
