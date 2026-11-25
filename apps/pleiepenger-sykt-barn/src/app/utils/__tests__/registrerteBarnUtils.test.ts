import type { RegistrertBarn } from '@navikt/sif-common-api';

import { fjernTvetydigeRegistrerteBarn } from '../registrerteBarnUtils';

const createBarn = (
    aktørId: string,
    fornavn: string,
    fødselsdato: string,
    etternavn = 'Nordmann',
): RegistrertBarn => ({
    aktørId,
    fornavn,
    etternavn,
    fødselsdato: new Date(fødselsdato),
});

describe('registrerteBarnUtils', () => {
    it('beholder barn som har entydig navn og fødselsdato', () => {
        const barn = [
            createBarn('1', 'Ukjent navn', '2026-01-01'),
            createBarn('2', 'Kari', '2026-01-01'),
            createBarn('3', 'Ukjent navn', '2026-01-02'),
        ];

        expect(fjernTvetydigeRegistrerteBarn(barn)).toEqual(barn);
    });

    it('fjerner alle barn med samme navn og fødselsdato', () => {
        const tvetydigeBarn = [
            createBarn('1', 'Ukjent navn', '2026-01-01'),
            createBarn('2', 'Ukjent navn', '2026-01-01'),
        ];
        const entydigBarn = createBarn('3', 'Kari', '2026-01-02');

        expect(fjernTvetydigeRegistrerteBarn([...tvetydigeBarn, entydigBarn])).toEqual([entydigBarn]);
    });
});
