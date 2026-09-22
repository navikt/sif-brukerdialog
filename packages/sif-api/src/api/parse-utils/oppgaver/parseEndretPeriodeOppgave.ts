import { ISODate } from '@sif/utils';
import { BrukerdialogOppgaveDto, EndretPeriodeDataDto, PeriodeEndringType } from '@navikt/ung-brukerdialog-api';

import {
    EndretStartOgSluttdatoOppgave,
    FjernetPeriodeOppgave,
    Oppgave,
    ParsedOppgavetype,
} from '../../../types/Oppgave';
import { mapPeriodeDtoToDateRange, mapPeriodeDtoToOpenDateRange } from '../mapPeriodeDto';
import { getOppgaveBaseProps } from './oppgaveBase';
import { parseSvarPåVarselRespons } from './oppgaveRespons';
import { lagEndretSluttdatoOppgave, lagEndretStartdatoOppgave } from './parseEndretStartSluttdatoOppgave';

const harKunEndring = (endringer: PeriodeEndringType[], endring: PeriodeEndringType): boolean =>
    endringer.length === 1 && endringer.includes(endring);

/**
 * Én backend-oppgavetype kan bli fem ulike frontend-oppgaver, avhengig av hvilke
 * endringer som er gjort på perioden.
 */
export const parseEndretPeriodeOppgave = (oppgave: BrukerdialogOppgaveDto): Oppgave => {
    const { endringer, forrigePeriode, nyPeriode } = oppgave.oppgavetypeData as EndretPeriodeDataDto;

    /** Endret startdato */
    if (
        harKunEndring(endringer, PeriodeEndringType.ENDRET_STARTDATO) &&
        nyPeriode?.fomDato !== undefined &&
        forrigePeriode?.fomDato !== undefined
    ) {
        return lagEndretStartdatoOppgave(oppgave, nyPeriode.fomDato as ISODate, forrigePeriode.fomDato as ISODate);
    }

    /** Endret sluttdato, eller meldt ut dersom det ikke finnes en forrige sluttdato */
    if (harKunEndring(endringer, PeriodeEndringType.ENDRET_SLUTTDATO) && nyPeriode?.tomDato !== undefined) {
        return lagEndretSluttdatoOppgave(
            oppgave,
            nyPeriode.tomDato as ISODate,
            forrigePeriode?.tomDato as ISODate | undefined,
        );
    }

    /** Fjernet periode */
    if (harKunEndring(endringer, PeriodeEndringType.FJERNET_PERIODE)) {
        const fjernetPeriodeOppgave: FjernetPeriodeOppgave = {
            ...getOppgaveBaseProps(oppgave),
            parsedOppgavetype: ParsedOppgavetype.BEKREFT_FJERNET_PERIODE,
            respons: parseSvarPåVarselRespons(oppgave.respons),
        };
        return fjernetPeriodeOppgave;
    }

    /** Endret start- og sluttdato */
    if (
        endringer.length === 2 &&
        endringer.includes(PeriodeEndringType.ENDRET_STARTDATO) &&
        endringer.includes(PeriodeEndringType.ENDRET_SLUTTDATO) &&
        forrigePeriode?.fomDato !== undefined &&
        nyPeriode?.fomDato !== undefined &&
        nyPeriode.tomDato !== undefined
    ) {
        const endretStartOgSluttdatoOppgave: EndretStartOgSluttdatoOppgave = {
            ...getOppgaveBaseProps(oppgave),
            parsedOppgavetype: ParsedOppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO,
            oppgavetypeData: {
                forrigePeriode: mapPeriodeDtoToOpenDateRange({
                    fomDato: forrigePeriode.fomDato,
                    tomDato: forrigePeriode.tomDato,
                }),
                nyPeriode: mapPeriodeDtoToDateRange({
                    fomDato: nyPeriode.fomDato,
                    tomDato: nyPeriode.tomDato,
                }),
            },
            respons: parseSvarPåVarselRespons(oppgave.respons),
        };
        return endretStartOgSluttdatoOppgave;
    }

    throw new Error(`Kan ikke lage oppgave fra endret periode oppgave med endringer: ${endringer.join(', ')}`);
};
