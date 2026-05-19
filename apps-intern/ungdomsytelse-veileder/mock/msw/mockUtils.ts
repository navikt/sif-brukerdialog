// /* eslint-disable no-console */

import { dateFormatter, dateToISODate, ISODateToDate } from '@navikt/sif-common-utils';
import {
    DeltakelseDto,
    DeltakelseHistorikkDto,
    DeltakerPersonalia,
    Endringstype,
    Revisjonstype,
} from '@navikt/ung-deltakelse-opplyser-api-veileder';
import dayjs from 'dayjs';
import { v4 } from 'uuid';
import { nyDeltakerMock } from '../data/nyDeltakerMock';
import { registrertDeltakerMock } from '../data/registrertDeltakerMock';
import { skjermetDeltakerMock } from '../data/skjermetDeltaker';
import { slettetDeltakerMock } from '../data/slettetDeltakerMock';
import { søktNyligRegistrertDeltakerMock } from '../data/søktNyligRegistrertDeltakerMock';
import { addUkedagerToDate } from '../../src/utils/deltakelseUtils';
import { mockVersjon } from '../mockConstants';

interface DbDeltakelse {
    deltakelse: DeltakelseDto;
    historikk: DeltakelseHistorikkDto[];
}

interface TempDB {
    deltakere: DeltakerPersonalia[];
    deltakelser: DbDeltakelse[];
}

const localStorageKey = 'ungdomsytelse-veileder';

interface StoredData {
    versjon: string;
    db: TempDB;
}

const formaterIsoDate = (isoDate: string): string => dateFormatter.compact(ISODateToDate(isoDate));

const getUtvidetDeltakelseHistorikk = (): DeltakelseHistorikkDto => ({
    endringstype: Endringstype.FORLENGET_PERIODE,
    revisjonstype: Revisjonstype.ENDRET,
    endring: `Deltakelse har fått forlenget periode.`,
    aktør: 'Z990501 (veileder)',
    tidspunkt: dayjs().toISOString(),
});

const getEndretStartdatoHistorikk = (opprinneligDato: string, nyDato: string): DeltakelseHistorikkDto => ({
    endringstype: Endringstype.ENDRET_STARTDATO,
    revisjonstype: Revisjonstype.ENDRET,
    endring: `Startdato for deltakelse er endret fra ${formaterIsoDate(opprinneligDato)} til ${formaterIsoDate(nyDato)}.`,
    aktør: 'Z990501 (veileder)',
    tidspunkt: dayjs().toISOString(),
});

const getEndretSluttdatoHistorikk = (opprinneligDato: string | undefined, nyDato: string): DeltakelseHistorikkDto => ({
    endringstype: opprinneligDato ? Endringstype.ENDRET_SLUTTDATO : Endringstype.DELTAKER_MELDT_UT,
    revisjonstype: Revisjonstype.ENDRET,
    endring: opprinneligDato
        ? `Sluttdato for deltakelse er endret fra ${formaterIsoDate(opprinneligDato)} til ${formaterIsoDate(nyDato)}.`
        : `Deltaker meldt ut med sluttdato ${formaterIsoDate(nyDato)}`,
    aktør: 'Z990501 (veileder)',
    tidspunkt: dayjs().toISOString(),
});

/** Data */

const initialDb: TempDB = {
    deltakere: [
        registrertDeltakerMock.deltakerPersonalia,
        nyDeltakerMock.deltakerPersonalia,
        skjermetDeltakerMock.deltakerPersonalia,
        slettetDeltakerMock.deltakerPersonalia,
        søktNyligRegistrertDeltakerMock.deltakerPersonalia,
    ],
    deltakelser: [
        {
            deltakelse: registrertDeltakerMock.deltakelse,
            historikk: registrertDeltakerMock.deltakelseHistorikk,
        },
        {
            deltakelse: søktNyligRegistrertDeltakerMock.deltakelse,
            historikk: søktNyligRegistrertDeltakerMock.deltakelseHistorikk,
        },
        {
            deltakelse: skjermetDeltakerMock.deltakelse,
            historikk: skjermetDeltakerMock.historikk,
        },
        {
            deltakelse: slettetDeltakerMock.deltakelse,
            historikk: slettetDeltakerMock.deltakelseHistorikk,
        },
    ],
};

const save = (db: TempDB) => {
    const stored: StoredData = { versjon: mockVersjon, db };
    localStorage.setItem(localStorageKey, JSON.stringify(stored));
};

const load = (): TempDB => {
    const raw = localStorage.getItem(localStorageKey);
    if (raw) {
        try {
            const stored: StoredData = JSON.parse(raw);
            if (stored.versjon === mockVersjon) {
                return stored.db;
            }
        } catch {
            // Ugyldig data — nullstill
        }
        save(initialDb);
    }
    return initialDb;
};

const reset = () => {
    save(initialDb);
};

const db = load();

/** Actions */

/** Fnr */
const findDeltaker = (deltakerIdent: string) => {
    return db.deltakere.find((d) => d.deltakerIdent === deltakerIdent);
};

/** Registrert id som deltake */
const getDeltakerByDeltakerId = (deltakerId: string) => {
    return db.deltakere.find((d) => d.id === deltakerId);
};

const getDeltakelser = (deltakerId: string) => {
    return db.deltakelser
        .filter(({ deltakelse }) => deltakelse.deltaker.id === deltakerId)
        .map((data) => data.deltakelse);
};

const getDeltakelseHistorikk = (deltakelseId: string): DeltakelseHistorikkDto[] => {
    const deltakelse = db.deltakelser.find((d) => d.deltakelse.id === deltakelseId);
    return deltakelse ? deltakelse.historikk : [];
};

