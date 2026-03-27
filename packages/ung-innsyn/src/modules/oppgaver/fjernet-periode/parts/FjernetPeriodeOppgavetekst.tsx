import { BodyLong } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';

import { UngUiText } from '../../../../i18n';

interface Props {
    svarfrist: Date;
}

export const FjernetPeriodeOppgavetekst = ({ svarfrist }: Props) => {
    const formatertFrist = <span className="text-nowrap">{dateFormatter.full(svarfrist)}</span>;

    return (
        <>
            <BodyLong spacing>
                <UngUiText id="@ungUi.fjernetPeriode.oppgavetekst.1" />
            </BodyLong>
            <BodyLong spacing>
                <UngUiText id="@ungUi.fjernetPeriode.oppgavetekst.2" />
            </BodyLong>
            <BodyLong spacing>
                <UngUiText id="@ungUi.fjernetPeriode.oppgavetekst.3" />
            </BodyLong>
            <BodyLong spacing>
                <UngUiText id="@ungUi.fjernetPeriode.oppgavetekst.4" />
            </BodyLong>
            <BodyLong weight="semibold">
                <UngUiText id="@ungUi.fjernetPeriode.oppgavetekst.svarfrist" values={{ formatertFrist }} />
            </BodyLong>
        </>
    );
};
