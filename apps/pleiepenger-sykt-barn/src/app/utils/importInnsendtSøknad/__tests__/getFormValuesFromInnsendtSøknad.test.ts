import { importerSøknad } from '../importSøknad';

describe('getFormValuesFromInnsendtSøknad', () => {
    it('returnerer undefined dersom det ikke er noen registrerte barn på søker', () => {
        expect(importerSøknad({} as any, [])).toBeUndefined();
    });
});
