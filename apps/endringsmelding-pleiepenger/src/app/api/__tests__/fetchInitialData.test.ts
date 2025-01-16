import { ISODateRangeToDateRange, ISODateToDate, dateToISODate } from '@navikt/sif-common-utils';
import {
    getArbeidsgivereFromArbeidsgiverOrganisasjoner,
    getPeriodeForArbeidsgiverOppslag,
} from '../../utils/initialDataUtils';
import { Arbeidsgivere } from '@navikt/sif-common-api';
import { ArbeidsgiverForEndring } from '../../types';

describe('initialDataUtils', () => {
    describe('getPeriodeForArbeidsgiverOppslag', () => {
        const endringsperiode = ISODateRangeToDateRange('2022-05-01/2022-10-01');

        it('returnerer minste dateRange ut fra maks endringsperiode og samletSøknadsperiode', () => {
            const samletSøknadsperiode = ISODateRangeToDateRange('2022-06-01/2022-09-01');
            const result = getPeriodeForArbeidsgiverOppslag(samletSøknadsperiode, endringsperiode);
            expect(result).toBeDefined();
            if (result) {
                expect(dateToISODate(result.from)).toEqual('2022-06-01');
                expect(dateToISODate(result.to)).toEqual('2022-09-01');
            }
        });
        it('returnerer endringsperiode hvis samletSøknadsperiode går utover endringsperiode', () => {
            const samletSøknadsperiode = ISODateRangeToDateRange('2021-01-01/2023-01-01');
            const result = getPeriodeForArbeidsgiverOppslag(samletSøknadsperiode, endringsperiode);
            expect(result).toBeDefined();
            if (result) {
                expect(dateToISODate(result.from)).toEqual('2022-05-01');
                expect(dateToISODate(result.to)).toEqual('2022-10-01');
            }
        });
    });

    describe('getArbeidsgivereFromArbeidsgiverOrganisasjoner', () => {
        it('oppretter ansettelsesperiode riktig når bruker har ett ansettelsesforhold hos én arbeidsgiver', () => {
            const respons: Arbeidsgivere = {
                organisasjoner: [
                    {
                        navn: 'a',
                        organisasjonsnummer: '123',
                        ansattFom: ISODateToDate('2022-01-01'),
                        ansattTom: ISODateToDate('2022-02-01'),
                    },
                ],
            };
            const expectedResult: ArbeidsgiverForEndring[] = [
                {
                    key: 'a_123',
                    navn: 'a',
                    organisasjonsnummer: '123',
                    ansettelsesperioder: [{ from: ISODateToDate('2022-01-01'), to: ISODateToDate('2022-02-01') }],
                },
            ];
            expect(getArbeidsgivereFromArbeidsgiverOrganisasjoner(respons.organisasjoner)).toEqual(expectedResult);
        });
        it('oppretter ansettelsesperioder riktig når bruker har to ansettelsesforhold hos samme arbeidsgiver', () => {
            const respons: Arbeidsgivere = {
                organisasjoner: [
                    {
                        navn: 'a',
                        organisasjonsnummer: '123',
                        ansattFom: ISODateToDate('2022-01-01'),
                        ansattTom: ISODateToDate('2022-02-01'),
                    },
                    {
                        navn: 'a',
                        organisasjonsnummer: '123',
                        ansattFom: ISODateToDate('2022-02-15'),
                    },
                ],
            };
            const expectedResult: ArbeidsgiverForEndring[] = [
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
            expect(getArbeidsgivereFromArbeidsgiverOrganisasjoner(respons.organisasjoner)).toEqual(expectedResult);
        });
    });
});
