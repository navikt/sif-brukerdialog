import { DeltakelseKomposittDto } from '@navikt/ung-deltakelse-opplyser-api-deltaker';

import { ScenarioData } from '../types';
import { mockOppgaver } from './oppgaver';
const {
    rapporterInntektOppgave,
    rapporterInntektOppgaveLøst,
    endretStartdatoOppgave,
    bekreftAvvikOppgave,
    søkYtelseOppgaveLøst: søkYtelseOppgave,
} = mockOppgaver;

const deltakelse: DeltakelseKomposittDto = {
    id: '8c21972b-f23d-4193-8851-b2fa6c6b2f63',
    fraOgMed: '2025-07-02',
    tilOgMed: undefined,
    søktTidspunkt: '2025-04-17T05:05:01.714798Z',
    deltaker: {
        id: '8c21972b-f23d-4193-8851-b2fa6c6b2f63',
        deltakerIdent: '234',
    },
    oppgaver: [
        rapporterInntektOppgave,
        rapporterInntektOppgaveLøst,
        endretStartdatoOppgave,
        søkYtelseOppgave,
        bekreftAvvikOppgave,
    ],
} as any;

export const harSøktMock: ScenarioData = {
    søker: {
        aktørId: '2320509955297',
        fødselsdato: '2005-06-02',
        fødselsnummer: '02869599258',
        fornavn: 'Test',
        mellomnavn: undefined,
        etternavn: 'Brukeresen',
    },
    barn: {
        barn: [
            {
                fornavn: 'ALFABETISK',
                etternavn: 'TURLØYPE',
                aktørId: '2811762539343',
                fødselsdato: '2019-06-08',
                fødselsnummer: '08861999573',
            },
        ],
    },
    arbeidsgiver: [
        {
            navn: 'HAUGEN AS',
            organisasjonsnummer: '123451234',
            ansattFom: '2019-09-25',
            ansattTom: undefined,
        },
    ],
    deltakelser: [deltakelse],
};
