import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { ArbeidsforholdType } from '../../../../local-sif-common-pleiepenger';
import { FrilansTyper } from '../../../../types/FrilansFormData';

interface Props {
    arbeidsforholdType: ArbeidsforholdType;
    frilansTyper?: FrilansTyper[];
    misterHonorarStyreverv?: YesOrNo;
}

const InfoArbeiderNormaltTimerIUken: React.FunctionComponent<Props> = ({
    arbeidsforholdType,
    frilansTyper,
    misterHonorarStyreverv,
}) => {
    switch (arbeidsforholdType) {
        case ArbeidsforholdType.ANSATT:
            return <InfoArbeiderNormaltTimerAnsatt />;
        case ArbeidsforholdType.FRILANSER:
            return (
                <InfoArbeiderNormaltTimerFrilanser
                    frilansTyper={frilansTyper}
                    misterHonorarStyreverv={misterHonorarStyreverv}
                />
            );
        case ArbeidsforholdType.SELVSTENDIG:
            return <InfoArbeiderNormaltTimerSN />;
    }
};

const InfoArbeiderNormaltTimerAnsatt = () => {
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
    frilansTyper?: FrilansTyper[];
    misterHonorarStyreverv?: YesOrNo;
}

const InfoArbeiderNormaltTimerFrilanser = ({ frilansTyper, misterHonorarStyreverv }: PropsFrilans) => {
    const intl = useIntl();
    if (frilansTyper === undefined) {
        <></>;
    }
    return (
        <>
            <Block margin="l">
                {frilansTyper && frilansTyper.some((type) => type === FrilansTyper.FRILANS) && (
                    <ExpandableInfo
                        title={intlHelper(intl, 'arbeidsforhold.frilanser.normalTimer.frilans.info.tittel')}>
                        <FormattedMessage id={'arbeidsforhold.frilanser.normalTimer.frilans.info'} />
                    </ExpandableInfo>
                )}

                {frilansTyper &&
                    frilansTyper.some((type) => type === FrilansTyper.STYREVERV) &&
                    misterHonorarStyreverv === YesOrNo.YES && (
                        <ExpandableInfo
                            title={intlHelper(intl, 'arbeidsforhold.frilanser.normalTimer.styreverv.info.tittel')}>
                            <p>
                                <FormattedMessage id={'arbeidsforhold.frilanser.normalTimer.styreverv.info.1'} />
                            </p>
                            <p>
                                <FormattedMessage id={'arbeidsforhold.frilanser.normalTimer.styreverv.info.2'} />
                            </p>
                        </ExpandableInfo>
                    )}
            </Block>
        </>
    );
};

const InfoArbeiderNormaltTimerSN = () => {
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

export default InfoArbeiderNormaltTimerIUken;
