// /* eslint-disable no-console */

import {
    ArbeidsgivereDto,
    BarnOppslagListe,
    Søker,
    UngdomsytelseOppgavebekreftelse,
} from '@navikt/k9-brukerdialog-prosessering-api';
import { DeltakelsePeriodInfo, OppgaveDto } from '@navikt/ung-deltakelse-opplyser-api';
import { ScenarioType } from '../../../src/dev/scenarioer';
import { getScenarioMockData } from './scenarioes';

export interface ScenarioData {
    søker: Søker;
    barn: BarnOppslagListe;
    arbeidsgiver: ArbeidsgivereDto;
    deltakelser: DeltakelsePeriodInfo[];
}

const localStorageKey = 'ungdomsytelse-deltaker-mock-db';

/** Data */

const initialDb: ScenarioData = {
    ...getScenarioMockData(ScenarioType.harIkkeSøkt),
};

const save = (db: ScenarioData) => {
    const data = JSON.stringify(db);
    localStorage.setItem(localStorageKey, data);
};

const load = (): ScenarioData => {
    const data = localStorage.getItem(localStorageKey);
    return data ? JSON.parse(data) : initialDb;
};

const setScenario = (scenario: ScenarioType) => {
    save(getScenarioMockData(scenario));
};

const db = load();

/** Actions */

// Forutsetter at det alltid er kun én deltakelse i mock-databasen

const setDeltakelseSøktFor = () => {
    db.deltakelser[0].søktTidspunkt = new Date().toISOString();
    save(db);
};

const setOppgavebekreftelse = (oppgaveReferanse: string, oppgavebekreftelse: UngdomsytelseOppgavebekreftelse) => {
    db.deltakelser[0].oppgaver = db.deltakelser[0].oppgaver.map((oppgave) => {
        if (oppgaveReferanse !== oppgave.oppgaveReferanse) {
            return oppgave;
        }
        if (oppgave.oppgaveReferanse !== oppgavebekreftelse.oppgave.oppgaveReferanse) {
            return oppgave;
        }
        return <OppgaveDto>{
            ...oppgave,
            løstDato: new Date().toISOString(),
            status: 'LØST',
        };
    });
    save(db);
};

//
export const mockUtils = {
    setScenario,
    getData: (): ScenarioData => db,
    getSøker: () => db.søker,
    getBarn: () => db.barn,
    getArbeidsgiver: () => db.arbeidsgiver,
    getDeltakelser: () => db.deltakelser,
    setDeltakelseSøktFor,
    setOppgavebekreftelse,
};
