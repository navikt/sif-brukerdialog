#!/usr/bin/env node

import { fixAndFormatGeneratedCode } from '../../../codegenUtils.js';

fixAndFormatGeneratedCode('src/ung-brukerdialog-api', {
    patterns: {
        prefixEksternApiUrls: {
            pattern: /url:\s*'\/ekstern\/api/g,
            replacement: "url: '/ung/brukerdialog/ekstern/api",
            description: 'SDK urls prefixed with /ung/brukerdialog',
        },
    },
});
