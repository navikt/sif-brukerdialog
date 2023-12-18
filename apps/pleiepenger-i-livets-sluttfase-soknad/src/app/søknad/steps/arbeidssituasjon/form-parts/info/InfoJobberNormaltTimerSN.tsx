import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { FormattedMessage, useIntl } from 'react-intl';

const InfoJobberNormaltTimerSN = () => {
    const intl = useIntl();
    return (
        <ExpandableInfo title={intlHelper(intl, 'arbeidsforhold.normalTimer.info.tittel')}>
            <FormattedMessage id={`arbeidsforhold.selvstendig.normalTimer.info`} />

            <ul style={{ paddingInlineStart: '20px' }}>
                <li>
                    <FormattedMessage id={'arbeidsforhold.normalTimer.info.list.item.1'} />
                </li>
                <li>
                    <FormattedMessage id={'arbeidsforhold.normalTimer.info.list.item.2'} />
                </li>
            </ul>
            <ExpandableInfo title={intlHelper(intl, 'arbeidsforhold.normalTimer.info.turnus.tittel')}>
                <FormattedMessage id={'arbeidsforhold.normalTimer.info.turnus.avsnitt.1'} />

                <p>
                    <FormattedMessage id={'arbeidsforhold.normalTimer.info.turnus.avsnitt.2'} />
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
                    <FormattedMessage id={'arbeidsforhold.normalTimer.info.varierende.avsnitt.2'} />
                </p>
                <p>
                    <FormattedMessage id={'arbeidsforhold.normalTimer.info.varierende.avsnitt.3'} />
                </p>
                <p>
                    <FormattedMessage id={'arbeidsforhold.normalTimer.info.varierende.avsnitt.4'} />
                </p>
                <p>
                    <FormattedMessage id={'arbeidsforhold.normalTimer.info.varierende.avsnitt.5'} />
                </p>
                <p>
                    <FormattedMessage id={'arbeidsforhold.normalTimer.info.varierende.avsnitt.6'} />
                </p>
            </ExpandableInfo>
        </ExpandableInfo>
    );
};

export default InfoJobberNormaltTimerSN;
