import { ArbeidsaktivitetArbeidstaker, ArbeidstidApiData } from '@app/types';
import { InvalidParameterViolation } from '@navikt/sif-common-api';
import { getInvalidParametersFromAxiosError } from '@navikt/sif-common-soknad-ds';
import { isDateInDateRange, ISODateRangeToDateRange } from '@navikt/sif-common-utils';
import { appLogger } from '@sif/apm';
import { AxiosError } from 'axios';

const getArbeidstakerindeksFraPeriodeParameterFeil = (violation: InvalidParameterViolation) => {
    const match = /^ytelse\.arbeidstid\.arbeidstakerList\[(\d+)\]\.perioder/.exec(violation.parameterName);
    return match ? Number(match[1]) : undefined;
};

const erEndretPeriodeInnenforSakensPerioder = (
    endretPeriode: string,
    arbeidsaktivitetArbeidstaker?: ArbeidsaktivitetArbeidstaker,
) => {
    const periode = ISODateRangeToDateRange(endretPeriode);
    return arbeidsaktivitetArbeidstaker?.perioderMedArbeidstid.some(
        (sakPeriode) => isDateInDateRange(periode.from, sakPeriode) && isDateInDateRange(periode.to, sakPeriode),
    );
};

export const logDebugInfoHvisPeriodefeil = (
    error: AxiosError,
    arbeidstid: ArbeidstidApiData,
    arbeidsaktivitetArbeidstaker: ArbeidsaktivitetArbeidstaker[],
) => {
    const periodefeil = getInvalidParametersFromAxiosError(error);
    const arbeidstakerindeks = periodefeil
        .map(getArbeidstakerindeksFraPeriodeParameterFeil)
        .find((indeks) => indeks !== undefined);
    const arbeidstakerInnsending =
        arbeidstakerindeks === undefined ? undefined : arbeidstid.arbeidstakerList[arbeidstakerindeks];
    if (!arbeidstakerInnsending) {
        return;
    }

    appLogger.logRawApiError(error, 'Innsending feilet-ugyldig periode');
    const arbeidstakerSak = arbeidsaktivitetArbeidstaker.find(
        ({ arbeidsgiver }) => arbeidsgiver.organisasjonsnummer === arbeidstakerInnsending.organisasjonsnummer,
    );
    const endredePerioder = Object.keys(arbeidstakerInnsending.arbeidstidInfo.perioder);
    const erEndredePerioderInnenforSakensPerioder = endredePerioder.every((periode) =>
        erEndretPeriodeInnenforSakensPerioder(periode, arbeidstakerSak),
    );

    appLogger.logHandledException('Innsending feilet - periodeparameterfeil', {
        violations: periodefeil
            .filter((violation) => getArbeidstakerindeksFraPeriodeParameterFeil(violation) === arbeidstakerindeks)
            .map(({ parameterName, reason }) => ({ parameterName, reason })),
        erEndredePerioderInnenforSakensPerioder,
        // Feltene under ligger her hvis vi skulle få behov for å logge mer info
        // perioderInnsending: JSON.stringify(endredePerioder),
        // periodeKeysSak: JSON.stringify(Object.keys(arbeidstakerSak?.perioderMedArbeidstid ?? {})),
    });
};

export const logDebugInnsendingParameterViolations = (error: AxiosError) => {
    const violations = getInvalidParametersFromAxiosError(error);
    if (violations.length === 0) {
        return;
    }

    appLogger.logHandledException('Innsending feilet - parameterfeil', {
        violations: violations.map(({ parameterName, reason }) => ({ parameterName, reason })),
    });
};
