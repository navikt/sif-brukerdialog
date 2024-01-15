import React from 'react';
import { Duration, durationToDecimalDuration } from '@navikt/sif-common-utils';
import DurationText from '../../../../common/duration-text/DurationText';
import './arbeidstidEnkeltdagTekst.less';

interface Props {
    tid: Duration;
    prosent?: number;
    skjulIngenTid?: boolean;
}

const ArbeidstidEnkeltdagTekst: React.FunctionComponent<Props> = ({ prosent, tid, skjulIngenTid }) => {
    if (prosent !== undefined && prosent > 0) {
        return (
            <span className="arbeidstidEnkeltdagTekst">
                <span className={'arbeidstidEnkeltdagTekst__prosent'}>{prosent} %</span>
                <span className="arbeidstidEnkeltdagTekst__timer">
                    (<DurationText duration={tid} />)
                </span>
            </span>
        );
    }
    const desimaltid = durationToDecimalDuration(tid);
    return skjulIngenTid && desimaltid === 0 ? null : <DurationText duration={tid} />;
};

export default ArbeidstidEnkeltdagTekst;
