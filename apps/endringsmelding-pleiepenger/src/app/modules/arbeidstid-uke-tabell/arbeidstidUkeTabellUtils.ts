import { durationToDecimalDuration } from '@navikt/sif-common-utils/lib';
import { ArbeidstidUkeTabellItem } from './ArbeidstidUkeTabell';

export const erArbeidstidUkeTabellItemEndret = (uke: ArbeidstidUkeTabellItem): boolean => {
    if (!uke.endret) {
        return false;
    }
    return (
        durationToDecimalDuration(uke.opprinnelig.faktisk || uke.opprinnelig.normalt) !==
        durationToDecimalDuration(uke.endret.faktisk)
    );
};
