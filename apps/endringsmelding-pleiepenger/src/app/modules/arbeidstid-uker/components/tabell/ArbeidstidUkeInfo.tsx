import IconText from '@app/components/icon-text/IconText';
import { erTimerGyldigInnenforAntallDager } from '@app/utils';
import { XMarkOctagonFillIcon } from '@navikt/aksel-icons';
import { Box } from '@navikt/ds-react';
import AriaText from '@navikt/sif-common-core-ds/src/atoms/aria-text/AriaText';
import { DurationText } from '@navikt/sif-common-ui';

import { erArbeidstidUkeItemEndret } from '../../arbeidstidUkerUtils';
import { ArbeidstidUkerItem } from '../../types/ArbeidstidUkerItem';

interface Props {
    uke: ArbeidstidUkerItem;
    visEndringSomOpprinnelig?: boolean;
}

const ArbeidstidUkeInfo = ({ uke, visEndringSomOpprinnelig }: Props) => {
    const { opprinnelig, endret, antallDagerMedArbeidstid } = uke;

    if (!endret || visEndringSomOpprinnelig || !erArbeidstidUkeItemEndret(uke)) {
        const faktisk = endret?.faktisk ?? opprinnelig.faktisk;
        return <span data-testid="timer-faktisk">{faktisk && <DurationText duration={faktisk} />}</span>;
    }

    return (
        <>
            <strong className="arbeidstidUkeInfo__timer" data-testid="timer-faktisk">
                <DurationText duration={endret.faktisk} />
            </strong>
            <div className="arbeidstidUkeInfo__opprinnelig">
                <AriaText>Endret fra </AriaText>
                <span className="arbeidstidUkeInfo__timer" data-testid="timer-opprinnelig">
                    {opprinnelig.faktisk && <DurationText duration={opprinnelig.faktisk} />}
                </span>
            </div>
            {!erTimerGyldigInnenforAntallDager(endret.faktisk, antallDagerMedArbeidstid) && (
                <Box marginBlock="space-4 space-0">
                    <IconText
                        icon={
                            <XMarkOctagonFillIcon style={{ color: '#C30000' }} role="presentation" aria-hidden="true" />
                        }>
                        For mange timer
                    </IconText>
                </Box>
            )}
        </>
    );
};

export default ArbeidstidUkeInfo;
