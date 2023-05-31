import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import FormattedHtmlMessage from '@navikt/sif-common-core-ds/lib/atoms/formatted-html-message/FormattedHtmlMessage';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import React from 'react';
import { useIntl } from 'react-intl';

interface Props {
    aktivitetType: 'arbeidstaker' | 'frilans' | 'sn';
}

const InfoOmEndring: React.FunctionComponent<Props> = ({ aktivitetType }) => {
    const intl = useIntl();
    switch (aktivitetType) {
        case 'arbeidstaker':
        case 'frilans':
            return (
                <ExpandableInfo title={intlHelper(intl, 'arbeidIPeriode.redusert.endring.tittel')}>
                    <FormattedHtmlMessage id="arbeidIPeriode.redusert.endring.arb_frilans.tekst" />
                </ExpandableInfo>
            );
        case 'sn':
            return (
                <ExpandableInfo title={intlHelper(intl, 'arbeidIPeriode.redusert.endring.tittel')}>
                    <FormattedHtmlMessage id="arbeidIPeriode.redusert.endring.sn.tekst" />
                </ExpandableInfo>
            );
    }
};

export default InfoOmEndring;
