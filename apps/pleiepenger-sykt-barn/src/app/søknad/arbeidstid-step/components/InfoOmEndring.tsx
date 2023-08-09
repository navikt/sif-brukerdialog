import React from 'react';
import { useIntl } from 'react-intl';
import FormattedHtmlMessage from '@navikt/sif-common-core-ds/lib/atoms/formatted-html-message/FormattedHtmlMessage';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { ArbeidsforholdType } from '../../../local-sif-common-pleiepenger';

interface Props {
    arbeidsforholdType: ArbeidsforholdType;
}

const InfoOmEndring: React.FunctionComponent<Props> = ({ arbeidsforholdType }) => {
    const intl = useIntl();
    switch (arbeidsforholdType) {
        case ArbeidsforholdType.ANSATT:
        case ArbeidsforholdType.FRILANSER:
            return (
                <ExpandableInfo title={intlHelper(intl, 'arbeidIPeriode.redusert.endring.tittel')}>
                    <FormattedHtmlMessage id="arbeidIPeriode.redusert.endring.arb_frilans.tekst" />
                </ExpandableInfo>
            );
        case ArbeidsforholdType.SELVSTENDIG:
            return (
                <ExpandableInfo title={intlHelper(intl, 'arbeidIPeriode.redusert.endring.tittel')}>
                    <FormattedHtmlMessage id="arbeidIPeriode.redusert.endring.sn.tekst" />
                </ExpandableInfo>
            );
    }
};

export default InfoOmEndring;
