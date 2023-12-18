import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { DateRange } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { Heading, BodyShort } from '@navikt/ds-react';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';

interface Props {
    måned: DateRange;
    antallDagerMedTid: number;
}

const ArbeidstidMånedTittel: React.FunctionComponent<Props> = ({ måned, antallDagerMedTid }) => {
    const intl = useIntl();

    return (
        <Heading level={'4'} size="small">
            <span className="m-caps">
                {intlHelper(intl, 'arbeidstidMånedTittel.ukeOgÅr', {
                    ukeOgÅr: dayjs(måned.from).format('MMMM YYYY'),
                })}
            </span>
            <BodyShort>
                {antallDagerMedTid === 0 ? (
                    <FormattedMessage id="arbeidstidMånedTittel.iPeriodePanel.info.ingenDager" />
                ) : (
                    <FormattedMessage
                        id="arbeidstidMånedTittel.iPeriodePanel.info"
                        values={{ dager: antallDagerMedTid }}
                    />
                )}
            </BodyShort>
        </Heading>
    );
};

export default ArbeidstidMånedTittel;
