#!/usr/bin/env node

import { fetchAndNormalizeSpec, parseCodegenEnv, getNavBaseUrl } from '@sif/codegen';

const base = getNavBaseUrl(parseCodegenEnv());

await fetchAndNormalizeSpec(`https://ung-deltakelse-opplyser.${base}/v3/api-docs/veileder`, './openapi-spec.json');
