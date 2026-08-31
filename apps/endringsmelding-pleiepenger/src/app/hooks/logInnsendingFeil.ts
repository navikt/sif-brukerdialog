import { ArbeidsaktivitetArbeidstaker, ArbeidstidApiData } from '@app/types';
import { InvalidParameterViolation } from '@navikt/sif-common-api';
import { getInvalidParametersFromAxiosError } from '@navikt/sif-common-soknad-ds';
import { appLogger } from '@sif/apm';
import { AxiosError } from 'axios';

const erPeriodeParameterFeil = (violation: InvalidParameterViolation) => {
    return violation.parameterName.startsWith('ytelse.arbeidstid.arbeidstakerList[0].perioder');
};

export const logDebugInfoHvisPeriodefeil = (
    error: AxiosError,
    arbeidstid: ArbeidstidApiData,
    arbeidsaktivitetArbeidstaker: ArbeidsaktivitetArbeidstaker[],
) => {
    const periodefeil = getInvalidParametersFromAxiosError(error).filter(erPeriodeParameterFeil);
    const arbeidstakerInnsending = arbeidstid.arbeidstakerList[0];
    if (!arbeidstakerInnsending || periodefeil.length === 0) {
        return;
    }

    const arbeidstakerSak = arbeidsaktivitetArbeidstaker.find(
        ({ arbeidsgiver }) => arbeidsgiver.organisasjonsnummer === arbeidstakerInnsending.organisasjonsnummer,
    );

    appLogger.logHandledException('Innsending feilet - periodeparameterfeil', {
        violations: periodefeil.map(({ parameterName, reason }) => ({ parameterName, reason })),
        perioderInnsending: JSON.stringify(Object.keys(arbeidstakerInnsending.arbeidstidInfo.perioder)),
        periodeKeysSak: JSON.stringify(Object.keys(arbeidstakerSak?.perioderMedArbeidstid ?? {})),
    });
};

export const logDebugInnsendingParameterViolations = (error: AxiosError) => {
    const violations = getInvalidParametersFromAxiosError(error);
    const violationsFormatted = violations
        .map(({ parameterName, reason }, index) => `Feil ${index + 1}: ${parameterName} - ${reason}`)
        .join(', ');
    appLogger.logHandledException(`Innsending feilet - parameterfeil: ${violationsFormatted}`);
};
