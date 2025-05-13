import { getScenarioFromLocalStorage } from '../../../src/dev/scenarioer';
import { getScenarioMockData } from '../mocks/scenarioes';
import { OppgittInntektForPeriode, UngdomsytelseOppgavebekreftelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { DeltakelsePeriodInfo, OppgaveDto, RapportPeriodeinfoDto } from '@navikt/ung-deltakelse-opplyser-api';

const deltakelserStorageKey = 'ung-deltakelser-mock';

/** All funksjonalitet baserer seg på at det er én deltakelse som finnes i deltakelser */

export const deltakelserMockStorage = {
    actions: {
        setDeltakelseSøktFor: () => {
            const deltakelser = deltakelserMockStorage.get();
            deltakelser[0].harSøkt = true;
            deltakelserMockStorage.update(deltakelser);
        },
        setOppgavebekreftelse: (oppgavebekreftelse: UngdomsytelseOppgavebekreftelse) => {
            const deltakelse = deltakelserMockStorage.get()[0];

            const oppdatertDeltakelse: DeltakelsePeriodInfo = {
                ...deltakelse,
                oppgaver: deltakelse.oppgaver.map((oppgave) => {
                    if (oppgave.oppgaveReferanse !== oppgavebekreftelse.oppgave.oppgaveReferanse) {
                        return oppgave;
                    }
                    return <OppgaveDto>{
                        ...oppgave,
                        løstDato: new Date().toISOString(),
                        status: 'LØST',
                    };
                }),
            };
            deltakelserMockStorage.update([oppdatertDeltakelse]);
        },
        setInntektRapportert: (inntekt: OppgittInntektForPeriode) => {
            const deltakelse = deltakelserMockStorage.get()[0];
            const { periodeForInntekt } = inntekt;

            const oppdatertDeltakelse: DeltakelsePeriodInfo = {
                ...deltakelse,
                rapporteringsPerioder: deltakelse.rapporteringsPerioder.map(
                    (rapporteringsperiode: RapportPeriodeinfoDto) => {
                        if (
                            periodeForInntekt.fraOgMed === rapporteringsperiode.fraOgMed &&
                            periodeForInntekt.tilOgMed === rapporteringsperiode.tilOgMed
                        ) {
                            const { arbeidstakerOgFrilansInntekt = 0 } = inntekt;
                            return <RapportPeriodeinfoDto>{
                                ...rapporteringsperiode,
                                harRapportert: true,
                                arbeidstakerOgFrilansInntekt: arbeidstakerOgFrilansInntekt,
                            };
                        }
                        return rapporteringsperiode;
                    },
                ),
            };
            deltakelserMockStorage.update([oppdatertDeltakelse]);
        },
    },
    update: (deltakelser: DeltakelsePeriodInfo[]) => {
        localStorage.setItem(deltakelserStorageKey, JSON.stringify(deltakelser));
    },
    reset: () => {
        const scenario = getScenarioFromLocalStorage();
        return deltakelserMockStorage.update(getScenarioMockData(scenario.value).deltakelser);
    },
    get: (): DeltakelsePeriodInfo[] => {
        const scenario = getScenarioFromLocalStorage();
        const storedDeltakelser = localStorage.getItem(deltakelserStorageKey);
        if (storedDeltakelser) {
            return JSON.parse(storedDeltakelser);
        }
        return getScenarioMockData(scenario.value).deltakelser;
    },
};
