import React from 'react';
import { prettifyDateExtended } from '@navikt/sif-common-utils';
import { AppText } from '../../i18n';

interface Props {
    from: Date;
    to?: Date;
}

const ArbeidsperiodeTekst: React.FunctionComponent<Props> = ({ from, to }) => {
    if (from && to) {
        return (
            <AppText
                id="arbeidsperiode.avsluttet"
                values={{ fra: prettifyDateExtended(from), til: prettifyDateExtended(to) }}
            />
        );
    }

    return <AppText id="arbeidsperiode.pågående" values={{ fra: prettifyDateExtended(from) }} />;
};

export default ArbeidsperiodeTekst;
