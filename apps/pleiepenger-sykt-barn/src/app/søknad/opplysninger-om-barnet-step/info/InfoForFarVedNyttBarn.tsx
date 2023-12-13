import { FormattedMessage, useIntl } from 'react-intl';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { Link } from '@navikt/ds-react';

const InfoForFarVedNyttBarn = () => {
    const intl = useIntl();
    return (
        <ExpandableInfo title={intlHelper(intl, 'infoForFarVedNyttBarn.tittel')}>
            <p>
                <FormattedMessage id="infoForFarVedNyttBarn.info.1.1" />{' '}
                <Link href="https://farskapsportal.nav.no/nb/" target="_blank">
                    <FormattedMessage id="infoForFarVedNyttBarn.info.1.2" />
                </Link>
                <FormattedMessage id="infoForFarVedNyttBarn.info.1.3" />
            </p>
            <p>
                <FormattedMessage id="infoForFarVedNyttBarn.info.2" />
            </p>
        </ExpandableInfo>
    );
};
export default InfoForFarVedNyttBarn;
