import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { DateRange } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import { Element, Normaltekst } from 'nav-frontend-typografi';

interface Props {
    headingLevel: number;
    måned: DateRange;
    antallDagerMedTid: number;
}

const ArbeidstidMånedTittel: React.FunctionComponent<Props> = ({ headingLevel, måned, antallDagerMedTid }) => {
    const intl = useIntl();
    return (
        <Element tag={`h${headingLevel}`}>
            <span className="m-caps">
                {intlHelper(intl, 'arbeidstidMånedTittel.ukeOgÅr', {
                    ukeOgÅr: dayjs(måned.from).format('MMMM YYYY'),
                })}
            </span>
            <Normaltekst tag="div">
                {antallDagerMedTid === 0 ? (
                    <FormattedMessage id="arbeidstidMånedTittel.iPeriodePanel.info.ingenDager" />
                ) : (
                    <FormattedMessage
                        id="arbeidstidMånedTittel.iPeriodePanel.info"
                        values={{ dager: antallDagerMedTid }}
                    />
                )}
            </Normaltekst>
        </Element>
    );
};

export default ArbeidstidMånedTittel;
