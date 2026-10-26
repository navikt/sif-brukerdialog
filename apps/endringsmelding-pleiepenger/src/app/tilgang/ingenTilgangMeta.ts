import { IngenTilgangMeta, K9SakArbeidstid, K9SakArbeidstidInfo } from '@app/types';
import { durationToDecimalDuration } from '@navikt/sif-common-utils';

/**
 * Loggmetadata, ikke en regel. Verdiene brukes kun til å se hvilke arbeidsforhold
 * de som blir avvist faktisk har, og skal aldri påvirke om bruker får tilgang.
 */
export const getIngenTilgangMeta = (arbeidstid: K9SakArbeidstid): IngenTilgangMeta => {
    const { arbeidstakerList, frilanserArbeidstidInfo, selvstendigNæringsdrivendeArbeidstidInfo } = arbeidstid;
    return {
        erArbeidstaker: arbeidstakerList?.some((a) => harArbeidstidPerioder(a.arbeidstidInfo)),
        erFrilanser: harArbeidstidPerioder(frilanserArbeidstidInfo),
        erSN: harArbeidstidPerioder(selvstendigNæringsdrivendeArbeidstidInfo),
    };
};

const harArbeidstidPerioder = (arbeidstidInfo?: K9SakArbeidstidInfo): boolean => {
    if (arbeidstidInfo === undefined) {
        return false;
    }
    const perioder = Object.values(arbeidstidInfo.perioder ?? {});
    return perioder.some((periode) => durationToDecimalDuration(periode.jobberNormaltTimerPerDag) > 0);
};
