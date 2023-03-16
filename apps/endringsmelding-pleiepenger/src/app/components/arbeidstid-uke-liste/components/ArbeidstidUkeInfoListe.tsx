import React from 'react';
import { useIntl } from 'react-intl';
import AriaText from '@navikt/sif-common-core-ds/lib/components/aria/AriaText';
import DurationText from '@navikt/sif-common-core-ds/lib/components/duration-text/DurationText';
import BemUtils from '@navikt/sif-common-core-ds/lib/utils/bemUtils';
import { ArbeidstidUkeTabellItem } from '../ArbeidstidUkeTabell';
import DagerMedFerieTags from './FeriedagerTags';

interface Props {
    uke: ArbeidstidUkeTabellItem;
    dagerMedFerie?: Date[];
    dagerMedFjernetFerie?: Date[];
}

const bem = BemUtils('endretArbeidstid');

const ArbeidstidUkeInfoListe: React.FunctionComponent<Props> = ({
    uke,
    dagerMedFerie = [],
    dagerMedFjernetFerie = [],
}) => {
    const intl = useIntl();

    if (uke.endret === undefined) {
        return (
            <div className="arbeidstidInfoListe">
                <p>
                    <span className="arbeidstidInfoListe__label">Normal arbeidstid:</span>
                    <span className="arbeidstidInfoListe__value">
                        <DurationText duration={uke.opprinnelig.normalt} />
                    </span>
                </p>
                <p>
                    <span className="arbeidstidInfoListe__label">Arbeid i perioden:</span>
                    <span className="arbeidstidInfoListe__value">
                        <DurationText duration={uke.opprinnelig.faktisk} />
                    </span>
                </p>
                <DagerMedFerieTags dagerMedFerie={dagerMedFerie} dagerMedFjernetFerie={dagerMedFjernetFerie} />
            </div>
        );
    }

    return (
        <div className="arbeidstidInfoListe">
            <p>
                <span className="arbeidstidInfoListe__label">Normal arbeidstid:</span>
                <span className="arbeidstidInfoListe__value">
                    <DurationText duration={uke.opprinnelig.normalt} />
                </span>
            </p>
            <p>
                <span className="arbeidstidInfoListe__label">Arbeid i perioden:</span>
                <span className="arbeidstidInfoListe__value" data-testid="timer-faktisk">
                    <>
                        <strong>
                            <DurationText duration={uke.endret.faktisk} />
                        </strong>
                        {uke.endret.endretProsent !== undefined && (
                            <span className={bem.element('prosent')}>
                                {' '}
                                ({intl.formatNumber(uke.endret.endretProsent)} %)
                            </span>
                        )}
                    </>
                    <br />
                    <span className={bem.element('opprinnelig')}>
                        <AriaText>Endret fra </AriaText>
                        <span className={bem.element('timer')} data-testid="timer-opprinnelig">
                            <DurationText duration={uke.opprinnelig.faktisk} />
                        </span>
                    </span>
                </span>
            </p>
        </div>
    );
};

export default ArbeidstidUkeInfoListe;