const meldInnDeltaker = (deltakerIdent: string, startdato: string) => {
    const deltaker = findDeltaker(deltakerIdent);
    if (!deltaker) {
        throw new Error('Fant ikke deltaker med deltakerIdent');
    }
    const deltakelseId = v4();
    const deltakerId = v4();
    const deltakelse: DeltakelseDto = {
        id: deltakelseId,
        deltaker: {
            deltakerIdent,
            id: deltakerId,
        },
        erSlettet: false,
        harOpphørsvedtak: false,
        harUtvidetKvote: false,
        fraOgMed: startdato,
        søktTidspunkt: undefined,
        tilOgMed: undefined,
        harForlengetPeriode: false,
        forlengetPeriodeMaksDato: dateToISODate(addUkedagerToDate(ISODateToDate(startdato), 260)),
        kvoteMaksDato: dateToISODate(addUkedagerToDate(ISODateToDate(startdato), 260)),
    };
    db.deltakelser.push({
        deltakelse,
        historikk: [
            {
                revisjonstype: Revisjonstype.OPPRETTET,
                endringstype: Endringstype.DELTAKER_MELDT_INN,
                endring: 'Deltaker er meldt inn i programmet',
                aktør: 'Z990501 (veileder)',
                tidspunkt: dayjs().toISOString(),
            },
        ],
    });
    db.deltakere = db.deltakere.map((d) => {
        if (d.deltakerIdent === deltakerIdent) {
            return {
                ...d,
                id: deltakerId,
            };
        }
        return d;
    });
    save(db);
    return deltakelse;
};
const endreStartdato = (deltakelseId: string, dato: string) => {
    const deltakelse = db.deltakelser.find((d) => d.deltakelse.id === deltakelseId);
    if (!deltakelse) {
        throw new Error('Fant ikke deltakelse med id');
    }
    const harForlengetPeriode = deltakelse.deltakelse.harForlengetPeriode;
    const periodeUkedager = harForlengetPeriode ? 260 + 8 * 5 : 260;
    const nyforlengetPeriodeMaksDato = !deltakelse.deltakelse.tilOgMed
        ? dateToISODate(addUkedagerToDate(ISODateToDate(dato), periodeUkedager))
        : deltakelse.deltakelse.forlengetPeriodeMaksDato;
    const dbDeltakelse: DbDeltakelse = {
        ...deltakelse,
        deltakelse: {
            ...deltakelse.deltakelse,
            fraOgMed: dato,
            forlengetPeriodeMaksDato: nyforlengetPeriodeMaksDato,
        },
        historikk: [...deltakelse.historikk, getEndretStartdatoHistorikk(deltakelse.deltakelse.fraOgMed, dato)],
    };
    db.deltakelser = db.deltakelser.map((d) => (d.deltakelse.id === deltakelseId ? dbDeltakelse : d));
    save(db);
    return dbDeltakelse.deltakelse;
};

const forlengPeriode = (deltakelseId: string) => {
    const deltakelse = db.deltakelser.find((d) => d.deltakelse.id === deltakelseId);
    if (!deltakelse) {
        throw new Error('Fant ikke deltakelse med id');
    }
    const dbDeltakelse: DbDeltakelse = {
        ...deltakelse,
        deltakelse: {
            ...deltakelse.deltakelse,
            harForlengetPeriode: true,
            forlengetPeriodeMaksDato: dateToISODate(
                addUkedagerToDate(ISODateToDate(deltakelse.deltakelse.forlengetPeriodeMaksDato), 40),
            ),
        },
        historikk: [...deltakelse.historikk, getUtvidetDeltakelseHistorikk()],
    };
    db.deltakelser = db.deltakelser.map((d) => (d.deltakelse.id === deltakelseId ? dbDeltakelse : d));
    save(db);
    return dbDeltakelse.deltakelse;
};

const fjernDeltaker = (deltakerId: string) => {
    const deltaker = getDeltakerByDeltakerId(deltakerId);
    if (!deltaker) {
        throw new Error('Fant ikke deltaker med id');
    }
    const deltakelser = db.deltakelser.filter((d) => d.deltakelse.deltaker.id === deltakerId);
    if (deltakelser.length !== 1) {
        throw new Error('Ingen eller for mange deltakelser');
    }
    const deltakelse = deltakelser[0];
    const dbDeltakelse: DbDeltakelse = {
        ...deltakelse,
        deltakelse: {
            ...deltakelse.deltakelse,
            erSlettet: true,
        },
    };
    db.deltakelser = db.deltakelser.map((d) => (d.deltakelse.id === deltakelse.deltakelse.id ? dbDeltakelse : d));
    save(db);
    return dbDeltakelse.deltakelse;
};

const endreSluttdato = (deltakelseId: string, dato: string) => {
    const deltakelse = db.deltakelser.find((d) => d.deltakelse.id === deltakelseId);
    if (!deltakelse) {
        throw new Error('Fant ikke deltakelse med id');
    }
    const dbDeltakelse: DbDeltakelse = {
        ...deltakelse,
        deltakelse: {
            ...deltakelse.deltakelse,
            tilOgMed: dato,
        },
        historikk: [...deltakelse.historikk, getEndretSluttdatoHistorikk(deltakelse.deltakelse.tilOgMed!, dato)],
    };
    db.deltakelser = db.deltakelser.map((d) => (d.deltakelse.id === deltakelseId ? dbDeltakelse : d));
    save(db);
    return dbDeltakelse.deltakelse;
};

export const mockUtils = {
    endreSluttdato,
    endreStartdato,
    findDeltaker,
    getDeltakelser,
    getDeltakelseHistorikk,
    getDeltakerByDeltakerId,
    meldInnDeltaker,
    forlengPeriode,
    fjernDeltaker,
    getUtvidetDeltakelseHistorikk,
    reset,
};
