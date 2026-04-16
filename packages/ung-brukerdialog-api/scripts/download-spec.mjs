#!/usr/bin/env node

import { fetchAndNormalizeSpec, getNavBaseUrl, parseCodegenEnv } from '../../../codegenUtils.js';

const base = getNavBaseUrl(parseCodegenEnv());

await fetchAndNormalizeSpec(
    `https://ung-brukerdialog-api.${base}/ung/brukerdialog/ekstern/api/openapi.json`,
    './openapi-spec.json',
);
