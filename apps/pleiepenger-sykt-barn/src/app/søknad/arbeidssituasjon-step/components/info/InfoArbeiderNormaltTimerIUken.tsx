import { useAppIntl } from '@i18n/index';
import { BodyShort } from '@navikt/ds-react';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';

import { AppText } from '../../../../i18n';
import { Frilanstype } from '../../../../types/søknad-form-values/FrilansFormValues';

export const InfoArbeiderNormaltTimerAnsatt = () => {
    const { text } = useAppIntl();
    return (
        <ExpandableInfo title={text('arbeidsforhold.ansatt.normalTimer.info.tittel')}>
            <p>
                <AppText id="arbeidsforhold.normalTimer.info.turnus" />
            </p>

            <ExpandableInfo title={text('arbeidsforhold.normalTimer.info.turnus.tittel')}>
                <AppText id="arbeidsforhold.normalTimer.info.turnus.avsnitt.1" />
                <p>
                    <strong>
                        <AppText id="arbeidsforhold.normalTimer.info.turnus.avsnitt.2" />
                    </strong>
                </p>
                <p>
                    <AppText id="arbeidsforhold.normalTimer.info.turnus.avsnitt.3" />
                </p>
                <p>
                    <AppText id="arbeidsforhold.normalTimer.info.turnus.avsnitt.4" />
                    <br />
                    <AppText id="arbeidsforhold.normalTimer.info.turnus.avsnitt.4a" />
                    <br />
                    <AppText id="arbeidsforhold.normalTimer.info.turnus.avsnitt.4b" />
                </p>
                <p>
                    <AppText id="arbeidsforhold.normalTimer.info.turnus.avsnitt.5" />
                </p>
            </ExpandableInfo>
            <ExpandableInfo title={text('arbeidsforhold.normalTimer.info.varierende.tittel')}>
                <AppText id="arbeidsforhold.normalTimer.info.varierende.avsnitt.1" />

                <p>
                    <strong>
                        <AppText id="arbeidsforhold.normalTimer.info.varierende.avsnitt.2" />
                    </strong>
                </p>
                <p>
                    <AppText id="arbeidsforhold.normalTimer.info.varierende.avsnitt.3" />
                </p>
                <p>
                    <AppText id="arbeidsforhold.normalTimer.info.varierende.avsnitt.4" />
                </p>
                <p>
                    <strong>
                        <AppText id="arbeidsforhold.normalTimer.info.varierende.avsnitt.5" />
                    </strong>
                </p>
                <p>
                    <AppText id="arbeidsforhold.normalTimer.info.varierende.avsnitt.6" />
                </p>
            </ExpandableInfo>
        </ExpandableInfo>
    );
};

interface PropsFrilans {
    frilanstype: Frilanstype;
    mottarOmsorgsstønadFosterhjemsgodtgjørelse?: boolean;
}

export const InfoArbeiderNormaltTimerFrilanser = ({
    frilanstype,
    mottarOmsorgsstønadFosterhjemsgodtgjørelse,
}: PropsFrilans) => {
    const { text } = useAppIntl();
    return (
        <>
            {mottarOmsorgsstønadFosterhjemsgodtgjørelse && (
                <BodyShort spacing={true}>
                    <AppText id="arbeidsforhold.frilanser.normalTimer.frilans.omsorgsstønad" />
                </BodyShort>
            )}

            <ExpandableInfo title={text('arbeidsforhold.frilanser.normalTimer.frilans.info.tittel')}>
                <p>
                    <AppText id={`arbeidsforhold.frilanser.normalTimer.frilans.${frilanstype}.info.1`} />
                </p>
                <p>
                    <AppText id={`arbeidsforhold.frilanser.normalTimer.frilans.${frilanstype}.info.2`} />
                </p>
                {frilanstype === Frilanstype.FRILANS_HONORAR && (
                    <>
                        <p>
                            <strong>
                                <AppText id={`arbeidsforhold.frilanser.normalTimer.frilans.${frilanstype}.info.3`} />
                            </strong>
                        </p>
                        <p>
                            <AppText id={`arbeidsforhold.frilanser.normalTimer.frilans.${frilanstype}.info.4`} />
                        </p>
                    </>
                )}
            </ExpandableInfo>
        </>
    );
};

export const InfoArbeiderNormaltTimerSN = () => {
    const { text } = useAppIntl();
    return (
        <ExpandableInfo title={text('arbeidsforhold.selvstendig.normalTimer.info.tittel')}>
            <p>
                <AppText id="arbeidsforhold.normalTimer.info.turnus" />
            </p>

            <ExpandableInfo title={text('arbeidsforhold.normalTimer.info.turnus.tittel')}>
                <AppText id="arbeidsforhold.normalTimer.info.turnus.avsnitt.1" />

                <p>
                    <strong>
                        <AppText id="arbeidsforhold.normalTimer.info.turnus.avsnitt.2" />
                    </strong>
                </p>
                <p>
                    <AppText id="arbeidsforhold.normalTimer.info.turnus.avsnitt.3" />
                </p>
                <p>
                    <AppText id="arbeidsforhold.normalTimer.info.turnus.avsnitt.4" />
                    <br />
                    <AppText id="arbeidsforhold.normalTimer.info.turnus.avsnitt.4a" />
                    <br />
                    <AppText id="arbeidsforhold.normalTimer.info.turnus.avsnitt.4b" />
                </p>
                <p>
                    <AppText id="arbeidsforhold.normalTimer.info.turnus.avsnitt.5" />
                </p>
            </ExpandableInfo>
            <ExpandableInfo title={text('arbeidsforhold.normalTimer.info.varierende.tittel')}>
                <AppText id="arbeidsforhold.normalTimer.info.varierende.avsnitt.1" />

                <p>
                    <strong>
                        <AppText id="arbeidsforhold.normalTimer.info.varierende.avsnitt.2" />
                    </strong>
                </p>
                <p>
                    <AppText id="arbeidsforhold.normalTimer.info.varierende.avsnitt.3" />
                </p>
                <p>
                    <AppText id="arbeidsforhold.normalTimer.info.varierende.avsnitt.4" />
                </p>
                <p>
                    <strong>
                        <AppText id="arbeidsforhold.normalTimer.info.varierende.avsnitt.5" />
                    </strong>
                </p>
                <p>
                    <AppText id="arbeidsforhold.normalTimer.info.varierende.avsnitt.6" />
                </p>
            </ExpandableInfo>
        </ExpandableInfo>
    );
};
