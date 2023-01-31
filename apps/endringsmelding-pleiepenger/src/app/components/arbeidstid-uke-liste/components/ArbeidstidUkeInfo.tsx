import { BodyShort } from '@navikt/ds-react';
import React from 'react';
import AriaText from '@navikt/sif-common-core-ds/lib/components/aria/AriaText';
import DurationText from '@navikt/sif-common-core-ds/lib/components/duration-text/DurationText';
import { ArbeidstidUkeTabellItem } from '../ArbeidstidUkeTabell';
import BemUtils from '@navikt/sif-common-core-ds/lib/utils/bemUtils';
interface Props {
    uke: ArbeidstidUkeTabellItem;
    visOpprinneligTid?: boolean;
    medLabels?: boolean;
}

const bem = BemUtils('endretArbeidstid');

const ArbeidstidUkeInfo: React.FunctionComponent<Props> = ({ uke, visOpprinneligTid = true, medLabels = false }) => {
    if (uke.endret === undefined) {
        return (
            <>
                {medLabels && <BodyShort size="small">Arbeidstimer:</BodyShort>}
                <span data-testid="timer-faktisk">
                    <DurationText duration={uke.opprinnelig.faktisk} />
                </span>
            </>
        );
    }
    const { faktisk, endretProsent } = uke.endret;
    return (
        <div className={bem.block}>
            <div className={bem.element('faktisk')}>
                {medLabels && <BodyShort size="small">Arbeid i perioden:</BodyShort>}
                <strong className={bem.element('timer')} data-testid="timer-faktisk">
                    <DurationText duration={faktisk} />
                </strong>
                {endretProsent && <span className={bem.element('prosent')}>({endretProsent} %)</span>}
            </div>
            {visOpprinneligTid && (
                <div>
                    <span className={bem.element('opprinnelig')}>
                        <AriaText>Endret fra </AriaText>
                        <span className={bem.element('timer')} data-testid="timer-opprinnelig">
                            <DurationText duration={uke.opprinnelig.faktisk} />
                        </span>
                    </span>
                </div>
            )}
        </div>
    );
};

export default ArbeidstidUkeInfo;
