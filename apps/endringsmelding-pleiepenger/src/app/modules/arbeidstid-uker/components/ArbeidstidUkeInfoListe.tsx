import React from 'react';
import { useIntl } from 'react-intl';
import { ErrorColored } from '@navikt/ds-icons';
import AriaText from '@navikt/sif-common-core-ds/src/atoms/aria-text/AriaText';
import { DurationText } from '@navikt/sif-common-ui';
import { erTimerGyldigInnenforAntallDager } from '@utils';
import IconText from '../../../components/icon-text/IconText';
import { ArbeidstidUkerItem } from '../types/ArbeidstidUkerItem';
import { erArbeidstidUkeItemEndret } from '../arbeidstidUkerUtils';

interface Props {
    uke: ArbeidstidUkerItem;
    visEndringSomOpprinnelig?: boolean;
}

const ArbeidstidUkeInfoListe: React.FunctionComponent<Props> = ({ uke, visEndringSomOpprinnelig }) => {
    const intl = useIntl();

    if (uke.endret === undefined || visEndringSomOpprinnelig) {
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
                        {uke.endret === undefined && uke.opprinnelig.faktisk && (
                            <DurationText duration={uke.opprinnelig.faktisk} />
                        )}
                        {uke.endret !== undefined && uke.endret.faktisk && (
                            <>
                                <DurationText duration={uke.endret.faktisk} />
                                {uke.endret && uke.endret.endretProsent !== undefined && (
                                    <span className={'endretArbeidstid__prosent'}>
                                        {' '}
                                        ({intl.formatNumber(uke.endret.endretProsent)} %)
                                    </span>
                                )}
                            </>
                        )}
                    </span>
                </p>
            </div>
        );
    }

    const erEndret = erArbeidstidUkeItemEndret(uke);

    const erEndringGyldig = erTimerGyldigInnenforAntallDager(uke.endret.faktisk, uke.antallDagerMedArbeidstid);
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
                        {erEndret && uke.endret.endretProsent !== undefined && (
                            <span className={'endretArbeidstid__prosent'}>
                                {' '}
                                ({intl.formatNumber(uke.endret.endretProsent)} %)
                            </span>
                        )}
                    </>
                    {erEndret && (
                        <span className={'endretArbeidstid__opprinnelig'}>
                            <AriaText>Endret fra </AriaText>
                            <span className={'endretArbeidstid__timer'} data-testid="timer-opprinnelig">
                                {uke.opprinnelig.faktisk && <DurationText duration={uke.opprinnelig.faktisk} />}
                            </span>
                        </span>
                    )}
                </span>
            </p>
            {erEndringGyldig === false && (
                <div style={{ marginTop: '0.25rem' }}>
                    <IconText icon={<ErrorColored role="presentation" aria-hidden="true" />}>For mange timer</IconText>
                </div>
            )}
        </div>
    );
};

export default ArbeidstidUkeInfoListe;
