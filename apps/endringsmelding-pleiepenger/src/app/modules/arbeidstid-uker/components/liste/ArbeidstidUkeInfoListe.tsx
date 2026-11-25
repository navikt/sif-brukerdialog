import IconText from '@app/components/icon-text/IconText';
import { AppText } from '@app/i18n';
import { erTimerGyldigInnenforAntallDager } from '@app/utils';
import { XMarkOctagonFillIcon } from '@navikt/aksel-icons';
import AriaText from '@navikt/sif-common-core-ds/src/atoms/aria-text/AriaText';
import { DurationText } from '@navikt/sif-common-ui';

import { erArbeidstidUkeItemEndret } from '../../arbeidstidUkerUtils';
import { ArbeidstidUkerItem } from '../../types/ArbeidstidUkerItem';

interface Props {
    uke: ArbeidstidUkerItem;
    visEndringSomOpprinnelig?: boolean;
    visNormalarbeidstid?: boolean;
}

const ArbeidstidUkeInfoListe = ({ uke, visEndringSomOpprinnelig, visNormalarbeidstid = false }: Props) => {
    const normalarbeidstid = visNormalarbeidstid ? (
        <div>
            <div className="arbeidstidUkeInfoListe__label">
                <AppText id="arbeidstidUkeInfoListe.normalArbeidstid" />
            </div>
            <div className="arbeidstidUkeInfoListe__value">
                <DurationText duration={uke.opprinnelig.normalt} />
            </div>
        </div>
    ) : null;

    if (uke.endret === undefined || visEndringSomOpprinnelig) {
        return (
            <div className="arbeidstidUkeInfoListe">
                {normalarbeidstid}
                <div>
                    <div className="arbeidstidUkeInfoListe__label">
                        <AppText id="arbeidstidUkeInfoListe.arbeidstid" />
                    </div>
                    <div className="arbeidstidUkeInfoListe__value">
                        {uke.endret === undefined && uke.opprinnelig.faktisk && (
                            <DurationText duration={uke.opprinnelig.faktisk} />
                        )}
                        {uke.endret !== undefined && uke.endret.faktisk && (
                            <DurationText duration={uke.endret.faktisk} />
                        )}
                    </div>
                </div>
            </div>
        );
    }

    const erEndret = erArbeidstidUkeItemEndret(uke);

    const erEndringGyldig = erTimerGyldigInnenforAntallDager(uke.endret.faktisk, uke.antallDagerMedArbeidstid);
    return (
        <div className="arbeidstidUkeInfoListe">
            {normalarbeidstid}
            <div>
                <div className="arbeidstidUkeInfoListe__label">
                    <AppText id="arbeidstidUkeInfoListe.arbeidstid" />
                </div>
                <div className="arbeidstidUkeInfoListe__value" data-testid="timer-faktisk">
                    <strong>
                        <DurationText duration={uke.endret.faktisk} />
                    </strong>
                    {erEndret && (
                        <div className="arbeidstidUkeInfoListe__opprinnelig">
                            <AriaText>
                                <AppText id="arbeidstidUkeInfoListe.endretFra" />{' '}
                            </AriaText>
                            <div className="arbeidstidUkeInfoListe__timer" data-testid="timer-opprinnelig">
                                {uke.opprinnelig.faktisk && <DurationText duration={uke.opprinnelig.faktisk} />}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {erEndringGyldig === false && (
                <div style={{ marginTop: '0.25rem' }}>
                    <IconText
                        icon={
                            <XMarkOctagonFillIcon style={{ color: '#C30000' }} role="presentation" aria-hidden="true" />
                        }>
                        <AppText id="arbeidstidUkeInfoListe.forMangeTimer" />
                    </IconText>
                </div>
            )}
        </div>
    );
};

export default ArbeidstidUkeInfoListe;
