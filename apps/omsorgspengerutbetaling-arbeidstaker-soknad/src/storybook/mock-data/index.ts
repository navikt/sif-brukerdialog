import { RegistrertBarn, Søker } from '@navikt/sif-common-api';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { Utbetalingsårsak, ÅrsakNyoppstartet } from '../../app/types/ArbeidsforholdTypes';
import { ArbeidsgiverResponse } from '../../app/types/Arbeidsgiver';
import { ApiAktivitet, ArbeidsgiverDetaljer } from '../../app/types/søknadApiData/SøknadApiData';

export const søkerStorybookMock: Søker = {
    fødselsnummer: '30086421581',
    fornavn: 'GODSLIG',
    aktørId: '132',
    fødselsdato: ISODateToDate('1990-01-01'),
    etternavn: 'KRONJUVEL',
};

export const registrerteBarnMock: RegistrertBarn[] = [
    {
        fødselsdato: ISODateToDate('1990-01-01'),
        fornavn: 'Barn',
        mellomnavn: 'Barne',
        etternavn: 'Barnesen',
        aktørId: '1',
    },
    {
        fødselsdato: ISODateToDate('1990-01-02'),
        fornavn: 'Mock',
        etternavn: 'Mocknes',
        aktørId: '2',
    },
];

export const arbeidsgivereStorybookMock: ArbeidsgiverResponse = {
    organisasjoner: [
        {
            navn: 'Arbeids- og velferdsetaten',
            organisasjonsnummer: '123451234',
        },
        {
            navn: 'Arbeids- og sosialdepartementet',
            organisasjonsnummer: '123451235',
        },
    ],
};

export const kvitteringInfoStorybookMock: ArbeidsgiverDetaljer[] = [
    {
        navn: 'Arbeids- og velferdsetaten',
        organisasjonsnummer: '123451234',
        harHattFraværHosArbeidsgiver: true,
        arbeidsgiverHarUtbetaltLønn: false,
        utbetalingsårsak: Utbetalingsårsak.nyoppstartetHosArbeidsgiver,
        årsakNyoppstartet: ÅrsakNyoppstartet.varFrilanser,
        perioder: [
            {
                fraOgMed: '2024-04-08',
                tilOgMed: '2024-04-26',
                antallTimerPlanlagt: null,
                antallTimerBorte: null,
                årsak: 'ORDINÆRT_FRAVÆR',
                aktivitetFravær: [ApiAktivitet.ARBEIDSTAKER],
            },
        ],
    },
    {
        navn: 'Arbeids- og sosialdepartementet',
        organisasjonsnummer: '123451235',
        harHattFraværHosArbeidsgiver: true,
        arbeidsgiverHarUtbetaltLønn: false,
        utbetalingsårsak: Utbetalingsårsak.arbeidsgiverKonkurs,
        perioder: [
            {
                fraOgMed: '2024-04-22',
                tilOgMed: '2024-04-22',
                antallTimerPlanlagt: 'PT4H0M',
                antallTimerBorte: 'PT1H0M',
                årsak: 'ORDINÆRT_FRAVÆR',
                aktivitetFravær: [ApiAktivitet.ARBEIDSTAKER],
            },
        ],
    },
];
