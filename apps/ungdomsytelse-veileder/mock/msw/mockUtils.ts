// /* eslint-disable no-console */

import {
    DeltakelseDto,
    DeltakelseHistorikkDto,
    DeltakerPersonalia,
} from '@navikt/ung-deltakelse-opplyser-api-veileder';
import { v4 } from 'uuid';
import { deltaker2Mock } from '../data/deltaker2';
import { nyDeltakerMock } from '../data/nyDeltakerMock';
import { registrertDeltakerMock } from '../data/registrertDeltakerMock';

interface DbDeltakelse {
    deltakelse: DeltakelseDto;
    historikk: DeltakelseHistorikkDto[];
}

interface TempDB {
    deltakere: DeltakerPersonalia[];
    deltakelser: DbDeltakelse[];
}

const localStorageKey = 'ungdomsytelse-veileder';

/** Data */

const initialDb: TempDB = {
    deltakere: [
        registrertDeltakerMock.deltakerPersonalia,
        nyDeltakerMock.deltakerPersonalia,
        deltaker2Mock.deltakerPersonalia,
    ],
    deltakelser: [
        {
            deltakelse: registrertDeltakerMock.deltakelse,
            historikk: registrertDeltakerMock.deltakelseHistorikk,
        },
        {
            deltakelse: deltaker2Mock.deltakelse,
            historikk: deltaker2Mock.historikk,
        },
    ],
};

const save = (db: TempDB) => {
    const data = JSON.stringify(db);
    localStorage.setItem(localStorageKey, data);
};

const load = (): TempDB => {
    const data = localStorage.getItem(localStorageKey);
    return data ? JSON.parse(data) : initialDb;
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
        fraOgMed: startdato,
        søktTidspunkt: undefined,
    };
    db.deltakelser.push({
        deltakelse,
        historikk: [],
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
    const dbDeltakelse: DbDeltakelse = {
        ...deltakelse,
        deltakelse: {
            ...deltakelse.deltakelse,
            fraOgMed: dato,
        },
    };
    db.deltakelser = db.deltakelser.map((d) => (d.deltakelse.id === deltakelseId ? dbDeltakelse : d));
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
    reset,
};
