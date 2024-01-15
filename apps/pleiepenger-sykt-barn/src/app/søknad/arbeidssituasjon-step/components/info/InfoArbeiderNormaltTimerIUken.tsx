import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { Frilanstype } from '../../../../types/søknad-form-values/FrilansFormValues';
import { BodyShort } from '@navikt/ds-react';

export const InfoArbeiderNormaltTimerAnsatt = () => {
    const intl = useIntl();
    return (
        <ExpandableInfo title={intlHelper(intl, 'arbeidsforhold.ansatt.normalTimer.info.tittel')}>
            <p>
                <FormattedMessage id={`arbeidsforhold.normalTimer.info.turnus`} />
            </p>

            <ExpandableInfo title={intlHelper(intl, 'arbeidsforhold.normalTimer.info.turnus.tittel')}>
                <FormattedMessage id={'arbeidsforhold.normalTimer.info.turnus.avsnitt.1'} />
                <p>
                    <strong>
                        <FormattedMessage id={'arbeidsforhold.normalTimer.info.turnus.avsnitt.2'} />
                    </strong>
                </p>
                <p>
                    <FormattedMessage id={'arbeidsforhold.normalTimer.info.turnus.avsnitt.3'} />
                </p>
                <p>
                    <FormattedMessage id={'arbeidsforhold.normalTimer.info.turnus.avsnitt.4'} />
                    <br />
                    <FormattedMessage id={'arbeidsforhold.normalTimer.info.turnus.avsnitt.4a'} />
                    <br />
                    <FormattedMessage id={'arbeidsforhold.normalTimer.info.turnus.avsnitt.4b'} />
                </p>
                <p>
                    <FormattedMessage id={'arbeidsforhold.normalTimer.info.turnus.avsnitt.5'} />
                </p>
            </ExpandableInfo>
            <ExpandableInfo title={intlHelper(intl, 'arbeidsforhold.normalTimer.info.varierende.tittel')}>
                <FormattedMessage id={'arbeidsforhold.normalTimer.info.varierende.avsnitt.1'} />

                <p>
                    <strong>
                        <FormattedMessage id={'arbeidsforhold.normalTimer.info.varierende.avsnitt.2'} />
                    </strong>
                </p>
                <p>
                    <FormattedMessage id={'arbeidsforhold.normalTimer.info.varierende.avsnitt.3'} />
                </p>
                <p>
                    <FormattedMessage id={'arbeidsforhold.normalTimer.info.varierende.avsnitt.4'} />
                </p>
                <p>
                    <strong>
                        <FormattedMessage id={'arbeidsforhold.normalTimer.info.varierende.avsnitt.5'} />
                    </strong>
                </p>
                <p>
                    <FormattedMessage id={'arbeidsforhold.normalTimer.info.varierende.avsnitt.6'} />
                </p>
            </ExpandableInfo>
        </ExpandableInfo>
    );
};

interface PropsFrilans {
    frilanstype: Frilanstype;
    mottarOmsorgsstønadFosterhjemsgodtgjørelse?: boolean;
}

export const InfoArbeiderNormaltTimerFrilanser: React.FunctionComponent<PropsFrilans> = ({
    frilanstype,
    mottarOmsorgsstønadFosterhjemsgodtgjørelse,
}) => {
    const intl = useIntl();
    return (
        <>
            {mottarOmsorgsstønadFosterhjemsgodtgjørelse && (
                <BodyShort spacing={false}>
                    <FormattedMessage id="arbeidsforhold.frilanser.normalTimer.frilans.omsorgsstønad" />
                </BodyShort>
            )}
            <Block margin="m">
                <ExpandableInfo title={intlHelper(intl, 'arbeidsforhold.frilanser.normalTimer.frilans.info.tittel')}>
                    <p>
                        <FormattedMessage id={`arbeidsforhold.frilanser.normalTimer.frilans.${frilanstype}.info.1`} />
                    </p>
                    <p>
                        <FormattedMessage id={`arbeidsforhold.frilanser.normalTimer.frilans.${frilanstype}.info.2`} />
                    </p>
                    {frilanstype === Frilanstype.FRILANS_HONORAR && (
                        <>
                            <p>
                                <strong>
                                    <FormattedMessage
                                        id={`arbeidsforhold.frilanser.normalTimer.frilans.${frilanstype}.info.3`}
                                    />
                                </strong>
                            </p>
                            <p>
                                <FormattedMessage
                                    id={`arbeidsforhold.frilanser.normalTimer.frilans.${frilanstype}.info.4`}
                                />
                            </p>
                        </>
                    )}
                </ExpandableInfo>
            </Block>
        </>
    );
};

export const InfoArbeiderNormaltTimerSN = () => {
    const intl = useIntl();
    return (
        <ExpandableInfo title={intlHelper(intl, 'arbeidsforhold.selvstendig.normalTimer.info.tittel')}>
            <p>
                <FormattedMessage id={`arbeidsforhold.normalTimer.info.turnus`} />
            </p>

            <ExpandableInfo title={intlHelper(intl, 'arbeidsforhold.normalTimer.info.turnus.tittel')}>
                <FormattedMessage id={'arbeidsforhold.normalTimer.info.turnus.avsnitt.1'} />

                <p>
                    <strong>
                        <FormattedMessage id={'arbeidsforhold.normalTimer.info.turnus.avsnitt.2'} />
                    </strong>
                </p>
                <p>
                    <FormattedMessage id={'arbeidsforhold.normalTimer.info.turnus.avsnitt.3'} />
                </p>
                <p>
                    <FormattedMessage id={'arbeidsforhold.normalTimer.info.turnus.avsnitt.4'} />
                    <br />
                    <FormattedMessage id={'arbeidsforhold.normalTimer.info.turnus.avsnitt.4a'} />
                    <br />
                    <FormattedMessage id={'arbeidsforhold.normalTimer.info.turnus.avsnitt.4b'} />
                </p>
                <p>
                    <FormattedMessage id={'arbeidsforhold.normalTimer.info.turnus.avsnitt.5'} />
                </p>
            </ExpandableInfo>
            <ExpandableInfo title={intlHelper(intl, 'arbeidsforhold.normalTimer.info.varierende.tittel')}>
                <FormattedMessage id={'arbeidsforhold.normalTimer.info.varierende.avsnitt.1'} />

                <p>
                    <strong>
                        <FormattedMessage id={'arbeidsforhold.normalTimer.info.varierende.avsnitt.2'} />
                    </strong>
                </p>
                <p>
                    <FormattedMessage id={'arbeidsforhold.normalTimer.info.varierende.avsnitt.3'} />
                </p>
                <p>
                    <FormattedMessage id={'arbeidsforhold.normalTimer.info.varierende.avsnitt.4'} />
                </p>
                <p>
                    <strong>
                        <FormattedMessage id={'arbeidsforhold.normalTimer.info.varierende.avsnitt.5'} />
                    </strong>
                </p>
                <p>
                    <FormattedMessage id={'arbeidsforhold.normalTimer.info.varierende.avsnitt.6'} />
                </p>
            </ExpandableInfo>
        </ExpandableInfo>
    );
};
