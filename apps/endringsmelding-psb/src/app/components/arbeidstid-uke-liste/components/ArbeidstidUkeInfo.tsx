import React from 'react';
import DurationText from '@navikt/sif-common-core-ds/lib/components/duration-text/DurationText';
import { PeriodeSøktForListeItem } from '../ArbeidstidUkeTabell';
import AriaText from '@navikt/sif-common-core-ds/lib/components/aria/AriaText';

interface Props {
    uke: PeriodeSøktForListeItem;
}

const ArbeidstidUkeInfo: React.FunctionComponent<Props> = ({ uke }) => {
    if (uke.endret === undefined) {
        return <DurationText duration={uke.opprinnelig.faktisk} />;
    }
    const { faktisk, endretProsent } = uke.endret;
    return (
        <div className="endretArbeidstid">
            <div className="endretArbeidstid__faktisk">
                <DurationText duration={faktisk} />{' '}
                {endretProsent && (
                    <span className="endretArbeidstid__prosent" style={{ whiteSpace: 'nowrap' }}>
                        ({endretProsent} %)
                    </span>
                )}
            </div>
            <div className="endretArbeidstid__opprinnelig">
                <AriaText>Endret fra </AriaText>
                <DurationText duration={uke.opprinnelig.faktisk} />
            </div>
        </div>
    );
};

export default ArbeidstidUkeInfo;
