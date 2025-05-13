// /* eslint-disable no-console */

import { DeltakelseOpplysningDto, DeltakerPersonalia } from '@navikt/ung-deltakelse-opplyser-api';
import { registrertDeltakerMock } from './registrert-deltaker-mock/data';
import { nyDeltakerMock } from './ny-deltaker-mock/data';
import { v4 } from 'uuid';

interface TempDB {
    deltakere: DeltakerPersonalia[];
    deltakelser: DeltakelseOpplysningDto[];
}

const localStorageKey = 'ungdomsytelse-veileder';

/** Data */

const initialDb: TempDB = {
    deltakere: [registrertDeltakerMock.deltakerPersonalia, nyDeltakerMock.deltakerPersonalia],
    deltakelser: [registrertDeltakerMock.deltakelse],
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
    return db.deltakelser.filter((deltakelse) => deltakelse.deltaker.id === deltakerId);
};

const meldInnDeltaker = (deltakerIdent: string, startdato: string) => {
    const deltaker = findDeltaker(deltakerIdent);
    if (!deltaker) {
        throw new Error('Fant ikke deltaker med deltakerIdent');
    }
    const deltakelseId = v4();
    const deltakerId = v4();
    const deltakelse: DeltakelseOpplysningDto = {
        id: deltakelseId,
        deltaker: {
            deltakerIdent,
            id: deltakerId,
        },
        fraOgMed: startdato,
        harSøkt: false,
        oppgaver: [],
    };
    db.deltakelser.push(deltakelse);
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
    const deltakelse = db.deltakelser.find((d) => d.id === deltakelseId);
    if (!deltakelse) {
        throw new Error('Fant ikke deltakelse med id');
    }
    const updatedDeltakelse = {
        ...deltakelse,
        fraOgMed: dato,
    };
    db.deltakelser = db.deltakelser.map((d) => (d.id === deltakelseId ? updatedDeltakelse : d));
    save(db);
    return updatedDeltakelse;
};

const endreSluttdato = (deltakelseId: string, dato: string) => {
    const deltakelse = db.deltakelser.find((d) => d.id === deltakelseId);
    if (!deltakelse) {
        throw new Error('Fant ikke deltakelse med id');
    }
    const updatedDeltakelse = {
        ...deltakelse,
        tilOgMed: dato,
    };
    db.deltakelser = db.deltakelser.map((d) => (d.id === deltakelseId ? updatedDeltakelse : d));
    save(db);
    return updatedDeltakelse;
};

export const mockUtils = {
    endreSluttdato,
    endreStartdato,
    findDeltaker,
    getDeltakelser,
    getDeltakerByDeltakerId,
    meldInnDeltaker,
    reset,
};
