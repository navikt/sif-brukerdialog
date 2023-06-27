import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { Frilanstype } from '../../../../types/FrilansFormData';

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
    frilanstyper?: Frilanstype[];
    misterHonorar?: YesOrNo;
}

export const InfoArbeiderNormaltTimerFrilanser: React.FunctionComponent<PropsFrilans> = ({
    frilanstyper,
    misterHonorar,
}) => {
    const intl = useIntl();
    if (frilanstyper === undefined) {
        <></>;
    }
    return (
        <>
            <Block margin="l">
                {frilanstyper && frilanstyper.some((type) => type === Frilanstype.FRILANSARBEID) && (
                    <ExpandableInfo
                        title={intlHelper(intl, 'arbeidsforhold.frilanser.normalTimer.frilansarbeid.info.tittel')}>
                        <FormattedMessage id={'arbeidsforhold.frilanser.normalTimer.frilansarbeid.info'} />
                    </ExpandableInfo>
                )}

                {frilanstyper &&
                    frilanstyper.some((type) => type === Frilanstype.HONORARARBEID) &&
                    misterHonorar === YesOrNo.YES && (
                        <ExpandableInfo
                            title={intlHelper(intl, 'arbeidsforhold.frilanser.normalTimer.honorararbeid.info.tittel')}>
                            <p>
                                <FormattedMessage id={'arbeidsforhold.frilanser.normalTimer.honorararbeid.info.1'} />
                            </p>
                            <p>
                                <FormattedMessage id={'arbeidsforhold.frilanser.normalTimer.honorararbeid.info.2'} />
                            </p>
                        </ExpandableInfo>
                    )}
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
