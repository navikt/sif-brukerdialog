import React from 'react';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import { dateFormatter, DateRange } from '@navikt/sif-common-utils';
import { ArbeidAktivitet } from '@types';
import { SkrivTilOssLink } from '../../../../../lenker';

interface Props {
    arbeidAktivitet: ArbeidAktivitet;
    tillattEndringsperiode: DateRange;
}

const ArbeidAktivitetUtenforPeriodeInfo: React.FunctionComponent<Props> = ({
    arbeidAktivitet: { harPerioderEtterTillattEndringsperiode, harPerioderFørTillattEndringsperiode },
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

export default ArbeidAktivitetUtenforPeriodeInfo;
