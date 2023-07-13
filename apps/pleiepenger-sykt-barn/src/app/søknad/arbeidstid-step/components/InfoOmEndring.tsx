import React from 'react';
import { useIntl } from 'react-intl';
import FormattedHtmlMessage from '@navikt/sif-common-core-ds/lib/atoms/formatted-html-message/FormattedHtmlMessage';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { ArbeidsaktivitetType } from '../ArbeidstidStep';

interface Props {
    arbeidsaktivitetType: ArbeidsaktivitetType;
}

const InfoOmEndring: React.FunctionComponent<Props> = ({ arbeidsaktivitetType }) => {
    const intl = useIntl();
    switch (arbeidsaktivitetType) {
        case ArbeidsaktivitetType.ANSATT:
        case ArbeidsaktivitetType.FRILANSARBEID:
        case ArbeidsaktivitetType.HONORARARBEID:
            return (
                <ExpandableInfo title={intlHelper(intl, 'arbeidIPeriode.redusert.endring.tittel')}>
                    <FormattedHtmlMessage id="arbeidIPeriode.redusert.endring.arb_frilans.tekst" />
                </ExpandableInfo>
            );
        case ArbeidsaktivitetType.SELVSTENDING:
            return (
                <ExpandableInfo title={intlHelper(intl, 'arbeidIPeriode.redusert.endring.tittel')}>
                    <FormattedHtmlMessage id="arbeidIPeriode.redusert.endring.sn.tekst" />
                </ExpandableInfo>
            );
    }
};

export default InfoOmEndring;
