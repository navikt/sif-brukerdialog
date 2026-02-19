import IconText from '@app/components/icon-text/IconText';
import { erTimerGyldigInnenforAntallDager } from '@app/utils';
import { XMarkOctagonFillIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';
import AriaText from '@navikt/sif-common-core-ds/src/atoms/aria-text/AriaText';
import { DurationText } from '@navikt/sif-common-ui';
import { useIntl } from 'react-intl';

import { erArbeidstidUkeItemEndret } from '../arbeidstidUkerUtils';
import { ArbeidstidUkerItem } from '../types/ArbeidstidUkerItem';

interface Props {
    uke: ArbeidstidUkerItem;
    visEndringSomOpprinnelig?: boolean;
    medLabels?: boolean;
}

const ArbeidstidUkeInfo = ({ uke, medLabels = false, visEndringSomOpprinnelig }: Props) => {
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
        const { endretProsent } = uke.endret;
        return (
            <>
                {medLabels && <BodyShort size="small">Arbeidstimer:</BodyShort>}
                <span data-testid="timer-faktisk">
                    <DurationText duration={uke.endret.faktisk} />
                </span>
                {endretProsent !== undefined && (
                    <span className="endretArbeidstid__prosent"> ({intl.formatNumber(endretProsent)} %)</span>
                )}
            </>
        );
    }
    const { faktisk, endretProsent } = uke.endret;
    const erEndringGyldig = erTimerGyldigInnenforAntallDager(faktisk, uke.antallDagerMedArbeidstid);

    return (
        <div className="endretArbeidstid">
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
                    <IconText
                        icon={
                            <XMarkOctagonFillIcon style={{ color: '#C30000' }} role="presentation" aria-hidden="true" />
                        }>
                        For mange timer
                    </IconText>
                </div>
            )}
        </div>
    );
};

export default ArbeidstidUkeInfo;
