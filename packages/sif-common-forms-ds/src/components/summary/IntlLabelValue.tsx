import React from 'react';
import { useIntl } from 'react-intl';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';

interface Props {
    labelKey: string;
    children: React.ReactNode;
}

const bem = bemUtils('summaryLabelValue');

const IntlLabelValue: React.FunctionComponent<Props> = ({ labelKey: intlLabelKey, children }) => {
    const intl = useIntl();
    return (
        <div className={bem.block}>
            <span className={bem.element('label')}>{intlHelper(intl, intlLabelKey)}:</span>{' '}
            <span className={bem.element('value')}>{children}</span>
        </div>
    );
};

export default IntlLabelValue;
