import { BodyLong } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';

import { UngUiText } from '@ui/i18n';

interface Props {
    svarfrist: Date;
}

const FjernetPeriodeOppgavetekst = ({ svarfrist }: Props) => {
    const formatertFrist = <span className="text-nowrap">{dateFormatter.full(svarfrist)}</span>;

    return (
        <>
            <BodyLong spacing>
                <UngUiText id="fjernetPeriode.oppgavetekst.1" />
            </BodyLong>
            <BodyLong spacing>
                <UngUiText id="fjernetPeriode.oppgavetekst.2" />
            </BodyLong>
            <BodyLong spacing>
                <UngUiText id="fjernetPeriode.oppgavetekst.3" />
            </BodyLong>
            <BodyLong spacing>
                <UngUiText id="fjernetPeriode.oppgavetekst.4" />
            </BodyLong>
            <BodyLong weight="semibold">
                <UngUiText id="fjernetPeriode.oppgavetekst.svarfrist" values={{ formatertFrist }} />
            </BodyLong>
        </>
    );
};

export default FjernetPeriodeOppgavetekst;
