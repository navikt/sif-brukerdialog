import {
    UngdomsytelseControllerService,
    UngdomsytelseInntektsrapportering,
    UngdomsytelseOppgavebekreftelse,
    Ungdomsytelsesøknad,
    zUngdomsytelseOppgavebekreftelse,
} from '@navikt/k9-brukerdialog-prosessering-api';
import { DeltakelsePeriode, deltakelsePerioderSchema, handleError } from '@navikt/ung-common';
import { DeltakelseService } from '@navikt/ung-deltakelse-opplyser-api';

/**
 * Påkrevde headers settes andre steder, dette er bare en mock for å tilfredstille typescript
 *  */

const k9RequestHeader = {} as any;

/**
 * Henter alle deltakelser til innlogget bruker
 * @returns {Promise<DeltakelsePeriode[]>}
 * @throws {ApiErrorObject}
 */
const getAlleMineDeltakelser = async (): Promise<DeltakelsePeriode[]> => {
    try {
        const { data } = await DeltakelseService.hentAlleMineDeltakelser();
        return deltakelsePerioderSchema.parse(data);
    } catch (e) {
        throw handleError(e);
    }
};

/**
 * Sender inn svar på en oppgave
 * @returns {Promise<void>}
 * @throws {ApiErrorObject}
 */
const sendOppgavebekreftelse = async (oppgave: UngdomsytelseOppgavebekreftelse): Promise<void> => {
    try {
        const body: UngdomsytelseOppgavebekreftelse = zUngdomsytelseOppgavebekreftelse.parse(oppgave);
        await UngdomsytelseControllerService.oppgavebekreftelse({ body, headers: k9RequestHeader });
        return Promise.resolve();
    } catch (e) {
        throw handleError(e);
    }
};

/**
 * Denne markerer en oppgave som søkt. Dette gjøres egentlig ved innsending, men dette kan ta noe tid før det er prosessert.
 * TODO: vurdere om vi skal ha med denne, eller velger en annen måte å løse forsinkelsen på
 * @param id ID til en deltakelse
 * @returns
 */
const markerDeltakelseSomSøkt = async (id: string): Promise<void> => {
    try {
        await DeltakelseService.markerDeltakelseSomSøkt({ path: { id } });
        return Promise.resolve();
    } catch (e) {
        throw handleError(e);
    }
};

const sendSøknad = async (data: Ungdomsytelsesøknad): Promise<any> => {
    try {
        await UngdomsytelseControllerService.innsendingUngdomsytelsesøknad({ body: data, headers: k9RequestHeader });
        return Promise.resolve();
    } catch (e) {
        throw handleError(e);
    }
};

const rapporterInntekt = async (data: UngdomsytelseInntektsrapportering): Promise<void> => {
    try {
        await UngdomsytelseControllerService.inntektrapportering({ body: data, headers: k9RequestHeader });
        return Promise.resolve();
    } catch (e) {
        throw handleError(e);
    }
};

export const deltakerApiService = {
    getAlleMineDeltakelser,
    markerDeltakelseSomSøkt,
    rapporterInntekt,
    sendOppgavebekreftelse,
    sendSøknad,
};
