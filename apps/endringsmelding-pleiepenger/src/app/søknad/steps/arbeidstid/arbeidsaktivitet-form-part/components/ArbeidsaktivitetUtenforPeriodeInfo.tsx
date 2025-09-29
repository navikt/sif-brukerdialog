import { BodyShort } from '@navikt/ds-react';
import { dateFormatter, DateRange } from '@navikt/sif-common-utils';
import { Arbeidsaktivitet } from '@types';

import { AppText } from '../../../../../i18n';
import { SkrivTilOssLink } from '../../../../../lenker';

interface Props {
    arbeidsaktivitet: Arbeidsaktivitet;
    tillattEndringsperiode: DateRange;
}

const ArbeidsaktivitetUtenforPeriodeInfo = ({
    arbeidsaktivitet: { harPerioderEtterTillattEndringsperiode, harPerioderFørTillattEndringsperiode },
    tillattEndringsperiode,
}: Props) => {
    if (!harPerioderFørTillattEndringsperiode && !harPerioderEtterTillattEndringsperiode) {
        return null;
    }
    const intlValues = {
        førDato: dateFormatter.full(tillattEndringsperiode.from),
        etterDato: dateFormatter.full(tillattEndringsperiode.to),
        skrivTilOssLink: <SkrivTilOssLink key="lenke" />,
    };
    return (
        <BodyShort>
            {harPerioderFørTillattEndringsperiode && !harPerioderEtterTillattEndringsperiode && (
                <AppText id="arbeidsaktivitetContent.utenforPeriode.før" values={intlValues} />
            )}
            {!harPerioderFørTillattEndringsperiode && harPerioderEtterTillattEndringsperiode && (
                <AppText id="arbeidsaktivitetContent.utenforPeriode.før" values={intlValues} />
            )}
            {harPerioderFørTillattEndringsperiode && harPerioderEtterTillattEndringsperiode && (
                <AppText id="arbeidsaktivitetContent.utenforPeriode.før" values={intlValues} />
            )}
        </BodyShort>
    );
};

export default ArbeidsaktivitetUtenforPeriodeInfo;
