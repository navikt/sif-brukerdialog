import React from 'react';
import { FormattedMessage } from 'react-intl';
import { prettifyDateExtended } from '@navikt/sif-common-utils';

interface Props {
    from: Date;
    to?: Date;
}

const ArbeidsperiodeTekst: React.FunctionComponent<Props> = ({ from, to }) => {
    if (from && to) {
        return (
            <FormattedMessage
                id="arbeidsperiode.avsluttet"
                values={{ fra: prettifyDateExtended(from), til: prettifyDateExtended(to) }}
            />
        );
    }

    return <FormattedMessage id="arbeidsperiode.pågående" values={{ fra: prettifyDateExtended(from) }} />;
};

export default ArbeidsperiodeTekst;
