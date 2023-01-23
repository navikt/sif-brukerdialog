import React from 'react';
import DurationText from '@navikt/sif-common-core-ds/lib/components/duration-text/DurationText';
import { PeriodeSøktForListeItem } from '../ArbeidstidUkeTabell';
import AriaText from '@navikt/sif-common-core-ds/lib/components/aria/AriaText';
import { BodyShort } from '@navikt/ds-react';

interface Props {
    uke: PeriodeSøktForListeItem;
    visOpprinneligTid?: boolean;
    medLabels?: boolean;
}

const ArbeidstidUkeInfo: React.FunctionComponent<Props> = ({ uke, visOpprinneligTid = true, medLabels = false }) => {
    if (uke.endret === undefined) {
        return (
            <>
                <BodyShort size="small">Arbeidstimer:</BodyShort>
                <strong style={{ fontSize: '1.25rem' }}>
                    <DurationText duration={uke.opprinnelig.faktisk} />
                </strong>
            </>
        );
    }
    const { faktisk, endretProsent } = uke.endret;
    return (
        <div className="endretArbeidstid">
            <div className="endretArbeidstid__faktisk">
                {medLabels && <BodyShort size="small">Arbeid i perioden:</BodyShort>}
                <strong style={{ fontSize: '1.25rem' }}>
                    <DurationText duration={faktisk} />
                </strong>
                {endretProsent && (
                    <span className="endretArbeidstid__prosent" style={{ whiteSpace: 'nowrap' }}>
                        ({endretProsent} %)
                    </span>
                )}
            </div>
            {visOpprinneligTid && (
                <div>
                    {/* {medLabels && (
                        <>
                            Endret fra: <DurationText duration={uke.opprinnelig.faktisk} />{' '}
                        </>
                    )}
                    {!medLabels && ( */}
                    <span className="endretArbeidstid__opprinnelig">
                        <AriaText>Endret fra </AriaText>
                        <span style={{ whiteSpace: 'nowrap' }}>
                            <DurationText duration={uke.opprinnelig.faktisk} />
                        </span>
                    </span>
                    {/* )} */}
                </div>
            )}
        </div>
    );
};

export default ArbeidstidUkeInfo;
