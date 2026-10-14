import { ISODateToDate } from '@navikt/sif-common-utils';

import { AARegArbeidsgiverOrganisasjon } from '../../api/endpoints/arbeidsgivereEndpoint';
import { ArbeidsgiverMedAnsettelseperioder } from '../../types';
import { getArbeidsgivereFromArbeidsgiverOrganisasjoner } from '../../utils/initialDataUtils';

describe('initialDataUtils', () => {
    describe('getArbeidsgivereFromArbeidsgiverOrganisasjoner', () => {
        it('oppretter ansettelsesperiode riktig når bruker har ett ansettelsesforhold hos én arbeidsgiver', () => {
            const organisasjoner: AARegArbeidsgiverOrganisasjon[] = [
                {
                    navn: 'a',
                    organisasjonsnummer: '123',
                    ansattFom: '2022-01-01',
                    ansattTom: '2022-02-01',
                },
            ];

            const expectedResult: ArbeidsgiverMedAnsettelseperioder[] = [
                {
                    key: 'a_123',
                    navn: 'a',
                    organisasjonsnummer: '123',
                    ansettelsesperioder: [{ from: ISODateToDate('2022-01-01'), to: ISODateToDate('2022-02-01') }],
                },
            ];
            expect(getArbeidsgivereFromArbeidsgiverOrganisasjoner(organisasjoner)).toEqual(expectedResult);
        });
        it('oppretter ansettelsesperioder riktig når bruker har to ansettelsesforhold hos samme arbeidsgiver', () => {
            const organisasjoner: AARegArbeidsgiverOrganisasjon[] = [
                {
                    navn: 'a',
                    organisasjonsnummer: '123',
                    ansattFom: '2022-01-01',
                    ansattTom: '2022-02-01',
                },
                {
                    navn: 'a',
                    organisasjonsnummer: '123',
                    ansattFom: '2022-02-15',
                },
            ];
            const expectedResult: ArbeidsgiverMedAnsettelseperioder[] = [
                {
                    key: 'a_123',
                    navn: 'a',
                    organisasjonsnummer: '123',
                    ansettelsesperioder: [
                        { from: ISODateToDate('2022-01-01'), to: ISODateToDate('2022-02-01') },
                        { from: ISODateToDate('2022-02-15') },
                    ],
                },
            ];
            expect(getArbeidsgivereFromArbeidsgiverOrganisasjoner(organisasjoner)).toEqual(expectedResult);
        });
    });
});
