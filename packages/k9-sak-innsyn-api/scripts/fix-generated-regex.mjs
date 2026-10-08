#!/usr/bin/env node

import { fixAndFormatGeneratedCode } from '../../../scripts/codegen/codegenUtils.js';

fixAndFormatGeneratedCode('src/generated');
