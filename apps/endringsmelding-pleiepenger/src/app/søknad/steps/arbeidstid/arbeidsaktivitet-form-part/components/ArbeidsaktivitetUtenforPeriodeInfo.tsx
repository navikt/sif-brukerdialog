import { BodyShort } from '@navikt/ds-react';
import React from 'react';
import { dateFormatter, DateRange } from '@navikt/sif-common-utils';
import { Arbeidsaktivitet } from '@types';
import { SkrivTilOssLink } from '../../../../../lenker';

interface Props {
    arbeidsaktivitet: Arbeidsaktivitet;
    tillattEndringsperiode: DateRange;
}

const ArbeidsaktivitetUtenforPeriodeInfo: React.FunctionComponent<Props> = ({
    arbeidsaktivitet: { harPerioderEtterTillattEndringsperiode, harPerioderFørTillattEndringsperiode },
    tillattEndringsperiode,
}) => {
    if (!harPerioderFørTillattEndringsperiode && !harPerioderEtterTillattEndringsperiode) {
        return null;
    }
    const førDato = dateFormatter.full(tillattEndringsperiode.from);
    const etterDato = dateFormatter.full(tillattEndringsperiode.to);
    return (
        <BodyShort style={{ paddingBottom: '1rem' }}>
            {harPerioderFørTillattEndringsperiode && !harPerioderEtterTillattEndringsperiode && (
                <>
                    Hvis du ønsker å gjøre endringer før {førDato}, må du sende oss en melding via <SkrivTilOssLink />.
                </>
            )}
            {!harPerioderFørTillattEndringsperiode && harPerioderEtterTillattEndringsperiode && (
                <>
                    Hvis du ønsker å gjøre endringer etter {etterDato}, må du sende oss en melding via{' '}
                    <SkrivTilOssLink />.
                </>
            )}
            {harPerioderFørTillattEndringsperiode && harPerioderEtterTillattEndringsperiode && (
                <>
                    Hvis du ønsker å gjøre endringer før {førDato} eller etter {etterDato}, må du sende oss en melding
                    via <SkrivTilOssLink />.
                </>
            )}
        </BodyShort>
    );
};

export default ArbeidsaktivitetUtenforPeriodeInfo;
