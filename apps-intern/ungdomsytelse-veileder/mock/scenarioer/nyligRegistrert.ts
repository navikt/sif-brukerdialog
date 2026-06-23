import {
    DeltakelseDto,
    DeltakelseHistorikkDto,
    DeltakerPersonalia,
    Endringstype,
    Revisjonstype,
} from '@navikt/ung-deltakelse-opplyser-api-veileder';
import dayjs from 'dayjs';
import { demoMockDate } from '../mockConstants';
import { beregnPeriodeMaksDato, relativeMockTimestamp } from '../mockDateUtils';
import { MockScenario } from './types';

/**
 * Scenario: Deltaker meldt inn for én uke siden. Startdato er første mandag i forrige måned.
 * Forventede handlinger: kanEndreStartdato=true, kanMeldesUt=true.
 */

const DELTAKER_ID = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
const DELTAKELSE_ID = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';

const getFirstMondayOfPreviousMonth = (): Date => {
    const firstOfPrevMonth = new Date(demoMockDate.getFullYear(), demoMockDate.getMonth() - 1, 1);
    const dayOfWeek = firstOfPrevMonth.getDay();
    const daysToAdd = dayOfWeek === 0 ? 1 : (8 - dayOfWeek) % 7;
    return new Date(
        firstOfPrevMonth.getFullYear(),
        firstOfPrevMonth.getMonth(),
        firstOfPrevMonth.getDate() + daysToAdd,
    );
};

const firstMonday = getFirstMondayOfPreviousMonth();
const fraOgMed = `${firstMonday.getFullYear()}-${String(firstMonday.getMonth() + 1).padStart(2, '0')}-${String(firstMonday.getDate()).padStart(2, '0')}`;
const innmeldtTidspunkt = relativeMockTimestamp(-7, 'days');
const søktTidspunkt = dayjs(demoMockDate).subtract(7, 'day').startOf('day').add(10, 'hour').toISOString();

const deltakerPersonalia: DeltakerPersonalia = {
    id: DELTAKER_ID,
    deltakerIdent: '02489135879',
    navn: {
        fornavn: 'AKTIV',
        etternavn: 'NYBEGYNNER',
    },
    fødselsdato: '2000-08-15',
    førsteMuligeInnmeldingsdato: '2018-08-15',
    sisteMuligeInnmeldingsdato: '2030-08-15',
    diskresjonskoder: [],
};

const deltakelse: DeltakelseDto = {
    id: DELTAKELSE_ID,
    deltaker: { id: DELTAKER_ID, deltakerIdent: '02489135879' },
    fraOgMed,
    tilOgMed: undefined,
    erSlettet: false,
    harOpphørsvedtak: false,
    søktTidspunkt,
    harForlengetPeriode: false,
    harUtvidetKvote: false,
    forlengetPeriodeMaksDato: beregnPeriodeMaksDato(fraOgMed),
    periodeMaksDato: beregnPeriodeMaksDato(fraOgMed),
    kvoteMaksDato: beregnPeriodeMaksDato(fraOgMed),
};

const historikk: DeltakelseHistorikkDto[] = [
    {
        tidspunkt: innmeldtTidspunkt,
        endringstype: Endringstype.DELTAKER_MELDT_INN,
        revisjonstype: Revisjonstype.OPPRETTET,
        endring: 'Deltaker er meldt inn i programmet.',
        aktør: 'Z990501 (veileder)',
    },
    {
        tidspunkt: søktTidspunkt,
        endringstype: Endringstype.DELTAKER_HAR_SØKT_YTELSE,
        revisjonstype: Revisjonstype.ENDRET,
        endring: `Deltaker har søkt om ytelse den ${dayjs(demoMockDate).subtract(7, 'day').format('DD.MM.YYYY')} 10:00.`,
        aktør: '02489135879 (deltaker)',
    },
];

export const nyligRegistrertScenario: MockScenario = {
    fnr: '02489135879',
    beskrivelse: 'Nylig registrert deltaker',
    gruppe: 'grunnscenarioer',
    forventedeHandlinger: {
        kanEndreStartdato: true,
        kanMeldesUt: true,
        kanEndreSluttdato: false,
        kanForlengePeriode: false,
        kanSletteDeltakelse: false,
    },
    deltakerPersonalia,
    deltakelse,
    historikk,
};
