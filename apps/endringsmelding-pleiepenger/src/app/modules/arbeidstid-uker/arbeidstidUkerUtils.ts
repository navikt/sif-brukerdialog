import { durationToDecimalDuration } from '@navikt/sif-common-utils';
import { ArbeidstidUkerItem } from './ArbeidstidUkerItem';

export const erArbeidstidUkeItemEndret = (uke: ArbeidstidUkerItem): boolean => {
    if (!uke.endret) {
        return false;
    }
    return (
        durationToDecimalDuration(uke.opprinnelig.faktisk || uke.opprinnelig.normalt) !==
        durationToDecimalDuration(uke.endret.faktisk)
    );
};
