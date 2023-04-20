import { BodyShort } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import { ErrorColored } from '@navikt/ds-icons';
import AriaText from '@navikt/sif-common-core-ds/lib/atoms/aria-text/AriaText';
import DurationText from '@navikt/sif-common-core-ds/lib/components/duration-text/DurationText';
import BemUtils from '@navikt/sif-common-core-ds/lib/utils/bemUtils';
import { erTimerGyldigInnenforAntallDager } from '../../../utils/beregnUtils';
import IconText from '../../../components/icon-text/IconText';
import { ArbeidstidUkeTabellItem } from '../ArbeidstidUkeTabell';

interface Props {
    uke: ArbeidstidUkeTabellItem;
    visOpprinneligTid?: boolean;
    medLabels?: boolean;
}

const bem = BemUtils('endretArbeidstid');

const ArbeidstidUkeInfo: React.FunctionComponent<Props> = ({ uke, visOpprinneligTid = true, medLabels = false }) => {
    const intl = useIntl();
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
    const erEndringGyldig = erTimerGyldigInnenforAntallDager(faktisk, uke.antallDagerMedArbeidstid);
    return (
        <div className={bem.block}>
            <div className={bem.element('faktisk')}>
                {medLabels && <BodyShort size="small">Jobber i perioden:</BodyShort>}
                <strong className={bem.element('timer')} data-testid="timer-faktisk">
                    <DurationText duration={faktisk} />
                </strong>
                {endretProsent !== undefined && (
                    <span className={bem.element('prosent')}> ({intl.formatNumber(endretProsent)} %)</span>
                )}
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
            {erEndringGyldig === false && (
                <div style={{ marginTop: '0.25rem' }}>
                    <IconText icon={<ErrorColored role="presentation" aria-hidden="true" />}>For mange timer</IconText>
                </div>
            )}
        </div>
    );
};

export default ArbeidstidUkeInfo;
