import React from 'react';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
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
    const førDato = dateFormatter.full(tillattEndringsperiode.from);
    const etterDato = dateFormatter.full(tillattEndringsperiode.to);
    if (harPerioderFørTillattEndringsperiode && !harPerioderEtterTillattEndringsperiode) {
        return (
            <Block padBottom="l">
                <p>
                    Hvis du ønsker å gjøre endringer før {førDato}, må du sende oss en melding via <SkrivTilOssLink />.
                </p>
            </Block>
        );
    } else if (!harPerioderFørTillattEndringsperiode && harPerioderEtterTillattEndringsperiode) {
        return (
            <Block padBottom="l">
                <p>
                    Hvis du ønsker å gjøre endringer etter {etterDato}, må du sende oss en melding via{' '}
                    <SkrivTilOssLink />.
                </p>
            </Block>
        );
    } else if (harPerioderFørTillattEndringsperiode && harPerioderEtterTillattEndringsperiode) {
        return (
            <Block padBottom="l">
                <p>
                    Hvis du ønsker å gjøre endringer før {førDato} eller etter {etterDato}, må du sende oss en melding
                    via <SkrivTilOssLink />.
                </p>
            </Block>
        );
    }
    return null;
};

export default ArbeidsaktivitetUtenforPeriodeInfo;
