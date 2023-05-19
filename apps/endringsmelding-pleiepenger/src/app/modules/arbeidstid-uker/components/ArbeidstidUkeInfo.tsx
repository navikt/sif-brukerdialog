import { BodyShort } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import { ErrorColored } from '@navikt/ds-icons';
import AriaText from '@navikt/sif-common-core-ds/lib/atoms/aria-text/AriaText';
import DurationText from '@navikt/sif-common-core-ds/lib/components/duration-text/DurationText';
import { erTimerGyldigInnenforAntallDager } from '@utils';
import IconText from '../../../components/icon-text/IconText';
import { ArbeidstidUkerItem } from '../ArbeidstidUkerItem';
import { erArbeidstidUkeItemEndret } from '../arbeidstidUkerUtils';

interface Props {
    uke: ArbeidstidUkerItem;
    visEndringSomOpprinnelig?: boolean;
    medLabels?: boolean;
}

const ArbeidstidUkeInfo: React.FunctionComponent<Props> = ({ uke, medLabels = false, visEndringSomOpprinnelig }) => {
    const intl = useIntl();
    if (uke.endret === undefined) {
        return (
            <>
                {medLabels && <BodyShort size="small">Arbeidstimer:</BodyShort>}
                <span data-testid="timer-faktisk">
                    {uke.opprinnelig.faktisk && <DurationText duration={uke.opprinnelig.faktisk} />}
                </span>
            </>
        );
    }
    const erEndret = erArbeidstidUkeItemEndret(uke);

    if (erEndret === false || visEndringSomOpprinnelig) {
        return (
            <>
                {medLabels && <BodyShort size="small">Arbeidstimer:</BodyShort>}
                <span data-testid="timer-faktisk">
                    <DurationText duration={uke.endret.faktisk} />
                </span>
            </>
        );
    }
    const { faktisk, endretProsent } = uke.endret;
    const erEndringGyldig = erTimerGyldigInnenforAntallDager(faktisk, uke.antallDagerMedArbeidstid);

    return (
        <div className={'endretArbeidstid'}>
            <div className="endretArbeidstid_faktisk">
                {medLabels && <BodyShort size="small">Jobber i perioden:</BodyShort>}
                <strong className="endretArbeidstid__timer" data-testid="timer-faktisk">
                    <DurationText duration={faktisk} />
                </strong>
                {endretProsent !== undefined && (
                    <span className="endretArbeidstid__prosent"> ({intl.formatNumber(endretProsent)} %)</span>
                )}
            </div>

            <div>
                <span className="endretArbeidstid__opprinnelig">
                    <AriaText>Endret fra </AriaText>
                    <span className="endretArbeidstid__timer" data-testid="timer-opprinnelig">
                        {uke.opprinnelig.faktisk && <DurationText duration={uke.opprinnelig.faktisk} />}
                    </span>
                </span>
            </div>

            {erEndringGyldig === false && (
                <div style={{ marginTop: '0.25rem' }}>
                    <IconText icon={<ErrorColored role="presentation" aria-hidden="true" />}>For mange timer</IconText>
                </div>
            )}
        </div>
    );
};

export default ArbeidstidUkeInfo;
