// This is a test file to validate exports work correctly
// It should be deleted after testing

import {
    Friteksfelt,
    // Query keys
    sifCommonQueryKeys,
} from './index';

// Test that types can be used
const friteksfelt: Friteksfelt = { verdi: 'test' };
const queryKeys = sifCommonQueryKeys.validerFritekst;

console.log('All exports work correctly');
