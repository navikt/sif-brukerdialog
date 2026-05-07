import dayjs from 'dayjs';
import { dateToISODate } from '@navikt/sif-common-utils';
import { demoMockDate } from '../mockConstants';
import {
    DeltakelseDto,
    DeltakelseHistorikkDto,
    DeltakerPersonalia,
    Endringstype,
    Revisjonstype,
} from '@navikt/ung-deltakelse-opplyser-api-veileder';
import { addUkedagerToDate } from '../../src/utils/deltakelseUtils';

/** Scenario: Deltaker meldt inn for én uke siden, startdato er første mandag i forrige måned, deltakelse er søkt. */

const getFirstMondayOfPreviousMonth = (): Date => {
    const today = demoMockDate;
    const firstOfPrevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const dayOfWeek = firstOfPrevMonth.getDay();
    const daysToAdd = dayOfWeek === 0 ? 1 : (8 - dayOfWeek) % 7;
    return new Date(
        firstOfPrevMonth.getFullYear(),
        firstOfPrevMonth.getMonth(),
        firstOfPrevMonth.getDate() + daysToAdd,
    );
};

const firstMonday = getFirstMondayOfPreviousMonth();
const oneWeekAgo = dayjs(demoMockDate).subtract(7, 'day');

const fraOgMed = dateToISODate(firstMonday);
const innmeldtTidspunkt = oneWeekAgo.startOf('day').add(8, 'hour').toISOString();
const søktTidspunkt = oneWeekAgo.startOf('day').add(10, 'hour').toISOString();

const deltakerPersonalia: DeltakerPersonalia = {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
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
    id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    deltaker: {
        id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        deltakerIdent: '02489135879',
    },
    fraOgMed,
    tilOgMed: undefined,
    erSlettet: false,
    harOpphørsvedtak: false,
    søktTidspunkt,
    harUtvidetKvote: false,
    kvoteMaksDato: dateToISODate(addUkedagerToDate(firstMonday, 260)),
};

const deltakelseHistorikk: DeltakelseHistorikkDto[] = [
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
        endring: `Deltaker har søkt om ytelse den ${oneWeekAgo.format('DD.MM.YYYY')} 10:00.`,
        aktør: '02489135879 (deltaker)',
    },
];

export const søktNyligRegistrertDeltakerMock = {
    id: deltakerPersonalia.id!,
    deltakerPersonalia,
    deltakelse,
    deltakelseHistorikk,
};
